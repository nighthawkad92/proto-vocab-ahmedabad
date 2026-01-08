-- Master Integration File: Lessons 2-5
-- This file integrates all 20 test questions into their appropriate lessons
-- Based on: Grade 4 English PAL-Integrated Lesson Plans PDF
--
-- Usage: Run this file in Supabase SQL Editor to update Lessons 2-5
-- Note: This will DELETE and recreate Lessons 2-5, and remove the test lesson
--
-- Lesson Distribution:
-- - Lesson 2: Vocabulary in Context (4 sentence-gap-fill questions)
-- - Lesson 3: Reading Short Paragraphs (4 reading-comprehension questions)
-- - Lesson 4: Sentence Expansion (8 questions: 4 sentence-rearrange + 4 add-word)
-- - Lesson 5: Reading-Writing Connection (4 story-sequence questions)
-- Total: 20 questions integrated

-- ============================================================================
-- CLEANUP: REMOVE TEST LESSON
-- ============================================================================

-- Remove the standalone "Test Lesson - New Question Types"
-- All questions from this test lesson are now integrated into Lessons 2-5
DELETE FROM lessons
WHERE title = 'Test Lesson - New Question Types'
   OR (title LIKE '%Test Lesson%' AND "order" = 0);

-- ============================================================================
-- LESSON 2: VOCABULARY IN CONTEXT
-- ============================================================================

DELETE FROM lessons WHERE title = 'Vocabulary in Context' OR "order" = 2;

INSERT INTO lessons (title, description, grade, "order", content) VALUES (
  'Vocabulary in Context',
  'I can understand and use new words',
  4,
  2,
  '{
    "title": "Vocabulary in Context",
    "description": "Learn word meanings and use them in sentences",
    "rotationEnabled": false,
    "blocks": [
      {
        "blockNumber": 0,
        "introduction": {
          "concept": "Understanding Words in Context",
          "explanation": "Words have meanings. We use them to tell about things we see, feel, and do. When we pick the right word, others understand us better!",
          "example": "I am hungry after playing → ''hungry'' tells us we want food",
          "activity": "Choose the word that fits best in each sentence"
        },
        "questions": [
          {
            "id": "l2b0q1",
            "type": "sentence-gap-fill",
            "prompt": "Choose the word that best completes the sentence",
            "baseSentence": "I am ___ after playing outside.",
            "gapPosition": 2,
            "options": ["hungry", "happy", "fast", "old"],
            "correctAnswer": "hungry",
            "explanation": "After playing, we feel hungry because we used energy."
          },
          {
            "id": "l2b0q2",
            "type": "sentence-gap-fill",
            "prompt": "Choose the word that makes the most sense",
            "baseSentence": "The road is ___ because of the rain.",
            "gapPosition": 3,
            "options": ["wet", "dry", "hot", "fast"],
            "correctAnswer": "wet",
            "explanation": "Rain makes things wet, not dry."
          }
        ]
      },
      {
        "blockNumber": 1,
        "introduction": {
          "concept": "Feelings and Behavior Words",
          "explanation": "Some words tell us how people feel or act. These words help us understand why someone does something.",
          "example": "Be careful while crossing → ''careful'' means paying attention to stay safe",
          "activity": "Pick words that tell about feelings or how to behave"
        },
        "questions": [
          {
            "id": "l2b1q1",
            "type": "sentence-gap-fill",
            "prompt": "Choose the best word to complete the sentence",
            "baseSentence": "Be ___ while crossing the road.",
            "gapPosition": 1,
            "options": ["careful", "noisy", "angry", "sleepy"],
            "correctAnswer": "careful",
            "explanation": "We should be careful on the road to stay safe."
          }
        ]
      },
      {
        "blockNumber": 2,
        "introduction": {
          "concept": "Thinking and Emotion Words",
          "explanation": "Some words describe how our mind works or how we feel inside. These words are more difficult, but they help us talk about our thoughts!",
          "example": "I felt confused by the question → ''confused'' means not understanding clearly",
          "activity": "Choose words that show thinking or deep feelings"
        },
        "questions": [
          {
            "id": "l2b2q1",
            "type": "sentence-gap-fill",
            "prompt": "Choose the word that fits best",
            "baseSentence": "I felt ___ by the difficult question.",
            "gapPosition": 2,
            "options": ["confused", "confident", "curious", "calm"],
            "correctAnswer": "confused",
            "explanation": "Difficult questions make us feel confused because they are hard to understand."
          }
        ]
      }
    ]
  }'
) ON CONFLICT DO NOTHING;

