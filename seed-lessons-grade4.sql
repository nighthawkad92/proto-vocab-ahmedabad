-- Grade 4 English PAL-Integrated Lessons WITH ROTATION SETS
-- Based on below-grade-level learner curriculum
-- Each lesson includes an interactive concept introduction at each level
-- ROTATION SETS: Each level now includes 2 alternate question sets for variety on retakes

-- First, delete existing lessons
DELETE FROM lesson_unlocks;
DELETE FROM responses;
DELETE FROM attempts;
DELETE FROM lessons;

-- Lesson 1: Decoding Multi-Syllable Words
INSERT INTO lessons (title, description, grade, "order", content) VALUES (
  'Breaking Big Words',
  'Learn to break big words into small parts and read them',
  4,
  1,
  '{
    "title": "Breaking Big Words",
    "description": "I can break big words into small parts and read them",
    "rotationEnabled": true,
    "levels": [
      {
        "levelNumber": 0,
        "introduction": {
          "concept": "Syllable Breaking",
          "explanation": "Big words are made of small sound parts called syllables. When we break words into syllables, reading becomes easier!",
          "example": "bas-ket (2 parts), win-dow (2 parts), mar-ket (2 parts)",
          "activity": "Clap your hands for each syllable: bas-ket (clap-clap)"
        },
        "questions": [
          {
            "id": "l1l0q1",
            "type": "multiple-choice",
            "prompt": "How many syllables in: basket",
            "options": ["1 syllable", "2 syllables", "3 syllables", "4 syllables"],
            "correctAnswer": "2 syllables"
          },
          {
            "id": "l1l0q2",
            "type": "multiple-choice",
            "prompt": "How many syllables in: window",
            "options": ["1 syllable", "2 syllables", "3 syllables", "4 syllables"],
            "correctAnswer": "2 syllables"
          },
          {
            "id": "l1l0q3",
            "type": "multiple-choice",
            "prompt": "Break this word: paper",
            "options": ["pa-per", "pap-er", "p-aper", "paper"],
            "correctAnswer": "pa-per"
          },
          {
            "id": "l1l0q4",
            "type": "multiple-choice",
            "prompt": "Break this word: teacher",
            "options": ["te-acher", "tea-cher", "teach-er", "t-eacher"],
            "correctAnswer": "tea-cher"
          }
        ],
        "rotationSets": [
          [
            {
              "id": "l1l0r1q1",
              "type": "multiple-choice",
              "prompt": "How many syllables in: water",
              "options": ["1 syllable", "2 syllables", "3 syllables", "4 syllables"],
              "correctAnswer": "2 syllables"
            },
            {
              "id": "l1l0r1q2",
              "type": "multiple-choice",
              "prompt": "How many syllables in: mother",
              "options": ["1 syllable", "2 syllables", "3 syllables", "4 syllables"],
              "correctAnswer": "2 syllables"
            },
            {
              "id": "l1l0r1q3",
              "type": "multiple-choice",
              "prompt": "Break this word: table",
              "options": ["ta-ble", "tab-le", "t-able", "table"],
              "correctAnswer": "ta-ble"
            },
            {
              "id": "l1l0r1q4",
              "type": "multiple-choice",
              "prompt": "Break this word: doctor",
              "options": ["doc-tor", "doct-or", "do-ctor", "d-octor"],
              "correctAnswer": "doc-tor"
            }
          ],
          [
            {
              "id": "l1l0r2q1",
              "type": "multiple-choice",
              "prompt": "How many syllables in: happy",
              "options": ["1 syllable", "2 syllables", "3 syllables", "4 syllables"],
              "correctAnswer": "2 syllables"
            },
            {
              "id": "l1l0r2q2",
              "type": "multiple-choice",
              "prompt": "How many syllables in: rabbit",
              "options": ["1 syllable", "2 syllables", "3 syllables", "4 syllables"],
              "correctAnswer": "2 syllables"
            },
            {
              "id": "l1l0r2q3",
              "type": "multiple-choice",
              "prompt": "Break this word: pencil",
              "options": ["pen-cil", "penc-il", "pe-ncil", "pencil"],
              "correctAnswer": "pen-cil"
            },
            {
              "id": "l1l0r2q4",
              "type": "multiple-choice",
              "prompt": "Break this word: yellow",
              "options": ["yel-low", "yell-ow", "ye-llow", "y-ellow"],
              "correctAnswer": "yel-low"
            }
          ]
        ]
      },
      {
        "levelNumber": 1,
        "questions": [
          {
            "id": "l1l1q1",
            "type": "multiple-choice",
            "prompt": "How many syllables in: market",
            "options": ["1 syllable", "2 syllables", "3 syllables", "4 syllables"],
            "correctAnswer": "2 syllables"
          },
          {
            "id": "l1l1q2",
            "type": "multiple-choice",
            "prompt": "How many syllables in: garden",
            "options": ["1 syllable", "2 syllables", "3 syllables", "4 syllables"],
            "correctAnswer": "2 syllables"
          },
          {
            "id": "l1l1q3",
            "type": "multiple-choice",
            "prompt": "Break this word: village",
            "options": ["vil-lage", "vi-llage", "villa-ge", "v-illage"],
            "correctAnswer": "vil-lage"
          },
          {
            "id": "l1l1q4",
            "type": "multiple-choice",
            "prompt": "Break this word: blanket",
            "options": ["blan-ket", "blank-et", "bla-nket", "b-lanket"],
            "correctAnswer": "blan-ket"
          }
        ],
        "rotationSets": [
          [
            {
              "id": "l1l1r1q1",
              "type": "multiple-choice",
              "prompt": "How many syllables in: holiday",
              "options": ["1 syllable", "2 syllables", "3 syllables", "4 syllables"],
              "correctAnswer": "3 syllables"
            },
            {
              "id": "l1l1r1q2",
              "type": "multiple-choice",
              "prompt": "How many syllables in: picture",
              "options": ["1 syllable", "2 syllables", "3 syllables", "4 syllables"],
              "correctAnswer": "2 syllables"
            },
            {
              "id": "l1l1r1q3",
              "type": "multiple-choice",
              "prompt": "Break this word: kitchen",
              "options": ["kit-chen", "kitc-hen", "ki-tchen", "k-itchen"],
              "correctAnswer": "kit-chen"
            },
            {
              "id": "l1l1r1q4",
              "type": "multiple-choice",
              "prompt": "Break this word: library",
              "options": ["li-bra-ry", "lib-rary", "libra-ry", "li-brary"],
              "correctAnswer": "li-bra-ry"
            }
          ],
          [
            {
              "id": "l1l1r2q1",
              "type": "multiple-choice",
              "prompt": "How many syllables in: evening",
              "options": ["1 syllable", "2 syllables", "3 syllables", "4 syllables"],
              "correctAnswer": "2 syllables"
            },
            {
              "id": "l1l1r2q2",
              "type": "multiple-choice",
              "prompt": "How many syllables in: classroom",
              "options": ["1 syllable", "2 syllables", "3 syllables", "4 syllables"],
              "correctAnswer": "2 syllables"
            },
            {
              "id": "l1l1r2q3",
              "type": "multiple-choice",
              "prompt": "Break this word: animal",
              "options": ["an-i-mal", "ani-mal", "anim-al", "a-nimal"],
              "correctAnswer": "an-i-mal"
            },
            {
              "id": "l1l1r2q4",
              "type": "multiple-choice",
              "prompt": "Break this word: festival",
              "options": ["fes-ti-val", "fest-ival", "festi-val", "f-estival"],
              "correctAnswer": "fes-ti-val"
            }
          ]
        ]
      },
      {
        "levelNumber": 2,
        "questions": [
          {
            "id": "l1l2q1",
            "type": "multiple-choice",
            "prompt": "How many syllables in: remember",
            "options": ["1 syllable", "2 syllables", "3 syllables", "4 syllables"],
            "correctAnswer": "3 syllables"
          },
          {
            "id": "l1l2q2",
            "type": "multiple-choice",
            "prompt": "How many syllables in: important",
            "options": ["1 syllable", "2 syllables", "3 syllables", "4 syllables"],
            "correctAnswer": "3 syllables"
          },
          {
            "id": "l1l2q3",
            "type": "multiple-choice",
            "prompt": "Break this word: understand",
            "options": ["un-der-stand", "und-er-stand", "under-stand", "u-nder-stand"],
            "correctAnswer": "un-der-stand"
          },
          {
            "id": "l1l2q4",
            "type": "multiple-choice",
            "prompt": "Break this word: together",
            "options": ["to-geth-er", "tog-eth-er", "together", "to-ge-ther"],
            "correctAnswer": "to-geth-er"
          }
        ],
        "rotationSets": [
          [
            {
              "id": "l1l2r1q1",
              "type": "multiple-choice",
              "prompt": "How many syllables in: tomorrow",
              "options": ["1 syllable", "2 syllables", "3 syllables", "4 syllables"],
              "correctAnswer": "3 syllables"
            },
            {
              "id": "l1l2r1q2",
              "type": "multiple-choice",
              "prompt": "How many syllables in: afternoon",
              "options": ["1 syllable", "2 syllables", "3 syllables", "4 syllables"],
              "correctAnswer": "3 syllables"
            },
            {
              "id": "l1l2r1q3",
              "type": "multiple-choice",
              "prompt": "Break this word: education",
              "options": ["ed-u-ca-tion", "edu-cation", "educa-tion", "e-ducation"],
              "correctAnswer": "ed-u-ca-tion"
            },
            {
              "id": "l1l2r1q4",
              "type": "multiple-choice",
              "prompt": "Break this word: difference",
              "options": ["dif-fer-ence", "diff-erence", "differ-ence", "d-ifference"],
              "correctAnswer": "dif-fer-ence"
            }
          ],
          [
            {
              "id": "l1l2r2q1",
              "type": "multiple-choice",
              "prompt": "How many syllables in: information",
              "options": ["1 syllable", "2 syllables", "3 syllables", "4 syllables"],
              "correctAnswer": "4 syllables"
            },
            {
              "id": "l1l2r2q2",
              "type": "multiple-choice",
              "prompt": "How many syllables in: community",
              "options": ["1 syllable", "2 syllables", "3 syllables", "4 syllables"],
              "correctAnswer": "4 syllables"
            },
            {
              "id": "l1l2r2q3",
              "type": "multiple-choice",
              "prompt": "Break this word: celebration",
              "options": ["cel-e-bra-tion", "cele-bration", "celebra-tion", "c-elebration"],
              "correctAnswer": "cel-e-bra-tion"
            },
            {
              "id": "l1l2r2q4",
              "type": "multiple-choice",
              "prompt": "Break this word: environment",
              "options": ["en-vi-ron-ment", "envi-ronment", "environ-ment", "e-nvironment"],
              "correctAnswer": "en-vi-ron-ment"
            }
          ]
        ]
      }
    ]
  }'::jsonb
);

