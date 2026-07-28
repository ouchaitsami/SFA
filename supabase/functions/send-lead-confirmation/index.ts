import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const FROM_EMAIL = 'So Fresh Ads <hello@sofreshads.com>';
const NOTIFY_EMAIL = 'sofreshads@gmail.com';
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
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>So Fresh Ads</title>
<!--[if mso]>
<style>
  .sfa-serif { font-family: Georgia, 'Times New Roman', serif !important; }
</style>
<![endif]-->
</head>
<body style="margin:0;padding:0;background:#FAF7F2;font-family:'Inter',Helvetica,Arial,sans-serif;color:#1A1410;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">Votre demande est en cave. Nous revenons vers vous sous 24h.</div>
  <div style="max-width:560px;margin:0 auto;padding:48px 24px;">

    <div style="text-align:center;margin-bottom:28px;">
      <span class="sfa-serif" style="font-family:'Playfair Display',Georgia,serif;font-style:italic;font-weight:500;color:#1E7268;font-size:24px;">So</span><span class="sfa-serif" style="font-family:'Playfair Display',Georgia,serif;font-weight:700;color:#1A1410;font-size:24px;">Fresh</span><span class="sfa-serif" style="font-family:'Playfair Display',Georgia,serif;font-style:italic;font-weight:500;color:#A61D5A;font-size:24px;">Ads</span><span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#A61D5A;margin-left:4px;"></span>
    </div>

    <div style="text-align:center;margin-bottom:24px;">
      <span style="display:inline-block;border:1px solid rgba(26,20,16,0.15);background:#ffffff;border-radius:999px;padding:6px 18px;font-size:10px;font-weight:500;letter-spacing:0.3em;text-transform:uppercase;color:rgba(26,20,16,0.8);">Audit gratuit reçu</span>
    </div>

    <div style="background:#ffffff;border:1px solid rgba(26,20,16,0.1);border-radius:28px;padding:40px 32px;text-align:center;">
      <div style="font-size:34px;line-height:1;margin-bottom:18px;">🥂</div>

      <h1 class="sfa-serif" style="font-family:'Playfair Display',Georgia,serif;font-weight:700;color:#1A1410;font-size:26px;margin:0 0 12px;">
        Santé, ${firstName} !
      </h1>

      <p class="sfa-serif" style="font-family:'Playfair Display',Georgia,serif;font-style:italic;color:#6B5F53;font-size:16px;line-height:1.7;margin:0 0 20px;">
        Votre demande d'audit gratuit est bien arriv&eacute;e en cave. Nos alchimistes l'examinent
        et reviennent vers vous sous 24h avec une premi&egrave;re lecture de vos campagnes.
      </p>

      <div style="color:rgba(26,20,16,0.2);font-size:13px;letter-spacing:0.1em;margin:20px 0;">&#9670;&nbsp;&nbsp;&#9670;&nbsp;&nbsp;&#9670;</div>

      <p style="font-family:'Inter',Helvetica,Arial,sans-serif;color:#1A1410;font-size:15px;line-height:1.7;margin:0;">
        Un lien direct vers vos comptes Google&nbsp;Ads ou Meta&nbsp;Ads &agrave; nous partager
        en attendant&nbsp;? &Ccedil;a acc&eacute;l&egrave;re l'analyse.
      </p>
    </div>

    <p class="sfa-serif" style="font-family:'Playfair Display',Georgia,serif;font-style:italic;color:#1A1410;font-size:16px;text-align:center;margin:28px 0 0;">
      &Agrave; tr&egrave;s vite,<br>
      <strong style="font-style:normal;">L'&eacute;quipe So Fresh Ads</strong>
    </p>

    <p style="text-align:center;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#6B5F53;margin-top:36px;">
      So Fresh Ads &nbsp;&#9670;&nbsp; Cocktails de campagnes publicitaires
    </p>
    <p style="text-align:center;font-size:11px;color:rgba(107,95,83,0.7);margin-top:6px;">
      <a href="https://www.sofreshads.com" style="color:rgba(107,95,83,0.7);text-decoration:underline;">www.sofreshads.com</a>
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
