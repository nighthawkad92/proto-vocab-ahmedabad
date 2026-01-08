# Lesson Integration - Test Questions into PAL Lesson Plans

## Overview

All 20 test questions have been successfully integrated into Lessons 2-5 based on the **Grade 4 English PAL-Integrated Lesson Plans PDF**. Each question type has been mapped to its pedagogically appropriate lesson.

---

## Files Created

### 1. Individual Lesson Files
- `seed-lesson-2-vocabulary-integrated.sql` - Vocabulary in Context (4 questions)
- `seed-lesson-3-reading-integrated.sql` - Reading Short Paragraphs (4 questions)
- `seed-lesson-4-sentence-expansion-integrated.sql` - Sentence Expansion (8 questions)
- `seed-lesson-5-reading-writing-integrated.sql` - Reading-Writing Connection (4 questions)

### 2. Master File
- `seed-lessons-2-5-integrated-master.sql` - All 4 lessons in one file

### 3. Documentation
- `lesson-integration-mapping.md` - Detailed mapping strategy and rationale
- `LESSON-INTEGRATION-README.md` - This file

---

## Integration Summary

| Lesson # | Lesson Title | Question Types | Count | Difficulty |
|----------|-------------|----------------|-------|------------|
| **2** | Vocabulary in Context | sentence-gap-fill | 4 | Easy(2), Med(1), Hard(1) |
| **3** | Reading Short Paragraphs | reading-comprehension | 4 | Easy(2), Med(1), Hard(1) |
| **4** | Sentence Expansion | sentence-rearrange + add-word | 8 | Easy(4), Med(2), Hard(2) |
| **5** | Reading-Writing Connection | story-sequence | 4 | Easy(2), Med(1), Hard(1) |
| | | **TOTAL** | **20** | **Easy(10), Med(5), Hard(5)** |

---

## How to Load Content

### Option 1: Load All at Once (Recommended)
```bash
# In Supabase SQL Editor, run:
seed-lessons-2-5-integrated-master.sql
```

This will:
1. Delete existing Lessons 2-5
2. Create new Lessons 2-5 with integrated test questions
3. Run verification queries

### Option 2: Load Individual Lessons
If you only want to update specific lessons:

```bash
# Lesson 2 only:
seed-lesson-2-vocabulary-integrated.sql

# Lesson 3 only:
seed-lesson-3-reading-integrated.sql

# Lesson 4 only:
seed-lesson-4-sentence-expansion-integrated.sql

# Lesson 5 only:
seed-lesson-5-reading-writing-integrated.sql
```

---

## Pedagogical Alignment

### Lesson 2: Vocabulary in Context
**Teacher-Led Focus:** Word meaning, oral sentence formation, written usage
**PAL Practice:** Picture-word matching, Choose correct word for sentence

**Integrated Questions:**
- "I am ___ after playing outside" (hungry) - EASY: Concrete & observable
- "The road is ___ because of the rain" (wet) - EASY: Observable states
- "Be ___ while crossing the road" (careful) - MEDIUM: Behavior & feelings
- "I felt ___ by the difficult question" (confused) - HARD: Emotions & thinking

### Lesson 3: Reading Short Paragraphs
**Teacher-Led Focus:** Reading fluency, comprehension, confidence in longer text
**PAL Practice:** Read short passages, Answer 1 simple question

**Integrated Questions:**
- Ravi at the park → "Who is in the story?" - EASY: Literal recall
- Dog catches ball → "What did the dog do?" - EASY: Literal recall
- Farmer's morning → "What did the farmer do first?" - MEDIUM: Sequence
- Meena's lost bag → "Why did Meena feel happy?" - HARD: Inference

### Lesson 4: Sentence Expansion
**Teacher-Led Focus:** Sentence building, descriptive writing, grammar intuition
**PAL Practice:** Sentence rearranging, Add word activities

**Integrated Questions:**

**Block 0: Basic Sentence Order (EASY)**
- "runs, dog, The" → "The dog runs"
- "flies, The, bird, fast" → "The bird flies fast"