-- ============================================================================
-- LESSON 3: READING SHORT PARAGRAPHS
-- ============================================================================

DELETE FROM lessons WHERE title = 'Reading Short Paragraphs' OR "order" = 3;

INSERT INTO lessons (title, description, grade, "order", content) VALUES (
  'Reading Short Paragraphs',
  'I can read a short paragraph and tell what it is about',
  4,
  3,
  '{
    "title": "Reading Short Paragraphs",
    "description": "Read stories and answer questions about them",
    "rotationEnabled": false,
    "blocks": [
      {
        "blockNumber": 0,
        "introduction": {
          "concept": "Reading and Understanding Stories",
          "explanation": "When we read, we can find out WHO is in the story and WHAT they did. Reading carefully helps us remember!",
          "example": "Story: Ravi went to the park → WHO? Ravi → WHAT? Went to the park",
          "activity": "Read each short story and answer the question"
        },
        "questions": [
          {
            "id": "l3b0q1",
            "type": "reading-comprehension",
            "prompt": "Read the story and answer: Who is in the story?",
            "passage": "Ravi went to the park. He played with his ball.",
            "questionType": "who",
            "options": ["Ravi", "The teacher", "The farmer", "A dog"],
            "correctAnswer": "Ravi",
            "explanation": "The story says ''Ravi went to the park''."
          },
          {
            "id": "l3b0q2",
            "type": "reading-comprehension",
            "prompt": "Read the story and answer: What did the dog do?",
            "passage": "The dog was in the garden. He saw a ball. The dog ran to catch the ball.",
            "questionType": "what",
            "options": ["Ran to catch the ball", "Went to school", "Ate food", "Slept under a tree"],
            "correctAnswer": "Ran to catch the ball",
            "explanation": "The story says ''The dog ran to catch the ball''."
          }
        ]
      },
      {
        "blockNumber": 1,
        "introduction": {
          "concept": "Understanding What Happened First",
          "explanation": "Stories have a beginning, middle, and end. We need to remember what happened first, then next.",
          "example": "Farmer woke up → went to field → watered plants. FIRST = woke up",
          "activity": "Read the story and find what happened at the beginning"
        },
        "questions": [
          {
            "id": "l3b1q1",
            "type": "reading-comprehension",
            "prompt": "Read the story and answer: What did the farmer do first?",
            "passage": "The farmer woke up early in the morning. He went to his field. He watered the vegetable plants. The sun was shining brightly.",
            "questionType": "what",
            "options": ["He watered the plants", "He woke up early", "He went to the market", "He cooked food"],
            "correctAnswer": "He woke up early",
            "explanation": "The story says the farmer ''woke up early in the morning'' first."
          }
        ]
      },
      {
        "blockNumber": 2,
        "introduction": {
          "concept": "Understanding Why Things Happen",
          "explanation": "Sometimes the story tells us WHY someone felt happy or sad. We need to read carefully to find the reason!",
          "example": "Meena lost her bag → felt worried. Found her bag → felt happy. WHY happy? Because she found it!",
          "activity": "Read and find the reason WHY something happened"
        },
        "questions": [
          {
            "id": "l3b2q1",
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
            "explanation": "Meena felt happy because she found her lost bag. This is why she was happy."
          }
        ]
      }
    ]
  }'
) ON CONFLICT DO NOTHING;

-- ============================================================================
-- LESSON 4: SENTENCE EXPANSION
-- ============================================================================

DELETE FROM lessons WHERE title = 'Sentence Expansion' OR "order" = 4;

