-- Fix RLS policy for lesson_unlocks to allow reading
-- This allows the student lessons API to fetch unlocked lessons

-- Enable RLS if not already enabled
ALTER TABLE lesson_unlocks ENABLE ROW LEVEL SECURITY;

-- Drop existing SELECT policy if it exists
DROP POLICY IF EXISTS "Allow public read access to lesson unlocks" ON lesson_unlocks;

-- Create new policy that allows anyone to read lesson unlocks
CREATE POLICY "Allow public read access to lesson unlocks"
ON lesson_unlocks
FOR SELECT
USING (true);

-- Verify the policy was created
SELECT
  policyname,
  cmd,
  qual
FROM pg_policies
WHERE tablename = 'lesson_unlocks';