-- Lesson 2: Vocabulary in Context (Meaning Matters)
INSERT INTO lessons (title, description, grade, "order", content) VALUES (
  'Understanding New Words',
  'Learn to understand and use new words in sentences',
  4,
  2,
  '{
    "title": "Understanding New Words",
    "description": "I can understand and use new words",
    "rotationEnabled": true,
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
  }'::jsonb
);

-- Lesson 3: Reading Short Paragraphs
INSERT INTO lessons (title, description, grade, "order", content) VALUES (
  'Reading Stories',
  'Read short paragraphs and tell what they are about',
  4,
  3,
  '{
    "title": "Reading Stories",
    "description": "I can read a short paragraph and tell what it is about",
    "rotationEnabled": true,
    "levels": [
      {
        "levelNumber": 0,
        "introduction": {
          "concept": "Reading with Understanding",
          "explanation": "When we read stories, we need to understand WHO is in the story and WHAT happened. This helps us remember and enjoy the story!",
          "example": "Story: Ravi played with his ball. WHO? Ravi. WHAT? He played with his ball.",
          "activity": "Listen carefully and think: Who is the story about? What did they do?"
        },
        "questions": [
          {
            "id": "l3l0q1",
            "type": "multiple-choice",
            "prompt": "Story: The boy walked to school. His friend was waiting at the gate. Who is in the story?",
            "options": ["The boy and his friend", "The teacher", "The dog", "The mother"],
            "correctAnswer": "The boy and his friend"
          },
          {
            "id": "l3l0q2",
            "type": "multiple-choice",
            "prompt": "Story: Meena saw a cat in the park. The cat was sleeping under a tree. Where was the cat?",
            "options": ["Under a tree", "In the house", "On the road", "In the shop"],
            "correctAnswer": "Under a tree"
          },
          {
            "id": "l3l0q3",
            "type": "multiple-choice",
            "prompt": "Story: The sun was shining. The children played in the park. They were very happy. How did the children feel?",
            "options": ["Happy", "Sad", "Angry", "Tired"],
            "correctAnswer": "Happy"
          },
          {
            "id": "l3l0q4",
            "type": "multiple-choice",
            "prompt": "Story: Ravi lost his book. His sister helped him find it under the table. What was lost?",
            "options": ["His book", "His bag", "His pencil", "His lunch"],
            "correctAnswer": "His book"
          }
        ],
        "rotationSets": [
          [
            {
              "id": "l3l0r1q1",
              "type": "multiple-choice",
              "prompt": "Story: The girl went home after school. Her mother was waiting at the door. Who is in the story?",
              "options": ["The girl and her mother", "The teacher", "The cat", "The doctor"],
              "correctAnswer": "The girl and her mother"
            },
            {
              "id": "l3l0r1q2",
              "type": "multiple-choice",
              "prompt": "Story: Ravi saw a dog in the park. The dog was running on the road. Where was the dog?",
              "options": ["On the road", "Under a tree", "In the house", "In the shop"],
              "correctAnswer": "On the road"
            },
            {
              "id": "l3l0r1q3",
              "type": "multiple-choice",
              "prompt": "Story: It was raining. The children stayed in the classroom. They felt safe. How did the children feel?",
              "options": ["Safe", "Happy", "Angry", "Hungry"],
              "correctAnswer": "Safe"
            },
            {
              "id": "l3l0r1q4",
              "type": "multiple-choice",
              "prompt": "Story: Meena lost her bag. Her friend helped her find it on the chair. What was lost?",
              "options": ["Her bag", "Her book", "Her pencil", "Her water bottle"],
              "correctAnswer": "Her bag"
            }
          ],
          [
            {
              "id": "l3l0r2q1",
              "type": "multiple-choice",
              "prompt": "Story: The dog ran fast. The boy chased the dog in the park. Who is in the story?",
              "options": ["The dog and the boy", "The teacher", "The cat", "The family"],
              "correctAnswer": "The dog and the boy"
            },
            {
              "id": "l3l0r2q2",
              "type": "multiple-choice",
              "prompt": "Story: The family went to the shop. They bought food and came home. Where did they go?",
              "options": ["To the shop", "To school", "To the park", "To the temple"],
              "correctAnswer": "To the shop"
            },
            {
              "id": "l3l0r2q3",
              "type": "multiple-choice",
              "prompt": "Story: The teacher read a book. The students listened and learned. How did the students feel?",
              "options": ["Interested", "Bored", "Angry", "Hungry"],
              "correctAnswer": "Interested"
            },
            {
              "id": "l3l0r2q4",
              "type": "multiple-choice",
              "prompt": "Story: The boy lost his ball. His brother helped him find it in the garden. What was lost?",
              "options": ["His ball", "His book", "His bag", "His shoe"],
              "correctAnswer": "His ball"
            }
          ]
        ]
      },
      {
        "levelNumber": 1,
        "questions": [
          {
            "id": "l3l1q1",
            "type": "multiple-choice",
            "prompt": "Story: The farmer worked in the field every morning. He grew rice and vegetables for the village. What did the farmer grow?",
            "options": ["Rice and vegetables", "Only flowers", "Only trees", "Animals"],
            "correctAnswer": "Rice and vegetables"
          },
          {
            "id": "l3l1q2",
            "type": "multiple-choice",
            "prompt": "Story: It started raining suddenly. The children ran inside the classroom quickly. What happened suddenly?",
            "options": ["It started raining", "The sun came out", "The bell rang", "School ended"],
            "correctAnswer": "It started raining"
          },
          {
            "id": "l3l1q3",
            "type": "multiple-choice",
            "prompt": "Story: The family went on a picnic near the river. They ate food and played games together. Where did they go?",
            "options": ["Near the river", "To the market", "To school", "To the temple"],
            "correctAnswer": "Near the river"
          },
          {
            "id": "l3l1q4",
            "type": "multiple-choice",
            "prompt": "Story: The teacher read a story. All students listened carefully and learned something new. What did the students do?",
            "options": ["Listened carefully", "Slept", "Played outside", "Ate lunch"],
            "correctAnswer": "Listened carefully"
          }
        ],
        "rotationSets": [
          [
            {
              "id": "l3l1r1q1",
              "type": "multiple-choice",
              "prompt": "Story: The teacher taught the children every evening. She helped them read and write. What did the teacher help with?",
              "options": ["Reading and writing", "Only singing", "Only drawing", "Only playing"],
              "correctAnswer": "Reading and writing"
            },
            {
              "id": "l3l1r1q2",
              "type": "multiple-choice",
              "prompt": "Story: The bell rang loudly. All children went to the playground quickly. What happened loudly?",
              "options": ["The bell rang", "It started raining", "Someone shouted", "The door closed"],
              "correctAnswer": "The bell rang"
            },
            {
              "id": "l3l1r1q3",
              "type": "multiple-choice",
              "prompt": "Story: The children went on a journey to the mountain. They saw animals and played in the forest. Where did they go?",
              "options": ["To the mountain", "To the beach", "To the market", "To the village"],
              "correctAnswer": "To the mountain"
            },
            {
              "id": "l3l1r1q4",
              "type": "multiple-choice",
              "prompt": "Story: The family ate dinner. Everyone helped clean the table and wash the dishes. What did everyone do?",
              "options": ["Helped clean and wash", "Watched TV", "Went to sleep", "Played games"],
              "correctAnswer": "Helped clean and wash"
            }
          ],
          [
            {
              "id": "l3l1r2q1",
              "type": "multiple-choice",
              "prompt": "Story: The girl worked hard on her homework. She drew pictures and wrote stories. What did she do?",
              "options": ["Drew pictures and wrote stories", "Only played", "Only ate", "Only slept"],
              "correctAnswer": "Drew pictures and wrote stories"
            },
            {
              "id": "l3l1r2q2",
              "type": "multiple-choice",
              "prompt": "Story: The sun came out brightly. All the children went outside to play. What happened brightly?",
              "options": ["The sun came out", "The moon rose", "A lamp turned on", "A fire started"],
              "correctAnswer": "The sun came out"
            },
            {
              "id": "l3l1r2q3",
              "type": "multiple-choice",
              "prompt": "Story: The students went on a holiday to the riverbank. They swam and caught fish. Where did they go?",
              "options": ["To the riverbank", "To the school", "To the field", "To the bridge"],
              "correctAnswer": "To the riverbank"
            },
            {
              "id": "l3l1r2q4",
              "type": "multiple-choice",
              "prompt": "Story: The mother read bedtime stories. The children listened quietly and fell asleep. What did the children do?",
              "options": ["Listened quietly", "Shouted", "Ran outside", "Watched TV"],
              "correctAnswer": "Listened quietly"
            }
          ]
        ]
      },
      {
        "levelNumber": 2,
        "questions": [
          {
            "id": "l3l2q1",
            "type": "multiple-choice",
            "prompt": "Story: Suddenly, it started raining. The children quickly ran inside. They reached the classroom safely. What did the children do first?",
            "options": ["Ran inside quickly", "Played in rain", "Sat down", "Opened books"],
            "correctAnswer": "Ran inside quickly"
          },
          {
            "id": "l3l2q2",
            "type": "multiple-choice",
            "prompt": "Story: The boy walked carefully on the wet floor. He did not want to fall. Finally, he reached the door safely. How did the boy walk?",
            "options": ["Carefully", "Fast", "Jumping", "Running"],
            "correctAnswer": "Carefully"
          },
          {
            "id": "l3l2q3",
            "type": "multiple-choice",
            "prompt": "Story: The family worked together to clean the house. First, they swept the floor. Then, they arranged everything neatly. What did they do after sweeping?",
            "options": ["Arranged everything neatly", "Went outside", "Ate food", "Slept"],
            "correctAnswer": "Arranged everything neatly"
          },
          {
            "id": "l3l2q4",
            "type": "multiple-choice",
            "prompt": "Story: The girl quietly entered the library. She immediately found her favorite book. She sat down and read peacefully. Where did this happen?",
            "options": ["In the library", "At home", "In the park", "At school playground"],
            "correctAnswer": "In the library"
          }
        ],
        "rotationSets": [
          [
            {
              "id": "l3l2r1q1",
              "type": "multiple-choice",
              "prompt": "Story: Immediately, the teacher called the students. They came forward slowly. They stood in a line silently. What did the students do first?",
              "options": ["Came forward slowly", "Ran away", "Started talking", "Sat down"],
              "correctAnswer": "Came forward slowly"
            },
            {
              "id": "l3l2r1q2",
              "type": "multiple-choice",
              "prompt": "Story: The cat moved silently in the dark. It wanted to catch the mouse. Finally, it succeeded safely. How did the cat move?",
              "options": ["Silently", "Loudly", "Jumping", "Flying"],
              "correctAnswer": "Silently"
            },
            {
              "id": "l3l2r1q3",
              "type": "multiple-choice",
              "prompt": "Story: The students worked together on the project. First, they gathered materials. Then, they created everything carefully. What did they do after gathering?",
              "options": ["Created everything carefully", "Went home", "Played games", "Ate lunch"],
              "correctAnswer": "Created everything carefully"
            },
            {
              "id": "l3l2r1q4",
              "type": "multiple-choice",
              "prompt": "Story: The boy slowly walked to the playground. He immediately found his friends. He played happily with them. Where did this happen?",
              "options": ["At the playground", "In the classroom", "At the market", "At home"],
              "correctAnswer": "At the playground"
            }
          ],
          [
            {
              "id": "l3l2r2q1",
              "type": "multiple-choice",
              "prompt": "Story: Suddenly, the door opened. The children looked up curiously. They saw the principal standing there. What did the children do first?",
              "options": ["Looked up curiously", "Ran away", "Closed their books", "Started laughing"],
              "correctAnswer": "Looked up curiously"
            },
            {
              "id": "l3l2r2q2",
              "type": "multiple-choice",
              "prompt": "Story: The students walked safely across the bridge. They held hands tightly. Finally, they reached the other side peacefully. How did the students walk?",
              "options": ["Safely", "Carelessly", "Running", "Jumping"],
              "correctAnswer": "Safely"
            },
            {
              "id": "l3l2r2q3",
              "type": "multiple-choice",
              "prompt": "Story: The team worked together during the match. First, they practiced often. Then, they played rarely but successfully. What did they do before playing?",
              "options": ["Practiced often", "Slept", "Argued", "Gave up"],
              "correctAnswer": "Practiced often"
            },
            {
              "id": "l3l2r2q4",
              "type": "multiple-choice",
              "prompt": "Story: The family carefully entered the forest. They immediately saw beautiful birds. They watched peacefully for hours. Where did this happen?",
              "options": ["In the forest", "At the zoo", "At the beach", "In the field"],
              "correctAnswer": "In the forest"
            }
          ]
        ]
      }
    ]
  }'::jsonb
);

