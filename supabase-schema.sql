-- PAL Vocabulary Tool Database Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Teachers table
CREATE TABLE teachers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  school TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Classes table
CREATE TABLE classes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  teacher_id UUID NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  class_code TEXT UNIQUE NOT NULL,
  grade INTEGER NOT NULL DEFAULT 3,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Students table (no auth, just names)
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_active TIMESTAMPTZ
);

-- Lessons table
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  grade INTEGER NOT NULL DEFAULT 3,
  "order" INTEGER NOT NULL,
  content JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lesson unlocks (per class)
CREATE TABLE lesson_unlocks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  unlocked_by UUID NOT NULL REFERENCES teachers(id),
  UNIQUE(class_id, lesson_id)
);

-- Attempts table
CREATE TABLE attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  questions_attempted INTEGER DEFAULT 0,
  questions_correct INTEGER DEFAULT 0,
  levels_completed INTEGER DEFAULT 0,
  levels_stopped_at INTEGER
);

-- Responses table
CREATE TABLE responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  attempt_id UUID NOT NULL REFERENCES attempts(id) ON DELETE CASCADE,
  question_id TEXT NOT NULL,
  question_type TEXT NOT NULL,
  level_number INTEGER NOT NULL,
  student_answer TEXT,
  is_correct BOOLEAN NOT NULL,
  answered_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_classes_teacher ON classes(teacher_id);
CREATE INDEX idx_students_class ON students(class_id);
CREATE INDEX idx_lesson_unlocks_class ON lesson_unlocks(class_id);
CREATE INDEX idx_attempts_student ON attempts(student_id);
CREATE INDEX idx_attempts_lesson ON attempts(lesson_id);
CREATE INDEX idx_responses_attempt ON responses(attempt_id);

-- Row Level Security (RLS) Policies
-- Enable RLS on all tables
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_unlocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE responses ENABLE ROW LEVEL SECURITY;

-- Teachers policies
CREATE POLICY "Teachers can view their own data"
  ON teachers FOR SELECT
  USING (auth.uid()::text = id::text);

CREATE POLICY "Teachers can update their own data"
  ON teachers FOR UPDATE
  USING (auth.uid()::text = id::text);

-- Classes policies
CREATE POLICY "Teachers can view their own classes"
  ON classes FOR SELECT
  USING (auth.uid()::text = teacher_id::text);

CREATE POLICY "Teachers can insert their own classes"
  ON classes FOR INSERT
  WITH CHECK (auth.uid()::text = teacher_id::text);

CREATE POLICY "Teachers can update their own classes"
  ON classes FOR UPDATE
  USING (auth.uid()::text = teacher_id::text);

CREATE POLICY "Teachers can delete their own classes"
  ON classes FOR DELETE
  USING (auth.uid()::text = teacher_id::text);

-- Students policies (accessible by class code, no auth required)
CREATE POLICY "Students in class can be viewed"
  ON students FOR SELECT
  USING (true);

CREATE POLICY "Students can be created"
  ON students FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Students can update their last_active"
  ON students FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Lessons policies (public read)
CREATE POLICY "Lessons are publicly readable"
  ON lessons FOR SELECT
  USING (true);

CREATE POLICY "Only service role can modify lessons"
  ON lessons FOR ALL
  USING (false);

-- Lesson unlocks policies
CREATE POLICY "Teachers can view unlocks for their classes"
  ON lesson_unlocks FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM classes
      WHERE classes.id = lesson_unlocks.class_id
      AND classes.teacher_id::text = auth.uid()::text
    )
  );

CREATE POLICY "Teachers can unlock lessons for their classes"
  ON lesson_unlocks FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM classes
      WHERE classes.id = lesson_unlocks.class_id
      AND classes.teacher_id::text = auth.uid()::text
    )
  );

CREATE POLICY "Teachers can remove unlocks from their classes"
  ON lesson_unlocks FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM classes
      WHERE classes.id = lesson_unlocks.class_id
      AND classes.teacher_id::text = auth.uid()::text
    )
  );

CREATE POLICY "Students can view unlocks for their class"
  ON lesson_unlocks FOR SELECT
  USING (true);

-- Attempts policies
CREATE POLICY "Attempts are publicly readable"
  ON attempts FOR SELECT
  USING (true);

CREATE POLICY "Attempts can be created"
  ON attempts FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Attempts can be updated"
  ON attempts FOR UPDATE
  USING (true);

-- Responses policies
CREATE POLICY "Responses are publicly readable"
  ON responses FOR SELECT
  USING (true);

CREATE POLICY "Responses can be created"
  ON responses FOR INSERT
  WITH CHECK (true);

-- Helper function to generate unique class codes
CREATE OR REPLACE FUNCTION generate_class_code()
RETURNS TEXT AS $$
DECLARE
  code TEXT;
  exists BOOLEAN;
BEGIN
  LOOP
    -- Generate 6-character code (e.g., ABC123)
    code := UPPER(
      CHR(65 + FLOOR(RANDOM() * 26)::INT) ||
      CHR(65 + FLOOR(RANDOM() * 26)::INT) ||
      CHR(65 + FLOOR(RANDOM() * 26)::INT) ||
      FLOOR(RANDOM() * 10)::TEXT ||
      FLOOR(RANDOM() * 10)::TEXT ||
      FLOOR(RANDOM() * 10)::TEXT
    );

    -- Check if code already exists
    SELECT EXISTS(SELECT 1 FROM classes WHERE class_code = code) INTO exists;

    IF NOT exists THEN
      RETURN code;
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql;
