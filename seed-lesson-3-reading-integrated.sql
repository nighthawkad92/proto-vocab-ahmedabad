-- Lesson 3: Reading Short Paragraphs (Fluency + Meaning)
-- Integrated from: Grade 4 English PAL-Integrated Lesson Plans PDF
-- Test questions integrated: reading-comprehension (4 questions)
-- Difficulty progression: EASY (2) → MEDIUM (1) → HARD (1)

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
    "levels": [
      {
        "levelNumber": 0,
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
        "levelNumber": 1,
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
        "levelNumber": 2,
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
