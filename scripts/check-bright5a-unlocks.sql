-- Find the BRIGHT5A class
SELECT id, name, grade, created_at
FROM classes
WHERE name = 'BRIGHT5A';

-- Check all lesson unlocks for BRIGHT5A (replace class_id with actual ID from above)
SELECT
  lu.id,
  lu.class_id,
  lu.lesson_id,
  l.title as lesson_title,
  l.order as lesson_order,
  lu.unlocked_at
FROM lesson_unlocks lu
JOIN lessons l ON l.id = lu.lesson_id
JOIN classes c ON c.id = lu.class_id
WHERE c.name = 'BRIGHT5A'
ORDER BY l.order;

-- Check total count of unlocks for BRIGHT5A
SELECT COUNT(*) as total_unlocks
FROM lesson_unlocks lu
JOIN classes c ON c.id = lu.class_id
WHERE c.name = 'BRIGHT5A';

-- Check all grade 4 lessons to see what should be available
SELECT id, title, "order", grade
FROM lessons
WHERE grade = 4
ORDER BY "order";
