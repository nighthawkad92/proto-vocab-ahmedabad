# Database Re-seeding Instructions

## Problem
The production database has old Lesson 2 data with only 2 questions per level instead of 4.

## Solution
Re-seed the database with the updated `seed-lessons-grade4.sql` file.

## Steps

### Option 1: Via Supabase Dashboard (Recommended)

1. **Backup current data** (if you have student progress you want to keep):
   ```sql
   -- Run this first to backup
   CREATE TABLE attempts_backup AS SELECT * FROM attempts;
   CREATE TABLE responses_backup AS SELECT * FROM responses;
   ```

2. **Delete existing lessons**:
   ```sql
   DELETE FROM lesson_unlocks;
   DELETE FROM responses;
   DELETE FROM attempts;
   DELETE FROM lessons;
   ```

3. **Re-seed with correct data**:
   - Open `seed-lessons-grade4.sql`
   - Copy the entire content starting from line 13 (the first INSERT statement)
   - Paste and execute in Supabase SQL Editor

### Option 2: Using Local Supabase (Requires Docker)

1. Start Docker Desktop
2. Run:
   ```bash
   npx supabase db reset --local
   ```

### Option 3: Quick Fix for Lesson 2 Only

If you don't want to delete all data, you can update just Lesson 2:

```sql
-- Update Lesson 2 Level 0 (add 2 more questions)
UPDATE lessons
SET content = jsonb_set(
  content,
  '{levels,0,questions}',
  '[
    {
      "id": "l2l0q1",
      "type": "sentence-completion",
      "prompt": "I am ___ after playing outside",
      "options": ["hungry", "tall", "blue", "yesterday"],
      "correctAnswer": "hungry"
    },
    {
      "id": "l2l0q2",
      "type": "sentence-completion",
      "prompt": "The boy feels ___ after school",
      "options": ["tired", "fast", "big", "round"],
      "correctAnswer": "tired"
    },
    {
      "id": "l2l0q3",
      "type": "sentence-completion",
      "prompt": "The glass is ___ of water",
      "options": ["full", "quick", "loud", "yesterday"],
      "correctAnswer": "full"
    },
    {
      "id": "l2l0q4",
      "type": "sentence-completion",
      "prompt": "The shop is ___ my house",
      "options": ["near", "happy", "green", "slowly"],
      "correctAnswer": "near"
    }
  ]'::jsonb
)
WHERE title = 'Understanding New Words';
```

Repeat similar updates for Level 1 and Level 2 (full SQL in separate file if needed).

## Verification

After re-seeding, verify with:

```sql
SELECT
  title,
  jsonb_array_length(content->'levels'->0->'questions') as level0_questions,
  jsonb_array_length(content->'levels'->1->'questions') as level1_questions,
  jsonb_array_length(content->'levels'->2->'questions') as level2_questions
FROM lessons
WHERE title = 'Understanding New Words';
```

Expected result: Each level should show 4 questions.

## Important Notes

- Option 1 (full re-seed) is cleanest but deletes all student progress
- Option 3 (patch) preserves student data but only fixes Lesson 2
- After any database update, you may need to restart your Next.js dev server
- Changes take effect immediately, no code deployment needed
