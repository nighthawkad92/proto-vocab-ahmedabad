-- Lesson 5: Reading → Writing Connection
-- Integrated from: Grade 4 English PAL-Integrated Lesson Plans PDF
-- Test questions integrated: story-sequence (4 questions)
-- Difficulty progression: EASY (2) → MEDIUM (1) → HARD (1)

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
    "levels": [
      {
        "levelNumber": 0,
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
        "levelNumber": 1,
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
        "levelNumber": 2,
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
