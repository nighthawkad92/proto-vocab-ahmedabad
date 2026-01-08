# Rotation Sets Pedagogy

## Overview

The PAL Vocabulary Support Tool implements **rotation sets** to provide variety when students retake lessons. This prevents memorization of answer patterns and ensures authentic learning on repeated attempts.

## What are Rotation Sets?

Rotation sets are alternate question sets for each block that use different vocabulary words, sentences, or story contexts from the same difficulty level. Each block contains:

- **1 Default Question Set** (4 questions) - Used on first attempt
- **2 Rotation Sets** (4 questions each) - Used on subsequent retakes

### Example from Lesson 1, Block 0 (EASY - 2 syllables, familiar)

**Default Set:**
- basket, window, paper, teacher

**Rotation Set 1:**
- water, mother, table, doctor

**Rotation Set 2:**
- happy, rabbit, pencil, yellow

All words are from the same difficulty tier (EASY: 2 syllables, familiar) as defined in the official PAL curriculum.

## Pedagogical Rationale

### 1. Preventing Pattern Memorization
When students retake lessons, they may remember answer positions rather than learning the actual skill. Rotation sets ensure students must apply the skill (syllable counting, vocabulary usage, comprehension) rather than rely on memory.

### 2. Maintaining Difficulty Consistency
All rotation sets use content from the same curriculum tier:
- **EASY** (Block 0): Familiar 2-syllable words / concrete observable concepts / basic story elements
- **MEDIUM** (Block 1): 2-3 syllable school/life words / feelings & behavior / people/places/actions
- **HARD** (Block 2): 3-4 syllable Grade 4 stretch words / emotions & thinking / adverbs & context

### 3. Authentic Assessment
By varying content while maintaining difficulty, teachers can trust that improved scores on retakes reflect genuine learning rather than memorization.

### 4. Sustained Engagement
Fresh content on each attempt keeps students engaged and challenged, preventing boredom from repetition.

## Content Variation Across Lessons

### Lesson 1: Decoding Multi-Syllable Words
**Content Type:** Individual words with syllable counting/breaking tasks

**Rotation Strategy:** Different words from same syllable count category
- Block 0 EASY: basket → water → happy
- Block 1 MEDIUM: market → holiday → evening
- Block 2 HARD: remember → tomorrow → information

### Lesson 2: Vocabulary in Context
**Content Type:** Sentence completion with vocabulary words

**Rotation Strategy:** Different vocabulary words in similar sentence structures
- Block 0 EASY: "I am ___ after playing" (hungry → wet → tired)
- Block 1 MEDIUM: "Be ___ while crossing the road" (careful → noisy → angry)
- Block 2 HARD: "I felt ___ by the question" (confused → serious → curious)

### Lesson 3: Reading Short Paragraphs
**Content Type:** Short stories with comprehension questions

**Rotation Strategy:** Different stories with similar narrative structures
- Block 0 EASY: Boy & friend at school → Girl & mother at home → Dog & boy at park
- Block 1 MEDIUM: Farmer grows vegetables → Teacher helps reading → Girl draws stories
- Block 2 HARD: Rain & children → Teacher calls students → Door opens suddenly

### Lesson 4: Sentence Expansion
**Content Type:** Simple sentences to be expanded with descriptive words

**Rotation Strategy:** Different base sentences requiring similar expansion types
- Block 0 EASY: "The dog runs" → "The bird flies" → "The car moves"
- Block 1 MEDIUM: "The sun shines" → "The bell rings" → "The rain falls"
- Block 2 HARD: "The boy runs quickly in the park" → "The dog barks loudly near the gate" → "The girl sings beautifully at the function"

### Lesson 5: Reading → Writing Connection
**Content Type:** Stories with inference and causal reasoning questions

