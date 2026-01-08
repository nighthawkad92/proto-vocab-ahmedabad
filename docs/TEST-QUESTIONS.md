# Test Questions for New Question Types

**Purpose:** Initial test questions to validate all 5 new question type components
**Created:** 2026-01-08
**Status:** Ready for testing

---

## Test Strategy

These questions are designed to:
1. Validate each component renders correctly
2. Test basic functionality (drag-drop, selection, etc.)
3. Verify audio integration
4. Test validation logic
5. Ensure UI responsiveness

**Format:** JSON compatible with database schema

---

## Sentence Rearrange Test Questions (4)

### Test 1: EASY - Simple 3-word sentence
```json
{
  "id": "test-sr-1",
  "type": "sentence-rearrange",
  "prompt": "Arrange the words to make a sentence",
  "scrambledItems": ["runs", "dog", "The"],
  "correctOrder": [2, 1, 0],
  "correctAnswer": "The dog runs",
  "explanation": "Sentences start with 'The', then the subject 'dog', then the verb 'runs'.",
  "options": []
}
```

### Test 2: EASY - Simple 4-word sentence
```json
{
  "id": "test-sr-2",
  "type": "sentence-rearrange",
  "prompt": "Arrange the words to make a sentence",
  "scrambledItems": ["flies", "The", "bird", "fast"],
  "correctOrder": [1, 2, 0, 3],
  "correctAnswer": "The bird flies fast",
  "explanation": "The correct order is: The bird flies fast.",
  "options": []
}
```

### Test 3: MEDIUM - 5-word sentence with adjective
```json
{
  "id": "test-sr-3",
  "type": "sentence-rearrange",
  "prompt": "Arrange the words to make a sentence",
  "scrambledItems": ["boy", "quickly", "runs", "The", "big"],
  "correctOrder": [3, 4, 0, 2, 1],
  "correctAnswer": "The big boy runs quickly",
  "explanation": "Adjectives (big) come before nouns (boy). Adverbs (quickly) usually come after verbs (runs).",
  "options": []
}
```

### Test 4: HARD - 6-word sentence with prepositional phrase
```json
{
  "id": "test-sr-4",
  "type": "sentence-rearrange",
  "prompt": "Arrange the words to make a sentence",
  "scrambledItems": ["in", "runs", "boy", "the", "The", "park"],
  "correctOrder": [4, 2, 1, 0, 3, 5],
  "correctAnswer": "The boy runs in the park",
  "explanation": "The subject comes first, then verb, then prepositional phrase (in the park).",
  "options": []
}
```

---

## Story Sequence Test Questions (4)

### Test 1: EASY - 3 events (morning routine)
```json
{
  "id": "test-ss-1",
  "type": "story-sequence",
  "prompt": "Put the events in the correct order",
  "passage": "Ravi woke up in the morning. He brushed his teeth. Then he ate breakfast and went to school.",
  "scrambledItems": [
    "Ravi ate breakfast and went to school",
    "Ravi woke up",
    "Ravi brushed his teeth"
  ],
  "correctOrder": [1, 2, 0],
  "correctAnswer": "1,2,0",
  "explanation": "First he woke up, then brushed teeth, then ate breakfast and went to school.",
  "options": []
}
```

### Test 2: EASY - 3 events (simple story)
```json
{
  "id": "test-ss-2",
  "type": "story-sequence",
  "prompt": "Put the story events in order",
  "passage": "The girl went to the park. She played on the swing. Then she went home.",
  "scrambledItems": [
    "The girl went home",
    "The girl played on the swing",
    "The girl went to the park"
  ],
  "correctOrder": [2, 1, 0],
  "correctAnswer": "2,1,0",
  "explanation": "First she went to the park, then played, then went home.",
  "options": []
}
```

### Test 3: MEDIUM - 4 events (farming process)
```json
{
  "id": "test-ss-3",
  "type": "story-sequence",
  "prompt": "Put the events in the correct order",
  "passage": "A farmer wanted to grow vegetables. He planted seeds in his field. He watered them every day. The plants grew tall and he harvested the vegetables.",
  "scrambledItems": [
    "The farmer harvested the vegetables",
    "The farmer planted seeds",
    "The plants grew tall",
    "The farmer watered the seeds every day"
  ],
  "correctOrder": [1, 3, 2, 0],
  "correctAnswer": "1,3,2,0",
  "explanation": "First plant seeds, then water them, then they grow, then harvest.",
  "options": []
}
```

