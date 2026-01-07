-- Quick Test Setup
-- Run this in Supabase SQL Editor to create a test teacher and class

-- Step 1: Create a test teacher (if you haven't signed up yet)
-- Note: Replace with your actual teacher ID if you've already signed up via the UI
INSERT INTO teachers (id, email, name, school) VALUES (
  '00000000-0000-0000-0000-000000000001',
  'test.teacher@school.com',
  'Test Teacher',
  'Test School Ahmedabad'
) ON CONFLICT (email) DO NOTHING;

-- Step 2: Create a test class with an easy-to-remember code
INSERT INTO classes (teacher_id, name, class_code, grade) VALUES (
  '00000000-0000-0000-0000-000000000001',
  'Class 3-A Test',
  'TEST01',
  3
) ON CONFLICT (class_code) DO NOTHING
RETURNING id, name, class_code;

-- Step 3: Get the class ID (you'll need this for unlocking lessons)
-- The query above will show you the class_id after running

-- Step 4: Unlock all 3 sample lessons for this test class
-- First, let's get the lesson IDs
DO $$
DECLARE
  class_uuid UUID;
  lesson_record RECORD;
BEGIN
  -- Get the class ID we just created
  SELECT id INTO class_uuid FROM classes WHERE class_code = 'TEST01';

  -- Unlock all lessons for this class
  FOR lesson_record IN SELECT id FROM lessons ORDER BY "order"
  LOOP
    INSERT INTO lesson_unlocks (class_id, lesson_id, unlocked_by)
    VALUES (
      class_uuid,
      lesson_record.id,
      '00000000-0000-0000-0000-000000000001'
    )
    ON CONFLICT (class_id, lesson_id) DO NOTHING;
  END LOOP;
END $$;

-- Verify the setup
SELECT
  c.class_code,
  c.name as class_name,
  COUNT(lu.id) as unlocked_lessons
FROM classes c
LEFT JOIN lesson_unlocks lu ON c.id = lu.class_id
WHERE c.class_code = 'TEST01'
GROUP BY c.id, c.class_code, c.name;

-- This should show: TEST01, Class 3-A Test, 3 unlocked lessons
