-- Verify Grade 4 Lessons were created successfully

-- Check all lessons
SELECT
  id,
  title,
  description,
  grade,
  "order",
  created_at
FROM lessons
ORDER BY "order";

-- Count questions in each lesson
SELECT
  title,
  jsonb_array_length(content->'blocks') as total_blocks,
  (
    SELECT SUM(jsonb_array_length(block->'questions'))
    FROM jsonb_array_elements(content->'blocks') as block
  ) as total_questions
FROM lessons
ORDER BY "order";

-- Check if introductions exist
SELECT
  title,
  "order",
  (content->'blocks'->0->'introduction'->>'concept') as block0_intro_concept,
  (content->'blocks'->1->'introduction'->>'concept') as block1_intro_concept
FROM lessons
ORDER BY "order";
