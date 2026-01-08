# Holistic Implementation Plan
**Based on Grade 4 English PAL-Integrated Lesson Plans**

**Last Updated:** 2026-01-08
**Curriculum Version:** Grade 4 English PAL v1.0
**Target:** Complete implementation aligned with official lesson plans

---

## Executive Summary

This document provides a **complete implementation roadmap** for all 5 lessons in the Grade 4 English PAL-Integrated curriculum. It maps every PAL Practice activity mentioned in the PDF to specific question types, content requirements, and rotation strategies.

**Current Status:**
- ✅ **5 question types implemented** (multiple-choice, listen-and-select, word-match, sentence-completion, picture-word-match)
- 🚧 **5 question types planned** (sentence-rearrange, story-sequence, add-word, sentence-gap-fill, reading-comprehension)
- ✅ **Rotation sets active** for Lessons 1-5
- ✅ **Audio TTS system** operational
- ✅ **2-mistake rule** implemented

---

## Implementation Philosophy

### PAL Principles (From PDF)
1. **Focus:** Accuracy + confidence, not speed
2. **Structure:** Teacher-led (25-30 min) → PAL practice (15-20 min)
3. **Assessment:** Student attempts without refusing, not perfection
4. **Tone:** Praise effort, not speed

### Digital Tool Adaptation
- **Teacher-led content** → Block introductions (concept, explanation, example, activity)
- **PAL practice** → Interactive question types
- **Assessment** → Diagnostic data for teachers (no punishment shown to students)

---

## Lesson 1: Decoding Multi-Syllable Words

### Objective
👉 **Student-friendly:** "I can break big words into small parts and read them."

### Key Skills
- Syllable breaking
- Pronunciation
- Reading confidence

### PAL Practice Activities (From PDF)
- ✅ **Syllable-based word reading**
- ✅ **Tap + listen + read**

### Implemented Question Types

#### 1.1. Listen and Select (Syllable Counting)
**Status:** ✅ Implemented

**Block Structure:**
- **Block 0 (EASY):** 2 syllables, familiar words
- **Block 1 (MEDIUM):** 2-3 syllables, school & life words
- **Block 2 (HARD):** 3-4 syllables, Grade 4 stretch words

**Example Questions:**

**Block 0 - EASY:**
```typescript
{
  type: "listen-and-select",
  prompt: "Listen carefully. How many syllables in this word?",
  audioUrl: "basket.mp3",  // TTS: "basket"
  options: ["1", "2", "3", "4"],
  correctAnswer: "2",
  explanation: "bas-ket (2 syllables)"
}
```

**Rotation Strategy:**
- Default: basket, window, paper, teacher
- Rotation 1: water, mother, table, doctor
- Rotation 2: happy, rabbit, pencil, yellow

**Content Pools (From PDF - Page 2-3):**
- **EASY:** basket, window, water, paper, mother, father, teacher, happy, table, pencil, doctor, rabbit, bottle, sister, brother, cotton, apple, yellow, flower, morning (20 words)
- **MEDIUM:** market, garden, village, blanket, holiday, picture, sentence, library, kitchen, behind, inside, outside, evening, classroom, number, animal, weather, festival, student, uniform (20 words)
- **HARD:** remember, together, tomorrow, afternoon, important, understand, difference, education, celebration, information, government, community, environment, responsibility, opportunity, arrangement, communication, population, development, electricity (20 words)

**Implementation Requirements:**
- ✅ TTS audio generation for all words
- ✅ Syllable count validation
- ✅ 3 rotation sets per block
- ⚠️ Enhancement: Visual syllable breaking animation

---

## Lesson 2: Vocabulary in Context

### Objective
👉 **Student-friendly:** "I can understand and use new words."

### Key Skills
- Word meaning
- Oral sentence formation
- Written usage

### PAL Practice Activities (From PDF)
- ✅ **Picture-word matching**
- 🚧 **Choose correct word for sentence** (needs enhancement)

### Question Types Needed

