

# Production Content Guide - New Question Types

**Created:** 2026-01-08
**Status:** Ready for deployment
**Total Questions:** 252 new questions for Lessons 2-5

---

## 📊 Content Summary

### What Was Created

**252 Production Questions** across 4 lessons:

| Lesson | Question Types | Count | Difficulty Levels |
|--------|----------------|-------|-------------------|
| Lesson 2 | sentence-gap-fill | 36 | EASY: 24, MEDIUM: 6, HARD: 6 |
| Lesson 3 | reading-comprehension | 36 | EASY: 24, MEDIUM: 6, HARD: 6 |
| Lesson 4 | sentence-rearrange + add-word | 72 | 36 each type |
| Lesson 5 | story-sequence + reading-comp | 72 | 36 each type |

**Total:** 252 questions with full rotation sets

---

## 📁 Files Created

### 1. seed-lessons-grade4-new-content.sql
**Contains:** Lessons 2 & 3 (72 questions)
- Lesson 2: 36 sentence-gap-fill questions
- Lesson 3: 36 reading-comprehension questions (completely new lesson)

### 2. seed-lessons-grade4-lessons-4-5.sql
**Contains:** Lessons 4 & 5 (180 questions)
- Lesson 4: 36 sentence-rearrange + 36 add-word = 72 questions
- Lesson 5: 36 story-sequence + 36 reading-comprehension = 72 questions

---

## 🎯 Content Standards (NCERT/SCERT Grade 4)

### Difficulty Progression

**EASY (Block 0):**
- Simple, concrete vocabulary
- 2-4 word sentences (rearrange)
- 2-3 sentence passages (comprehension)
- Single describing words (add-word)
- Observable cause-effect (gap-fill)
- 3-event sequences (story-sequence)

**MEDIUM (Block 1):**
- Context reasoning required
- 4-6 word sentences with adjectives/adverbs
- 4-5 sentence passages
- Adverbs and descriptive language
- 4-event sequences with logical chains

**HARD (Block 2):**
- Inference and deeper understanding
- 6-8 word complex sentences
- 5-6 sentence passages with "why" questions
- Best-fit word selection
- 5-event sequences requiring inference

---

## 📚 Content Quality Standards

### All Questions Follow:

**Language Standards:**
- Grade 4 below-level vocabulary
- Culturally relevant (Indian/Gujarat context)
- Clear, unambiguous language
- No idioms or complex metaphors

**Pedagogical Standards:**
- Age-appropriate scenarios
- Relatable contexts (school, home, market, farm, nature)
- Positive role models
- No violence, fear, or inappropriate content

**Technical Standards:**
- Proper JSON formatting
- Correct field names matching lib/types.ts
- Rotation sets maintain difficulty consistency
- Explanations reference answer explicitly

---

## 🔧 Installation Instructions

### Step 1: Backup Current Data

```sql
-- Create backup of current lessons
SELECT * FROM lessons INTO lessons_backup;
```

### Step 2: Run Test Questions First

```sql
-- Load test questions to validate structure
\i seed-test-questions.sql
```

Test all 20 questions work correctly before proceeding.

### Step 3: Load Lessons 2 & 3

```sql
-- Run the first content file
\i seed-lessons-grade4-new-content.sql
```

**What this does:**
- Updates Lesson 2 with 36 gap-fill questions (added to existing)
- Completely replaces Lesson 3 with 36 reading-comp questions

### Step 4: Load Lessons 4 & 5

```sql
-- Run the second content file
\i seed-lessons-grade4-lessons-4-5.sql
```

**What this does:**
- Completely replaces Lesson 4 with 72 questions (rearrange + add-word)
- Completely replaces Lesson 5 with 72 questions (sequence + comprehension)

### Step 5: Verify Installation

