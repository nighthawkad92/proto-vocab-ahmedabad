-- Test if anon role can actually read lesson_unlocks
-- Run this as the anon user to simulate what the API sees

SET ROLE anon;

-- Try to select from lesson_unlocks
SELECT
  id,
  class_id,
  lesson_id
FROM lesson_unlocks
WHERE class_id = 'a62c3e94-87e2-4f09-86d8-bfbaa6f43ea3';

-- Reset role
RESET ROLE;
