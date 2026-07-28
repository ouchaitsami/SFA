import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const FROM_EMAIL = 'So Fresh Ads <hello@sofreshads.com>';
const NOTIFY_EMAIL = Deno.env.get('LEADS_NOTIFY_EMAIL') ?? '';
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
const WEBHOOK_SECRET = Deno.env.get('LEADS_WEBHOOK_SECRET') ?? '';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface LeadData {
  full_name: string;
  email: string;
  website?: string;
  budget?: string;
}

function confirmationEmailHtml(firstName: string): string {
  return `<!doctype html>
<html lang="fr">
<body style="margin:0;padding:0;background:#FAF7F2;font-family:Arial,Helvetica,sans-serif;color:#1A1410;">
  <div style="max-width:520px;margin:0 auto;padding:40px 24px;">
    <div style="text-align:center;margin-bottom:32px;">
      <span style="font-family:Georgia,serif;font-style:italic;font-weight:600;color:#1E7268;font-size:22px;">So</span><span style="font-family:Georgia,serif;font-weight:700;color:#1A1410;font-size:22px;">Fresh</span><span style="font-family:Georgia,serif;font-style:italic;font-weight:600;color:#A61D5A;font-size:22px;">Ads</span>
    </div>
    <div style="background:#ffffff;border:1px solid rgba(26,20,16,0.1);border-radius:16px;padding:32px;">
      <p style="font-size:16px;line-height:1.6;margin:0 0 16px;">Bonjour ${firstName},</p>
      <p style="font-size:16px;line-height:1.6;margin:0 0 16px;">
        Votre demande d'audit gratuit est bien arriv&eacute;e en cave. Nos alchimistes l'examinent
        et reviennent vers vous sous 24h avec une premi&egrave;re lecture de vos campagnes.
      </p>
      <p style="font-size:16px;line-height:1.6;margin:0 0 16px;">
        Si vous avez un lien direct vers vos comptes Google Ads ou Meta Ads &agrave; nous
        partager en attendant, &ccedil;a acc&eacute;l&egrave;re l'analyse.
      </p>
      <p style="font-size:16px;line-height:1.6;margin:24px 0 0;">
        &Agrave; tr&egrave;s vite,<br>
        <strong>L'&eacute;quipe So Fresh Ads</strong>
      </p>
    </div>
    <p style="text-align:center;font-size:12px;color:#6B5F53;margin-top:24px;">
      So Fresh Ads &middot; www.sofreshads.com
    </p>
  </div>
</body>
</html>`;
}

function internalNotificationHtml(record: LeadData): string {
  return `<!doctype html>
<html lang="fr">
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,Helvetica,sans-serif;color:#1A1410;">
  <div style="max-width:520px;margin:0 auto;padding:40px 24px;">
    <div style="background:#ffffff;border:1px solid rgba(26,20,16,0.1);border-radius:16px;padding:32px;">
      <h2 style="font-size:18px;margin:0 0 16px;color:#1E7268;">Nouveau lead re&ccedil;u</h2>
      <table style="width:100%;font-size:15px;line-height:1.6;border-collapse:collapse;">
        <tr><td style="padding:6px 0;font-weight:600;width:100px;">Nom</td><td style="padding:6px 0;">${record.full_name}</td></tr>
        <tr><td style="padding:6px 0;font-weight:600;">Email</td><td style="padding:6px 0;">${record.email}</td></tr>
        <tr><td style="padding:6px 0;font-weight:600;">Site</td><td style="padding:6px 0;">${record.website || '-'}</td></tr>
        <tr><td style="padding:6px 0;font-weight:600;">Budget</td><td style="padding:6px 0;">${record.budget || '-'}</td></tr>
      </table>
    </div>
  </div>
</body>
</html>`;
}

async function sendEmail(to: string, subject: string, html: string): Promise<{ ok: boolean; detail: string }> {
  const payload = { from: FROM_EMAIL, to: [to], subject, html };
  console.log('Resend request:', JSON.stringify({ from: FROM_EMAIL, to: [to], subject }));
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const body = await res.text();
  if (!res.ok) {
    console.error(`Resend error (${res.status}):`, body);
    return { ok: false, detail: body };
  }
  console.log('Resend success:', body);
  return { ok: true, detail: body };
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }

  const webhookSecret = req.headers.get('x-webhook-secret') || '';
  const authHeader = req.headers.get('apikey') || req.headers.get('authorization')?.replace('Bearer ', '') || '';

  const isWebhookAuth = WEBHOOK_SECRET && webhookSecret === WEBHOOK_SECRET;
  const isClientAuth = SUPABASE_ANON_KEY && authHeader === SUPABASE_ANON_KEY;

  if (!isWebhookAuth && !isClientAuth) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }

  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY missing from edge function secrets');
    return new Response(JSON.stringify({ error: 'Server misconfigured' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }

  let data: LeadData;
  try {
    const raw = await req.json();
    if (raw.record) {
      data = raw.record as LeadData;
    } else {
      data = raw as LeadData;
    }
  } catch {
    return new Response(JSON.stringify({ error: 'Bad request' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }

  const email = data.email?.trim();
  const fullName = data.full_name?.trim();

  if (!email || !fullName) {
    return new Response(JSON.stringify({ error: 'Missing lead data' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }

  const firstName = fullName.split(/\s+/)[0] || fullName;

  const confirmation = await sendEmail(
    email,
    "Votre audit gratuit So Fresh Ads est en cave",
    confirmationEmailHtml(firstName),
  );

  let notification = { ok: true, detail: '' };
  if (NOTIFY_EMAIL) {
    notification = await sendEmail(
      NOTIFY_EMAIL,
      `Nouveau lead : ${fullName}`,
      internalNotificationHtml(data),
    );
  }

  if (!confirmation.ok) {
    return new Response(JSON.stringify({ error: 'Email send failed', detail: confirmation.detail }), { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }

  if (!notification.ok) {
    console.error('Internal notification failed:', notification.detail);
  }

  return new Response(JSON.stringify({ success: true, confirmation: confirmation.detail, notification: notification.ok }), { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
});
