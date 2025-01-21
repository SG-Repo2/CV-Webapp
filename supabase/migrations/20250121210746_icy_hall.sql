/*
  # Update waitlist table policies

  1. Changes
    - Drop and recreate insert policy for anonymous users
    - Ensure proper RLS configuration
    
  2. Security
    - Anonymous users can insert new entries
    - No modification of existing entries
*/

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Anyone can add their email to waitlist" ON waitlist;

-- Create new insert policy
CREATE POLICY "Anyone can add their email to waitlist"
  ON waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);