#### 2.1. Picture-Word Match (Enhanced)
**Status:** ✅ Implemented, 🚧 Needs drag-and-drop enhancement

**Block Structure:**
- **Block 0 (EASY):** Concrete & observable adjectives
- **Block 1 (MEDIUM):** Feelings & behavior
- **Block 2 (HARD):** Emotions & thinking words

**Enhancement Required:**
- Current: Basic MCQ-style selection
- Needed: Drag-and-drop word-to-image matching
- Multiple pairs (4-6) per question

**Component:** `PictureWordMatcher.tsx` (needs upgrade)

#### 2.2. Sentence Gap Fill
**Status:** 🚧 Planned (NEW question type)

**Block Structure:**
- **Block 0 (EASY):** Concrete, observable cause-effect
- **Block 1 (MEDIUM):** Feelings & social context
- **Block 2 (HARD):** Emotions & thinking

**Example Questions:**

**Block 0 - EASY:**
```typescript
{
  type: "sentence-gap-fill",
  prompt: "Choose the word that best completes the sentence",
  baseSentence: "I am ___ after playing outside.",
  gapPosition: 2,
  options: ["hungry", "happy", "fast", "old"],
  correctAnswer: "hungry",
  explanation: "After playing, we feel hungry because we used energy."
}
```

**Block 1 - MEDIUM (From PDF - Page 6):**
```typescript
{
  type: "sentence-gap-fill",
  prompt: "Choose the word that makes sense",
  baseSentence: "Be ___ while crossing the road.",
  gapPosition: 1,
  options: ["careful", "noisy", "angry", "sleepy"],
  correctAnswer: "careful",
  explanation: "We must be careful on the road to stay safe."
}
```

**Block 2 - HARD (From PDF - Page 7):**
```typescript
{
  type: "sentence-gap-fill",
  prompt: "Choose the word that fits best",
  baseSentence: "I felt ___ by the question.",
  gapPosition: 2,
  options: ["confused", "confident", "curious", "calm"],
  correctAnswer: "confused",
  explanation: "Difficult questions make us feel confused because they are hard to understand."
}
```

**Rotation Strategy:**
- Use different sentences from same difficulty tier
- Keep context type similar (cause-effect, behavior, emotional state)
- Example: "I am hungry" → "I am tired" → "I feel wet"

**Content Pools (From PDF - Pages 5-7):**
- **EASY (20 words):** hungry, tired, clean, dirty, full, empty, near, far, hot, cold, wet, dry, open, close, early, late, fast, slow, loud, soft
- **MEDIUM (20 words):** careful, noisy, quiet, afraid, excited, worried, healthy, sleepy, angry, surprised, proud, brave, sad, happy, kind, rude, polite, helpful, lazy, active
- **HARD (19 words):** confused, patient, serious, confident, nervous, calm, disappointed, responsible, honest, curious, respectful, independent, energetic, creative, thoughtful, careless, generous, stubborn, focused

**Example Sentences Available (From PDF):**
- EASY: 20 complete sentences (Page 5)
- MEDIUM: 20 complete sentences (Page 6)
- HARD: 20 complete sentences (Page 7)

**Implementation Requirements:**
- 🚧 Create `SentenceGapFill.tsx` component
- ✅ Use existing vocabulary pools
- ✅ Use existing sentence structures from PDF
- 🚧 Create 12 questions (4 per block × 3 rotation sets)

---

## Lesson 3: Reading Short Paragraphs

### Objective
👉 **Student-friendly:** "I can read a short paragraph and tell what it is about."

### Key Skills
- Reading fluency
- Comprehension
- Confidence in longer text

### PAL Practice Activities (From PDF)
- 🚧 **Read short passages**
- 🚧 **Answer 1 simple question**

### Question Types Needed

#### 3.1. Reading Comprehension
**Status:** 🚧 Planned (NEW question type)

**Block Structure:**
- **Block 0 (EASY):** 2-3 sentences, literal recall (Who/What)
- **Block 1 (MEDIUM):** 4-5 sentences, connected recall (What happened/Where)
- **Block 2 (HARD):** 5-6 sentences, inference (Why/How)