**Block 1: Adding Adjectives (EASY)**
- "The dog runs" + adjective → "The big dog runs" (with example sentence!)
- "The cat sleeps" + adjective → "The lazy cat sleeps" (with example sentence!)

**Block 2: Adjectives + Adverbs (MEDIUM)**
- "boy, quickly, runs, The, big" → "The big boy runs quickly"
- "The boy runs" + adverb → "The boy runs quickly" (with example sentence!)

**Block 3: Prepositional Phrases (HARD)**
- "in, runs, boy, the, The, park" → "The boy runs in the park"
- "The girl sings at the function" + adverb → "beautifully" (with example sentence!)

### Lesson 5: Reading-Writing Connection
**Teacher-Led Focus:** Transfer of learning, reading comprehension, written expression
**PAL Practice:** Story sequencing, Answering simple questions

**Integrated Questions:**
- Ravi's morning routine (3 events) - EASY: Simple sequence
- Girl at the park (3 events) - EASY: Simple sequence
- Farmer growing vegetables (4 events) - MEDIUM: Multi-step process
- Meena's test story (5 events) - HARD: Problem-solution structure

---

## Key Features

### 1. Example Sentences for Add-Word Questions
All 4 add-word questions now include `exampleSentence` field following the "I do, You do" pedagogical pattern:

```json
{
  "prompt": "Add a describing word to make the sentence better",
  "exampleSentence": "The big dog runs",  // Student sees this first
  "baseSentence": "The cat sleeps",        // Then they try this one
  ...
}
```

### 2. Difficulty Progression
Each lesson progresses from EASY → MEDIUM → HARD across blocks

### 3. Block Introductions
Every block includes pedagogical scaffolding:
- **Concept:** What students will learn
- **Explanation:** Why it matters
- **Example:** Concrete demonstration
- **Activity:** What students will do

### 4. Child-Friendly Language
- Objectives start with "I can..."
- Explanations use simple, relatable examples
- Instructions are clear and direct

---

## Verification

After loading, verify with these queries:

```sql
-- Count questions per lesson
SELECT
  title,
  "order",
  jsonb_array_length(content->'blocks') as blocks,
  (
    SELECT SUM((b.value->'questions')::jsonb_array_length)
    FROM jsonb_array_elements(content->'blocks') b
  ) as total_questions
FROM lessons
WHERE "order" BETWEEN 2 AND 5
ORDER BY "order";

-- Show question types per lesson
SELECT
  l.title,
  q.value->>'type' as question_type,
  COUNT(*) as count
FROM lessons l,
     jsonb_array_elements(l.content->'blocks') b,
     jsonb_array_elements(b.value->'questions') q
WHERE l."order" BETWEEN 2 AND 5
GROUP BY l.title, l."order", q.value->>'type'
ORDER BY l."order";
```

---

## What About Lesson 1?

**Lesson 1: Decoding Multi-Syllable Words** was intentionally left without test questions because:
- Focus is on syllable breaking and pronunciation
- PAL practice is audio-based (Tap + listen + read)
- None of the test question types match this skill area
- Test questions focus on sentence construction, vocabulary, and comprehension

---

## Next Steps

1. **Load the content:** Run `seed-lessons-2-5-integrated-master.sql` in Supabase
2. **Teacher unlock:** Teachers should unlock Lessons 2-5 for students
3. **Test the flow:** Students work through lessons in order: 2 → 3 → 4 → 5
4. **Verify progression:** Check that difficulty increases appropriately
5. **Archive test lesson:** The standalone "Test Lesson - New Question Types" can be archived or deleted

---

## Notes

- All 20 questions are now in production-ready lessons
- Each question has clear explanations and feedback
- Difficulty levels are pedagogically appropriate
- Content aligns with Grade 4 curriculum standards
- "I do, You do" pattern implemented for add-word activities

---

## Questions or Issues?

If you encounter any problems:
1. Check that you're running the correct SQL file
2. Verify Supabase connection
3. Ensure lessons table structure matches expected schema
4. Review verification queries output