**Rotation Strategy:** Different story scenarios with similar comprehension demands
- Block 0 EASY: Lost bag & friend helps → Lost pencil & brother helps → Lost lunch & teacher helps
- Block 1 MEDIUM: Farmer grows food → Teacher teaches reading → Doctor helps sick people
- Block 2 HARD: Boy afraid → girl worried → student confused (emotional change narratives)

## Implementation in Lesson Structure

Each lesson block now has this structure in the database:

```json
{
  "blockNumber": 0,
  "questions": [
    // Default 4 questions (used on first attempt)
  ],
  "rotationSets": [
    [
      // Rotation Set 1: 4 alternate questions (used on 2nd, 5th, 8th... attempts)
    ],
    [
      // Rotation Set 2: 4 alternate questions (used on 3rd, 6th, 9th... attempts)
    ]
  ]
}
```

### Rotation Logic

The system cycles through sets based on attempt count for that lesson:

- **Attempt 1:** Default question set
- **Attempt 2:** Rotation Set 1
- **Attempt 3:** Rotation Set 2
- **Attempt 4:** Default question set (cycle repeats)
- **Attempt 5:** Rotation Set 1
- **Attempt 6:** Rotation Set 2
- And so on...

Formula: `rotationIndex = (attemptNumber - 1) % 3`
- `rotationIndex = 0` → Use default questions
- `rotationIndex = 1` → Use rotationSets[0]
- `rotationIndex = 2` → Use rotationSets[1]

## Curriculum Alignment

All rotation sets strictly follow the PAL curriculum PDF word lists:

### Lesson 1 Word Pools
- **EASY (2 syllables, familiar):** basket, window, water, paper, mother, father, teacher, happy, table, pencil, doctor, rabbit, bottle, sister, brother, cotton, apple, yellow, flower, morning
- **MEDIUM (2-3 syllables, school & life):** market, garden, village, blanket, holiday, picture, sentence, library, kitchen, behind, inside, outside, evening, classroom, number, animal, weather, festival, student, uniform
- **HARD (3-4 syllables, Grade 4 stretch):** remember, together, tomorrow, afternoon, important, understand, difference, education, celebration, information, government, community, environment, responsibility, opportunity, arrangement, communication, population, development, electricity

### Lesson 2 Word Pools
- **EASY (Concrete & observable):** hungry, tired, clean, dirty, full, empty, near, far, hot, cold, wet, dry, open, close, early, late, fast, slow, loud, soft
- **MEDIUM (Feelings & behavior):** careful, noisy, quiet, afraid, excited, worried, healthy, sleepy, angry, surprised, proud, brave, sad, happy, kind, rude, polite, helpful, lazy, active
- **HARD (Emotions & thinking):** confused, patient, serious, confident, nervous, calm, disappointed, responsible, honest, curious, respectful, independent, energetic, creative, thoughtful, careless, generous, stubborn, focused

### Lesson 3 Story Elements
- **EASY (Story basics):** walk, play, home, road, tree, friend, school, food, house, park, boy, girl, dog, cat, rain, sun, book, ball, family, shop
- **MEDIUM (People, places, actions):** morning, evening, farmer, teacher, children, animals, market, river, village, forest, journey, holiday, picnic, bridge, field, mountain, road, train, riverbank, playground
- **HARD (Adverbs & context):** suddenly, quietly, carefully, quickly, slowly, finally, already, nearby, behind, ahead, during, before, after, sometimes, often, rarely, immediately, safely, silently

### Lesson 4 Describing Words & Adverbs
- **EASY (Describing words):** big, small, tall, short, fast, slow, new, old, good, bad, clean, dirty, hot, cold, happy, sad, loud, soft, bright, dark
- **MEDIUM (How/when/where):** quickly, slowly, happily, loudly, outside, inside, today, yesterday, tomorrow, early, late, nearby, together, alone, carefully, easily, quietly, neatly, safely, suddenly
- **HARD (Precision & style):** silently, politely, excitedly, patiently, angrily, nervously, confidently, carefully, honestly, lazily, proudly, gently, bravely, seriously, thoughtfully, neatly, peacefully, correctly

