# Grade 4 PAL-Integrated Lesson Plans

## Overview

These lessons are based on the official **Grade 4 English PAL-Integrated Lesson Plans** for below-grade-level learners in Ahmedabad, Gujarat. Each lesson includes:

1. **Interactive Introduction** - Explains the concept being taught before starting questions
2. **Multiple Blocks** - Lessons are divided into blocks with the 2-mistake stopping rule
3. **Difficulty Levels** - Questions progress from EASY → MEDIUM → HARD

## Lesson Structure

### Lesson 1: Breaking Big Words (Decoding Multi-Syllable Words)
**Objective:** I can break big words into small parts and read them

**Introduction Concept:** Syllable Breaking
- Explains how big words are made of small sound parts (syllables)
- Example: bas-ket (2 parts), win-dow (2 parts)
- Activity: Clap hands for each syllable

**Block 0 (EASY):**
- 2-syllable familiar words
- Questions focus on counting syllables and breaking words
- Words: basket, window, paper, teacher

**Block 1 (MEDIUM/HARD):**
- 2-3 syllable school & life words
- Includes harder words: garden, holiday, remember, important

---

### Lesson 2: Understanding New Words (Vocabulary in Context)
**Objective:** I can understand and use new words

**Introduction Concept:** Word Meanings
- Explains how words describe feelings and things we see
- Example: tired = feeling sleepy, happy = feeling joyful
- Activity: Act out feelings (show a tired face, happy face)

**Block 0 (EASY - Concrete & Observable):**
- Daily life situations
- Words: hungry, tired, full, near
- Sentences use simple, observable contexts

**Block 1 (MEDIUM - Feelings & Behaviour):**
- Social and emotional words
- Words: careful, afraid, excited, brave
- Context includes school and social situations

---

### Lesson 3: Reading Stories (Reading Short Paragraphs)
**Objective:** I can read a short paragraph and tell what it is about

**Introduction Concept:** Reading with Understanding
- Explains WHO and WHAT questions
- Example: "Ravi played with his ball" → WHO? Ravi. WHAT? He played.
- Activity: Listen carefully and think about who and what

**Block 0 (EASY - Story Basics):**
- Simple stories with clear characters and actions
- Focus on identifying who and what happened
- Stories about everyday activities

**Block 1 (MEDIUM - People, Places, Actions):**
- Slightly longer stories
- Include place (near the river) and time (morning, evening)
- Stories about farmers, families, school

---

### Lesson 4: Making Better Sentences (Sentence Expansion)
**Objective:** I can make my sentence better

**Introduction Concept:** Adding Details
- Shows how to add WHAT KIND and HOW to sentences
- Example: "The dog runs" → "The brown dog runs fast"
- Activity: Think about what kind and how

**Block 0 (EASY - Describing Words):**
- Simple adjectives: big, small, fast, happy
- Basic sentence expansion
- Single-word additions

**Block 1 (MEDIUM/HARD - How/When/Where):**
- Adverbs and prepositional phrases
- Examples: quickly, loudly, outside, at night
- Multi-word expansions: "in his notebook", "at night"

---

### Lesson 5: Understanding Stories (Reading → Writing Connection)
**Objective:** I can read and write about the same idea

**Introduction Concept:** Reading and Writing Together
- Explains how to answer WHO and WHAT from stories
- Example: Read → Think → Write in your own words
- Activity: Read carefully, think, then write

**Block 0 (EASY - Literal Recall):**
- Short stories with clear events
- Questions: Who is in the story? What happened?
- Expected: Short phrase answers

**Block 1 (MEDIUM - Connected Recall):**
- Slightly longer stories
- Questions require understanding sequence
- Expected: Complete sentence answers

---

## Implementation Features

### 1. Interactive Introductions
Each block 0 starts with an introduction card that:
- Shows a concept explanation
- Provides an example
- Includes an interactive activity instruction
- Requires student to click "I'm Ready!" before starting

### 2. Difficulty Progression
- **EASY**: Concrete, observable, daily-life (2-syllable words, simple feelings)
- **MEDIUM**: School context, social situations (2-3 syllables, emotional words)
- **HARD**: Abstract concepts, complex thinking (3-4 syllables, advanced emotions)

### 3. Question Types
- `multiple-choice`: Choose the correct answer from options
- `sentence-completion`: Fill in the blank in a sentence

### 4. 2-Mistake Rule
- Students can make 2 mistakes per block
- After 2 mistakes, block stops and shows completion screen
- Encourages accuracy over speed

---

## How to Load Lessons

### In Supabase SQL Editor:

```sql
-- Run the Grade 4 lesson seed file
\i seed-lessons-grade4.sql
```

This will:
1. Delete existing lessons
2. Insert all 5 new Grade 4 lessons
3. Each lesson includes introduction blocks and properly structured content

### Unlock Lessons for Testing:

After running the SQL, unlock lessons for your test class through the teacher dashboard, or run:

```sql
-- Get your class_id and teacher_id from the database
SELECT id FROM classes WHERE class_code = 'YOUR_CLASS_CODE';
SELECT id FROM teachers WHERE name = 'Varnika';

-- Unlock all 5 lessons
INSERT INTO lesson_unlocks (class_id, lesson_id, unlocked_by)
SELECT
  'YOUR_CLASS_ID'::uuid,
  id,
  'YOUR_TEACHER_ID'::uuid
FROM lessons
ORDER BY "order";
```

---

## Testing the Lessons

1. **Teacher Flow:**
   - Login as Varnika
   - Create a class (get class code)
   - Unlock lessons 1-5

2. **Student Flow:**
   - Login with class code + name
   - See 5 unlocked lessons
   - Click "Start Lesson" on any lesson

3. **Lesson Experience:**
   - Block 0 starts with Introduction card
   - Click "I'm Ready!" to begin questions
   - Answer questions (2-mistake rule applies)
   - Complete block → Move to next block
   - Block 1 shows Introduction card (if available)
   - Complete all blocks → Finish lesson

---

## Vocabulary List by Level

### Easy Words (Concrete & Observable)
basket, window, water, paper, mother, father, teacher, happy, table, pencil, hungry, tired, clean, dirty, full, empty, near, far, hot, cold

### Medium Words (Feelings & Behaviour)
garden, village, holiday, picture, library, kitchen, careful, noisy, quiet, afraid, excited, worried, healthy, sleepy, angry, surprised, proud, brave

### Hard Words (Emotions & Thinking)
remember, together, tomorrow, important, understand, difference, education, confused, patient, serious, confident, nervous, calm, disappointed, responsible, honest, curious, respectful

---

## References

- **Source:** Grade 4 English PAL-Integrated Lesson Plans (For Below-Grade-Level Learners)
- **Focus:** Accuracy + confidence, not speed
- **Teacher-led:** 25-30 minutes
- **PAL practice:** 15-20 minutes
- **Target:** Class 3-4 students in Ahmedabad, Gujarat

---

Last Updated: January 2025
