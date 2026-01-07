-- Complete RLS fix for all tables
-- This ensures students and teachers can access all necessary data

BEGIN;

-- ============================================
-- LESSONS TABLE
-- ============================================
DROP POLICY IF EXISTS "Lessons: Anyone can read" ON lessons;
DROP POLICY IF EXISTS "Enable read access for all users" ON lessons;

CREATE POLICY "Lessons: Anyone can read"
ON lessons
FOR SELECT
USING (true);

-- ============================================
-- ATTEMPTS TABLE
-- ============================================
DROP POLICY IF EXISTS "Attempts: Anyone can create" ON attempts;
DROP POLICY IF EXISTS "Attempts: Anyone can read" ON attempts;
DROP POLICY IF EXISTS "Attempts: Anyone can update" ON attempts;

CREATE POLICY "Attempts: Anyone can create"
ON attempts
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Attempts: Anyone can read"
ON attempts
FOR SELECT
USING (true);

CREATE POLICY "Attempts: Anyone can update"
ON attempts
FOR UPDATE
USING (true);

-- ============================================
-- RESPONSES TABLE
-- ============================================
DROP POLICY IF EXISTS "Responses: Anyone can create" ON responses;
DROP POLICY IF EXISTS "Responses: Anyone can read" ON responses;

CREATE POLICY "Responses: Anyone can create"
ON responses
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Responses: Anyone can read"
ON responses
FOR SELECT
USING (true);

-- ============================================
-- STUDENTS TABLE
-- ============================================
DROP POLICY IF EXISTS "Students: Anyone can create" ON students;
DROP POLICY IF EXISTS "Students: Anyone can read" ON students;
DROP POLICY IF EXISTS "Students: Anyone can update" ON students;

CREATE POLICY "Students: Anyone can create"
ON students
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Students: Anyone can read"
ON students
FOR SELECT
USING (true);

CREATE POLICY "Students: Anyone can update"
ON students
FOR UPDATE
USING (true);

COMMIT;
