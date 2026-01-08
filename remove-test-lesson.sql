-- Remove the standalone "Test Lesson - New Question Types"
-- All 20 test questions have been integrated into Lessons 2-5
-- This test lesson is no longer needed

-- Delete the test lesson
DELETE FROM lessons
WHERE title = 'Test Lesson - New Question Types'
   OR (title LIKE '%Test Lesson%' AND "order" = 0);

-- Verify deletion
SELECT
  id,
  title,
  grade,
  "order",
  description
FROM lessons
ORDER BY "order";

-- Expected result: Test lesson should be gone, Lessons 1-5 should remain