### Test 4: HARD - 5 events (emotional narrative with inference)
```json
{
  "id": "test-ss-4",
  "type": "story-sequence",
  "prompt": "Put the story events in order",
  "passage": "Meena was worried about her math test. She studied hard every night. On test day, the teacher gave out the papers. Meena answered all the questions carefully. She got a good score and felt very happy.",
  "scrambledItems": [
    "Meena felt very happy",
    "Meena was worried about the test",
    "Meena studied hard every night",
    "The teacher gave out the test papers",
    "Meena got a good score"
  ],
  "correctOrder": [1, 2, 3, 4, 0],
  "correctAnswer": "1,2,3,4,0",
  "explanation": "Meena was worried, so she studied. On test day she took the test, got a good score, and felt happy.",
  "options": []
}
```

---

## Sentence Gap Fill Test Questions (4)

### Test 1: EASY - Observable state (hungry)
```json
{
  "id": "test-sgf-1",
  "type": "sentence-gap-fill",
  "prompt": "Choose the word that best completes the sentence",
  "baseSentence": "I am ___ after playing outside.",
  "gapPosition": 2,
  "options": ["hungry", "happy", "fast", "old"],
  "correctAnswer": "hungry",
  "explanation": "After playing, we feel hungry because we used energy.",
  "imageUrl": ""
}
```

### Test 2: EASY - Weather effect (wet)
```json
{
  "id": "test-sgf-2",
  "type": "sentence-gap-fill",
  "prompt": "Choose the word that makes the most sense",
  "baseSentence": "The road is ___ because of the rain.",
  "gapPosition": 3,
  "options": ["wet", "dry", "hot", "fast"],
  "correctAnswer": "wet",
  "explanation": "Rain makes things wet, not dry.",
  "imageUrl": ""
}
```

### Test 3: MEDIUM - Safety behavior (careful)
```json
{
  "id": "test-sgf-3",
  "type": "sentence-gap-fill",
  "prompt": "Choose the best word to complete the sentence",
  "baseSentence": "Be ___ while crossing the road.",
  "gapPosition": 1,
  "options": ["careful", "noisy", "angry", "sleepy"],
  "correctAnswer": "careful",
  "explanation": "We should be careful on the road to stay safe.",
  "imageUrl": ""
}
```

### Test 4: HARD - Complex emotion (confused)
```json
{
  "id": "test-sgf-4",
  "type": "sentence-gap-fill",
  "prompt": "Choose the word that fits best",
  "baseSentence": "I felt ___ by the difficult question.",
  "gapPosition": 2,
  "options": ["confused", "confident", "curious", "calm"],
  "correctAnswer": "confused",
  "explanation": "Difficult questions make us feel confused because they are hard to understand.",
  "imageUrl": ""
}
```

---

## Reading Comprehension Test Questions (4)

### Test 1: EASY - Who question (2 sentences)
```json
{
  "id": "test-rc-1",
  "type": "reading-comprehension",
  "prompt": "Read the story and answer: Who is in the story?",
  "passage": "Ravi went to the park. He played with his ball.",
  "questionType": "who",
  "options": ["Ravi", "The teacher", "The farmer", "A dog"],
  "correctAnswer": "Ravi",
  "explanation": "The story says 'Ravi went to the park'.",
  "imageUrl": ""
}
```

### Test 2: EASY - What question (3 sentences)
```json
{
  "id": "test-rc-2",
  "type": "reading-comprehension",
  "prompt": "Read the story and answer: What did the dog do?",
  "passage": "The dog was in the garden. He saw a ball. The dog ran to catch the ball.",
  "questionType": "what",
  "options": ["Ran to catch the ball", "Went to school", "Ate food", "Slept under a tree"],
  "correctAnswer": "Ran to catch the ball",
  "explanation": "The story says 'The dog ran to catch the ball'.",
  "imageUrl": ""
}
```

### Test 3: MEDIUM - What happened (4 sentences)
```json
{
  "id": "test-rc-3",
  "type": "reading-comprehension",
  "prompt": "Read the story and answer: What did the farmer do first?",
  "passage": "The farmer woke up early in the morning. He went to his field. He watered the vegetable plants. The sun was shining brightly.",
  "questionType": "what",
  "options": ["He watered the plants", "He woke up early", "He went to the market", "He cooked food"],
  "correctAnswer": "He woke up early",
  "explanation": "The story says the farmer 'woke up early in the morning' first.",
  "imageUrl": ""
}
```

### Test 4: HARD - Why question (5 sentences, inference)
```json
{
  "id": "test-rc-4",
  "type": "reading-comprehension",
  "prompt": "Read the story and answer: Why did Meena feel happy?",
  "passage": "Meena was worried about her lost bag. She looked everywhere but could not find it. Her brother helped her search. Finally, they found it under the bed. Meena felt very happy and thanked her brother.",
  "questionType": "why",
  "options": [
    "Because she found her bag",
    "Because she went to school",
    "Because it was raining",
    "Because she was hungry"
  ],
  "correctAnswer": "Because she found her bag",
  "explanation": "Meena felt happy because she found her lost bag. This is why she was happy.",
  "imageUrl": ""
}
```

