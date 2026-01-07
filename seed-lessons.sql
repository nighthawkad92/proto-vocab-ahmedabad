-- Sample lesson data for testing
-- Run this after setting up the schema

-- Lesson 1: Basic Animals
INSERT INTO lessons (title, description, grade, "order", content) VALUES (
  'Animals Around Us',
  'Learn names of common animals',
  3,
  1,
  '{
    "title": "Animals Around Us",
    "description": "Learn names of common animals",
    "blocks": [
      {
        "blockNumber": 0,
        "questions": [
          {
            "id": "l1b0q1",
            "type": "picture-word-match",
            "prompt": "Which animal says Meow?",
            "options": ["Cat", "Dog", "Cow", "Bird"],
            "correctAnswer": "Cat"
          },
          {
            "id": "l1b0q2",
            "type": "picture-word-match",
            "prompt": "Which animal says Woof?",
            "options": ["Cat", "Dog", "Cow", "Bird"],
            "correctAnswer": "Dog"
          },
          {
            "id": "l1b0q3",
            "type": "picture-word-match",
            "prompt": "Which animal says Moo?",
            "options": ["Cat", "Dog", "Cow", "Bird"],
            "correctAnswer": "Cow"
          },
          {
            "id": "l1b0q4",
            "type": "picture-word-match",
            "prompt": "Which animal can fly?",
            "options": ["Cat", "Dog", "Cow", "Bird"],
            "correctAnswer": "Bird"
          }
        ]
      },
      {
        "blockNumber": 1,
        "questions": [
          {
            "id": "l1b1q1",
            "type": "multiple-choice",
            "prompt": "A cat is a ___",
            "options": ["animal", "plant", "place", "thing"],
            "correctAnswer": "animal"
          },
          {
            "id": "l1b1q2",
            "type": "multiple-choice",
            "prompt": "A dog can ___",
            "options": ["fly", "swim", "bark", "grow"],
            "correctAnswer": "bark"
          },
          {
            "id": "l1b1q3",
            "type": "sentence-completion",
            "prompt": "The ___ gives us milk",
            "options": ["cat", "cow", "bird", "dog"],
            "correctAnswer": "cow"
          }
        ]
      }
    ]
  }'::jsonb
);

-- Lesson 2: Colors
INSERT INTO lessons (title, description, grade, "order", content) VALUES (
  'Bright Colors',
  'Learn color names',
  3,
  2,
  '{
    "title": "Bright Colors",
    "description": "Learn color names",
    "blocks": [
      {
        "blockNumber": 0,
        "questions": [
          {
            "id": "l2b0q1",
            "type": "multiple-choice",
            "prompt": "The sky is ___",
            "options": ["red", "blue", "green", "yellow"],
            "correctAnswer": "blue"
          },
          {
            "id": "l2b0q2",
            "type": "multiple-choice",
            "prompt": "Grass is ___",
            "options": ["red", "blue", "green", "yellow"],
            "correctAnswer": "green"
          },
          {
            "id": "l2b0q3",
            "type": "multiple-choice",
            "prompt": "The sun is ___",
            "options": ["red", "blue", "green", "yellow"],
            "correctAnswer": "yellow"
          },
          {
            "id": "l2b0q4",
            "type": "multiple-choice",
            "prompt": "An apple can be ___",
            "options": ["red", "blue", "purple", "black"],
            "correctAnswer": "red"
          }
        ]
      },
      {
        "blockNumber": 1,
        "questions": [
          {
            "id": "l2b1q1",
            "type": "sentence-completion",
            "prompt": "Leaves are ___",
            "options": ["red", "blue", "green", "pink"],
            "correctAnswer": "green"
          },
          {
            "id": "l2b1q2",
            "type": "word-match",
            "prompt": "Match: A banana is ___",
            "options": ["red", "yellow", "blue", "green"],
            "correctAnswer": "yellow"
          }
        ]
      }
    ]
  }'::jsonb
);

-- Lesson 3: Body Parts
INSERT INTO lessons (title, description, grade, "order", content) VALUES (
  'My Body',
  'Learn body part names',
  3,
  3,
  '{
    "title": "My Body",
    "description": "Learn body part names",
    "blocks": [
      {
        "blockNumber": 0,
        "questions": [
          {
            "id": "l3b0q1",
            "type": "multiple-choice",
            "prompt": "I see with my ___",
            "options": ["eyes", "ears", "nose", "mouth"],
            "correctAnswer": "eyes"
          },
          {
            "id": "l3b0q2",
            "type": "multiple-choice",
            "prompt": "I hear with my ___",
            "options": ["eyes", "ears", "nose", "mouth"],
            "correctAnswer": "ears"
          },
          {
            "id": "l3b0q3",
            "type": "multiple-choice",
            "prompt": "I smell with my ___",
            "options": ["eyes", "ears", "nose", "mouth"],
            "correctAnswer": "nose"
          },
          {
            "id": "l3b0q4",
            "type": "multiple-choice",
            "prompt": "I eat with my ___",
            "options": ["eyes", "ears", "nose", "mouth"],
            "correctAnswer": "mouth"
          }
        ]
      }
    ]
  }'::jsonb
);