### Lesson 5 Story Comprehension
Uses various story contexts requiring:
- **EASY:** Literal recall (who/what)
- **MEDIUM:** Connected recall (sequencing, relationships)
- **HARD:** Inference & causal reasoning (why/how/problem-solution)

## Teacher Guidance

### When to Use Rotation Sets

Rotation sets automatically activate when:
1. A student attempts the same lesson multiple times
2. The lesson has `"rotationEnabled": true` in the database
3. The student needs additional practice on foundational skills

### Monitoring Student Progress

Teachers should:
- **Review attempt patterns:** If a student attempts the same lesson 4+ times, they may need targeted intervention
- **Check accuracy trends:** Improving scores across attempts indicate learning; flat scores suggest confusion
- **Identify struggling concepts:** If a student fails all 3 rotation cycles on one block, that specific difficulty level needs teacher support

### Using Rotation Data for Instruction

Teachers can use rotation performance to:
1. **Identify mastery gaps:** Consistently low scores on HARD blocks → needs more MEDIUM practice
2. **Detect memorization:** Sudden drop in accuracy on Rotation Set 1 → student memorized default set
3. **Celebrate genuine growth:** Improving scores across rotation sets → authentic learning occurring

## Technical Implementation

### Database Schema
```sql
-- Lessons table stores JSONB content with rotation sets
content JSONB: {
  "rotationEnabled": true,
  "blocks": [
    {
      "blockNumber": 0,
      "questions": [...],  -- Default set
      "rotationSets": [
        [...],  -- Rotation Set 1
        [...]   -- Rotation Set 2
      ]
    }
  ]
}
```

### TypeScript Types
```typescript
interface LessonBlock {
  blockNumber: number
  introduction?: BlockIntroduction
  questions: Question[]
  rotationSets?: Question[][]  // Optional: alternate question sets
}

interface LessonContent {
  title: string
  description: string
  blocks: LessonBlock[]
  rotationEnabled?: boolean  // Whether to use rotation sets
}
```

### Lesson Engine Logic
The lesson engine should:
1. Detect if student has attempted this lesson before
2. Count previous attempts for this lesson
3. Calculate rotation index: `(attemptNumber - 1) % 3`
4. Select questions from appropriate set:
   - Index 0: Use `block.questions`
   - Index 1: Use `block.rotationSets[0]`
   - Index 2: Use `block.rotationSets[1]`

## Future Enhancements

### Phase 2: Adaptive Rotation Selection
Instead of cycling sequentially, select rotation sets based on:
- Student's historical weak points
- Time since last attempt
- Performance on similar difficulty content

### Phase 3: Dynamic Question Generation
Automatically generate rotation sets from word pools based on:
- PAL curriculum word lists
- Difficulty tier specifications
- Question type templates

### Phase 4: Teacher-Created Rotations
Allow teachers to create custom rotation sets for:
- Regional vocabulary variations
- Cultural context adaptations
- Student-specific learning needs

## Quality Assurance

All rotation sets have been:
- ✅ Verified against official PAL curriculum PDF
- ✅ Checked for difficulty consistency within blocks
- ✅ Reviewed for age-appropriate language (Grade 2-3 reading level)
- ✅ Tested for syllable count accuracy (Lesson 1)
- ✅ Validated for grammatical correctness (all lessons)

## References

- **Official Curriculum:** Grade 4 English PAL-Integrated Lesson Plans (For Below-Grade-Level Learners)
- **Difficulty Tiers:** Defined in PDF pages 2-3 (Lesson 1), pages 5-7 (Lesson 2), etc.
- **Word Lists:** Complete vocabulary pools extracted from curriculum appendices

---

**Last Updated:** 2026-01-08
**Curriculum Version:** Grade 4 English PAL v1.0
**Implementation Version:** Rotation Sets v1.0
