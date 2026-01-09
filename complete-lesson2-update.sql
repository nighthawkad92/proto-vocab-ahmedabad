-- Complete Lesson 2 Update
-- This replaces the entire Lesson 2 content with the correct version
-- that has 4 questions per level (instead of 2)

UPDATE lessons
SET content = '{
  "title": "Understanding New Words",
  "description": "I can understand and use new words",
  "rotationEnabled": true,
  "levels": [
    "levels": [
    {
      "levelNumber": 0,
      "introduction": {
        "concept": "Word Meanings",
        "explanation": "Words have meanings that help us describe how we feel and what we see. Learning new words helps us express ourselves better!",
        "example": "tired = feeling sleepy, happy = feeling joyful, afraid = feeling scared",
        "activity": "Act out these feelings: Show me a tired face! Show me a happy face!"
      },
      "questions": [
        {
          "id": "l2l0q1",
          "type": "sentence-completion",
          "prompt": "I am ___ after playing outside",
          "options": ["hungry", "tall", "blue", "yesterday"],
          "correctAnswer": "hungry"
        },
        {
          "id": "l2l0q2",
          "type": "sentence-completion",
          "prompt": "The boy feels ___ after school",
          "options": ["tired", "fast", "big", "round"],
          "correctAnswer": "tired"
        },
        {
          "id": "l2l0q3",
          "type": "sentence-completion",
          "prompt": "The glass is ___ of water",
          "options": ["full", "quick", "loud", "yesterday"],
          "correctAnswer": "full"
        },
        {
          "id": "l2l0q4",
          "type": "sentence-completion",
          "prompt": "The shop is ___ my house",
          "options": ["near", "happy", "green", "slowly"],
          "correctAnswer": "near"
        }
      ],
      "rotationSets": [
        [
          {
            "id": "l2l0r1q1",
            "type": "sentence-completion",
            "prompt": "My room is ___ today",
            "options": ["clean", "fast", "blue", "tomorrow"],
            "correctAnswer": "clean"
          },
          {
            "id": "l2l0r1q2",
            "type": "sentence-completion",
            "prompt": "The shoes are ___ after the rain",
            "options": ["dirty", "happy", "loud", "quick"],
            "correctAnswer": "dirty"
          },
          {
            "id": "l2l0r1q3",
            "type": "sentence-completion",
            "prompt": "The box is ___ now",
            "options": ["empty", "slow", "yellow", "today"],
            "correctAnswer": "empty"
          },
          {
            "id": "l2l0r1q4",
            "type": "sentence-completion",
            "prompt": "The water is ___",
            "options": ["hot", "tall", "square", "quietly"],
            "correctAnswer": "hot"
          }
        ],
        [
          {
            "id": "l2l0r2q1",
            "type": "sentence-completion",
            "prompt": "My clothes are ___ in the rain",
            "options": ["wet", "tall", "round", "yesterday"],
            "correctAnswer": "wet"
          },
          {
            "id": "l2l0r2q2",
            "type": "sentence-completion",
            "prompt": "Please ___ the door",
            "options": ["open", "happy", "quick", "slowly"],
            "correctAnswer": "open"
          },
          {
            "id": "l2l0r2q3",
            "type": "sentence-completion",
            "prompt": "I wake up ___ every day",
            "options": ["early", "blue", "tall", "round"],
            "correctAnswer": "early"
          },
          {
            "id": "l2l0r2q4",
            "type": "sentence-completion",
            "prompt": "The rabbit runs ___",
            "options": ["fast", "empty", "wet", "near"],
            "correctAnswer": "fast"
          }
        ]
      ]
    },
    {
      "levelNumber": 1,
      "introduction": {
        "concept": "Feelings and Behavior",
        "explanation": "Now we learn words that describe how people feel and behave. These words help us talk about emotions and actions!",
        "example": "careful = being safe, afraid = feeling scared, excited = feeling happy about something",
        "activity": "Act out these feelings: Show me careful walking! Show me excited jumping!"
      },
      "questions": [
        {
          "id": "l2l1q1",
          "type": "sentence-completion",
          "prompt": "Be ___ while crossing the road",
          "options": ["careful", "yellow", "round", "tasty"],
          "correctAnswer": "careful"
        },
        {
          "id": "l2l1q2",
          "type": "sentence-completion",
          "prompt": "The child was ___ of the dark",
          "options": ["afraid", "table", "window", "number"],
          "correctAnswer": "afraid"
        },
        {
          "id": "l2l1q3",
          "type": "sentence-completion",
          "prompt": "She felt ___ about the picnic",
          "options": ["excited", "chair", "pencil", "book"],
          "correctAnswer": "excited"
        },
        {
          "id": "l2l1q4",
          "type": "sentence-completion",
          "prompt": "The girl was ___ during the storm",
          "options": ["brave", "tree", "water", "paper"],
          "correctAnswer": "brave"
        }
      ],
      "rotationSets": [
        [
          {
            "id": "l2l1r1q1",
            "type": "sentence-completion",
            "prompt": "The classroom was very ___",
            "options": ["noisy", "round", "square", "blue"],
            "correctAnswer": "noisy"
          },
          {
            "id": "l2l1r1q2",
            "type": "sentence-completion",
            "prompt": "The library is a ___ place",
            "options": ["quiet", "table", "number", "pencil"],
            "correctAnswer": "quiet"
          },
          {
            "id": "l2l1r1q3",
            "type": "sentence-completion",
            "prompt": "He was ___ about the test",
            "options": ["worried", "door", "chair", "book"],
            "correctAnswer": "worried"
          },
          {
            "id": "l2l1r1q4",
            "type": "sentence-completion",
            "prompt": "The baby looked ___",
            "options": ["sleepy", "table", "window", "tree"],
            "correctAnswer": "sleepy"
          }
        ],
        [
          {
            "id": "l2l1r2q1",
            "type": "sentence-completion",
            "prompt": "The boy was ___ when he lost the game",
            "options": ["angry", "pencil", "round", "square"],
            "correctAnswer": "angry"
          },
          {
            "id": "l2l1r2q2",
            "type": "sentence-completion",
            "prompt": "She felt ___ of her work",
            "options": ["proud", "table", "chair", "number"],
            "correctAnswer": "proud"
          },
          {
            "id": "l2l1r2q3",
            "type": "sentence-completion",
            "prompt": "She is ___ to everyone",
            "options": ["kind", "door", "book", "water"],
            "correctAnswer": "kind"
          },
          {
            "id": "l2l1r2q4",
            "type": "sentence-completion",
            "prompt": "The teacher is ___ to students",
            "options": ["helpful", "tree", "window", "paper"],
            "correctAnswer": "helpful"
          }
        ]
      ]
    },
    {
      "levelNumber": 2,
      "introduction": {
        "concept": "Emotions and Thinking",
        "explanation": "These are harder words that describe how we think and feel. They help us express complex emotions!",
        "example": "confused = not understanding, patient = waiting calmly, confident = believing in yourself",
        "activity": "Think about a time you felt confused. How did you solve it?"
      },
      "questions": [
        {
          "id": "l2l2q1",
          "type": "sentence-completion",
          "prompt": "I felt ___ by the question",
          "options": ["confused", "table", "window", "pencil"],
          "correctAnswer": "confused"
        },
        {
          "id": "l2l2q2",
          "type": "sentence-completion",
          "prompt": "We must be ___ while waiting",
          "options": ["patient", "chair", "fast", "blue"],
          "correctAnswer": "patient"
        },
        {
          "id": "l2l2q3",
          "type": "sentence-completion",
          "prompt": "She felt ___ after practice",
          "options": ["confident", "tree", "yellow", "book"],
          "correctAnswer": "confident"
        },
        {
          "id": "l2l2q4",
          "type": "sentence-completion",
          "prompt": "He was ___ before the test",
          "options": ["nervous", "ball", "water", "door"],
          "correctAnswer": "nervous"
        }
      ],
      "rotationSets": [
        [
          {
            "id": "l2l2r1q1",
            "type": "sentence-completion",
            "prompt": "The teacher spoke in a ___ voice",
            "options": ["serious", "table", "round", "pencil"],
            "correctAnswer": "serious"
          },
          {
            "id": "l2l2r1q2",
            "type": "sentence-completion",
            "prompt": "The room became ___ after the noise stopped",
            "options": ["calm", "chair", "square", "blue"],
            "correctAnswer": "calm"
          },
          {
            "id": "l2l2r1q3",
            "type": "sentence-completion",
            "prompt": "I am ___ for my homework",
            "options": ["responsible", "tree", "book", "yellow"],
            "correctAnswer": "responsible"
          },
          {
            "id": "l2l2r1q4",
            "type": "sentence-completion",
            "prompt": "The boy was ___ about his mistake",
            "options": ["honest", "ball", "door", "water"],
            "correctAnswer": "honest"
          }
        ],
        [
          {
            "id": "l2l2r2q1",
            "type": "sentence-completion",
            "prompt": "She is ___ to learn new things",
            "options": ["curious", "table", "window", "fast"],
            "correctAnswer": "curious"
          },
          {
            "id": "l2l2r2q2",
            "type": "sentence-completion",
            "prompt": "The girl became ___ with time",
            "options": ["independent", "chair", "blue", "round"],
            "correctAnswer": "independent"
          },
          {
            "id": "l2l2r2q3",
            "type": "sentence-completion",
            "prompt": "She gave a ___ answer",
            "options": ["creative", "tree", "pencil", "yellow"],
            "correctAnswer": "creative"
          },
          {
            "id": "l2l2r2q4",
            "type": "sentence-completion",
            "prompt": "He stayed ___ on his work",
            "options": ["focused", "ball", "water", "book"],
            "correctAnswer": "focused"
          }
        ]
      ]
    }
    ]
  ]
}'::jsonb
WHERE title = 'Understanding New Words';

-- Verify the update
SELECT 
  title,
  jsonb_array_length(content->'levels') as num_levels,
  jsonb_array_length(content->'levels'->0->'questions') as level0_questions,
  jsonb_array_length(content->'levels'->1->'questions') as level1_questions,
  jsonb_array_length(content->'levels'->2->'questions') as level2_questions
FROM lessons
WHERE title = 'Understanding New Words';
