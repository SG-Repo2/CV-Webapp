/*
  # Update waitlist table policies

  1. Changes
    - Add policy to allow anonymous users to insert emails
    - Keep existing policy for authenticated users to read their own entries

  2. Security
    - Anonymous users can only insert new entries
    - No deletion or update allowed
    - Authenticated users can only read their own entries
*/

-- Enable RLS if not already enabled
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert emails
CREATE POLICY "Anyone can add their email to waitlist"
  ON waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Keep existing policy for authenticated users to read their own entries
CREATE POLICY "Users can read own waitlist entry"
  ON waitlist
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);