**Example Questions:**

**Block 0 - EASY (From PDF - Page 15):**
```typescript
{
  type: "reading-comprehension",
  prompt: "Read the story and answer: Who is in the story?",
  passage: "Ravi went to the park. He played with his ball.",
  questionType: "who",
  options: ["Ravi", "The teacher", "The farmer", "A dog"],
  correctAnswer: "Ravi",
  explanation: "The story says 'Ravi went to the park'."
}
```

**Block 1 - MEDIUM (From PDF - Page 16):**
```typescript
{
  type: "reading-comprehension",
  prompt: "Read the story and answer: What happened in the story?",
  passage: "A farmer woke up early in the morning. He went to his field. He watered the vegetable plants. The sun was shining brightly.",
  questionType: "what",
  options: [
    "He watered the plants",
    "He went to school",
    "He cooked food",
    "He played football"
  ],
  correctAnswer: "He watered the plants",
  explanation: "The story says 'He watered the vegetable plants'."
}
```

**Block 2 - HARD (From PDF - Page 16):**
```typescript
{
  type: "reading-comprehension",
  prompt: "Read the story and answer: Why did Meena feel happy?",
  passage: "Meena was worried about her lost bag. She looked everywhere but could not find it. Her brother helped her search. Finally, they found it under the bed. Meena felt very happy and thanked her brother.",
  questionType: "why",
  options: [
    "Because she found her bag",
    "Because she went to school",
    "Because it was raining",
    "Because she was hungry"
  ],
  correctAnswer: "Because she found her bag",
  explanation: "Meena felt happy because she found her lost bag."
}
```

**Rotation Strategy:**
- Different story contexts (school → home → park)
- Maintain narrative length and complexity
- Keep question type similar (who → who, what → what, why → why)

**Content Pools (From PDF - Page 9):**
- **EASY:** walk, play, home, road, tree, friend, school, food, house, park, boy, girl, dog, cat, rain, sun, book, ball, family, shop (20 words)
- **MEDIUM:** morning, evening, farmer, teacher, children, animals, market, river, village, forest, journey, holiday, picnic, bridge, field, mountain, road, train, riverbank, playground (20 words)
- **HARD:** suddenly, quietly, carefully, quickly, slowly, finally, already, nearby, behind, ahead, during, before, after, sometimes, often, rarely, immediately, carefully, safely, silently (20 words)

**Example Questions from PDF (Pages 15-16):**
- EASY: 20 question templates
- MEDIUM: 20 question templates
- HARD: 20 question templates

**Implementation Requirements:**
- 🚧 Create `ReadingComprehension.tsx` component
- 🚧 Passage display with "Read again" button
- 🚧 Create 36 story passages (12 per difficulty × 3 rotation sets)
- 🚧 TTS for passages + questions

---

## Lesson 4: Sentence Expansion

### Objective
👉 **Student-friendly:** "I can make my sentence better."

### Key Skills
- Sentence building
- Descriptive writing
- Grammar intuition

### PAL Practice Activities (From PDF)
- 🚧 **Sentence rearranging**
- 🚧 **Add word activities**

### Question Types Needed

#### 4.1. Sentence Rearrange
**Status:** 🚧 Planned (NEW question type)

**Block Structure:**
- **Block 0 (EASY):** 3-4 words, simple SVO
- **Block 1 (MEDIUM):** 4-5 words, SVO + adjective/adverb
- **Block 2 (HARD):** 5-7 words, SVO + prepositional phrase

**Example Questions:**

**Block 0 - EASY:**
```typescript
{
  type: "sentence-rearrange",
  prompt: "Arrange the words to make a sentence",
  scrambledItems: ["runs", "dog", "The"],
  correctOrder: [2, 1, 0],  // The dog runs
  correctAnswer: "The dog runs",
  explanation: "Sentences start with 'The', then the subject 'dog', then the verb 'runs'."
}
```