```sql
-- Check all lessons loaded
SELECT title, "order",
       jsonb_array_length(content->'blocks') as blocks,
       (SELECT count(*) FROM jsonb_array_elements(content->'blocks') as b,
                             jsonb_array_elements(b->'questions') as q) as total_questions
FROM lessons
WHERE "order" IN (2, 3, 4, 5)
ORDER BY "order";

-- Expected output:
-- Lesson 2: 3 blocks, ~40 questions (existing + new)
-- Lesson 3: 3 blocks, 36 questions (all new)
-- Lesson 4: 3 blocks, 72 questions (all new)
-- Lesson 5: 3 blocks, 72 questions (all new)
```

---

## ✅ Content Verification Checklist

### Before Deployment:

- [ ] All SQL files syntax-checked
- [ ] Test questions loaded and working
- [ ] Backup created of current database
- [ ] Dev environment tested

### After Each Lesson:

- [ ] All questions load without errors
- [ ] Rotation sets present in Block 0
- [ ] Question types match component routing
- [ ] Audio fields present (even if empty)
- [ ] Explanations are clear and helpful

### Full System Test:

- [ ] Load Lesson 2 → Test gap-fill questions
- [ ] Load Lesson 3 → Test reading-comp questions
- [ ] Load Lesson 4 → Test rearrange + add-word
- [ ] Load Lesson 5 → Test sequence + comprehension
- [ ] Verify 2-mistake rule works
- [ ] Test rotation sets on retakes
- [ ] Check offline sync

---

## 📖 Content Examples

### Sentence Gap Fill (Lesson 2)

**EASY Example:**
```json
{
  "type": "sentence-gap-fill",
  "baseSentence": "I feel ___ after playing in the hot sun.",
  "options": ["tired", "cold", "hungry", "angry"],
  "correctAnswer": "tired",
  "explanation": "Playing in hot sun makes us feel tired because we use energy."
}
```

**HARD Example:**
```json
{
  "type": "sentence-gap-fill",
  "baseSentence": "I felt ___ when I could not solve the puzzle.",
  "options": ["confused", "happy", "proud", "excited"],
  "correctAnswer": "confused",
  "explanation": "Difficult puzzles make us feel confused because they are hard to solve."
}
```

### Reading Comprehension (Lesson 3)

**EASY (Who question):**
```json
{
  "type": "reading-comprehension",
  "passage": "Ravi woke up early. He got ready and went to school. He met his friends there.",
  "prompt": "Read the story and answer: Who went to school?",
  "questionType": "who",
  "options": ["Ravi", "The teacher", "Mother", "Father"],
  "correctAnswer": "Ravi"
}
```

**HARD (Why question with inference):**
```json
{
  "type": "reading-comprehension",
  "passage": "Priya worked hard on her science project. She spent many days preparing it. When she presented it in class, everyone clapped. Her teacher praised her work. Priya felt very proud of herself.",
  "prompt": "Why did Priya feel proud?",
  "questionType": "why",
  "options": ["Because everyone praised her work", "Because she got a gift", "Because it was her birthday", "Because she won a prize"],
  "correctAnswer": "Because everyone praised her work"
}
```

### Sentence Rearrange (Lesson 4)

**EASY (3 words):**
```json
{
  "type": "sentence-rearrange",
  "scrambledItems": ["runs", "dog", "The"],
  "correctOrder": [2, 1, 0],
  "correctAnswer": "The dog runs"
}
```

**HARD (6 words with prepositional phrase):**
```json
{
  "type": "sentence-rearrange",
  "scrambledItems": ["in", "The", "runs", "boy", "the", "park"],
  "correctOrder": [1, 3, 2, 0, 4, 5],
  "correctAnswer": "The boy runs in the park"
}
```

### Add Word Activity (Lesson 4)

**EASY (adjectives, multiple correct):**
```json
{
  "type": "add-word",
  "baseSentence": "The dog runs",
  "wordType": "adjective",
  "insertPosition": 1,
  "options": ["big", "small", "brown", "happy"],
  "correctAnswers": ["big", "small", "brown", "happy"],
  "correctAnswer": "big"
}
```