INSERT INTO lessons (title, description, grade, "order", content) VALUES (
  'Sentence Expansion',
  'I can make my sentence better',
  4,
  4,
  '{
    "title": "Sentence Expansion",
    "description": "Build sentences and make them more interesting",
    "rotationEnabled": false,
    "blocks": [
      {
        "blockNumber": 0,
        "introduction": {
          "concept": "Building Sentences in the Right Order",
          "explanation": "Words need to be in the right order to make sense. When we put them correctly, everyone understands!",
          "example": "runs dog The → WRONG. The dog runs → CORRECT!",
          "activity": "Arrange words to make proper sentences"
        },
        "questions": [
          {
            "id": "l4b0q1",
            "type": "sentence-rearrange",
            "prompt": "Arrange the words to make a sentence",
            "scrambledItems": ["runs", "dog", "The"],
            "correctOrder": [2, 1, 0],
            "correctAnswer": "The dog runs",
            "explanation": "Sentences start with ''The'', then the subject ''dog'', then the verb ''runs''."
          },
          {
            "id": "l4b0q2",
            "type": "sentence-rearrange",
            "prompt": "Arrange the words to make a sentence",
            "scrambledItems": ["flies", "The", "bird", "fast"],
            "correctOrder": [1, 2, 0, 3],
            "correctAnswer": "The bird flies fast",
            "explanation": "The correct order is: The bird flies fast."
          }
        ]
      },
      {
        "blockNumber": 1,
        "introduction": {
          "concept": "Adding Describing Words",
          "explanation": "We can make sentences better by adding words that describe. Describing words tell us WHAT KIND of thing we''re talking about!",
          "example": "The dog runs → The BIG dog runs (''big'' tells us what kind of dog)",
          "activity": "Add describing words to make sentences better"
        },
        "questions": [
          {
            "id": "l4b1q1",
            "type": "add-word",
            "prompt": "Add a describing word to make the sentence better",
            "exampleSentence": "The big dog runs",
            "baseSentence": "The dog runs",
            "wordType": "adjective",
            "insertPosition": 1,
            "options": ["big", "small", "brown", "happy"],
            "correctAnswers": ["big", "small", "brown", "happy"],
            "correctAnswer": "big",
            "explanation": "Describing words tell us more about the dog. ''The big dog runs'' sounds better!"
          },
          {
            "id": "l4b1q2",
            "type": "add-word",
            "prompt": "Add a word to describe the cat",
            "exampleSentence": "The lazy cat sleeps",
            "baseSentence": "The cat sleeps",
            "wordType": "adjective",
            "insertPosition": 1,
            "options": ["fat", "lazy", "soft", "white"],
            "correctAnswers": ["fat", "lazy", "soft", "white"],
            "correctAnswer": "lazy",
            "explanation": "All these words can describe the cat. ''The lazy cat sleeps'' makes sense!"
          }
        ]
      },
      {
        "blockNumber": 2,
        "introduction": {
          "concept": "Making Longer Sentences",
          "explanation": "Sentences can have describing words AND words that tell HOW something happens. This makes them even better!",
          "example": "The boy runs → The BIG boy runs QUICKLY (describing + how)",
          "activity": "Arrange words with adjectives and adverbs"
        },
        "questions": [
          {
            "id": "l4b2q1",
            "type": "sentence-rearrange",
            "prompt": "Arrange the words to make a sentence",
            "scrambledItems": ["boy", "quickly", "runs", "The", "big"],
            "correctOrder": [3, 4, 0, 2, 1],
            "correctAnswer": "The big boy runs quickly",
            "explanation": "Adjectives (big) come before nouns (boy). Adverbs (quickly) usually come after verbs (runs)."
          },
          {
            "id": "l4b2q2",
            "type": "add-word",
            "prompt": "Add a word to tell HOW the boy runs",
            "exampleSentence": "The boy runs quickly",
            "baseSentence": "The boy runs",
            "wordType": "adverb",
            "insertPosition": 3,
            "options": ["quickly", "slowly", "happily", "loudly"],
            "correctAnswers": ["quickly", "slowly"],
            "correctAnswer": "quickly",
            "explanation": "Adverbs tell us HOW something happens. ''The boy runs quickly'' tells us he runs fast."
          }
        ]
      },
      {
        "blockNumber": 3,
        "introduction": {
          "concept": "Adding Where and When",
          "explanation": "We can also add words that tell WHERE or WHEN something happens. This gives more information!",
          "example": "The boy runs → The boy runs IN THE PARK (tells WHERE)",
          "activity": "Make complete sentences with place and time words"
        },
        "questions": [
          {
            "id": "l4b3q1",
            "type": "sentence-rearrange",
            "prompt": "Arrange the words to make a sentence",
            "scrambledItems": ["in", "runs", "boy", "the", "The", "park"],
            "correctOrder": [4, 2, 1, 0, 3, 5],
            "correctAnswer": "The boy runs in the park",
            "explanation": "The subject comes first, then verb, then prepositional phrase (in the park)."
          },
          {
            "id": "l4b3q2",
            "type": "add-word",
            "prompt": "Make this sentence more interesting by adding a word",
            "exampleSentence": "The girl sings beautifully at the function",
            "baseSentence": "The girl sings at the function",
            "wordType": "adverb",
            "insertPosition": 3,
            "options": ["beautifully", "loudly", "softly", "nervously"],
            "correctAnswers": ["beautifully"],
            "correctAnswer": "beautifully",
            "explanation": "At a function, someone usually sings beautifully for the audience. This fits best!"
          }
        ]
      }
    ]
  }'
) ON CONFLICT DO NOTHING;

