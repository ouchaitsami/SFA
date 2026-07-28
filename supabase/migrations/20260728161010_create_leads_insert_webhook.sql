/*
# Create Database Webhook for leads table

1. Extensions
   - Enable `pg_net` extension (HTTP client from within PostgreSQL)

2. New Function
   - `public.handle_new_lead_webhook()`: trigger function that fires on INSERT
     into `leads`. Uses `net.http_post` to call the `send-lead-confirmation`
     edge function with the new lead data as JSON body and an
     `x-webhook-secret` header for authentication.

3. New Trigger
   - `on_lead_insert_send_confirmation`: AFTER INSERT trigger on `leads` that
     calls the webhook function for each new row.

4. Important Notes
   - The webhook secret is embedded in the trigger function as a constant.
   - The edge function URL is derived from the project's Supabase URL.
   - pg_net processes HTTP requests asynchronously (does not block the INSERT).
*/

-- 1. Enable pg_net extension
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- 2. Create trigger function
CREATE OR REPLACE FUNCTION public.handle_new_lead_webhook()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  payload jsonb;
  edge_function_url text := 'https://dsqnwejlcftbwanypgly.supabase.co/functions/v1/send-lead-confirmation';
BEGIN
  payload := jsonb_build_object(
    'type', 'INSERT',
    'table', 'leads',
    'record', jsonb_build_object(
      'full_name', NEW.full_name,
      'email', NEW.email,
      'website', NEW.website,
      'budget', NEW.budget
    )
  );

  PERFORM net.http_post(
    url := edge_function_url,
    body := payload,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-webhook-secret', 'Lemdpwebhook13!'
    )
  );

  RETURN NEW;
END;
$$;

-- 3. Create trigger (drop first for idempotency)
DROP TRIGGER IF EXISTS on_lead_insert_send_confirmation ON public.leads;
CREATE TRIGGER on_lead_insert_send_confirmation
  AFTER INSERT ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_lead_webhook();
