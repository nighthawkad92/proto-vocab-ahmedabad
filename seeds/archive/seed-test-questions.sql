-- Test Questions for New Question Type Components
-- Purpose: Initial validation of all 5 new question type components
-- Created: 2026-01-08
-- Usage: Run this SQL in Supabase to create a test lesson with 20 questions (4 per new type)

-- Insert test lesson with all 20 test questions
INSERT INTO lessons (title, description, grade, "order", content) VALUES (
  'Test Lesson - New Question Types',
  'Validation lesson for sentence-rearrange, story-sequence, sentence-gap-fill, reading-comprehension, and add-word components',
  4,
  0,
  '{
    "title": "Test Lesson - New Question Types",
    "description": "Testing all 5 new question type components",
    "rotationEnabled": false,
    "blocks": [
      {
        "blockNumber": 0,
        "introduction": {
          "concept": "New Question Types - EASY Level",
          "explanation": "This block tests all 5 new question types at EASY difficulty",
          "example": "Drag words, select answers, read stories",
          "activity": "Complete each question to validate the component works"
        },
        "questions": [
          {
            "id": "test-sr-1",
            "type": "sentence-rearrange",
            "prompt": "Arrange the words to make a sentence",
            "scrambledItems": ["runs", "dog", "The"],
            "correctOrder": [2, 1, 0],
            "correctAnswer": "The dog runs",
            "explanation": "Sentences start with \"The\", then the subject \"dog\", then the verb \"runs\"."
          },
          {
            "id": "test-sr-2",
            "type": "sentence-rearrange",
            "prompt": "Arrange the words to make a sentence",
            "scrambledItems": ["flies", "The", "bird", "fast"],
            "correctOrder": [1, 2, 0, 3],
            "correctAnswer": "The bird flies fast",
            "explanation": "The correct order is: The bird flies fast."
          },
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
            "explanation": "First he woke up, then brushed teeth, then ate breakfast and went to school."
          },
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
            "explanation": "First she went to the park, then played, then went home."
          },
          {
            "id": "test-sgf-1",
            "type": "sentence-gap-fill",
            "prompt": "Choose the word that best completes the sentence",
            "baseSentence": "I am ___ after playing outside.",
            "gapPosition": 2,
            "options": ["hungry", "happy", "fast", "old"],
            "correctAnswer": "hungry",
            "explanation": "After playing, we feel hungry because we used energy."
          },
          {
            "id": "test-sgf-2",
            "type": "sentence-gap-fill",
            "prompt": "Choose the word that makes the most sense",
            "baseSentence": "The road is ___ because of the rain.",
            "gapPosition": 3,
            "options": ["wet", "dry", "hot", "fast"],
            "correctAnswer": "wet",
            "explanation": "Rain makes things wet, not dry."
          },
          {
            "id": "test-rc-1",
            "type": "reading-comprehension",
            "prompt": "Read the story and answer: Who is in the story?",
            "passage": "Ravi went to the park. He played with his ball.",
            "questionType": "who",
            "options": ["Ravi", "The teacher", "The farmer", "A dog"],
            "correctAnswer": "Ravi",
            "explanation": "The story says \"Ravi went to the park\"."
          },
          {
            "id": "test-rc-2",
            "type": "reading-comprehension",
            "prompt": "Read the story and answer: What did the dog do?",
            "passage": "The dog was in the garden. He saw a ball. The dog ran to catch the ball.",
            "questionType": "what",
            "options": ["Ran to catch the ball", "Went to school", "Ate food", "Slept under a tree"],
            "correctAnswer": "Ran to catch the ball",
            "explanation": "The story says \"The dog ran to catch the ball\"."
          },
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
            "explanation": "Describing words tell us more about the dog. \"The big dog runs\" sounds better!"
          },
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
            "explanation": "All these words can describe the cat. \"The lazy cat sleeps\" makes sense!"
          }
        ]
      },
      {
        "blockNumber": 1,
        "questions": [
          {
            "id": "test-sr-3",
            "type": "sentence-rearrange",
            "prompt": "Arrange the words to make a sentence",
            "scrambledItems": ["boy", "quickly", "runs", "The", "big"],
            "correctOrder": [3, 4, 0, 2, 1],
            "correctAnswer": "The big boy runs quickly",
            "explanation": "Adjectives (big) come before nouns (boy). Adverbs (quickly) usually come after verbs (runs)."
          },
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
            "explanation": "First plant seeds, then water them, then they grow, then harvest."
          },
          {
            "id": "test-sgf-3",
            "type": "sentence-gap-fill",
            "prompt": "Choose the best word to complete the sentence",
            "baseSentence": "Be ___ while crossing the road.",
            "gapPosition": 1,
            "options": ["careful", "noisy", "angry", "sleepy"],
            "correctAnswer": "careful",
            "explanation": "We should be careful on the road to stay safe."
          },
          {
            "id": "test-rc-3",
            "type": "reading-comprehension",
            "prompt": "Read the story and answer: What did the farmer do first?",
            "passage": "The farmer woke up early in the morning. He went to his field. He watered the vegetable plants. The sun was shining brightly.",
            "questionType": "what",
            "options": ["He watered the plants", "He woke up early", "He went to the market", "He cooked food"],
            "correctAnswer": "He woke up early",
            "explanation": "The story says the farmer \"woke up early in the morning\" first."
          },
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
            "explanation": "Adverbs tell us HOW something happens. \"The boy runs quickly\" tells us he runs fast."
          }
        ]
      },
      {
        "blockNumber": 2,
        "questions": [
          {
            "id": "test-sr-4",
            "type": "sentence-rearrange",
            "prompt": "Arrange the words to make a sentence",
            "scrambledItems": ["in", "runs", "boy", "the", "The", "park"],
            "correctOrder": [4, 2, 1, 0, 3, 5],
            "correctAnswer": "The boy runs in the park",
            "explanation": "The subject comes first, then verb, then prepositional phrase (in the park)."
          },
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
            "explanation": "Meena was worried, so she studied. On test day she took the test, got a good score, and felt happy."
          },
          {
            "id": "test-sgf-4",
            "type": "sentence-gap-fill",
            "prompt": "Choose the word that fits best",
            "baseSentence": "I felt ___ by the difficult question.",
            "gapPosition": 2,
            "options": ["confused", "confident", "curious", "calm"],
            "correctAnswer": "confused",
            "explanation": "Difficult questions make us feel confused because they are hard to understand."
          },
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
            "explanation": "Meena felt happy because she found her lost bag. This is why she was happy."
          },
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
            "explanation": "At a function, someone usually sings beautifully for the audience. This fits best!"
          }
        ]
      }
    ]
  }'
) ON CONFLICT DO NOTHING;

-- Verification: Show the lesson structure
SELECT
  id,
  title,
  grade,
  "order",
  jsonb_array_length(content->'blocks') as block_count
FROM lessons
WHERE title = 'Test Lesson - New Question Types';

-- Show questions by block
SELECT
  l.title,
  b.value->>'blockNumber' as block,
  jsonb_array_length(b.value->'questions') as question_count,
  jsonb_agg(q.value->>'type') as question_types
FROM lessons l,
     jsonb_array_elements(l.content->'blocks') b,
     jsonb_array_elements(b.value->'questions') q
WHERE l.title = 'Test Lesson - New Question Types'
GROUP BY l.title, b.value->>'blockNumber'
ORDER BY (b.value->>'blockNumber')::int;