---

## Add Word Activity Test Questions (4)

### Test 1: EASY - Add adjective (color/size)
```json
{
  "id": "test-aw-1",
  "type": "add-word",
  "prompt": "Add a describing word to make the sentence better",
  "baseSentence": "The dog runs",
  "wordType": "adjective",
  "insertPosition": 1,
  "options": ["big", "small", "brown", "happy"],
  "correctAnswers": ["big", "small", "brown", "happy"],
  "correctAnswer": "big",
  "explanation": "Describing words tell us more about the dog. 'The big dog runs' sounds better!",
  "imageUrl": ""
}
```

### Test 2: EASY - Add adjective (quality)
```json
{
  "id": "test-aw-2",
  "type": "add-word",
  "prompt": "Add a word to describe the cat",
  "baseSentence": "The cat sleeps",
  "wordType": "adjective",
  "insertPosition": 1,
  "options": ["fat", "lazy", "soft", "white"],
  "correctAnswers": ["fat", "lazy", "soft", "white"],
  "correctAnswer": "lazy",
  "explanation": "All these words can describe the cat. 'The lazy cat sleeps' makes sense!",
  "imageUrl": ""
}
```

### Test 3: MEDIUM - Add adverb (how)
```json
{
  "id": "test-aw-3",
  "type": "add-word",
  "prompt": "Add a word to tell HOW the boy runs",
  "baseSentence": "The boy runs",
  "wordType": "adverb",
  "insertPosition": 3,
  "options": ["quickly", "slowly", "happily", "loudly"],
  "correctAnswers": ["quickly", "slowly"],
  "correctAnswer": "quickly",
  "explanation": "Adverbs tell us HOW something happens. 'The boy runs quickly' tells us he runs fast.",
  "imageUrl": ""
}
```

### Test 4: HARD - Add adverb to complex sentence
```json
{
  "id": "test-aw-4",
  "type": "add-word",
  "prompt": "Make this sentence more interesting by adding a word",
  "baseSentence": "The girl sings at the function",
  "wordType": "adverb",
  "insertPosition": 3,
  "options": ["beautifully", "loudly", "softly", "nervously"],
  "correctAnswers": ["beautifully"],
  "correctAnswer": "beautifully",
  "explanation": "At a function, someone usually sings beautifully for the audience. This fits best!",
  "imageUrl": ""
}
```

---

## Testing Checklist

### For Each Question Type:

**Sentence Rearrange**
- [ ] Words display as draggable cards
- [ ] Drag and reorder works (touch + mouse)
- [ ] Preview sentence updates in real-time
- [ ] Submit validates correct order
- [ ] Audio plays for prompt
- [ ] Keyboard navigation works

**Story Sequence**
- [ ] Passage displays with "Read again" button
- [ ] Events display with position labels (First, Then, etc.)
- [ ] Drag and reorder works
- [ ] Passage audio plays on "Read again"
- [ ] Submit validates correct sequence
- [ ] Keyboard navigation works

**Sentence Gap Fill**
- [ ] Gap displays visually (blank box)
- [ ] Word buttons are touch-friendly
- [ ] Selected word fills gap in preview
- [ ] Submit validates correct word
- [ ] Audio plays for prompt
- [ ] Visual feedback for selection

**Reading Comprehension**
- [ ] Passage displays in scrollable container
- [ ] "Read again" button works
- [ ] Question type badge displays (Who?, What?, etc.)
- [ ] Answer options are touch-friendly
- [ ] Submit validates correct answer
- [ ] Passage audio plays

**Add Word Activity**
- [ ] Base sentence displays with insertion point
- [ ] Insertion point is visually clear (arrow)
- [ ] Word bank is touch-friendly
- [ ] Preview shows expanded sentence
- [ ] Submit validates correct word
- [ ] Multiple correct answers accepted (test-aw-1, test-aw-2)
- [ ] Audio plays for prompt

---

## Integration Testing

### Test Flow:
1. Create a test lesson with these 20 questions
2. Load lesson in student view
3. Go through each question type
4. Verify all interactions work
5. Check audio playback
6. Test on tablet (iPad/Android)

### Expected Behavior:
- All components render without errors
- Drag-drop feels smooth and responsive
- Touch targets are easily tappable
- Audio doesn't overlap
- Feedback is immediate
- Transitions are smooth

---

## Next Steps After Testing

1. **Fix any bugs found** during testing
2. **Adjust UI/UX** based on feel
3. **Create full question sets** (288 questions)
4. **Generate TTS audio** for all questions
5. **Update database** with all content
6. **Deploy to staging** for teacher testing

---

**Test Status:** Ready for validation
**Created:** 2026-01-08
**Questions:** 20 test questions (4 per type × 5 types)
