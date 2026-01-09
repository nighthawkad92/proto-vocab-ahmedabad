-- Update Lesson 2 (Understanding New Words) to add missing introductions
-- This fixes the issue where Level 1 and Level 2 were missing introduction screens

UPDATE lessons
SET content = jsonb_set(
  content,
  '{levels,1,introduction}',
  '{
    "concept": "Feelings and Behavior",
    "explanation": "Now we learn words that describe how people feel and behave. These words help us talk about emotions and actions!",
    "example": "careful = being safe, afraid = feeling scared, excited = feeling happy about something",
    "activity": "Act out these feelings: Show me careful walking! Show me excited jumping!"
  }'::jsonb
)
WHERE title = 'Understanding New Words';

UPDATE lessons
SET content = jsonb_set(
  content,
  '{levels,2,introduction}',
  '{
    "concept": "Emotions and Thinking",
    "explanation": "These are harder words that describe how we think and feel. They help us express complex emotions!",
    "example": "confused = not understanding, patient = waiting calmly, confident = believing in yourself",
    "activity": "Think about a time you felt confused. How did you solve it?"
  }'::jsonb
)
WHERE title = 'Understanding New Words';
