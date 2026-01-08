# Question Type Progression Rules & Rotation Strategies

**Last Updated:** 2026-01-08
**Curriculum Version:** Grade 4 English PAL v1.0

---

## Overview

This document defines **difficulty progression rules** and **rotation set creation guidelines** for all 10 question types in the PAL Vocabulary Support Tool. These rules ensure consistent difficulty scaling across EASY → MEDIUM → HARD blocks and maintain pedagogical integrity across rotation sets.

---

## General Progression Principles

### Difficulty Tiers

**EASY (Block 0):**
- Familiar, concrete concepts
- Simple vocabulary (2 syllables, everyday words)
- Literal comprehension
- Basic sentence structures (3-4 words)
- Observable, tangible subjects

**MEDIUM (Block 1):**
- School and life concepts
- Expanded vocabulary (2-3 syllables, academic words)
- Connected recall and logical inference
- Complex sentence structures (4-6 words)
- Abstract concepts (feelings, time, relationships)

**HARD (Block 2):**
- Grade 4 stretch concepts
- Advanced vocabulary (3-4 syllables, formal language)
- Deep inference and causal reasoning
- Complex sentence structures (6-8 words)
- Abstract thinking (emotions, intentions, consequences)

### Rotation Set Principles

1. **Content Variation:** Change words, sentences, stories
2. **Structure Preservation:** Keep question format identical
3. **Difficulty Consistency:** Maintain tier classification
4. **Curriculum Alignment:** Use only PAL word lists
5. **No Overlap:** No shared vocabulary between sets within same block

---

## Question Type: Multiple Choice

### Progression Rules

| Difficulty | Prompt Complexity | Options Count | Distractor Strategy |
|------------|-------------------|---------------|---------------------|
| EASY | Simple, direct question | 3 options | Obvious wrong answers |
| MEDIUM | Context-based question | 4 options | Plausible distractors |
| HARD | Inference-based question | 4 options | Subtle semantic differences |

### Example Progression

**EASY:**
```typescript
{
  prompt: "Which word means 'not clean'?",
  options: ["dirty", "happy", "fast"],
  correctAnswer: "dirty"
}
```

**MEDIUM:**
```typescript
{
  prompt: "Which word best describes someone who is 'not making noise'?",
  options: ["quiet", "loud", "excited", "careful"],
  correctAnswer: "quiet"
}
```

**HARD:**
```typescript
{
  prompt: "Which word describes feeling 'unsure about what to do'?",
  options: ["confused", "confident", "curious", "patient"],
  correctAnswer: "confused"
}
```

### Rotation Strategy

**Block 0 (EASY) - Vocabulary: Concrete Adjectives**

**Default Set:**
- hungry, tired, clean, dirty

**Rotation Set 1:**
- hot, cold, wet, dry

**Rotation Set 2:**
- near, far, open, close

**Why:** All are observable, concrete opposites. Same conceptual category, different words.

---

## Question Type: Listen and Select

### Progression Rules

| Difficulty | Syllable Count | Phonetic Complexity | Audio Clarity |
|------------|----------------|---------------------|---------------|
| EASY | 2 syllables | Simple consonant-vowel | Clear, slow |
| MEDIUM | 2-3 syllables | Consonant clusters | Normal speed |
| HARD | 3-4 syllables | Complex phonemes | Natural speed |

### Example Progression

**EASY:**
```typescript
{
  prompt: "How many syllables: basket?",
  options: ["1", "2", "3", "4"],
  correctAnswer: "2",
  explanation: "bas-ket (2 syllables)"
}
```

**MEDIUM:**
```typescript
{
  prompt: "How many syllables: holiday?",
  options: ["2", "3", "4", "5"],
  correctAnswer: "3",
  explanation: "hol-i-day (3 syllables)"
}
```

**HARD:**
```typescript
{
  prompt: "How many syllables: information?",
  options: ["3", "4", "5", "6"],
  correctAnswer: "4",
  explanation: "in-for-ma-tion (4 syllables)"
}
```

### Rotation Strategy

**Block 0 (EASY) - 2-syllable familiar words**

**Default Set:**
- basket (bas-ket)
- window (win-dow)
- paper (pa-per)
- teacher (teach-er)

**Rotation Set 1:**
- water (wa-ter)
- mother (mo-ther)
- table (ta-ble)
- doctor (doc-tor)

**Rotation Set 2:**
- happy (hap-py)
- rabbit (rab-bit)
- pencil (pen-cil)
- yellow (yel-low)