-- ============================================================================
-- LESSON 5: READING → WRITING CONNECTION
-- ============================================================================

DELETE FROM lessons WHERE title = 'Reading and Writing Connection' OR "order" = 5;

INSERT INTO lessons (title, description, grade, "order", content) VALUES (
  'Reading and Writing Connection',
  'I can read and write about the same idea',
  4,
  5,
  '{
    "title": "Reading and Writing Connection",
    "description": "Read stories and put events in the right order",
    "rotationEnabled": false,
    "blocks": [
      {
        "blockNumber": 0,
        "introduction": {
          "concept": "Understanding Story Order",
          "explanation": "Stories happen in order: First this, then that, finally this. When we put events in the right order, the story makes sense!",
          "example": "Ravi woke up → brushed teeth → ate breakfast. This is the correct order!",
          "activity": "Read the story and arrange the events from first to last"
        },
        "questions": [
          {
            "id": "l5b0q1",
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
            "explanation": "First he woke up, then brushed teeth, then ate breakfast and went to school."
          },
          {
            "id": "l5b0q2",
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
            "explanation": "First she went to the park, then played, then went home."
          }
        ]
      },
      {
        "blockNumber": 1,
        "introduction": {
          "concept": "Following Longer Stories",
          "explanation": "Some stories have more steps. We need to remember what happened first, second, third, and so on.",
          "example": "Farmer planted seeds → watered them → plants grew → harvested vegetables. Four steps!",
          "activity": "Put all the events in order from beginning to end"
        },
        "questions": [
          {
            "id": "l5b1q1",
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
            "explanation": "First plant seeds, then water them, then they grow, then harvest."
          }
        ]
      },
      {
        "blockNumber": 2,
        "introduction": {
          "concept": "Understanding Stories with Problems and Solutions",
          "explanation": "Some stories tell about a problem and how it was solved. We need to understand: what was the problem? what happened? how did it end?",
          "example": "Meena worried about test → studied hard → took test → got good score → felt happy",
          "activity": "Arrange the story from problem to solution"
        },
        "questions": [
          {
            "id": "l5b2q1",
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
            "explanation": "Meena was worried, so she studied. On test day she took the test, got a good score, and felt happy."
          }
        ]
      }
    ]
  }'
) ON CONFLICT DO NOTHING;

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Show all updated lessons
SELECT
  id,
  title,
  grade,
  "order",
  description,
  jsonb_array_length(content->'blocks') as block_count
FROM lessons
WHERE "order" BETWEEN 2 AND 5
ORDER BY "order";

-- Show question counts per lesson
SELECT
  l.title as lesson,
  l."order",
  b.value->>'blockNumber' as block,
  jsonb_array_length(b.value->'questions') as question_count,
  jsonb_agg(q.value->>'type') as question_types
FROM lessons l,
     jsonb_array_elements(l.content->'blocks') b,
     jsonb_array_elements(b.value->'questions') q
WHERE l."order" BETWEEN 2 AND 5
GROUP BY l.title, l."order", b.value->>'blockNumber'
ORDER BY l."order"::int, (b.value->>'blockNumber')::int;
