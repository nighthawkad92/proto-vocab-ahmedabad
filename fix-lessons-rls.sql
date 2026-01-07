-- Fix RLS policies for lessons table
-- Lessons should be readable by everyone (students and teachers)

BEGIN;

-- Drop existing policies on lessons table if any
DROP POLICY IF EXISTS "Lessons: Anyone can read" ON lessons;
DROP POLICY IF EXISTS "Enable read access for all users" ON lessons;

-- Create permissive read policy
CREATE POLICY "Lessons: Anyone can read"
ON lessons
FOR SELECT
USING (true);

COMMIT;
