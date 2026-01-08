-- Complete cleanup: Remove Test Lesson and all related data
-- Run this in Supabase SQL Editor

-- Step 1: Find the test lesson ID
DO $$
DECLARE
  test_lesson_id uuid;
BEGIN
  -- Get the test lesson ID
  SELECT id INTO test_lesson_id
  FROM lessons
  WHERE title ILIKE '%test%' OR "order" = 0
  LIMIT 1;

  IF test_lesson_id IS NOT NULL THEN
    -- Delete lesson unlocks for test lesson
    DELETE FROM lesson_unlocks
    WHERE lesson_id = test_lesson_id;

    -- Delete any attempts for test lesson
    DELETE FROM attempts
    WHERE lesson_id = test_lesson_id;

    RAISE NOTICE 'Cleaned up data for test lesson: %', test_lesson_id;
  END IF;
END $$;

-- Step 2: Delete the test lesson itself
DELETE FROM lessons
WHERE title ILIKE '%test%'
   OR "order" = 0;

-- Step 3: Verify cleanup
SELECT
  id,
  title,
  grade,
  "order",
  description
FROM lessons
ORDER BY "order";

-- Step 4: Check for orphaned unlocks (should return empty)
SELECT lu.*
FROM lesson_unlocks lu
LEFT JOIN lessons l ON lu.lesson_id = l.id
WHERE l.id IS NULL;

-- Step 5: Check for orphaned attempts (should return empty)
SELECT a.*
FROM attempts a
LEFT JOIN lessons l ON a.lesson_id = l.id
WHERE l.id IS NULL;
