-- Fix foreign key constraints to use ON DELETE CASCADE
-- This allows deletion of students to automatically cascade to related tables

-- 1. Drop existing constraint on student_stats
ALTER TABLE student_stats
DROP CONSTRAINT IF EXISTS student_stats_student_id_fkey;

-- 2. Add new constraint with CASCADE
ALTER TABLE student_stats
ADD CONSTRAINT student_stats_student_id_fkey
FOREIGN KEY (student_id)
REFERENCES students(id)
ON DELETE CASCADE;

-- 3. Drop existing constraint on student_badges
ALTER TABLE student_badges
DROP CONSTRAINT IF EXISTS student_badges_student_id_fkey;

-- 4. Add new constraint with CASCADE
ALTER TABLE student_badges
ADD CONSTRAINT student_badges_student_id_fkey
FOREIGN KEY (student_id)
REFERENCES students(id)
ON DELETE CASCADE;

-- Verify the changes
SELECT
  tc.table_name,
  kcu.column_name,
  ccu.table_name AS foreign_table_name,
  ccu.column_name AS foreign_column_name,
  rc.delete_rule,
  rc.update_rule
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
JOIN information_schema.referential_constraints AS rc
  ON rc.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY'
  AND tc.table_name IN ('student_stats', 'student_badges')
  AND kcu.column_name = 'student_id';
