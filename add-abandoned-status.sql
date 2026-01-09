-- Add abandoned status columns to attempts table
ALTER TABLE attempts
ADD COLUMN IF NOT EXISTS is_abandoned BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS abandoned_at TIMESTAMPTZ;

-- Add index for abandoned attempts queries
CREATE INDEX IF NOT EXISTS idx_attempts_abandoned ON attempts(is_abandoned) WHERE is_abandoned = TRUE;

-- Add comment for documentation
COMMENT ON COLUMN attempts.is_abandoned IS 'TRUE if the student exited the lesson without completing it';
COMMENT ON COLUMN attempts.abandoned_at IS 'Timestamp when the lesson was abandoned';
