# Gamification & Scoring Rules - PAL Vocabulary Support Tool

**Last Updated**: 2026-01-10
**System Version**: Grade 4 ESL v1.0
**Target Audience**: Ages 8-10, Ahmedabad, India

---

## Table of Contents

1. [Current State](#current-state)
2. [Design Philosophy](#design-philosophy)
3. [Feedback System](#feedback-system)
4. [Progress Tracking](#progress-tracking)
5. [Future Gamification Plans](#future-gamification-plans)
6. [Question Type Difficulty Rules](#question-type-difficulty-rules)
7. [Pedagogical Governance](#pedagogical-governance)

---

## Current State

### ✅ What Exists Today

The current system is **deliberately minimal** and focuses on **intrinsic motivation** rather than extrinsic rewards.

#### 1. **Simple Feedback Modal**
Location: [components/game/FeedbackModal.tsx](components/game/FeedbackModal.tsx)

**Correct Answer:**
- Visual: Gray checkmark icon (no bright colors)
- Audio: Correct sound effect
- Text: "You answered correctly." (spoken via TTS)
- Duration: 1.5 seconds, then auto-close

**Incorrect Answer:**
- Visual: Gray retry/refresh icon (no bright colors)
- Audio: Incorrect sound effect (neutral, not punitive)
- Text: "Keep practicing." (spoken via TTS)
- Duration: 1.5 seconds, then auto-close
- **Behavior**: Student can retry immediately, unlimited attempts

**Key Design Decisions:**
- ❌ No bright celebratory colors
- ❌ No stars, trophies, or medals
- ❌ No "Great job!" or "Excellent!" messages
- ✅ Simple, matter-of-fact feedback
- ✅ Neutral gray icons to avoid emotional overstimulation
- ✅ Consistent duration regardless of correctness

#### 2. **Progress Tracking (Data Only)**
Location: [app/student/lesson/[lessonId]/page.tsx](app/student/lesson/[lessonId]/page.tsx)

The system tracks:
```typescript
{
  currentLevel: number          // Which level (1-3) the student is on
  totalLevels: number           // Total levels in lesson (always 3)
  questionsInCurrentLevel: number // Total questions in current level
  currentQuestionInLevel: number  // Current question number in level
  accuracy: number              // Overall accuracy percentage
}
```

**Stored in Database** (attempts table):
```sql
- questions_attempted: INTEGER   // Total questions answered
- questions_correct: INTEGER     // Total correct answers
- levels_completed: INTEGER      // Number of levels finished (0-3)
- levels_stopped_at: INTEGER     // If abandoned, which level
- started_at: TIMESTAMPTZ
- completed_at: TIMESTAMPTZ      // NULL if not completed
- is_abandoned: BOOLEAN          // TRUE if student left mid-lesson
```

**Not Displayed to Students:**
- The system tracks accuracy and progress for teacher reporting
- Students see progress bar (visual only, no percentages)
- No score displayed during or after lesson

#### 3. **Level Completion Modal**
Location: [components/game/LevelCompleteModal.tsx](components/game/LevelCompleteModal.tsx)

**What it shows:**
- Level number completed (e.g., "Level 1 Complete")
- Next level name (if applicable)
- Simple checkmark icon
- "Continue" button

**What it does NOT show:**
- Score or percentage
- Stars earned
- Comparison to previous attempts
- Time taken

---

## Design Philosophy

### Core Principles

#### 1. **Emotional Safety First**
From [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md):

> "No fear of failure, unlimited retries"

**Implementation:**
- Unlimited attempts on every question
- No time limits
- No score displayed
- No penalties for wrong answers
- Neutral feedback tone ("Keep practicing" not "Wrong!")

#### 2. **Low Cognitive Load**
From [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md):

> "One concept, one decision at a time"

**Implementation:**
- Feedback appears instantly
- Feedback disappears automatically (no extra click needed)
- No complex score calculations shown
- No visual clutter (stars, badges, animations)

#### 3. **Intrinsic Motivation**
**Philosophy**: Learning should be motivated by:
- Curiosity and mastery
- Progress through content
- Understanding new words

**NOT by:**
- Points, scores, or leaderboards
- External rewards
- Comparison to others
- Fear of low scores

#### 4. **Cultural Context**
From [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md):

> "Culturally relevant for Ahmedabad context"

**Implementation:**
- No competitive elements (not culturally appropriate for all students)
- No public display of progress
- Privacy-first approach
- Focus on individual learning journey

---

## Feedback System

### Feedback Rules & Laws

#### Law 1: Consistency Rule
**All feedback must be:**
- Same duration (1.5 seconds)
- Same visual style (neutral gray icons)
- Same tone (factual, not emotional)
- Same interaction pattern (auto-dismiss)

**Rationale**: Predictability reduces anxiety and cognitive load.

#### Law 2: Non-Punitive Feedback
**Incorrect answers receive:**
- ❌ NOT: "Wrong", "Incorrect", "Try again", "Oops!"
- ✅ YES: "Keep practicing." (growth-oriented)

**Sound effects:**
- Correct: Pleasant chime (not loud or jarring)
- Incorrect: Neutral tone (not harsh or sad)

**Rationale**: Avoid negative emotional associations with learning.

#### Law 3: Immediate Feedback
**Timing:**
- Feedback appears within 100ms of answer submission
- Audio plays immediately (TTS + sound effect)
- Modal auto-closes after 1.5 seconds

**Rationale**: Immediate reinforcement is most effective for learning.

#### Law 4: No Comparative Feedback
**Forbidden:**
- "Better than last time!"
- "Your best score yet!"
- "Top 10% of students!"

**Rationale**: Comparison creates anxiety and shifts focus from learning to performance.

---

## Progress Tracking

### What Gets Tracked (Backend Only)

#### Attempt-Level Tracking
**Table**: `attempts`

Captures per-lesson attempt:
```sql
{
  attempt_id: UUID
  student_id: UUID
  lesson_id: UUID
  started_at: TIMESTAMPTZ
  completed_at: TIMESTAMPTZ
  questions_attempted: INTEGER
  questions_correct: INTEGER
  levels_completed: INTEGER (0-3)
  levels_stopped_at: INTEGER
  is_abandoned: BOOLEAN
}
```

**Use Cases:**
- Teacher dashboard (see student progress)
- Curriculum analysis (identify difficult lessons)
- System optimization (improve question difficulty)

#### Response-Level Tracking
**Table**: `responses`

Captures each question answer:
```sql
{
  response_id: UUID
  attempt_id: UUID
  question_id: STRING
  question_type: STRING
  level_number: INTEGER
  student_answer: TEXT
  is_correct: BOOLEAN
  answered_at: TIMESTAMPTZ
}
```

**Use Cases:**
- Detailed analytics per question type
- Identify which questions need revision
- Track student learning patterns over time

### What Students See

#### During Lesson:
- **Progress bar**: Visual indicator of position in level
  - Shows "Question X of Y" implicitly through bar fill
  - No percentage displayed
  - No time indicator

#### After Lesson:
- **Level Complete Modal**:
  - "Level [X] Complete"
  - Next level name
  - Continue button
- **Lesson Complete Modal**:
  - "Lesson Complete"
  - Return to dashboard button
- **No score summary**
- **No time taken**
- **No accuracy percentage**

### Progress Display Rules

#### Rule 1: Show Position, Not Performance
**Example:**
- ✅ "Question 3 of 4" (position)
- ❌ "75% complete" (performance metric)

#### Rule 2: Discrete Steps, Not Continuous Metrics
**Example:**
- ✅ Progress bar fills per question
- ❌ Animated score counter

#### Rule 3: Forward Focus
**Example:**
- ✅ "Next: Level 2 - Vocabulary in Context"
- ❌ "You scored 80% on Level 1"

---

## Future Gamification Plans

### Planned for Future Implementation

**Schema exists** but **not yet implemented**:
Location: [schemas/future/rewards-schema.sql](schemas/future/rewards-schema.sql)

#### 1. **Student Statistics Table**
```sql
student_stats {
  total_questions_answered: INTEGER
  total_questions_correct: INTEGER
  total_lessons_completed: INTEGER
  total_blocks_completed: INTEGER
  current_streak_days: INTEGER
  longest_streak_days: INTEGER
  total_stars_earned: INTEGER
  last_practice_date: DATE
}
```

**Potential Use:**
- Streak tracking (practice X days in a row)
- Completion milestones
- Personal bests (not comparative)

#### 2. **Badge System**
```sql
badges {
  name: TEXT
  description: TEXT
  icon: TEXT (emoji)
  criteria: JSONB
}
```

**Planned Badges:**
- 🌟 "First Steps" - Complete your first lesson
- 🔥 "Week Warrior" - Practice 7 days in a row
- 🎯 "Perfect Practice" - Get 100% accuracy on any lesson
- 📚 "Bookworm" - Complete 5 lessons
- 💯 "Century" - Answer 100 questions correctly
- ⭐ "Dedicated Learner" - Practice 30 days in a row
- 👑 "Master Student" - Complete all lessons
- ⚡ "Quick Learner" - Complete a lesson in under 10 minutes

#### 3. **Student Badges Table**
```sql
student_badges {
  student_id: UUID
  badge_id: UUID
  earned_at: TIMESTAMPTZ
}
```

**Tracks which badges each student has earned.**

### Design Constraints for Future Gamification

Even when implemented, badges/stats MUST follow:

#### Constraint 1: Private Only
- Badges visible only to the student
- No leaderboards
- No class comparisons
- No public profiles

#### Constraint 2: Achievement-Based, Not Competitive
- Celebrate effort and consistency
- Milestone-based (complete 5 lessons, not "top 5 students")
- Time-based (7-day streak, not "fastest time")

#### Constraint 3: Opt-Out Available
- Students (or teachers) can hide badges
- Statistics viewable only if student chooses
- No pressure to earn all badges

#### Constraint 4: Neutral Visual Design
- Badge icons: Simple emojis (no flashy graphics)
- Badge notifications: Same style as level complete modal
- No animated rewards or confetti
- Consistent with existing design system

---

## Question Type Difficulty Rules

### Governance Document
**Full Rules**: [docs/QUESTION-TYPE-PROGRESSION-RULES.md](docs/QUESTION-TYPE-PROGRESSION-RULES.md)

### Summary of Difficulty Tiers

#### EASY (Level 1)
- **Vocabulary**: 2 syllables, everyday words
- **Sentence Structure**: 3-4 words, SVO pattern
- **Comprehension**: Literal recall (who, what)
- **Context**: Familiar, concrete concepts

**Examples:**
- Words: hungry, tired, clean, dirty
- Sentence: "The dog runs"
- Story: "Ravi went to the park."

#### MEDIUM (Level 2)
- **Vocabulary**: 2-3 syllables, academic words
- **Sentence Structure**: 4-6 words, adjectives/adverbs
- **Comprehension**: Logical inference (where, when)
- **Context**: School and life concepts

**Examples:**
- Words: careful, worried, excited
- Sentence: "The big dog runs fast"
- Story: "The farmer watered the plants. The vegetables grew."

#### HARD (Level 3)
- **Vocabulary**: 3-4 syllables, formal language
- **Sentence Structure**: 6-8 words, complex phrases
- **Comprehension**: Deep inference (why, how)
- **Context**: Abstract thinking (emotions, consequences)

**Examples:**
- Words: confused, patient, confident
- Sentence: "The boy ran quickly to the school"
- Story: "Meena was worried about her lost bag. She looked everywhere. Finally, they found it. Meena felt very happy."

### Progression Laws

#### Law 1: Fixed Difficulty Mapping
- Level 1 = EASY questions only
- Level 2 = MEDIUM questions only
- Level 3 = HARD questions only

**No mixing** of difficulty within a level.

#### Law 2: 4 Questions Per Level
- Every level has exactly 4 questions
- Questions rotate from pool of rotation sets
- Same difficulty, different content

#### Law 3: Question Type Rotation
**Within same level:**
- Default Set: Questions A, B, C, D
- Rotation Set 1: Questions E, F, G, H (same difficulty)
- Rotation Set 2: Questions I, J, K, L (same difficulty)

**Purpose**: Prevent memorization, ensure comprehension.

#### Law 4: Vocabulary Non-Overlap
- No word appears in multiple rotation sets within same level
- Ensures variety across student attempts

---

## Pedagogical Governance

### Content Creation Rules

#### Rule 1: PAL Curriculum Alignment
**All vocabulary MUST come from:**
- PAL Grade 4 English Curriculum word lists
- Age-appropriate (8-10 years old)
- Culturally relevant to Gujarat/India

**Forbidden:**
- Made-up words
- Non-curriculum vocabulary
- Culturally irrelevant contexts (e.g., "snow" in Gujarat)

#### Rule 2: Difficulty Consistency
**Before adding new content, verify:**
- [ ] Word length matches difficulty tier
- [ ] Sentence complexity matches tier
- [ ] Cognitive load equivalent to default set
- [ ] Distractor difficulty consistent

**See full checklist**: [docs/QUESTION-TYPE-PROGRESSION-RULES.md](docs/QUESTION-TYPE-PROGRESSION-RULES.md#quality-assurance-checklist)

#### Rule 3: Grammatical Correctness
- All sentences must be grammatically correct
- Use standard Indian English conventions
- Avoid idioms or colloquialisms

#### Rule 4: Clear Correct Answers
- Exactly one correct answer per question
- Distractors must be plausible but clearly wrong
- Explanation must clarify why answer is correct

### Question Type Constraints

#### Constraint 1: Format Preservation
**When creating rotation sets:**
- Same number of options as default
- Same interaction type (tap, drag, type)
- Same visual layout

**Example:**
- Default: 3 options for multiple choice
- Rotation: Must also have 3 options (not 4)

#### Constraint 2: Structural Consistency
**Sentence Rearrange Example:**
- Default: 3-word SVO sentence
- Rotation: Must also be 3-word SVO sentence
- ❌ Cannot change to 5-word SVOA sentence

#### Constraint 3: Contextual Variety
**Across rotation sets, vary:**
- Subjects (dog → cat → bird)
- Settings (home → school → park)
- Semantic fields (animals → people → objects)

**But maintain:**
- Difficulty tier
- Sentence structure
- Cognitive complexity

---

## Teacher Visibility Rules

### What Teachers Can See

#### Class Dashboard:
- List of students in class
- Which lessons are unlocked
- Which lessons each student has started/completed

#### Student Detail View:
- Student name
- Lessons attempted
- Lessons completed
- Attempt history (timestamps)

#### Per-Attempt Data:
- Lesson name
- Date/time started
- Date/time completed (or NULL if abandoned)
- Questions attempted
- Questions correct
- Levels completed (0-3)
- Whether abandoned mid-lesson

### What Teachers CANNOT See

#### Forbidden for Privacy:
- Real-time tracking (can't watch student during lesson)
- Individual question responses (which specific questions were wrong)
- Comparison to other students
- Time spent per question
- Number of retries per question

**Rationale**: Preserve student privacy and reduce test anxiety.

---

## Scoring Calculation (Backend Only)

### Accuracy Calculation

**Formula:**
```
accuracy = (questions_correct / questions_attempted) * 100
```

**Stored in**: `attempts` table
**Displayed to**: Teachers only (never students)

**Edge Cases:**
- If `questions_attempted = 0`: accuracy = NULL
- If lesson abandoned: Store accuracy at time of abandonment

### Completion Status

**Rules:**
1. **Complete**: `levels_completed = 3` AND `completed_at IS NOT NULL`
2. **In Progress**: `levels_completed < 3` AND `is_abandoned = FALSE`
3. **Abandoned**: `is_abandoned = TRUE` AND `levels_stopped_at` indicates last level

**Logic:**
- Student must complete all 3 levels to mark lesson complete
- If student closes browser mid-lesson: Mark as abandoned
- Abandoned lessons don't count toward completion metrics

---

## Implementation Notes

### Current System

#### ✅ Fully Implemented:
- Minimal feedback modal (correct/incorrect)
- Progress tracking (backend)
- Attempt/response logging
- Teacher dashboard (basic)
- Unlimited retries
- No score display to students

#### ⚠️ Schema Exists, Not Implemented:
- Student statistics table
- Badge system
- Streak tracking

#### 📋 Not Yet Planned:
- Leaderboards (deliberately omitted)
- Public profiles
- Competitive features
- Time-based scoring
- Bonus points
- Lives/hearts system

### Future Considerations

If gamification is implemented:
1. Conduct user research with teachers and students
2. A/B test impact on learning outcomes
3. Monitor for unintended consequences (test anxiety, focus shift)
4. Ensure opt-out is available
5. Maintain design system consistency (neutral colors, simple icons)

---

## Related Documentation

- **Question Types & Difficulty**: [docs/QUESTION-TYPE-PROGRESSION-RULES.md](docs/QUESTION-TYPE-PROGRESSION-RULES.md)
- **Design System**: [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md)
- **Database Schema**: [supabase-schema.sql](supabase-schema.sql)
- **Future Rewards Schema**: [schemas/future/rewards-schema.sql](schemas/future/rewards-schema.sql)
- **Teacher Delete Endpoints**: [TEACHER_DELETE_ENDPOINTS.md](TEACHER_DELETE_ENDPOINTS.md)

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-10 | Initial documentation of gamification rules and scoring governance |

---

**Document Owner**: Development Team
**Reviewed By**: Curriculum Team & UX Team
**Next Review**: After first 3 months of production use
