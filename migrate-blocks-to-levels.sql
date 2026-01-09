-- Migration: Rename 'blocks' to 'levels' in lesson content JSONB
-- This updates all lessons to use the new 'levels' structure instead of 'blocks'

-- Update lessons table: rename 'blocks' key to 'levels' in content JSONB
UPDATE lessons
SET content = content - 'blocks' || jsonb_build_object('levels', content->'blocks')
WHERE content ? 'blocks' AND NOT content ? 'levels';

-- Verify the migration
SELECT
  id,
  title,
  CASE
    WHEN content ? 'levels' THEN '✓ Has levels'
    WHEN content ? 'blocks' THEN '✗ Still has blocks'
    ELSE '✗ No levels or blocks'
  END as status
FROM lessons
ORDER BY "order";