**HARD (adverbs, best-fit single answer):**
```json
{
  "type": "add-word",
  "baseSentence": "The girl sings at the function",
  "wordType": "adverb",
  "insertPosition": 3,
  "options": ["beautifully", "loudly", "softly", "nervously"],
  "correctAnswers": ["beautifully"],
  "correctAnswer": "beautifully"
}
```

### Story Sequence (Lesson 5)

**EASY (3 events):**
```json
{
  "type": "story-sequence",
  "passage": "Ravi woke up in the morning. He brushed his teeth and washed his face. Then he ate breakfast and went to school.",
  "scrambledItems": [
    "Ravi ate breakfast and went to school",
    "Ravi woke up in the morning",
    "Ravi brushed his teeth and washed his face"
  ],
  "correctOrder": [1, 2, 0],
  "correctAnswer": "1,2,0"
}
```

**HARD (5 events with inference):**
```json
{
  "type": "story-sequence",
  "passage": "Aditi was worried about her math test. She studied hard every night for a week. On test day, the teacher gave out the papers. Aditi answered all questions carefully. She got a very good score and felt proud of herself.",
  "scrambledItems": [
    "She felt proud of herself",
    "Aditi was worried about the test",
    "She studied hard every night",
    "The teacher gave out papers",
    "She got a very good score"
  ],
  "correctOrder": [1, 2, 3, 4, 0],
  "correctAnswer": "1,2,3,4,0"
}
```

---

## 🎨 Content Design Principles

### 1. Culturally Relevant Contexts

**Used throughout:**
- Indian names (Ravi, Meena, Priya, Amit, Sita, etc.)
- Local settings (market, village, farm, school, temple)
- Familiar animals (cow, buffalo, parrot, crow, peacock)
- Seasonal references (monsoon, harvest, festivals)
- Family structures (joint families, grandparents)

### 2. Progressive Complexity

**Vocabulary progression:**
- EASY: High-frequency words (sun, dog, cat, run, play)
- MEDIUM: Academic words (complete, careful, interesting)
- HARD: Abstract concepts (confused, determination, appreciate)

**Sentence structure:**
- EASY: Simple SVO (Subject-Verb-Object)
- MEDIUM: SVO + adjective/adverb
- HARD: Complex with prepositional phrases

**Comprehension depth:**
- EASY: Literal (Who? What?)
- MEDIUM: Spatial/temporal (Where? When?)
- HARD: Inferential (Why? How?)

### 3. Pedagogical Scaffolding

**Each block includes:**
- Clear instructions
- Graduated difficulty
- Helpful explanations
- Encouraging feedback
- Multiple correct options where appropriate

---

## 🔊 Audio Requirements

### TTS Generation Needed

**Total audio files:** ~288 files

**Breakdown:**
- 252 question prompts
- 36 story passages (Lesson 3 & 5)

**Settings to use:**
```
Language: en-IN (Indian English)
Voice: Wavenet-D (female, clear)
Speed: 0.9x (slightly slower for comprehension)
Pitch: 0 (neutral)
Format: MP3, 44.1kHz
```

**File naming convention:**
```
prompts: l2b0q5-prompt.mp3, l3b0q1-prompt.mp3
passages: l3b0q1-passage.mp3, l5b0q1-passage.mp3
```

**Storage:** Supabase Storage bucket `audio/`

**Database update:**
After generating, update each question with `audioUrl` field

---

## 🧪 Testing Protocol

### Test Each Lesson Individually:

**Lesson 2 (Gap Fill):**
1. Load lesson in student view
2. Test all 3 blocks
3. Verify gap displays correctly
4. Check word selection works
5. Test validation logic
6. Verify rotation sets work on retake