**Why:** All 2-syllable, familiar, clear syllable breaks. Different semantic fields (objects, people, animals, colors).

---

## Question Type: Sentence Rearrange

### Progression Rules

| Difficulty | Word Count | Structure | Grammar Concepts |
|------------|-----------|-----------|------------------|
| EASY | 3-4 words | SVO (Subject-Verb-Object) | Capital letter, period |
| MEDIUM | 4-5 words | SVO + Adjective/Adverb | Adjectives before nouns |
| HARD | 5-7 words | SVO + Prepositional Phrase | Complex phrase placement |

### Example Progression

**EASY:**
```typescript
{
  type: "sentence-rearrange",
  prompt: "Arrange the words to make a sentence",
  scrambledItems: ["runs", "dog", "The"],
  correctOrder: [2, 1, 0],  // The dog runs
  correctAnswer: "The dog runs",
  explanation: "Sentences start with 'The', then subject 'dog', then verb 'runs'."
}
```

**MEDIUM:**
```typescript
{
  type: "sentence-rearrange",
  prompt: "Arrange the words to make a sentence",
  scrambledItems: ["dog", "big", "runs", "The", "fast"],
  correctOrder: [3, 1, 0, 2, 4],  // The big dog runs fast
  correctAnswer: "The big dog runs fast",
  explanation: "Adjectives (big) come before nouns (dog). Adverbs (fast) usually come after verbs (runs)."
}
```

**HARD:**
```typescript
{
  type: "sentence-rearrange",
  prompt: "Arrange the words to make a sentence",
  scrambledItems: ["quickly", "the", "ran", "boy", "to", "school", "the"],
  correctOrder: [3, 2, 0, 4, 1, 5],  // The boy ran quickly to the school
  correctAnswer: "The boy ran quickly to the school",
  explanation: "Complex sentences need subject first, then verb, adverb, and prepositional phrase at the end."
}
```

### Rotation Strategy

**Block 0 (EASY) - Simple SVO**

**Default Set:**
1. The dog runs
2. The bird flies
3. The sun shines
4. The cat sleeps

**Rotation Set 1:**
1. The boy walks
2. The girl jumps
3. The ball rolls
4. The fish swims

**Rotation Set 2:**
1. The tree grows
2. The rain falls
3. The wind blows
4. The bell rings

**Why:** All 3-word SVO structure. Different subjects and verbs. Maintain action verb pattern.

---

## Question Type: Story Sequence

### Progression Rules

| Difficulty | Event Count | Temporal Markers | Inference Required |
|------------|-------------|------------------|-------------------|
| EASY | 3 events | Obvious (First, Then, Finally) | None - literal order |
| MEDIUM | 4 events | Implicit (cause-effect) | Logical connection |
| HARD | 5 events | Subtle (emotional change) | Infer missing steps |

### Example Progression

**EASY:**
```typescript
{
  type: "story-sequence",
  prompt: "Put the events in order",
  scrambledItems: [
    "Ravi ate breakfast",
    "Ravi woke up",
    "Ravi went to school"
  ],
  correctOrder: [1, 0, 2],
  correctAnswer: "1,0,2",
  explanation: "First wake up, then eat, then go to school."
}
```

**MEDIUM:**
```typescript
{
  type: "story-sequence",
  prompt: "Put the story events in order",
  scrambledItems: [
    "The farmer watered the plants",
    "The farmer planted seeds",
    "The vegetables grew",
    "The farmer sold vegetables at market"
  ],
  correctOrder: [1, 0, 2, 3],
  correctAnswer: "1,0,2,3",
  explanation: "Plant seeds → water → grow → sell. This is the logical farming process."
}
```

**HARD:**
```typescript
{
  type: "story-sequence",
  prompt: "Put the story events in order",
  scrambledItems: [
    "The boy felt happy and proud",
    "The boy was worried about the test",
    "The boy studied hard every day",
    "The boy got a good score",
    "The teacher gave back the test papers"
  ],
  correctOrder: [1, 2, 4, 3, 0],
  correctAnswer: "1,2,4,3,0",
  explanation: "Worried → Studied → Teacher gave papers → Got good score → Felt happy. Emotional change through effort."
}
```

### Rotation Strategy

**Block 0 (EASY) - Daily Routine**

**Default Set:**
- Wake up → Brush teeth → Eat breakfast → Go to school

**Rotation Set 1:**
- Come home → Wash hands → Do homework → Play

**Rotation Set 2:**
- Morning → Afternoon → Evening → Night

