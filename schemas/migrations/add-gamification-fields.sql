-- Migration: Add Gamification Fields to Attempts Table
-- Purpose: Add duration_seconds and score fields for Phase 1 gamification
-- Run this in Supabase SQL Editor BEFORE implementing Phase 2

-- Add duration tracking (in seconds)
ALTER TABLE attempts ADD COLUMN IF NOT EXISTS duration_seconds INTEGER;

-- Add score tracking (0-12 for lessons with 3 levels × 4 questions)
ALTER TABLE attempts ADD COLUMN IF NOT EXISTS score INTEGER;

-- Add abandonment tracking
ALTER TABLE attempts ADD COLUMN IF NOT EXISTS is_abandoned BOOLEAN DEFAULT FALSE;
ALTER TABLE attempts ADD COLUMN IF NOT EXISTS abandoned_at TIMESTAMPTZ;

-- Add comment for documentation
COMMENT ON COLUMN attempts.duration_seconds IS 'Time taken to complete lesson in seconds';
COMMENT ON COLUMN attempts.score IS 'Total points earned (1 per correct answer)';
COMMENT ON COLUMN attempts.is_abandoned IS 'Whether the lesson was abandoned mid-way';
COMMENT ON COLUMN attempts.abandoned_at IS 'Timestamp when lesson was abandoned';

-- Verify the migration
SELECT
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'attempts'
  AND column_name IN ('duration_seconds', 'score', 'is_abandoned', 'abandoned_at')
ORDER BY column_name;