-- Lesson 4: Sentence Expansion (Writing with Meaning)
INSERT INTO lessons (title, description, grade, "order", content) VALUES (
  'Making Better Sentences',
  'Learn to make sentences better by adding describing words',
  4,
  4,
  '{
    "title": "Making Better Sentences",
    "description": "I can make my sentence better",
    "rotationEnabled": true,
    "levels": [
      {
        "levelNumber": 0,
        "introduction": {
          "concept": "Adding Details",
          "explanation": "Simple sentences can become more interesting when we add words that tell us WHAT KIND and HOW. This makes our writing better!",
          "example": "Simple: The dog runs. Better: The brown dog runs fast.",
          "activity": "Think: What kind of dog? How does it run? Now the sentence is more interesting!"
        },
        "questions": [
          {
            "id": "l4l0q1",
            "type": "multiple-choice",
            "prompt": "Make this better: The dog runs. Add a describing word.",
            "options": ["The big dog runs", "Dog runs fast", "The runs dog", "Runs the dog"],
            "correctAnswer": "The big dog runs"
          },
          {
            "id": "l4l0q2",
            "type": "multiple-choice",
            "prompt": "Make this better: The girl sings. Add HOW she sings.",
            "options": ["The girl sings happily", "Girl the sings", "Sings girl happy", "The sings girl"],
            "correctAnswer": "The girl sings happily"
          },
          {
            "id": "l4l0q3",
            "type": "multiple-choice",
            "prompt": "Add a word: The cat sleeps.",
            "options": ["The small cat sleeps", "Cat small sleeps", "Sleeps small cat", "The sleeps cat"],
            "correctAnswer": "The small cat sleeps"
          },
          {
            "id": "l4l0q4",
            "type": "multiple-choice",
            "prompt": "Add a word: The boy runs.",
            "options": ["The boy runs quickly", "Runs boy quickly", "Boy quickly runs", "Quickly the runs"],
            "correctAnswer": "The boy runs quickly"
          }
        ],
        "rotationSets": [
          [
            {
              "id": "l4l0r1q1",
              "type": "multiple-choice",
              "prompt": "Make this better: The bird flies. Add a describing word.",
              "options": ["The small bird flies", "Bird flies small", "The flies bird", "Flies the bird"],
              "correctAnswer": "The small bird flies"
            },
            {
              "id": "l4l0r1q2",
              "type": "multiple-choice",
              "prompt": "Make this better: The man walks. Add HOW he walks.",
              "options": ["The man walks slowly", "Man the walks", "Walks man slow", "The walks man"],
              "correctAnswer": "The man walks slowly"
            },
            {
              "id": "l4l0r1q3",
              "type": "multiple-choice",
              "prompt": "Add a word: The sun shines.",
              "options": ["The bright sun shines", "Sun bright shines", "Shines bright sun", "The shines sun"],
              "correctAnswer": "The bright sun shines"
            },
            {
              "id": "l4l0r1q4",
              "type": "multiple-choice",
              "prompt": "Add a word: The girl plays.",
              "options": ["The girl plays happily", "Plays girl happily", "Girl happily plays", "Happily the plays"],
              "correctAnswer": "The girl plays happily"
            }
          ],
          [
            {
              "id": "l4l0r2q1",
              "type": "multiple-choice",
              "prompt": "Make this better: The car moves. Add a describing word.",
              "options": ["The fast car moves", "Car moves fast", "The moves car", "Moves the car"],
              "correctAnswer": "The fast car moves"
            },
            {
              "id": "l4l0r2q2",
              "type": "multiple-choice",
              "prompt": "Make this better: The baby cries. Add HOW it cries.",
              "options": ["The baby cries loudly", "Baby the cries", "Cries baby loud", "The cries baby"],
              "correctAnswer": "The baby cries loudly"
            },
            {
              "id": "l4l0r2q3",
              "type": "multiple-choice",
              "prompt": "Add a word: The tree stands.",
              "options": ["The tall tree stands", "Tree tall stands", "Stands tall tree", "The stands tree"],
              "correctAnswer": "The tall tree stands"
            },
            {
              "id": "l4l0r2q4",
              "type": "multiple-choice",
              "prompt": "Add a word: The child reads.",
              "options": ["The child reads quietly", "Reads child quietly", "Child quietly reads", "Quietly the reads"],
              "correctAnswer": "The child reads quietly"
            }
          ]
        ]
      },
      {
        "levelNumber": 1,
        "questions": [
          {
            "id": "l4l1q1",
            "type": "multiple-choice",
            "prompt": "Make better: The sun shines.",
            "options": ["The hot sun shines", "Sun hot shines", "Shines sun hot", "The shines sun"],
            "correctAnswer": "The hot sun shines"
          },
          {
            "id": "l4l1q2",
            "type": "multiple-choice",
            "prompt": "Make better: The teacher speaks.",
            "options": ["The teacher speaks loudly", "Teacher loudly speaks", "Speaks teacher loud", "Loudly speaks teacher"],
            "correctAnswer": "The teacher speaks loudly"
          },
          {
            "id": "l4l1q3",
            "type": "multiple-choice",
            "prompt": "Add two words: The child writes.",
            "options": ["The child writes neatly in his notebook", "Child writes neatly notebook", "Writes child neatly", "Neatly writes child"],
            "correctAnswer": "The child writes neatly in his notebook"
          },
          {
            "id": "l4l1q4",
            "type": "multiple-choice",
            "prompt": "Add words: The dog barks.",
            "options": ["The dog barks loudly at night", "Dog barks loudly night", "Barks dog night", "Night barks dog"],
            "correctAnswer": "The dog barks loudly at night"
          }
        ],
        "rotationSets": [
          [
            {
              "id": "l4l1r1q1",
              "type": "multiple-choice",
              "prompt": "Make better: The bell rings.",
              "options": ["The loud bell rings", "Bell loud rings", "Rings bell loud", "The rings bell"],
              "correctAnswer": "The loud bell rings"
            },
            {
              "id": "l4l1r1q2",
              "type": "multiple-choice",
              "prompt": "Make better: The student listens.",
              "options": ["The student listens carefully", "Student carefully listens", "Listens student careful", "Carefully listens student"],
              "correctAnswer": "The student listens carefully"
            },
            {
              "id": "l4l1r1q3",
              "type": "multiple-choice",
              "prompt": "Add two words: The girl plays.",
              "options": ["The girl plays happily outside the house", "Girl plays happily house", "Plays girl happily", "Happily plays girl"],
              "correctAnswer": "The girl plays happily outside the house"
            },
            {
              "id": "l4l1r1q4",
              "type": "multiple-choice",
              "prompt": "Add words: The cat sleeps.",
              "options": ["The cat sleeps quietly inside the box", "Cat sleeps quietly box", "Sleeps cat box", "Box sleeps cat"],
              "correctAnswer": "The cat sleeps quietly inside the box"
            }
          ],
          [
            {
              "id": "l4l1r2q1",
              "type": "multiple-choice",
              "prompt": "Make better: The rain falls.",
              "options": ["The heavy rain falls", "Rain heavy falls", "Falls rain heavy", "The falls rain"],
              "correctAnswer": "The heavy rain falls"
            },
            {
              "id": "l4l1r2q2",
              "type": "multiple-choice",
              "prompt": "Make better: The boy waits.",
              "options": ["The boy waits patiently", "Boy patiently waits", "Waits boy patient", "Patiently waits boy"],
              "correctAnswer": "The boy waits patiently"
            },
            {
              "id": "l4l1r2q3",
              "type": "multiple-choice",
              "prompt": "Add two words: The student reads.",
              "options": ["The student reads carefully in the library", "Student reads carefully library", "Reads student carefully", "Carefully reads student"],
              "correctAnswer": "The student reads carefully in the library"
            },
            {
              "id": "l4l1r2q4",
              "type": "multiple-choice",
              "prompt": "Add words: The bird sings.",
              "options": ["The bird sings sweetly in the morning", "Bird sings sweetly morning", "Sings bird morning", "Morning sings bird"],
              "correctAnswer": "The bird sings sweetly in the morning"
            }
          ]
        ]
      },
      {
        "levelNumber": 2,
        "questions": [
          {
            "id": "l4l2q1",
            "type": "multiple-choice",
            "prompt": "Make better with precision: The boy runs.",
            "options": ["The boy runs quickly in the park", "Boy runs park", "Runs boy quickly", "The runs boy park"],
            "correctAnswer": "The boy runs quickly in the park"
          },
          {
            "id": "l4l2q2",
            "type": "multiple-choice",
            "prompt": "Make better with precision: The child writes.",
            "options": ["The child writes neatly in his notebook", "Child neatly writes", "Writes child notebook", "Notebook writes child"],
            "correctAnswer": "The child writes neatly in his notebook"
          },
          {
            "id": "l4l2q3",
            "type": "multiple-choice",
            "prompt": "Add style: The girl answers.",
            "options": ["The girl answers politely in the class", "Girl politely answers", "Answers girl class", "Class answers girl"],
            "correctAnswer": "The girl answers politely in the class"
          },
          {
            "id": "l4l2q4",
            "type": "multiple-choice",
            "prompt": "Add style: The students walk.",
            "options": ["The students walk safely in a line", "Students safely walk", "Walk students line", "Line walk students"],
            "correctAnswer": "The students walk safely in a line"
          }
        ],
        "rotationSets": [
          [
            {
              "id": "l4l2r1q1",
              "type": "multiple-choice",
              "prompt": "Make better with precision: The dog barks.",
              "options": ["The dog barks loudly near the gate", "Dog barks gate", "Barks dog loudly", "The barks dog gate"],
              "correctAnswer": "The dog barks loudly near the gate"
            },
            {
              "id": "l4l2r1q2",
              "type": "multiple-choice",
              "prompt": "Make better with precision: The teacher explains.",
              "options": ["The teacher explains clearly on the board", "Teacher clearly explains", "Explains teacher board", "Board explains teacher"],
              "correctAnswer": "The teacher explains clearly on the board"
            },
            {
              "id": "l4l2r1q3",
              "type": "multiple-choice",
              "prompt": "Add style: The boy speaks.",
              "options": ["The boy speaks softly to his friend", "Boy softly speaks", "Speaks boy friend", "Friend speaks boy"],
              "correctAnswer": "The boy speaks softly to his friend"
            },
            {
              "id": "l4l2r1q4",
              "type": "multiple-choice",
              "prompt": "Add style: The children sit.",
              "options": ["The children sit quietly during the test", "Children quietly sit", "Sit children test", "Test sit children"],
              "correctAnswer": "The children sit quietly during the test"
            }
          ],
          [
            {
              "id": "l4l2r2q1",
              "type": "multiple-choice",
              "prompt": "Make better with precision: The girl sings.",
              "options": ["The girl sings beautifully at the function", "Girl sings function", "Sings girl beautifully", "The sings girl function"],
              "correctAnswer": "The girl sings beautifully at the function"
            },
            {
              "id": "l4l2r2q2",
              "type": "multiple-choice",
              "prompt": "Make better with precision: The student works.",
              "options": ["The student works hard to finish the task", "Student hard works", "Works student task", "Task works student"],
              "correctAnswer": "The student works hard to finish the task"
            },
            {
              "id": "l4l2r2q3",
              "type": "multiple-choice",
              "prompt": "Add style: The class listens.",
              "options": ["The class listens carefully to the story", "Class carefully listens", "Listens class story", "Story listens class"],
              "correctAnswer": "The class listens carefully to the story"
            },
            {
              "id": "l4l2r2q4",
              "type": "multiple-choice",
              "prompt": "Add style: The boy reads.",
              "options": ["The boy reads confidently in front of others", "Boy confidently reads", "Reads boy others", "Others reads boy"],
              "correctAnswer": "The boy reads confidently in front of others"
            }
          ]
        ]
      }
    ]
  }'::jsonb
);