**Block 1 - MEDIUM (From PDF - Page 12):**
```typescript
{
  type: "sentence-rearrange",
  prompt: "Arrange the words to make a sentence",
  scrambledItems: ["runs", "boy", "The", "quickly"],
  correctOrder: [2, 1, 0, 3],  // The boy runs quickly
  correctAnswer: "The boy runs quickly",
  explanation: "The subject comes first, then the verb, then the adverb tells HOW."
}
```

**Block 2 - HARD (From PDF - Page 13):**
```typescript
{
  type: "sentence-rearrange",
  prompt: "Arrange the words to make a sentence",
  scrambledItems: ["in", "quickly", "runs", "boy", "the", "The", "park"],
  correctOrder: [5, 3, 2, 1, 0, 4, 6],  // The boy runs quickly in the park
  correctAnswer: "The boy runs quickly in the park",
  explanation: "Complex sentences need: subject → verb → adverb → prepositional phrase."
}
```

**Rotation Strategy:**
- Use different base sentences (dog runs → bird flies → sun shines)
- Keep grammatical structure identical
- Vary subjects and verbs

**Implementation Requirements:**
- 🚧 Create `SentenceRearrange.tsx` component
- 🚧 Drag-and-drop with `@dnd-kit/sortable`
- 🚧 Alternative: Tap-to-select sequence mode
- 🚧 Create 12 questions (4 per block × 3 rotation sets)

#### 4.2. Add Word Activity
**Status:** 🚧 Planned (NEW question type)

**Block Structure:**
- **Block 0 (EASY):** Add adjective to 3-word sentence
- **Block 1 (MEDIUM):** Add adverb to 4-5 word sentence
- **Block 2 (HARD):** Add multiple descriptive words to complex sentence

**Example Questions:**

**Block 0 - EASY (From PDF - Page 11):**
```typescript
{
  type: "add-word",
  prompt: "Add a describing word to tell more about the dog",
  baseSentence: "The dog runs",
  wordType: "adjective",
  insertPosition: 1,  // Between "The" and "dog"
  options: ["big", "small", "fast", "happy"],
  correctAnswers: ["big", "small", "happy"],  // Multiple valid (fast is adverb)
  correctAnswer: "big",
  explanation: "Describing words tell us what kind of dog it is."
}
```

**Block 1 - MEDIUM (From PDF - Page 12):**
```typescript
{
  type: "add-word",
  prompt: "Add a word to tell HOW the boy runs",
  baseSentence: "The boy runs",
  wordType: "adverb",
  insertPosition: 3,  // After "runs"
  options: ["quickly", "slowly", "happily", "loudly"],
  correctAnswers: ["quickly", "slowly"],  // Context-appropriate
  correctAnswer: "quickly",
  explanation: "Adverbs tell us HOW something happens. The boy runs quickly."
}
```

**Block 2 - HARD (From PDF - Page 13):**
```typescript
{
  type: "add-word",
  prompt: "Make this sentence more interesting",
  baseSentence: "The boy runs in the park",
  wordType: "adverb",
  insertPosition: 3,  // After "runs"
  options: ["quickly", "slowly", "carefully", "confidently"],
  correctAnswers: ["quickly"],  // Best fit for context
  correctAnswer: "quickly",
  explanation: "When running in the park, 'quickly' is the most natural choice."
}
```

**Rotation Strategy:**
- Different base subjects (dog → cat → bird → car)
- Keep sentence length similar
- Vary descriptive word categories

**Content Pools (From PDF - Pages 11-13):**
- **EASY (20 words):** big, small, tall, short, fast, slow, new, old, good, bad, clean, dirty, hot, cold, happy, sad, loud, soft, bright, dark
- **MEDIUM (20 words):** quickly, slowly, happily, loudly, outside, inside, today, yesterday, tomorrow, early, late, nearby, together, alone, carefully, easily, quietly, neatly, safely, suddenly
- **HARD (20 words):** silently, politely, excitedly, patiently, angrily, nervously, confidently, carefully, honestly, lazily, proudly, gently, bravely, seriously, thoughtfully, quickly, neatly, loudly, peacefully, correctly