**Why:** All follow obvious temporal sequences. Different contexts (morning, afternoon, day cycle).

---

## Question Type: Add Word

### Progression Rules

| Difficulty | Word Type | Sentence Length | Correct Answers |
|------------|-----------|-----------------|-----------------|
| EASY | Simple adjective (color, size) | 3-4 words | Multiple valid |
| MEDIUM | Adverb (how, when, where) | 4-5 words | 2-3 valid |
| HARD | Multiple words | 6-8 words | 1-2 valid |

### Example Progression

**EASY:**
```typescript
{
  type: "add-word",
  prompt: "Add a word to describe the dog",
  baseSentence: "The dog runs",
  wordType: "adjective",
  insertPosition: 1,  // Between "The" and "dog"
  options: ["big", "small", "fast", "brown"],
  correctAnswers: ["big", "small", "brown"],  // All valid (fast is adverb here)
  correctAnswer: "big",
  explanation: "We can add describing words to tell more about the dog."
}
```

**MEDIUM:**
```typescript
{
  type: "add-word",
  prompt: "Add a word to tell HOW the boy ran",
  baseSentence: "The boy ran to school",
  wordType: "adverb",
  insertPosition: 3,  // After "ran"
  options: ["quickly", "slowly", "happily", "carefully"],
  correctAnswers: ["quickly", "slowly"],  // Happily and carefully less natural here
  correctAnswer: "quickly",
  explanation: "Adverbs tell us HOW something happened. 'Quickly' tells us the boy ran fast."
}
```

**HARD:**
```typescript
{
  type: "add-word",
  prompt: "Make this sentence more interesting by adding words",
  baseSentence: "The girl sings at the function",
  wordType: "adverb",
  insertPosition: 2,  // After "sings"
  options: ["beautifully", "loudly", "softly", "nervously"],
  correctAnswers: ["beautifully"],  // Context: function performance
  correctAnswer: "beautifully",
  explanation: "At a function, someone usually sings beautifully for the audience."
}
```

### Rotation Strategy

**Block 0 (EASY) - Add Adjectives to Simple Sentences**

**Default Set:**
1. The ___ dog runs (big/small/brown)
2. The ___ car moves (red/old/new)
3. The ___ bird flies (blue/small/fast)
4. The ___ tree grows (tall/big/old)

**Rotation Set 1:**
1. The ___ cat sleeps (fat/lazy/tired)
2. The ___ sun shines (bright/hot/warm)
3. The ___ ball rolls (round/red/big)
4. The ___ flower blooms (pretty/red/small)

**Rotation Set 2:**
1. The ___ boy walks (tall/young/happy)
2. The ___ rain falls (heavy/cold/light)
3. The ___ book opens (thick/old/new)
4. The ___ bell rings (loud/big/brass)

**Why:** All simple SVO sentences. Add one adjective between article and noun. Different subjects, similar structure.

---

## Question Type: Sentence Gap Fill

### Progression Rules

| Difficulty | Context Clues | Semantic Distance | Distractors |
|------------|---------------|-------------------|-------------|
| EASY | Obvious (rain → wet) | Direct | Opposites |
| MEDIUM | Logical (playing → tired) | Inference | Related concepts |
| HARD | Subtle (disappointed) | Abstract | Emotional nuance |

### Example Progression

**EASY:**
```typescript
{
  type: "sentence-gap-fill",
  prompt: "Choose the best word to complete the sentence",
  baseSentence: "The road is ___ because of the rain.",
  gapPosition: 3,
  options: ["wet", "dry", "hot", "cold"],
  correctAnswer: "wet",
  explanation: "Rain makes things wet, not dry."
}
```

**MEDIUM:**
```typescript
{
  type: "sentence-gap-fill",
  prompt: "Choose the best word",
  baseSentence: "Be ___ while crossing the road.",
  gapPosition: 1,
  options: ["careful", "noisy", "angry", "sleepy"],
  correctAnswer: "careful",
  explanation: "We should be careful on the road to stay safe."
}
```

**HARD:**
```typescript
{
  type: "sentence-gap-fill",
  prompt: "Choose the word that makes the most sense",
  baseSentence: "I felt ___ by the difficult math question.",
  gapPosition: 2,
  options: ["confused", "confident", "curious", "calm"],
  correctAnswer: "confused",
  explanation: "Difficult questions make us feel confused because they are hard to understand."
}
```

### Rotation Strategy

**Block 0 (EASY) - Observable Cause-Effect**

