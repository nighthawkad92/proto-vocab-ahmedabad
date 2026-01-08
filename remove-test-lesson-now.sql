-- Emergency cleanup: Remove Test Lesson immediately
-- Run this in Supabase SQL Editor to delete the test lesson

-- Delete any lesson with "Test" in the title or order = 0
DELETE FROM lessons
WHERE title ILIKE '%test%'
   OR "order" = 0;

-- Verify it's gone
SELECT
  id,
  title,
  grade,
  "order",
  description
FROM lessons
ORDER BY "order";

-- Should only show Lessons 1-5 now