**Example Sentences Available (From PDF):**
- EASY: 20 sentences with adjectives (Page 11-12)
- MEDIUM: 40 sentences with adverbs (Page 12)
- HARD: 40 sentences with complex adverbs (Page 13)

**Implementation Requirements:**
- 🚧 Create `AddWordActivity.tsx` component
- 🚧 Word bank with drag-and-drop
- 🚧 Live sentence preview
- 🚧 Support multiple correct answers
- 🚧 Create 12 questions (4 per block × 3 rotation sets)

---

## Lesson 5: Reading → Writing Connection

### Objective
👉 **Student-friendly:** "I can read and write about the same idea."

### Key Skills
- Transfer of learning
- Reading comprehension
- Written expression

### PAL Practice Activities (From PDF)
- 🚧 **Story sequencing**
- 🚧 **Answering simple questions**

### Question Types Needed

#### 5.1. Story Sequence
**Status:** 🚧 Planned (NEW question type)

**Block Structure:**
- **Block 0 (EASY):** 3 events, literal sequence
- **Block 1 (MEDIUM):** 4 events, logical chain
- **Block 2 (HARD):** 5 events, inference required

**Example Questions:**

**Block 0 - EASY (From PDF - Page 15):**
```typescript
{
  type: "story-sequence",
  prompt: "Put the events in the correct order",
  passage: "Ravi played with his ball at the park. Then he went home.",
  scrambledItems: [
    "Ravi went home",
    "Ravi played with his ball",
    "Ravi went to the park"
  ],
  correctOrder: [2, 1, 0],  // Park → Play → Home
  correctAnswer: "2,1,0",
  explanation: "First Ravi went to the park, then played, then went home."
}
```

**Block 1 - MEDIUM (From PDF - Page 16):**
```typescript
{
  type: "story-sequence",
  prompt: "Put the story events in order",
  passage: "A farmer planted seeds. He watered them every day. The plants grew tall. He sold the vegetables at the market.",
  scrambledItems: [
    "The farmer sold vegetables",
    "The farmer planted seeds",
    "The plants grew tall",
    "The farmer watered the seeds"
  ],
  correctOrder: [1, 3, 2, 0],  // Plant → Water → Grow → Sell
  correctAnswer: "1,3,2,0",
  explanation: "First plant, then water, then plants grow, then sell. This is the farming process."
}
```

**Block 2 - HARD (From PDF - Page 16):**
```typescript
{
  type: "story-sequence",
  prompt: "Put the story events in order",
  passage: "A boy was worried about his test. He studied hard every day. The teacher gave back the papers. The boy got a good score. He felt happy and proud.",
  scrambledItems: [
    "The boy felt happy",
    "The boy was worried",
    "The boy studied hard",
    "The teacher gave papers back",
    "The boy got a good score"
  ],
  correctOrder: [1, 2, 3, 4, 0],  // Worried → Study → Get papers → Good score → Happy
  correctAnswer: "1,2,3,4,0",
  explanation: "The boy was worried, so he studied. After the teacher gave papers, he got a good score and felt happy."
}
```

**Rotation Strategy:**
- Different story themes (school → home → friendship)
- Maintain event count and complexity
- Keep temporal/causal structure similar

**Implementation Requirements:**
- 🚧 Create `StorySequence.tsx` component
- 🚧 Drag-and-drop event cards with `@dnd-kit/sortable`
- 🚧 Labels: "First", "Then", "Next", "Finally"
- 🚧 Create 12 stories (4 per block × 3 rotation sets)

#### 5.2. Reading Comprehension (Inference-focused)
**Status:** 🚧 Planned (reuses component from Lesson 3)

**Focus for Lesson 5:**
- Block 0: Who/What (literal)
- Block 1: Connected events (What happened first/next)
- Block 2: Why/How (causal reasoning)

**Implementation:** Same as Lesson 3, different story content

---