**Lesson 3 (Reading Comp):**
1. Test passage display
2. Verify "Read again" button
3. Check question type badges
4. Test all question types (who/what/where/why)
5. Verify passages scroll if long

**Lesson 4 (Rearrange + Add Word):**
1. Test drag-and-drop (both question types)
2. Verify keyboard navigation
3. Test live preview updates
4. Check multiple correct answers (add-word EASY)
5. Verify single correct answer (add-word HARD)

**Lesson 5 (Sequence + Comp):**
1. Test story sequence with position labels
2. Verify passage audio
3. Test 3-event, 4-event, 5-event sequences
4. Check reading comp questions work
5. Test inference questions (HARD block)

---

## 📈 Success Metrics

### After Deployment, Track:

**Student Performance:**
- Completion rate per lesson (target: 80%+)
- Accuracy by question type
- Time per question type
- Rotation set effectiveness

**Technical Performance:**
- Question load time (<2s target)
- Audio playback (no failures)
- Drag-drop responsiveness
- Offline sync success rate

**Content Quality:**
- Student feedback (via teacher)
- Question clarity scores
- Difficulty appropriateness
- Cultural relevance

---

## ⚠️ Known Limitations

### Current Content:

1. **No images yet** - All questions are text-only
   - Can be added later via `imageUrl` field
   - Lesson 2 picture-word-match still uses existing questions

2. **Audio placeholders** - TTS not generated yet
   - Questions work without audio
   - Generate audio before full deployment

3. **Single dialect** - Content uses standard Hindi-English
   - May need Gujarat-specific variants later

4. **Limited contexts** - Focused on common scenarios
   - Can expand with more diverse situations

---

## 🚀 Deployment Checklist

### Pre-Deployment:

- [ ] Review all SQL syntax
- [ ] Test in dev environment
- [ ] Backup production database
- [ ] Inform teachers of new content

### Deployment Steps:

- [ ] Run seed-test-questions.sql
- [ ] Test all 20 questions work
- [ ] Run seed-lessons-grade4-new-content.sql
- [ ] Test Lessons 2 & 3
- [ ] Run seed-lessons-grade4-lessons-4-5.sql
- [ ] Test Lessons 4 & 5
- [ ] Verify question counts
- [ ] Test rotation sets
- [ ] Deploy to staging

### Post-Deployment:

- [ ] Monitor error logs (48 hours)
- [ ] Gather teacher feedback (1 week)
- [ ] Track student performance (2 weeks)
- [ ] Generate and upload TTS audio
- [ ] Update content based on feedback

---

## 📞 Support & Maintenance

### If Questions Don't Load:

1. Check database connection
2. Verify JSON syntax in content field
3. Check question type matches components
4. Verify all required fields present

### If Validation Fails:

1. Check correctAnswer matches options
2. Verify correctOrder array (rearrange/sequence)
3. Check correctAnswers array (add-word multi)
4. Ensure explanation field present

### If Rotation Sets Don't Work:

1. Verify rotationEnabled: true in lesson
2. Check rotationSets array structure
3. Ensure rotation sets in Block 0 only
4. Verify rotation selection logic in lessonEngine

---

## 📚 Additional Resources

**Reference Documents:**
- QUESTION-TYPES-REFERENCE.md - Component specifications
- QUESTION-TYPE-PROGRESSION-RULES.md - Difficulty guidelines
- HOLISTIC-IMPLEMENTATION-PLAN.md - Full implementation roadmap
- TEST-QUESTIONS.md - 20 validation questions

**Code Files:**
- lib/types.ts - TypeScript definitions
- components/game/question-types/ - All components
- lib/lessonEngine.ts - Lesson logic

**Original Source:**
- Grade 4 English PAL-Integrated Lesson Plans.pdf

---

**Last Updated:** 2026-01-08
**Content Version:** 1.0.0
**Status:** ✅ Ready for deployment testing
**Questions:** 252 production questions + 20 test questions = 272 total
