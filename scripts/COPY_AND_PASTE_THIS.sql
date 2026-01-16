-- Copy this entire script and paste it into Supabase SQL Editor
-- Then click "Run" to execute

-- Step 1: Drop all existing policies
DROP POLICY IF EXISTS "Allow public read access to lesson unlocks" ON lesson_unlocks;
DROP POLICY IF EXISTS "Lesson unlocks: Anyone can create" ON lesson_unlocks;
DROP POLICY IF EXISTS "Lesson unlocks: Anyone can read" ON lesson_unlocks;
DROP POLICY IF EXISTS "Lesson unlocks: Anyone can delete" ON lesson_unlocks;
DROP POLICY IF EXISTS "Teachers can view unlocks for their classes" ON lesson_unlocks;
DROP POLICY IF EXISTS "Teachers can unlock lessons for their classes" ON lesson_unlocks;
DROP POLICY IF EXISTS "Teachers can remove unlocks from their classes" ON lesson_unlocks;
DROP POLICY IF EXISTS "Students can view unlocks for their class" ON lesson_unlocks;
DROP POLICY IF EXISTS "allow_all_reads" ON lesson_unlocks;
DROP POLICY IF EXISTS "allow_all_inserts" ON lesson_unlocks;
DROP POLICY IF EXISTS "allow_all_deletes" ON lesson_unlocks;

-- Step 2: Enable RLS
ALTER TABLE lesson_unlocks ENABLE ROW LEVEL SECURITY;

-- Step 3: Create new simple policies
CREATE POLICY "allow_all_reads"
  ON lesson_unlocks
  FOR SELECT
  USING (true);

CREATE POLICY "allow_all_inserts"
  ON lesson_unlocks
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "allow_all_deletes"
  ON lesson_unlocks
  FOR DELETE
  USING (true);

-- Step 4: Verify policies were created
SELECT 'Policies created:' as status;
SELECT policyname, cmd
FROM pg_policies
WHERE tablename = 'lesson_unlocks'
ORDER BY policyname;

-- Step 5: Test the query
SELECT 'Test query result:' as status;
SELECT COUNT(*) as total_unlocks
FROM lesson_unlocks
WHERE class_id = 'ad78faa4-7442-4df7-8b6f-800d9c5565a5';