## Content Creation Requirements

### Total Questions Needed

| Lesson | Question Type | Block 0 | Block 1 | Block 2 | Rotation Sets | Total Qs |
|--------|---------------|---------|---------|---------|---------------|----------|
| 1 | listen-and-select | 4 | 4 | 4 | 3 sets | 36 |
| 2 | sentence-gap-fill | 4 | 4 | 4 | 3 sets | 36 |
| 2 | picture-word-match | 4 | 4 | 4 | 3 sets | 36 |
| 3 | reading-comprehension | 4 | 4 | 4 | 3 sets | 36 |
| 4 | sentence-rearrange | 4 | 4 | 4 | 3 sets | 36 |
| 4 | add-word | 4 | 4 | 4 | 3 sets | 36 |
| 5 | story-sequence | 4 | 4 | 4 | 3 sets | 36 |
| 5 | reading-comprehension | 4 | 4 | 4 | 3 sets | 36 |

**Total:** 288 questions (180 existing + 108 new)

### Content Sources
✅ **Available from PDF:**
- Lesson 1: Word lists (60 words)
- Lesson 2: Word lists (59 words) + Example sentences (60 sentences)
- Lesson 3: Word lists (60 words)
- Lesson 4: Word lists (60 words) + Example sentences (100+ sentences)
- Lesson 5: Question templates (60 templates)

🚧 **Needs Creation:**
- Lesson 3: 36 story passages
- Lesson 5: 36 story passages with sequencing events

---

## Technical Implementation Roadmap

### Phase 1: Foundation (Current - DONE ✅)
- ✅ Multiple-choice questions
- ✅ Listen-and-select (syllable counting)
- ✅ Word matching
- ✅ Sentence completion
- ✅ Picture-word matching (basic)
- ✅ Rotation sets infrastructure
- ✅ TTS audio system
- ✅ 2-mistake rule

### Phase 2: Interactive Question Types (HIGH PRIORITY)
**Estimated Time:** 4-5 weeks

#### Week 1-2: Sentence Rearrange + Story Sequence
- Install `@dnd-kit` libraries
- Create `DraggableCard` and `DropZone` shared components
- Build `SentenceRearrange.tsx` component
- Build `StorySequence.tsx` component
- Create 72 questions (36 each)
- Test drag-and-drop on tablets
- **Deliverable:** Lessons 4 & 5 fully functional

#### Week 3: Add Word Activity
- Build `AddWordActivity.tsx` component
- Implement word bank drag-and-drop
- Create live sentence preview
- Handle multiple correct answers
- Create 36 questions
- **Deliverable:** Lesson 4 complete

#### Week 4: Sentence Gap Fill + Reading Comprehension
- Build `SentenceGapFill.tsx` component
- Build `ReadingComprehension.tsx` component with passage display
- Create 36 gap-fill questions
- Create 72 comprehension passages + questions
- **Deliverable:** Lessons 2, 3, 5 complete

#### Week 5: Enhancement + Testing
- Enhance `PictureWordMatch` with drag-and-drop
- Create composite images for picture matching
- Tablet testing on all new question types
- Bug fixes and polish
- **Deliverable:** All 10 question types production-ready

### Phase 3: Content Population (MEDIUM PRIORITY)
**Estimated Time:** 2-3 weeks

- Extract all sentences from PDF
- Create 72 story passages (Lessons 3 & 5)
- Generate TTS audio for all new content
- Create rotation sets for all new questions
- Quality assurance testing

### Phase 4: Polish & Optimization (LOW PRIORITY)
**Estimated Time:** 1-2 weeks

- Performance optimization (lazy loading, caching)
- Accessibility improvements (keyboard navigation)
- Animation polish
- Teacher dashboard enhancements

---

## Database Schema Updates

### Extend `lessons` table content JSONB