**Default Set:**
1. I am ___ after playing (tired)
2. The road is ___ after rain (wet)
3. I feel ___ on a hot day (hot)
4. The box is ___ of books (full)

**Rotation Set 1:**
1. I am ___ before eating (hungry)
2. My clothes are ___ after washing (clean)
3. The store is ___ to my house (near)
4. The room is ___ without lights (dark)

**Rotation Set 2:**
1. I feel ___ in winter (cold)
2. The bag is ___ of toys (full)
3. I am ___ in the morning (early)
4. The voice is ___ in the hall (loud)

**Why:** All concrete, observable states. Direct cause-effect. Simple vocabulary.

---

## Question Type: Reading Comprehension

### Progression Rules

| Difficulty | Passage Length | Question Type | Comprehension Level |
|------------|---------------|---------------|---------------------|
| EASY | 2-3 sentences | Who, What | Literal recall |
| MEDIUM | 4-5 sentences | Where, When, What happened | Connected recall |
| HARD | 5-6 sentences | Why, How | Inferential |

### Example Progression

**EASY:**
```typescript
{
  type: "reading-comprehension",
  prompt: "Read the story and answer",
  passage: "Ravi went to the park. He played with his friend.",
  questionType: "who",
  options: ["Ravi", "The teacher", "The farmer", "A dog"],
  correctAnswer: "Ravi",
  explanation: "The story says 'Ravi went to the park'."
}
```

