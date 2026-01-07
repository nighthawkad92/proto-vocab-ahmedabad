-- ============================================
-- COMPLETE RLS FIX FOR PAL VOCABULARY APP
-- Run this entire file in Supabase SQL Editor
-- ============================================

BEGIN;

-- ============================================
-- 1. TEACHERS TABLE
-- ============================================
DROP POLICY IF EXISTS "Teachers: Anyone can create" ON teachers;
DROP POLICY IF EXISTS "Teachers: Anyone can read" ON teachers;
DROP POLICY IF EXISTS "Teachers: Anyone can update" ON teachers;
DROP POLICY IF EXISTS "Teachers can view their own data" ON teachers;
DROP POLICY IF EXISTS "Teachers can update their own data" ON teachers;

CREATE POLICY "Teachers: Anyone can create"
ON teachers FOR INSERT WITH CHECK (true);

CREATE POLICY "Teachers: Anyone can read"
ON teachers FOR SELECT USING (true);

CREATE POLICY "Teachers: Anyone can update"
ON teachers FOR UPDATE USING (true);

-- ============================================
-- 2. CLASSES TABLE
-- ============================================
DROP POLICY IF EXISTS "Classes: Anyone can create" ON classes;
DROP POLICY IF EXISTS "Classes: Anyone can read" ON classes;
DROP POLICY IF EXISTS "Classes: Anyone can update" ON classes;
DROP POLICY IF EXISTS "Classes: Anyone can delete" ON classes;

CREATE POLICY "Classes: Anyone can create"
ON classes FOR INSERT WITH CHECK (true);

CREATE POLICY "Classes: Anyone can read"
ON classes FOR SELECT USING (true);

CREATE POLICY "Classes: Anyone can update"
ON classes FOR UPDATE USING (true);

CREATE POLICY "Classes: Anyone can delete"
ON classes FOR DELETE USING (true);

-- ============================================
-- 3. LESSON_UNLOCKS TABLE
-- ============================================
DROP POLICY IF EXISTS "Lesson unlocks: Anyone can create" ON lesson_unlocks;
DROP POLICY IF EXISTS "Lesson unlocks: Anyone can read" ON lesson_unlocks;
DROP POLICY IF EXISTS "Lesson unlocks: Anyone can delete" ON lesson_unlocks;

CREATE POLICY "Lesson unlocks: Anyone can create"
ON lesson_unlocks FOR INSERT WITH CHECK (true);

CREATE POLICY "Lesson unlocks: Anyone can read"
ON lesson_unlocks FOR SELECT USING (true);

CREATE POLICY "Lesson unlocks: Anyone can delete"
ON lesson_unlocks FOR DELETE USING (true);

-- ============================================
-- 4. LESSONS TABLE
-- ============================================
DROP POLICY IF EXISTS "Lessons: Anyone can read" ON lessons;
DROP POLICY IF EXISTS "Enable read access for all users" ON lessons;

CREATE POLICY "Lessons: Anyone can read"
ON lessons FOR SELECT USING (true);

-- ============================================
-- 5. STUDENTS TABLE
-- ============================================
DROP POLICY IF EXISTS "Students: Anyone can create" ON students;
DROP POLICY IF EXISTS "Students: Anyone can read" ON students;
DROP POLICY IF EXISTS "Students: Anyone can update" ON students;

CREATE POLICY "Students: Anyone can create"
ON students FOR INSERT WITH CHECK (true);

CREATE POLICY "Students: Anyone can read"
ON students FOR SELECT USING (true);

CREATE POLICY "Students: Anyone can update"
ON students FOR UPDATE USING (true);

-- ============================================
-- 6. ATTEMPTS TABLE
-- ============================================
DROP POLICY IF EXISTS "Attempts: Anyone can create" ON attempts;
DROP POLICY IF EXISTS "Attempts: Anyone can read" ON attempts;
DROP POLICY IF EXISTS "Attempts: Anyone can update" ON attempts;

CREATE POLICY "Attempts: Anyone can create"
ON attempts FOR INSERT WITH CHECK (true);

CREATE POLICY "Attempts: Anyone can read"
ON attempts FOR SELECT USING (true);

CREATE POLICY "Attempts: Anyone can update"
ON attempts FOR UPDATE USING (true);

-- ============================================
-- 7. RESPONSES TABLE
-- ============================================
DROP POLICY IF EXISTS "Responses: Anyone can create" ON responses;
DROP POLICY IF EXISTS "Responses: Anyone can read" ON responses;

CREATE POLICY "Responses: Anyone can create"
ON responses FOR INSERT WITH CHECK (true);

CREATE POLICY "Responses: Anyone can read"
ON responses FOR SELECT USING (true);

COMMIT;

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check all policies are in place
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  cmd
FROM pg_policies
WHERE tablename IN ('teachers', 'classes', 'lesson_unlocks', 'lessons', 'students', 'attempts', 'responses')
ORDER BY tablename, policyname;

-- Test lesson read
SELECT id, title, grade FROM lessons ORDER BY "order" LIMIT 5;