No schema migration needed! Existing `content` JSONB field already supports:
```json
{
  "rotationEnabled": true,
  "blocks": [
    {
      "blockNumber": 0,
      "introduction": { /* existing */ },
      "questions": [
        {
          "type": "sentence-rearrange",
          "scrambledItems": ["runs", "dog", "The"],
          "correctOrder": [2, 1, 0],
          /* other fields */
        },
        {
          "type": "reading-comprehension",
          "passage": "Story text here...",
          "questionType": "who",
          /* other fields */
        }
      ],
      "rotationSets": [
        [/* rotation set 1 questions */],
        [/* rotation set 2 questions */]
      ]
    }
  ]
}
```

**Action Required:** Update SQL seed file with new question structures.

---

## Component Architecture

### New Components to Create
```
components/game/question-types/
├── SentenceRearrange.tsx (NEW)
├── StorySequence.tsx (NEW)
├── AddWordActivity.tsx (NEW)
├── SentenceGapFill.tsx (NEW)
└── ReadingComprehension.tsx (NEW)

components/game/shared/
├── DraggableCard.tsx (NEW) - Reusable drag item
├── DropZone.tsx (NEW) - Reusable drop target
├── WordBank.tsx (NEW) - Selectable word pool
└── PassageDisplay.tsx (NEW) - Formatted story text
```

### Update Existing Components
- `QuestionCard.tsx` - Add routing for new question types
- `PictureWordMatch.tsx` - Add drag-and-drop enhancement
- `lessonEngine.ts` - No changes needed (question-type agnostic)

---

## Testing Strategy

### Unit Tests
- [ ] Sentence order validation logic
- [ ] Story sequence correctness checking
- [ ] Multiple correct answers handling (add-word)
- [ ] Gap fill answer matching
- [ ] Passage + question parsing

### Integration Tests
- [ ] Drag-and-drop state management
- [ ] Audio integration for all new types
- [ ] Rotation set selection
- [ ] 2-mistake rule across all types

### Manual Testing Checklist
- [ ] iPad touch interactions (drag, tap, scroll)
- [ ] Android tablet compatibility
- [ ] Audio timing (no overlap)
- [ ] Visual feedback clarity
- [ ] Offline mode functionality
- [ ] Teacher dashboard data display

---

## Success Metrics

### Student Engagement
- **Target:** 80%+ completion rate per lesson attempt
- **Measure:** `attempts` table completion status

### Accuracy Progression
- **Target:** 10%+ accuracy improvement from attempt 1 → 3
- **Measure:** Compare rotation set performance

### Teacher Adoption
- **Target:** 70%+ teachers unlock 3+ lessons per class
- **Measure:** `lesson_unlocks` table usage

### Technical Performance
- **Target:** <2s question load time
- **Target:** <1s audio playback start
- **Target:** 95%+ offline sync success rate

---

## Risk Mitigation

### Risk 1: Drag-and-Drop Mobile Compatibility
**Mitigation:**
- Provide alternative tap-to-select mode
- Test on 3+ tablet models (iPad, Samsung, generic Android)
- Use battle-tested `@dnd-kit` library

### Risk 2: Content Creation Bottleneck
**Mitigation:**
- Prioritize using existing PDF sentences
- Create templates for story generation
- Use GPT-4 assistance for story variations (with manual review)

### Risk 3: Audio Performance
**Mitigation:**
- Pre-generate and cache all TTS audio
- Use audio preloading on question load
- Fallback to text-only mode if audio fails

### Risk 4: Complexity Overwhelm
**Mitigation:**
- Roll out lesson-by-lesson (not all at once)
- Start with Lesson 1 & 2 (simpler types)
- Gather teacher feedback before full deployment

---

## Rollout Plan

### Week 1-2: Lesson 1 & 2 Focus
- Complete sentence-gap-fill implementation
- Enhance picture-word-match
- Deploy to 2-3 pilot classes
- Gather feedback

### Week 3-4: Lesson 4 Focus
- Complete sentence-rearrange
- Complete add-word activity
- Deploy to pilot classes
- Gather feedback

### Week 5-6: Lesson 3 & 5 Focus
- Complete reading-comprehension
- Complete story-sequence
- Deploy to pilot classes
- Gather feedback

