-- Reset Data Script
-- Wipes all student, class, and performance data for fresh start
-- Run this in Supabase SQL Editor
-- ⚠️  WARNING: This will permanently delete all user data!

BEGIN;

-- Delete in order to respect foreign key constraints
DELETE FROM responses;
DELETE FROM attempts;
DELETE FROM lesson_unlocks;
DELETE FROM students;
DELETE FROM classes;

-- Verify deletion
DO $$
DECLARE
  responses_count INTEGER;
  attempts_count INTEGER;
  students_count INTEGER;
  classes_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO responses_count FROM responses;
  SELECT COUNT(*) INTO attempts_count FROM attempts;
  SELECT COUNT(*) INTO students_count FROM students;
  SELECT COUNT(*) INTO classes_count FROM classes;

  RAISE NOTICE 'Data reset complete:';
  RAISE NOTICE '  Responses: % (should be 0)', responses_count;
  RAISE NOTICE '  Attempts: % (should be 0)', attempts_count;
  RAISE NOTICE '  Students: % (should be 0)', students_count;
  RAISE NOTICE '  Classes: % (should be 0)', classes_count;

  IF responses_count = 0 AND attempts_count = 0 AND students_count = 0 AND classes_count = 0 THEN
    RAISE NOTICE '✅ All data successfully deleted';
  ELSE
    RAISE WARNING 'Some data may remain';
  END IF;
END $$;

COMMIT;
