/*
  # Tighten RLS insert policy on `leads`

  1. Security
    - Drop the previous `Anyone can submit a lead` policy which used
      `WITH CHECK (true)` and effectively bypassed row-level security.
    - Replace it with a validated policy that enforces basic shape checks
      on the submitted row before it can be inserted:
        - `full_name` must be between 2 and 120 characters
        - `email` must be between 5 and 160 characters and match a basic
          email pattern
        - `website` must be between 3 and 300 characters
        - `budget` must be one of the allowed ranges exposed by the form
        - `created_at`, when provided, must be close to `now()` (no
          arbitrary past/future timestamps from clients)

  2. Notes
    - Anonymous and authenticated roles are still allowed to submit
      leads (the form is public), but every insert is now constrained
      to the shape the application actually produces.
    - SELECT / UPDATE / DELETE remain restricted — only the service
      role (server-side) can read or manage submissions.
*/

DROP POLICY IF EXISTS "Anyone can submit a lead" ON leads;

CREATE POLICY "Public can submit a valid lead"
  ON leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(full_name) BETWEEN 2 AND 120
    AND char_length(email) BETWEEN 5 AND 160
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND char_length(website) BETWEEN 3 AND 300
    AND budget IN ('500-2000', '2000-5000', '5000-10000', '10000+')
    AND (
      created_at IS NULL
      OR created_at BETWEEN now() - interval '5 minutes' AND now() + interval '5 minutes'
    )
  );