### Week 7: Full Deployment
- All lessons live
- Monitor usage and errors
- Iterate based on teacher/student feedback

---

## Documentation Requirements

### For Teachers
- [ ] Question type guide with examples
- [ ] How to interpret rotation set data
- [ ] Troubleshooting common student issues

### For Developers
- [ ] Component API documentation
- [ ] Question type creation guide
- [ ] Rotation set authoring guidelines

### For Content Creators
- [ ] Story writing templates
- [ ] Difficulty tier guidelines
- [ ] Quality checklist

---

## Appendix A: Question Type Mapping

| PDF Activity | Question Type | Lesson | Status |
|--------------|---------------|--------|--------|
| Syllable-based word reading | listen-and-select | 1 | ✅ |
| Picture-word matching | picture-word-match | 2 | ✅ (needs enhancement) |
| Choose correct word for sentence | sentence-gap-fill | 2 | 🚧 |
| Read short passages | reading-comprehension | 3, 5 | 🚧 |
| Answer 1 simple question | reading-comprehension | 3, 5 | 🚧 |
| Sentence rearranging | sentence-rearrange | 4 | 🚧 |
| Add word activities | add-word | 4 | 🚧 |
| Story sequencing | story-sequence | 5 | 🚧 |
| Answering simple questions | reading-comprehension | 5 | 🚧 |

---

## Appendix B: Content Inventory

### Lesson 1 (Syllables)
- ✅ 20 EASY words
- ✅ 20 MEDIUM words
- ✅ 20 HARD words
- ✅ 3 rotation sets per block

### Lesson 2 (Vocabulary)
- ✅ 20 EASY words + 20 sentences
- ✅ 20 MEDIUM words + 20 sentences
- ✅ 19 HARD words + 20 sentences
- ✅ 3 rotation sets per block (currently implemented)
- 🚧 Need 36 gap-fill questions (new)

### Lesson 3 (Reading)
- ✅ 20 EASY story words
- ✅ 20 MEDIUM story words
- ✅ 20 HARD adverbs/context words
- 🚧 Need 36 story passages (2-6 sentences each)
- 🚧 Need 36 comprehension questions

### Lesson 4 (Sentence Expansion)
- ✅ 20 EASY describing words + 20 sentences
- ✅ 20 MEDIUM adverbs + 40 sentences
- ✅ 20 HARD adverbs + 40 sentences
- 🚧 Need 36 sentence-rearrange questions
- 🚧 Need 36 add-word questions

### Lesson 5 (Reading-Writing)
- ✅ 60 question templates from PDF
- 🚧 Need 36 story passages
- 🚧 Need 36 story-sequence questions
- 🚧 Need 36 comprehension questions

---

## Appendix C: Audio Requirements

### Total TTS Audio Files Needed
- **Existing:** ~180 questions × 2 (question + correct answer) = 360 files
- **New:** 108 questions × 2 + 72 story passages = 288 files
- **Total:** 648 audio files

### Audio Generation Strategy
1. Pre-generate all audio during content creation
2. Store in Supabase Storage
3. Cache locally on device
4. Generate on-demand as fallback

### Voice Settings
- **Language:** en-IN (Indian English)
- **Voice:** Wavenet-D (female)
- **Speed:** 0.9x (slightly slower for learners)
- **Pitch:** 0.5 (neutral, child-friendly)

---

## Next Immediate Actions

1. ✅ Update [lib/types.ts](../lib/types.ts:1) with new question type definitions
2. ✅ Create comprehensive documentation
3. 🚧 Install `@dnd-kit` libraries
4. 🚧 Create shared drag-and-drop components
5. 🚧 Implement `SentenceRearrange.tsx` (highest priority per PDF)
6. 🚧 Create test questions for Lesson 4
7. 🚧 Deploy to staging for testing

---

**Document Version:** 1.0
**Next Review:** After Phase 2 Week 1 completion
**Owner:** Development Team
**Approved By:** Curriculum Team