-- Lesson 5: Reading → Writing Connection
INSERT INTO lessons (title, description, grade, "order", content) VALUES (
  'Understanding Stories',
  'Read stories and write about what you understood',
  4,
  5,
  '{
    "title": "Understanding Stories",
    "description": "I can read and write about the same idea",
    "rotationEnabled": true,
    "levels": [
      {
        "levelNumber": 0,
        "introduction": {
          "concept": "Reading and Writing Together",
          "explanation": "When we read a story, we can write about it to show what we understood. We answer: WHO is in the story? WHAT happened?",
          "example": "Story: Ravi played with his ball. Answer: Ravi is in the story. He played with his ball.",
          "activity": "Read carefully, think about it, then write your answer in your own words!"
        },
        "questions": [
          {
            "id": "l5l0q1",
            "type": "multiple-choice",
            "prompt": "Story: Meena and her dog went to the park. The dog ran fast. Who is in the story?",
            "options": ["Meena and her dog", "Meena only", "The dog only", "Meena and her cat"],
            "correctAnswer": "Meena and her dog"
          },
          {
            "id": "l5l0q2",
            "type": "multiple-choice",
            "prompt": "Story: The girl went to school and met her friend. They played together. What happened?",
            "options": ["She met her friend and played", "She went home", "She studied alone", "She was sleeping"],
            "correctAnswer": "She met her friend and played"
          },
          {
            "id": "l5l0q3",
            "type": "multiple-choice",
            "prompt": "Story: The boy lost his bag. His friend helped him find it. What problem happened?",
            "options": ["The boy lost his bag", "The boy was hungry", "The boy was late", "The boy was sick"],
            "correctAnswer": "The boy lost his bag"
          },
          {
            "id": "l5l0q4",
            "type": "multiple-choice",
            "prompt": "Story: The family went on a picnic. They ate food and played games. What did the family do?",
            "options": ["Went on a picnic and played games", "Stayed at home", "Went to school", "Went to temple"],
            "correctAnswer": "Went on a picnic and played games"
          }
        ],
        "rotationSets": [
          [
            {
              "id": "l5l0r1q1",
              "type": "multiple-choice",
              "prompt": "Story: Ravi and his cat went home. The cat slept on the bed. Who is in the story?",
              "options": ["Ravi and his cat", "Ravi only", "The cat only", "Ravi and his dog"],
              "correctAnswer": "Ravi and his cat"
            },
            {
              "id": "l5l0r1q2",
              "type": "multiple-choice",
              "prompt": "Story: The boy went to the park and met his brother. They ran together. What happened?",
              "options": ["He met his brother and ran", "He went home", "He ate food", "He was reading"],
              "correctAnswer": "He met his brother and ran"
            },
            {
              "id": "l5l0r1q3",
              "type": "multiple-choice",
              "prompt": "Story: The girl lost her book. Her sister helped her find it. What problem happened?",
              "options": ["The girl lost her book", "The girl was tired", "The girl was happy", "The girl was cold"],
              "correctAnswer": "The girl lost her book"
            },
            {
              "id": "l5l0r1q4",
              "type": "multiple-choice",
              "prompt": "Story: The class went on a trip. They saw animals and took photos. What did the class do?",
              "options": ["Went on a trip and took photos", "Stayed at school", "Went home", "Went to market"],
              "correctAnswer": "Went on a trip and took photos"
            }
          ],
          [
            {
              "id": "l5l0r2q1",
              "type": "multiple-choice",
              "prompt": "Story: The teacher and her students went to the library. They read many books. Who is in the story?",
              "options": ["The teacher and her students", "The teacher only", "The students only", "The teacher and her family"],
              "correctAnswer": "The teacher and her students"
            },
            {
              "id": "l5l0r2q2",
              "type": "multiple-choice",
              "prompt": "Story: The family went to the shop and bought food. They cooked together. What happened?",
              "options": ["They bought food and cooked", "They went to sleep", "They watched TV", "They went to school"],
              "correctAnswer": "They bought food and cooked"
            },
            {
              "id": "l5l0r2q3",
              "type": "multiple-choice",
              "prompt": "Story: The child lost his ball. His mother helped him find it. What problem happened?",
              "options": ["The child lost his ball", "The child was sad", "The child was playing", "The child was studying"],
              "correctAnswer": "The child lost his ball"
            },
            {
              "id": "l5l0r2q4",
              "type": "multiple-choice",
              "prompt": "Story: The friends went on a walk. They saw birds and collected flowers. What did the friends do?",
              "options": ["Went on a walk and collected flowers", "Stayed inside", "Went swimming", "Went shopping"],
              "correctAnswer": "Went on a walk and collected flowers"
            }
          ]
        ]
      },
      {
        "levelNumber": 1,
        "questions": [
          {
            "id": "l5l1q1",
            "type": "multiple-choice",
            "prompt": "Story: The farmer worked hard every morning in the field. He grew vegetables for his village. Who was important in the story?",
            "options": ["The farmer", "The teacher", "The doctor", "The student"],
            "correctAnswer": "The farmer"
          },
          {
            "id": "l5l1q2",
            "type": "multiple-choice",
            "prompt": "Story: It started raining. The children ran inside quickly. They were safe and dry. What happened first?",
            "options": ["It started raining", "Children played", "Children ate", "School ended"],
            "correctAnswer": "It started raining"
          },
          {
            "id": "l5l1q3",
            "type": "multiple-choice",
            "prompt": "Story: The teacher read a story. All students listened carefully. They learned something new. What did the character learn?",
            "options": ["Something new", "Nothing", "How to play", "How to sleep"],
            "correctAnswer": "Something new"
          },
          {
            "id": "l5l1q4",
            "type": "multiple-choice",
            "prompt": "Story: Ravi helped his mother clean the house. She was very happy. His mother thanked him. Who was helpful in the story?",
            "options": ["Ravi", "The teacher", "The friend", "The dog"],
            "correctAnswer": "Ravi"
          }
        ],
        "rotationSets": [
          [
            {
              "id": "l5l1r1q1",
              "type": "multiple-choice",
              "prompt": "Story: The teacher worked hard every evening at school. She taught reading to her students. Who was important in the story?",
              "options": ["The teacher", "The farmer", "The doctor", "The mother"],
              "correctAnswer": "The teacher"
            },
            {
              "id": "l5l1r1q2",
              "type": "multiple-choice",
              "prompt": "Story: The bell rang. The students went to class quickly. They opened their books. What happened first?",
              "options": ["The bell rang", "Students talked", "Students slept", "School closed"],
              "correctAnswer": "The bell rang"
            },
            {
              "id": "l5l1r1q3",
              "type": "multiple-choice",
              "prompt": "Story: The mother told a tale. All children listened quietly. They understood the message. What did the character understand?",
              "options": ["The message", "Nothing", "How to cook", "How to dance"],
              "correctAnswer": "The message"
            },
            {
              "id": "l5l1r1q4",
              "type": "multiple-choice",
              "prompt": "Story: Meena helped her father wash the car. He was very pleased. Her father praised her. Who was helpful in the story?",
              "options": ["Meena", "The teacher", "The brother", "The cat"],
              "correctAnswer": "Meena"
            }
          ],
          [
            {
              "id": "l5l1r2q1",
              "type": "multiple-choice",
              "prompt": "Story: The doctor worked hard every day at the hospital. He helped sick people get better. Who was important in the story?",
              "options": ["The doctor", "The farmer", "The teacher", "The student"],
              "correctAnswer": "The doctor"
            },
            {
              "id": "l5l1r2q2",
              "type": "multiple-choice",
              "prompt": "Story: The sun came out. The children went outside happily. They started playing. What happened first?",
              "options": ["The sun came out", "Children cried", "Children studied", "School started"],
              "correctAnswer": "The sun came out"
            },
            {
              "id": "l5l1r2q3",
              "type": "multiple-choice",
              "prompt": "Story: The father showed a video. All family members watched carefully. They discovered a fact. What did the character discover?",
              "options": ["A fact", "Nothing", "How to drive", "How to fly"],
              "correctAnswer": "A fact"
            },
            {
              "id": "l5l1r2q4",
              "type": "multiple-choice",
              "prompt": "Story: The boy helped his sister finish her homework. She was very grateful. His sister hugged him. Who was helpful in the story?",
              "options": ["The boy", "The teacher", "The friend", "The bird"],
              "correctAnswer": "The boy"
            }
          ]
        ]
      },
      {
        "levelNumber": 2,
        "questions": [
          {
            "id": "l5l2q1",
            "type": "multiple-choice",
            "prompt": "Story: The boy lost his bag. His friend helped him find it under the table. Who is in the story and what happened?",
            "options": ["The boy and his friend. The boy lost his bag and the friend helped find it.", "The boy lost bag.", "Friend helped.", "Under table."],
            "correctAnswer": "The boy and his friend. The boy lost his bag and the friend helped find it."
          },
          {
            "id": "l5l2q2",
            "type": "multiple-choice",
            "prompt": "Story: It started raining suddenly. The children ran inside quickly. They were safe and dry. What happened first and what happened next?",
            "options": ["It started raining first, then children ran inside.", "Children played.", "Rain stopped.", "School ended."],
            "correctAnswer": "It started raining first, then children ran inside."
          },
          {
            "id": "l5l2q3",
            "type": "multiple-choice",
            "prompt": "Story: The farmer worked hard every day. He grew food for his village. Everyone was happy. What problem did the farmer solve?",
            "options": ["He grew food so people could eat.", "He worked hard.", "Village was big.", "Day was long."],
            "correctAnswer": "He grew food so people could eat."
          },
          {
            "id": "l5l2q4",
            "type": "multiple-choice",
            "prompt": "Story: The girl was afraid of the dark. Her mother gave her a small light. Now she feels safe. What changed in the story?",
            "options": ["The girl went from afraid to feeling safe.", "Mother came.", "Light was small.", "Dark was there."],
            "correctAnswer": "The girl went from afraid to feeling safe."
          }
        ],
        "rotationSets": [
          [
            {
              "id": "l5l2r1q1",
              "type": "multiple-choice",
              "prompt": "Story: The girl lost her pencil. Her brother helped her find it in the desk. Who is in the story and what happened?",
              "options": ["The girl and her brother. The girl lost her pencil and the brother helped find it.", "The girl lost pencil.", "Brother helped.", "In desk."],
              "correctAnswer": "The girl and her brother. The girl lost her pencil and the brother helped find it."
            },
            {
              "id": "l5l2r1q2",
              "type": "multiple-choice",
              "prompt": "Story: The bell rang loudly. The students stood up immediately. They formed a line quietly. What happened first and what happened next?",
              "options": ["The bell rang first, then students stood up.", "Students talked.", "Bell broke.", "Class finished."],
              "correctAnswer": "The bell rang first, then students stood up."
            },
            {
              "id": "l5l2r1q3",
              "type": "multiple-choice",
              "prompt": "Story: The teacher worked patiently every day. She taught reading to her students. Everyone improved. What problem did the teacher solve?",
              "options": ["She taught reading so students could learn.", "She worked hard.", "School was big.", "Time was short."],
              "correctAnswer": "She taught reading so students could learn."
            },
            {
              "id": "l5l2r1q4",
              "type": "multiple-choice",
              "prompt": "Story: The boy was worried about the test. His father encouraged him gently. Now he feels confident. What changed in the story?",
              "options": ["The boy went from worried to feeling confident.", "Father spoke.", "Test was hard.", "Time passed."],
              "correctAnswer": "The boy went from worried to feeling confident."
            }
          ],
          [
            {
              "id": "l5l2r2q1",
              "type": "multiple-choice",
              "prompt": "Story: The child lost his lunch. His teacher helped him find it in the classroom. Who is in the story and what happened?",
              "options": ["The child and his teacher. The child lost his lunch and the teacher helped find it.", "The child lost lunch.", "Teacher helped.", "In classroom."],
              "correctAnswer": "The child and his teacher. The child lost his lunch and the teacher helped find it."
            },
            {
              "id": "l5l2r2q2",
              "type": "multiple-choice",
              "prompt": "Story: The dog barked suddenly. The family woke up quickly. They checked the door carefully. What happened first and what happened next?",
              "options": ["The dog barked first, then family woke up.", "Family slept.", "Dog ran.", "Door closed."],
              "correctAnswer": "The dog barked first, then family woke up."
            },
            {
              "id": "l5l2r2q3",
              "type": "multiple-choice",
              "prompt": "Story: The mother cooked nutritious meals every day. She fed healthy food to her family. Everyone stayed well. What problem did the mother solve?",
              "options": ["She cooked so family could stay healthy.", "She cooked hard.", "Family was large.", "Food was good."],
              "correctAnswer": "She cooked so family could stay healthy."
            },
            {
              "id": "l5l2r2q4",
              "type": "multiple-choice",
              "prompt": "Story: The student was confused about math. His friend explained it clearly. Now he understands. What changed in the story?",
              "options": ["The student went from confused to understanding.", "Friend talked.", "Math was easy.", "Day ended."],
              "correctAnswer": "The student went from confused to understanding."
            }
          ]
        ]
      }
    ]
  }'::jsonb
);