**MEDIUM:**
```typescript
{
  type: "reading-comprehension",
  prompt: "Read the story and answer",
  passage: "The farmer woke up early in the morning. He went to his field. He watered the vegetable plants. The sun was shining brightly.",
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

**HARD:**
```typescript
{
  type: "reading-comprehension",
  prompt: "Read the story and answer",
  passage: "Meena was worried about her lost bag. She looked everywhere but could not find it. Her brother helped her search. Finally, they found it under the bed. Meena felt very happy and thanked her brother.",
  questionType: "why",
  options: [
    "Because she found her bag",
    "Because she went to school",
    "Because it was raining",
    "Because she was hungry"
  ],
  correctAnswer: "Because she found her bag",
  explanation: "Meena felt happy because she found her lost bag. This is why she was happy."
}
```

### Rotation Strategy

**Block 0 (EASY) - Simple Stories, Who/What Questions**

**Default Set:**
1. **Story:** Ravi went to park, played with friend
   - **Question:** Who went to the park?
2. **Story:** The dog ran in the garden
   - **Question:** What did the dog do?

**Rotation Set 1:**
1. **Story:** Meera helped her mother at home
   - **Question:** Who helped mother?
2. **Story:** The bird built a nest in the tree
   - **Question:** What did the bird build?

**Rotation Set 2:**
1. **Story:** The teacher read a story to children
   - **Question:** Who read the story?
2. **Story:** The cat drank milk from the bowl
   - **Question:** What did the cat drink?

**Why:** All 2-sentence stories. Literal recall. Different characters and actions.

---

## Cross-Question Type Rotation Patterns

### Pattern 1: Subject Rotation
Rotate subjects across question types within same block:
- Default: Dog, Boy, Teacher
- Rotation 1: Cat, Girl, Farmer
- Rotation 2: Bird, Child, Doctor

### Pattern 2: Context Rotation
Rotate settings while maintaining difficulty:
- Default: School context
- Rotation 1: Home context
- Rotation 2: Park/Nature context

### Pattern 3: Semantic Field Rotation
Rotate vocabulary categories:
- Default: Animals (dog, cat, bird)
- Rotation 1: People (boy, girl, teacher)
- Rotation 2: Objects (ball, book, car)

---

## Quality Assurance Checklist

Before adding any rotation set, verify:

### Content Validation
- [ ] All words from PAL curriculum word lists
- [ ] Difficulty tier matches block level (EASY/MEDIUM/HARD)
- [ ] Age-appropriate language (Grade 2-4 reading level)
- [ ] Culturally relevant to Gujarat/India context

### Difficulty Consistency
- [ ] Word length similar to default set
- [ ] Sentence complexity matches default
- [ ] Cognitive load equivalent
- [ ] Distractor difficulty consistent

### Rotation Quality
- [ ] No vocabulary overlap with other sets in same block
- [ ] Structural format identical to default
- [ ] Different context/subject from other sets
- [ ] Grammatically correct

### Pedagogical Soundness
- [ ] Clear correct answer
- [ ] Plausible distractors (not obviously wrong)
- [ ] Meaningful explanation provided
- [ ] Aligned with learning objective

---

## Lesson-Specific Progression Rules

### Lesson 1: Decoding Multi-Syllable Words

**Block 0 (EASY):** 2 syllables, familiar words (basket, water, happy)
**Block 1 (MEDIUM):** 2-3 syllables, school/life words (market, holiday, evening)
**Block 2 (HARD):** 3-4 syllables, stretch words (remember, tomorrow, information)

**Rotation Priority:** Change words, maintain syllable count.

---

### Lesson 2: Vocabulary in Context

**Block 0 (EASY):** Concrete adjectives (hungry, tired, wet, dry)
**Block 1 (MEDIUM):** Feelings & behavior (careful, worried, excited)
**Block 2 (HARD):** Emotions & thinking (confused, patient, confident)

**Rotation Priority:** Change vocabulary within semantic tier, maintain sentence context type.

---

### Lesson 3: Reading Short Paragraphs

**Block 0 (EASY):** 2-3 sentences, who/what questions
**Block 1 (MEDIUM):** 4-5 sentences, where/when/what happened
**Block 2 (HARD):** 5-6 sentences, why/how (inference)

**Rotation Priority:** Different story contexts (home → school → park), maintain comprehension level.

---

### Lesson 4: Sentence Expansion

**Block 0 (EASY):** Add adjective to 3-word sentence
**Block 1 (MEDIUM):** Add adverb to 4-5 word sentence
**Block 2 (HARD):** Add multiple words to complex sentence

**Rotation Priority:** Different base subjects/verbs, maintain grammatical expansion type.

---

### Lesson 5: Reading → Writing Connection

**Block 0 (EASY):** 2-3 sentences, literal recall
**Block 1 (MEDIUM):** 4-5 sentences, connected events
**Block 2 (HARD):** 5-6 sentences, causal reasoning (why/how)

**Rotation Priority:** Different story themes (friendship → family → school), maintain inference depth.

---

## Common Mistakes to Avoid

### ❌ Don't Do This:

1. **Mixing Difficulty Tiers:**
   - Default: 2-syllable words
   - Rotation: 4-syllable words ← Wrong tier!

2. **Changing Question Structure:**
   - Default: SVO sentence (3 words)
   - Rotation: SVO + prepositional phrase (6 words) ← Changed structure!

3. **Vocabulary Overlap:**
   - Default: hungry, tired
   - Rotation: tired, sleepy ← "tired" repeated!

4. **Cultural Mismatch:**
   - Using "snow" in Gujarat context ← Not relevant!

5. **Inconsistent Answer Count:**
   - Default: 3 options
   - Rotation: 4 options ← Different format!

### ✅ Do This Instead:

1. **Maintain Tier:** All Block 0 sets use EASY words
2. **Preserve Structure:** Same word count, same grammar pattern
3. **No Overlap:** Completely different vocabulary between sets
4. **Cultural Relevance:** Use familiar contexts (school, home, market)
5. **Consistent Format:** Same number of options, same interaction pattern

---

## Rotation Set Creation Workflow

### Step 1: Identify Block Difficulty Tier
- Determine if block is EASY, MEDIUM, or HARD
- Review default question set structure

### Step 2: Select Vocabulary Pool
- Pull words from PAL curriculum lists for that tier
- Exclude words already used in default or other rotation sets

### Step 3: Create Structurally Identical Questions
- Copy default question structure
- Replace only content (words, sentences, stories)
- Keep format, options count, interaction type identical

### Step 4: Validate Difficulty
- Compare to default: Is cognitive load similar?
- Check word frequency: Are words equally familiar/unfamiliar?
- Test with sample student: Do they perceive similar difficulty?

### Step 5: Quality Check
- Run through QA checklist above
- Verify no overlap
- Confirm curriculum alignment

### Step 6: Document Rationale
- Note why this vocabulary was chosen
- Explain how difficulty is maintained
- Record semantic field or context theme

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-08 | Initial documentation for all 10 question types |

---

## References

- [QUESTION-TYPES-REFERENCE.md](./QUESTION-TYPES-REFERENCE.md)
- [ROTATION-SETS-PEDAGOGY.md](./ROTATION-SETS-PEDAGOGY.md)
- [Grade 4 English PAL-Integrated Lesson Plans.pdf](../assets/Grade%204%20English%20PAL-Integrated%20Lesson%20Plans.pdf)

---

**Document Owner:** Development Team
**Approved By:** Curriculum Team
**Next Review Date:** After Phase 1 implementation completion
