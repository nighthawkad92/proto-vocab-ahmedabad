-- QUICK FIX: Run this single command block in Supabase SQL Editor
-- This will fix all RLS permission issues at once

BEGIN;

-- Teachers table
DROP POLICY IF EXISTS "Teachers can view their own data" ON teachers;
DROP POLICY IF EXISTS "Teachers can update their own data" ON teachers;
DROP POLICY IF EXISTS "Teachers can be created" ON teachers;
DROP POLICY IF EXISTS "Teachers are publicly readable" ON teachers;
DROP POLICY IF EXISTS "Teachers can update their data" ON teachers;

CREATE POLICY "Teachers: Anyone can create" ON teachers FOR INSERT WITH CHECK (true);
CREATE POLICY "Teachers: Anyone can read" ON teachers FOR SELECT USING (true);
CREATE POLICY "Teachers: Anyone can update" ON teachers FOR UPDATE USING (true);

-- Classes table
DROP POLICY IF EXISTS "Teachers can view their own classes" ON classes;
DROP POLICY IF EXISTS "Teachers can insert their own classes" ON classes;
DROP POLICY IF EXISTS "Teachers can update their own classes" ON classes;
DROP POLICY IF EXISTS "Teachers can delete their own classes" ON classes;
DROP POLICY IF EXISTS "Classes: Anyone can create" ON classes;
DROP POLICY IF EXISTS "Classes: Anyone can read" ON classes;
DROP POLICY IF EXISTS "Classes: Anyone can update" ON classes;
DROP POLICY IF EXISTS "Classes: Anyone can delete" ON classes;

CREATE POLICY "Classes: Anyone can create" ON classes FOR INSERT WITH CHECK (true);
CREATE POLICY "Classes: Anyone can read" ON classes FOR SELECT USING (true);
CREATE POLICY "Classes: Anyone can update" ON classes FOR UPDATE USING (true);
CREATE POLICY "Classes: Anyone can delete" ON classes FOR DELETE USING (true);

-- Lesson unlocks table
DROP POLICY IF EXISTS "Teachers can view unlocks for their classes" ON lesson_unlocks;
DROP POLICY IF EXISTS "Teachers can unlock lessons for their classes" ON lesson_unlocks;
DROP POLICY IF EXISTS "Teachers can remove unlocks from their classes" ON lesson_unlocks;
DROP POLICY IF EXISTS "Students can view unlocks for their class" ON lesson_unlocks;
DROP POLICY IF EXISTS "Lesson unlocks: Anyone can create" ON lesson_unlocks;
DROP POLICY IF EXISTS "Lesson unlocks: Anyone can read" ON lesson_unlocks;
DROP POLICY IF EXISTS "Lesson unlocks: Anyone can delete" ON lesson_unlocks;

CREATE POLICY "Lesson unlocks: Anyone can create" ON lesson_unlocks FOR INSERT WITH CHECK (true);
CREATE POLICY "Lesson unlocks: Anyone can read" ON lesson_unlocks FOR SELECT USING (true);
CREATE POLICY "Lesson unlocks: Anyone can delete" ON lesson_unlocks FOR DELETE USING (true);

COMMIT;

-- Verify the changes
SELECT tablename, policyname, cmd
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN ('teachers', 'classes', 'lesson_unlocks')
ORDER BY tablename, policyname;
