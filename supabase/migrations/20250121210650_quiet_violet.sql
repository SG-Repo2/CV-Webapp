/*
  # Add anonymous insert policy for waitlist

  1. Changes
    - Add policy to allow anonymous users to insert emails
    
  2. Security
    - Anonymous users can only insert new entries
    - No deletion or update allowed
    - Keeps existing select policy for authenticated users
*/

-- Allow anonymous users to insert emails
CREATE POLICY "Anyone can add their email to waitlist"
  ON waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);