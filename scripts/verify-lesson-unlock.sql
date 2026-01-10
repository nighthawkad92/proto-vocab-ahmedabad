-- Verify the lesson unlock exists in the database
SELECT
  id,
  class_id,
  lesson_id,
  unlocked_by,
  unlocked_at
FROM lesson_unlocks
WHERE class_id = 'a62c3e94-87e2-4f09-86d8-bfbaa6f43ea3';

-- Also check total count
SELECT COUNT(*) as total_unlocks
FROM lesson_unlocks;
