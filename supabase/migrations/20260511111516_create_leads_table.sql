/*
  # Create leads table for SoFreshAds landing page

  1. New Tables
    - `leads`
      - `id` (uuid, primary key)
      - `full_name` (text)
      - `email` (text)
      - `website` (text)
      - `budget` (text) - selected budget range
      - `created_at` (timestamptz)
  2. Security
    - Enable RLS on `leads` table
    - Public INSERT policy so website visitors can submit the form
    - No public SELECT - only admins via service role can read
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  website text NOT NULL DEFAULT '',
  budget text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a lead"
  ON leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
