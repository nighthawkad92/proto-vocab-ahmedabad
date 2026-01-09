-- ⚠️  WARNING: This script PERMANENTLY DELETES ALL USER DATA
-- This will wipe all teachers, students, classes, attempts, and responses
-- Lesson content will be preserved
-- Run this script in Supabase SQL Editor

-- ========================================
-- DANGER ZONE: DATA DELETION
-- ========================================

BEGIN;

-- Delete in order to respect foreign key constraints
-- Start with child tables first, then parent tables

RAISE NOTICE 'Starting data deletion...';

-- 1. Delete all student responses (most granular data)
DELETE FROM responses;
RAISE NOTICE '✓ Deleted all responses';

-- 2. Delete all lesson attempts
DELETE FROM attempts;
RAISE NOTICE '✓ Deleted all attempts';

-- 3. Delete all lesson unlocks
DELETE FROM lesson_unlocks;
RAISE NOTICE '✓ Deleted all lesson unlocks';

-- 4. Delete all students
DELETE FROM students;
RAISE NOTICE '✓ Deleted all students';

-- 5. Delete all classes
DELETE FROM classes;
RAISE NOTICE '✓ Deleted all classes';

-- 6. Delete all teachers
DELETE FROM teachers;
RAISE NOTICE '✓ Deleted all teachers';

-- Verify deletion
DO $$
DECLARE
  teacher_count INTEGER;
  class_count INTEGER;
  student_count INTEGER;
  attempt_count INTEGER;
  response_count INTEGER;
  unlock_count INTEGER;
  lesson_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO teacher_count FROM teachers;
  SELECT COUNT(*) INTO class_count FROM classes;
  SELECT COUNT(*) INTO student_count FROM students;
  SELECT COUNT(*) INTO attempt_count FROM attempts;
  SELECT COUNT(*) INTO response_count FROM responses;
  SELECT COUNT(*) INTO unlock_count FROM lesson_unlocks;
  SELECT COUNT(*) INTO lesson_count FROM lessons;

  RAISE NOTICE '';
  RAISE NOTICE '========================================';
  RAISE NOTICE 'DATA WIPE COMPLETE';
  RAISE NOTICE '========================================';
  RAISE NOTICE 'Teachers remaining: %', teacher_count;
  RAISE NOTICE 'Classes remaining: %', class_count;
  RAISE NOTICE 'Students remaining: %', student_count;
  RAISE NOTICE 'Attempts remaining: %', attempt_count;
  RAISE NOTICE 'Responses remaining: %', response_count;
  RAISE NOTICE 'Lesson unlocks remaining: %', unlock_count;
  RAISE NOTICE '';
  RAISE NOTICE 'Lessons preserved: %', lesson_count;
  RAISE NOTICE '========================================';

  IF teacher_count = 0 AND class_count = 0 AND student_count = 0
     AND attempt_count = 0 AND response_count = 0 AND unlock_count = 0 THEN
    RAISE NOTICE '✅ All user data successfully deleted';
  ELSE
    RAISE WARNING '⚠️  Some data may remain - please review';
  END IF;
END $$;

COMMIT;

-- Note: Table structures remain intact
-- Note: Lesson content is preserved
-- Note: New users can now create fresh accounts
