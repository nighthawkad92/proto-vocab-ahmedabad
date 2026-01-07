-- Comprehensive RLS Policy Fix for Name-Based Authentication
-- This removes all auth-based restrictions since we're using simple name-based login
-- Run this in your Supabase SQL editor

-- ============================================================
-- TEACHERS TABLE - Allow name-based access
-- ============================================================

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Teachers can view their own data" ON teachers;
DROP POLICY IF EXISTS "Teachers can update their own data" ON teachers;
DROP POLICY IF EXISTS "Teachers can be created" ON teachers;
DROP POLICY IF EXISTS "Teachers are publicly readable" ON teachers;
DROP POLICY IF EXISTS "Teachers can update their data" ON teachers;

-- Create new permissive policies
CREATE POLICY "Teachers: Anyone can create"
  ON teachers FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Teachers: Anyone can read"
  ON teachers FOR SELECT
  USING (true);

CREATE POLICY "Teachers: Anyone can update"
  ON teachers FOR UPDATE
  USING (true);

-- ============================================================
-- CLASSES TABLE - Allow teachers to manage their classes
-- ============================================================

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Teachers can view their own classes" ON classes;
DROP POLICY IF EXISTS "Teachers can insert their own classes" ON classes;
DROP POLICY IF EXISTS "Teachers can update their own classes" ON classes;
DROP POLICY IF EXISTS "Teachers can delete their own classes" ON classes;

-- Create new permissive policies (we'll still filter by teacher_id in the app)
CREATE POLICY "Classes: Anyone can create"
  ON classes FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Classes: Anyone can read"
  ON classes FOR SELECT
  USING (true);

CREATE POLICY "Classes: Anyone can update"
  ON classes FOR UPDATE
  USING (true);

CREATE POLICY "Classes: Anyone can delete"
  ON classes FOR DELETE
  USING (true);

-- ============================================================
-- LESSON_UNLOCKS TABLE - Allow teachers to unlock lessons
-- ============================================================

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Teachers can view unlocks for their classes" ON lesson_unlocks;
DROP POLICY IF EXISTS "Teachers can unlock lessons for their classes" ON lesson_unlocks;
DROP POLICY IF EXISTS "Teachers can remove unlocks from their classes" ON lesson_unlocks;
DROP POLICY IF EXISTS "Students can view unlocks for their class" ON lesson_unlocks;

-- Create new permissive policies
CREATE POLICY "Lesson unlocks: Anyone can create"
  ON lesson_unlocks FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Lesson unlocks: Anyone can read"
  ON lesson_unlocks FOR SELECT
  USING (true);

CREATE POLICY "Lesson unlocks: Anyone can delete"
  ON lesson_unlocks FOR DELETE
  USING (true);

-- ============================================================
-- Verify all policies are set correctly
-- ============================================================

-- This query will show all RLS policies - run it to verify
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
