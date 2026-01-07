-- Student Statistics Table
CREATE TABLE IF NOT EXISTS student_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(id) UNIQUE NOT NULL,
  total_questions_answered INTEGER DEFAULT 0,
  total_questions_correct INTEGER DEFAULT 0,
  total_lessons_completed INTEGER DEFAULT 0,
  total_blocks_completed INTEGER DEFAULT 0,
  current_streak_days INTEGER DEFAULT 0,
  longest_streak_days INTEGER DEFAULT 0,
  total_stars_earned INTEGER DEFAULT 0,
  last_practice_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Badge Definitions Table
CREATE TABLE IF NOT EXISTS badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT NOT NULL,  -- Emoji or icon code
  criteria JSONB NOT NULL,  -- {type: "streak", value: 7} or {type: "accuracy", value: 90}
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Student Badges Earned Table
CREATE TABLE IF NOT EXISTS student_badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(id) NOT NULL,
  badge_id UUID REFERENCES badges(id) NOT NULL,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, badge_id)
);

-- RLS Policies for student_stats
ALTER TABLE student_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Student stats: Anyone can read"
ON student_stats FOR SELECT USING (true);

CREATE POLICY "Student stats: Anyone can create"
ON student_stats FOR INSERT WITH CHECK (true);

CREATE POLICY "Student stats: Anyone can update"
ON student_stats FOR UPDATE USING (true);

-- RLS Policies for badges
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Badges: Anyone can read"
ON badges FOR SELECT USING (true);

-- RLS Policies for student_badges
ALTER TABLE student_badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Student badges: Anyone can read"
ON student_badges FOR SELECT USING (true);

CREATE POLICY "Student badges: Anyone can create"
ON student_badges FOR INSERT WITH CHECK (true);

-- Insert default badges
INSERT INTO badges (name, description, icon, criteria) VALUES
  ('First Steps', 'Complete your first lesson', '🌟', '{"type": "lessons_completed", "value": 1}'::jsonb),
  ('Week Warrior', 'Practice for 7 days in a row', '🔥', '{"type": "streak", "value": 7}'::jsonb),
  ('Perfect Practice', 'Get 100% accuracy on any lesson', '🎯', '{"type": "perfect_lesson", "value": 1}'::jsonb),
  ('Bookworm', 'Complete 5 lessons', '📚', '{"type": "lessons_completed", "value": 5}'::jsonb),
  ('Century', 'Answer 100 questions correctly', '💯', '{"type": "questions_correct", "value": 100}'::jsonb),
  ('Dedicated Learner', 'Practice for 30 days in a row', '⭐', '{"type": "streak", "value": 30}'::jsonb),
  ('Master Student', 'Complete all lessons', '👑', '{"type": "all_lessons", "value": 1}'::jsonb),
  ('Quick Learner', 'Complete a lesson in under 10 minutes', '⚡', '{"type": "fast_completion", "value": 1}'::jsonb)
ON CONFLICT DO NOTHING;
