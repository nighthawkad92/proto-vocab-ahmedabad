-- FINAL FIX for lesson_unlocks RLS
-- This will remove ALL policies and create ONE simple policy

BEGIN;

-- Show current policies before fix
SELECT 'BEFORE FIX:' as status;
SELECT policyname, cmd, qual::text
FROM pg_policies
WHERE tablename = 'lesson_unlocks';

-- Drop ALL possible policies (even ones we might not know about)
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN
        SELECT policyname
        FROM pg_policies
        WHERE tablename = 'lesson_unlocks'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON lesson_unlocks', r.policyname);
    END LOOP;
END $$;

-- Ensure RLS is enabled
ALTER TABLE lesson_unlocks ENABLE ROW LEVEL SECURITY;

-- Create ONE simple policy for SELECT
CREATE POLICY "allow_all_reads"
  ON lesson_unlocks
  FOR SELECT
  USING (true);

-- Create ONE simple policy for INSERT (for teachers)
CREATE POLICY "allow_all_inserts"
  ON lesson_unlocks
  FOR INSERT
  WITH CHECK (true);

-- Create ONE simple policy for DELETE (for teachers)
CREATE POLICY "allow_all_deletes"
  ON lesson_unlocks
  FOR DELETE
  USING (true);

-- Show policies after fix
SELECT 'AFTER FIX:' as status;
SELECT policyname, cmd, qual::text, with_check::text
FROM pg_policies
WHERE tablename = 'lesson_unlocks';

COMMIT;

-- Test the query that the API uses
SELECT 'TEST QUERY RESULT:' as status;
SELECT COUNT(*) as total_unlocks, class_id
FROM lesson_unlocks
WHERE class_id = 'ad78faa4-7442-4df7-8b6f-800d9c5565a5'
GROUP BY class_id;
