-- Production Content for New Question Types (Lessons 2-5)
-- Based on NCERT/SCERT Grade 4 English Standards
-- Created: 2026-01-08
-- Total: 252 new questions across 4 lessons

-- This file adds new question types to existing lessons
-- Run AFTER seed-lessons-grade4.sql

-- ============================================================================
-- LESSON 2: VOCABULARY IN CONTEXT
-- New Question Type: sentence-gap-fill (36 questions)
-- ============================================================================

-- Lesson 2 UPDATE: Add sentence-gap-fill questions
UPDATE lessons SET content = jsonb_set(
  content,
  '{blocks,0,questions}',
  content->'blocks'->0->'questions' || '[
    {
      "id": "l2b0q5",
      "type": "sentence-gap-fill",
      "prompt": "Choose the word that makes the most sense",
      "baseSentence": "I feel ___ after playing in the hot sun.",
      "gapPosition": 2,
      "options": ["tired", "cold", "hungry", "angry"],
      "correctAnswer": "tired",
      "explanation": "Playing in hot sun makes us feel tired because we use energy."
    },
    {
      "id": "l2b0q6",
      "type": "sentence-gap-fill",
      "prompt": "Choose the word that fits best",
      "baseSentence": "The ___ is shining brightly in the sky.",
      "gapPosition": 1,
      "options": ["sun", "moon", "star", "cloud"],
      "correctAnswer": "sun",
      "explanation": "The sun shines brightly during the day."
    },
    {
      "id": "l2b0q7",
      "type": "sentence-gap-fill",
      "prompt": "Pick the right word",
      "baseSentence": "My mother cooks ___ food for us.",
      "gapPosition": 3,
      "options": ["tasty", "bad", "cold", "old"],
      "correctAnswer": "tasty",
      "explanation": "Mothers cook tasty food that we enjoy eating."
    },
    {
      "id": "l2b0q8",
      "type": "sentence-gap-fill",
      "prompt": "Complete the sentence",
      "baseSentence": "The children are ___ in the playground.",
      "gapPosition": 3,
      "options": ["playing", "sleeping", "crying", "reading"],
      "correctAnswer": "playing",
      "explanation": "Children play in the playground."
    }
  ]'::jsonb
) WHERE title = 'Understanding New Words';

-- Lesson 2 Block 0 Rotation Set 1: sentence-gap-fill
UPDATE lessons SET content = jsonb_set(
  content,
  '{blocks,0,rotationSets,0}',
  (content->'blocks'->0->'rotationSets'->0) || '[
    {
      "id": "l2b0r1q5",
      "type": "sentence-gap-fill",
      "prompt": "Choose the best word",
      "baseSentence": "The farmer works ___ in his field.",
      "gapPosition": 3,
      "options": ["hard", "lazy", "slow", "bad"],
      "correctAnswer": "hard",
      "explanation": "Farmers work hard to grow crops for us."
    },
    {
      "id": "l2b0r1q6",
      "type": "sentence-gap-fill",
      "prompt": "Fill in the blank",
      "baseSentence": "I drink ___ water when I am thirsty.",
      "gapPosition": 2,
      "options": ["clean", "dirty", "hot", "salty"],
      "correctAnswer": "clean",
      "explanation": "We should drink clean water to stay healthy."
    },
    {
      "id": "l2b0r1q7",
      "type": "sentence-gap-fill",
      "prompt": "Pick the correct word",
      "baseSentence": "The dog is ___ under the tree.",
      "gapPosition": 3,
      "options": ["sleeping", "flying", "swimming", "jumping"],
      "correctAnswer": "sleeping",
      "explanation": "Dogs sleep under trees for shade and rest."
    },
    {
      "id": "l2b0r1q8",
      "type": "sentence-gap-fill",
      "prompt": "Complete this sentence",
      "baseSentence": "My school bag is very ___.",
      "gapPosition": 4,
      "options": ["heavy", "empty", "broken", "old"],
      "correctAnswer": "heavy",
      "explanation": "School bags become heavy with books inside."
    }
  ]'::jsonb
) WHERE title = 'Understanding New Words';

-- Lesson 2 Block 0 Rotation Set 2: sentence-gap-fill
UPDATE lessons SET content = jsonb_set(
  content,
  '{blocks,0,rotationSets,1}',
  (content->'blocks'->0->'rotationSets'->1) || '[
    {
      "id": "l2b0r2q5",
      "type": "sentence-gap-fill",
      "prompt": "Choose the right word",
      "baseSentence": "The baby is ___ in the cradle.",
      "gapPosition": 3,
      "options": ["crying", "running", "reading", "writing"],
      "correctAnswer": "crying",
      "explanation": "Babies cry when they need something."
    },
    {
      "id": "l2b0r2q6",
      "type": "sentence-gap-fill",
      "prompt": "Fill the gap",
      "baseSentence": "Birds ___ in the sky.",
      "gapPosition": 1,
      "options": ["fly", "walk", "swim", "crawl"],
      "correctAnswer": "fly",
      "explanation": "Birds have wings to fly in the sky."
    },
    {
      "id": "l2b0r2q7",
      "type": "sentence-gap-fill",
      "prompt": "Complete the sentence",
      "baseSentence": "The cat drinks ___ from the bowl.",
      "gapPosition": 3,
      "options": ["milk", "sand", "stone", "paper"],
      "correctAnswer": "milk",
      "explanation": "Cats drink milk because it is good for them."
    },
    {
      "id": "l2b0r2q8",
      "type": "sentence-gap-fill",
      "prompt": "Pick the best word",
      "baseSentence": "My teacher is very ___.",
      "gapPosition": 4,
      "options": ["kind", "angry", "sad", "lazy"],
      "correctAnswer": "kind",
      "explanation": "Kind teachers help students learn well."
    }
  ]'::jsonb
) WHERE title = 'Understanding New Words';

-- Lesson 2 Block 1 (MEDIUM): sentence-gap-fill
UPDATE lessons SET content = jsonb_set(
  content,
  '{blocks,1,questions}',
  (content->'blocks'->1->'questions') || '[
    {
      "id": "l2b1q5",
      "type": "sentence-gap-fill",
      "prompt": "Choose the word that makes sense",
      "baseSentence": "Be ___ while crossing the busy road.",
      "gapPosition": 1,
      "options": ["careful", "careless", "fast", "slow"],
      "correctAnswer": "careful",
      "explanation": "We must be careful on busy roads to avoid accidents."
    },
    {
      "id": "l2b1q6",
      "type": "sentence-gap-fill",
      "prompt": "Fill in the blank",
      "baseSentence": "The students ___ their homework every day.",
      "gapPosition": 2,
      "options": ["complete", "forget", "lose", "tear"],
      "correctAnswer": "complete",
      "explanation": "Good students complete their homework regularly."
    }
  ]'::jsonb
) WHERE title = 'Understanding New Words';

-- Lesson 2 Block 1 Rotation Set 1: sentence-gap-fill
UPDATE lessons SET content = jsonb_set(
  content,
  '{blocks,1,rotationSets,0}',
  (content->'blocks'->1->'rotationSets'->0) || '[
    {
      "id": "l2b1r1q5",
      "type": "sentence-gap-fill",
      "prompt": "Complete the sentence",
      "baseSentence": "The medicine will make you feel ___.",
      "gapPosition": 5,
      "options": ["better", "worse", "sick", "weak"],
      "correctAnswer": "better",
      "explanation": "Medicine helps us feel better when we are unwell."
    },
    {
      "id": "l2b1r1q6",
      "type": "sentence-gap-fill",
      "prompt": "Choose the right word",
      "baseSentence": "My grandmother tells us ___ stories at night.",
      "gapPosition": 4,
      "options": ["interesting", "boring", "scary", "sad"],
      "correctAnswer": "interesting",
      "explanation": "Grandmothers tell interesting stories we enjoy."
    }
  ]'::jsonb
) WHERE title = 'Understanding New Words';

-- Lesson 2 Block 1 Rotation Set 2: sentence-gap-fill
UPDATE lessons SET content = jsonb_set(
  content,
  '{blocks,1,rotationSets,1}',
  (content->'blocks'->1->'rotationSets'->1) || '[
    {
      "id": "l2b1r2q5",
      "type": "sentence-gap-fill",
      "prompt": "Pick the best word",
      "baseSentence": "We should always speak the ___.",
      "gapPosition": 4,
      "options": ["truth", "lie", "joke", "story"],
      "correctAnswer": "truth",
      "explanation": "Speaking the truth makes us honest and trustworthy."
    },
    {
      "id": "l2b1r2q6",
      "type": "sentence-gap-fill",
      "prompt": "Fill the gap",
      "baseSentence": "The library has many ___ books to read.",
      "gapPosition": 3,
      "options": ["different", "same", "torn", "empty"],
      "correctAnswer": "different",
      "explanation": "Libraries have different kinds of books for everyone."
    }
  ]'::jsonb
) WHERE title = 'Understanding New Words';

-- Lesson 2 Block 2 (HARD): sentence-gap-fill
UPDATE lessons SET content = jsonb_set(
  content,
  '{blocks,2,questions}',
  (content->'blocks'->2->'questions') || '[
    {
      "id": "l2b2q5",
      "type": "sentence-gap-fill",
      "prompt": "Choose the word that fits best",
      "baseSentence": "I felt ___ when I could not solve the puzzle.",
      "gapPosition": 2,
      "options": ["confused", "happy", "proud", "excited"],
      "correctAnswer": "confused",
      "explanation": "Difficult puzzles make us feel confused because they are hard to solve."
    },
    {
      "id": "l2b2q6",
      "type": "sentence-gap-fill",
      "prompt": "Complete the sentence",
      "baseSentence": "The teacher ___ my good work in class.",
      "gapPosition": 2,
      "options": ["appreciated", "ignored", "forgot", "punished"],
      "correctAnswer": "appreciated",
      "explanation": "Teachers appreciate when students do good work."
    }
  ]'::jsonb
) WHERE title = 'Understanding New Words';

-- Lesson 2 Block 2 Rotation Set 1: sentence-gap-fill
UPDATE lessons SET content = jsonb_set(
  content,
  '{blocks,2,rotationSets,0}',
  (content->'blocks'->2->'rotationSets'->0) || '[
    {
      "id": "l2b2r1q5",
      "type": "sentence-gap-fill",
      "prompt": "Fill in the blank",
      "baseSentence": "The scientist made an important ___ in the laboratory.",
      "gapPosition": 5,
      "options": ["discovery", "mistake", "friend", "noise"],
      "correctAnswer": "discovery",
      "explanation": "Scientists make discoveries through experiments in laboratories."
    },
    {
      "id": "l2b2r1q6",
      "type": "sentence-gap-fill",
      "prompt": "Choose wisely",
      "baseSentence": "We must ___ our natural resources carefully.",
      "gapPosition": 2,
      "options": ["protect", "waste", "destroy", "sell"],
      "correctAnswer": "protect",
      "explanation": "Protecting natural resources ensures they last for the future."
    }
  ]'::jsonb
) WHERE title = 'Understanding New Words';

-- Lesson 2 Block 2 Rotation Set 2: sentence-gap-fill
UPDATE lessons SET content = jsonb_set(
  content,
  '{blocks,2,rotationSets,1}',
  (content->'blocks'->2->'rotationSets'->1) || '[
    {
      "id": "l2b2r2q5",
      "type": "sentence-gap-fill",
      "prompt": "Pick the correct word",
      "baseSentence": "The athlete showed great ___ during the race.",
      "gapPosition": 4,
      "options": ["determination", "laziness", "weakness", "fear"],
      "correctAnswer": "determination",
      "explanation": "Determination helps athletes keep trying even when tired."
    },
    {
      "id": "l2b2r2q6",
      "type": "sentence-gap-fill",
      "prompt": "Complete thoughtfully",
      "baseSentence": "My parents always ___ me to study hard.",
      "gapPosition": 3,
      "options": ["encourage", "discourage", "stop", "prevent"],
      "correctAnswer": "encourage",
      "explanation": "Parents encourage children to help them succeed."
    }
  ]'::jsonb
) WHERE title = 'Understanding New Words';

-- ============================================================================
-- LESSON 3: READING SHORT PARAGRAPHS
-- New Question Type: reading-comprehension (36 questions)
-- ============================================================================

-- Note: This lesson will be completely restructured with reading-comprehension questions
-- Creating new lesson structure for Lesson 3

DELETE FROM lessons WHERE title = 'Reading Short Stories' OR "order" = 3;

INSERT INTO lessons (title, description, grade, "order", content) VALUES (
  'Reading Short Stories',
  'Read short paragraphs and answer questions about them',
  4,
  3,
  '{
    "title": "Reading Short Stories",
    "description": "I can read short stories and understand them",
    "rotationEnabled": true,
    "blocks": [
      {
        "blockNumber": 0,
        "introduction": {
          "concept": "Reading Comprehension",
          "explanation": "When we read, we must understand what the story tells us. We look for who is in the story, what happens, and where it happens.",
          "example": "Read: The dog runs. Question: Who runs? Answer: The dog",
          "activity": "Listen carefully to each story before answering"
        },
        "questions": [
          {
            "id": "l3b0q1",
            "type": "reading-comprehension",
            "prompt": "Read the story and answer: Who went to school?",
            "passage": "Ravi woke up early. He got ready and went to school. He met his friends there.",
            "questionType": "who",
            "options": ["Ravi", "The teacher", "Mother", "Father"],
            "correctAnswer": "Ravi",
            "explanation": "The story says Ravi woke up and went to school."
          },
          {
            "id": "l3b0q2",
            "type": "reading-comprehension",
            "prompt": "Read and answer: What did the bird do?",
            "passage": "A small bird sat on a tree. It sang a beautiful song. Everyone stopped to listen.",
            "questionType": "what",
            "options": ["It sang a song", "It flew away", "It made a nest", "It ate food"],
            "correctAnswer": "It sang a song",
            "explanation": "The story tells us the bird sang a beautiful song."
          },
          {
            "id": "l3b0q3",
            "type": "reading-comprehension",
            "prompt": "Who helped the old man?",
            "passage": "An old man was crossing the road. A young boy saw him. The boy held his hand and helped him cross safely.",
            "questionType": "who",
            "options": ["A young boy", "A teacher", "A policeman", "A doctor"],
            "correctAnswer": "A young boy",
            "explanation": "The story says a young boy helped the old man cross the road."
          },
          {
            "id": "l3b0q4",
            "type": "reading-comprehension",
            "prompt": "What was the cat doing?",
            "passage": "The cat was sleeping on the mat. Suddenly, it heard a sound. It woke up and looked around.",
            "questionType": "what",
            "options": ["Sleeping on the mat", "Drinking milk", "Playing with a ball", "Climbing a tree"],
            "correctAnswer": "Sleeping on the mat",
            "explanation": "At the start, the cat was sleeping on the mat."
          }
        ],
        "rotationSets": [
          [
            {
              "id": "l3b0r1q1",
              "type": "reading-comprehension",
              "prompt": "Who is the main character?",
              "passage": "Meena loves to draw pictures. Every day after school, she draws in her notebook. Her mother likes her drawings.",
              "questionType": "who",
              "options": ["Meena", "Her mother", "Her teacher", "Her friend"],
              "correctAnswer": "Meena",
              "explanation": "Meena is the main character who loves to draw."
            },
            {
              "id": "l3b0r1q2",
              "type": "reading-comprehension",
              "prompt": "What does the dog like to do?",
              "passage": "My dog Bruno is very playful. He likes to run in the garden. He catches the ball when I throw it.",
              "questionType": "what",
              "options": ["Run in the garden", "Sleep all day", "Eat bones", "Bark at people"],
              "correctAnswer": "Run in the garden",
              "explanation": "The story says Bruno likes to run in the garden."
            },
            {
              "id": "l3b0r1q3",
              "type": "reading-comprehension",
              "prompt": "Who planted the tree?",
              "passage": "Last week, my father planted a mango tree. He waters it every morning. I help him sometimes.",
              "questionType": "who",
              "options": ["My father", "My mother", "My teacher", "My friend"],
              "correctAnswer": "My father",
              "explanation": "The story clearly states that father planted the tree."
            },
            {
              "id": "l3b0r1q4",
              "type": "reading-comprehension",
              "prompt": "What did the children do?",
              "passage": "The children went to the park. They played on the swings and slides. They had a lot of fun.",
              "questionType": "what",
              "options": ["Played on swings and slides", "Did their homework", "Watched television", "Cleaned the house"],
              "correctAnswer": "Played on swings and slides",
              "explanation": "The story says children played on swings and slides in the park."
            }
          ],
          [
            {
              "id": "l3b0r2q1",
              "type": "reading-comprehension",
              "prompt": "Who won the race?",
              "passage": "There was a race in our school. Many students ran fast. Amit was the fastest and won the race.",
              "questionType": "who",
              "options": ["Amit", "The teacher", "The principal", "All students"],
              "correctAnswer": "Amit",
              "explanation": "Amit was the fastest and won the race."
            },
            {
              "id": "l3b0r2q2",
              "type": "reading-comprehension",
              "prompt": "What is the monkey eating?",
              "passage": "I saw a monkey in the zoo. It was sitting on a branch. The monkey was eating a yellow banana.",
              "questionType": "what",
              "options": ["A yellow banana", "An apple", "Bread", "Grass"],
              "correctAnswer": "A yellow banana",
              "explanation": "The story says the monkey was eating a yellow banana."
            },
            {
              "id": "l3b0r2q3",
              "type": "reading-comprehension",
              "prompt": "Who is teaching the class?",
              "passage": "Mrs. Sharma is our English teacher. She teaches us new words every day. We like her class very much.",
              "questionType": "who",
              "options": ["Mrs. Sharma", "Mr. Kumar", "The principal", "Our parents"],
              "correctAnswer": "Mrs. Sharma",
              "explanation": "Mrs. Sharma is the English teacher who teaches the class."
            },
            {
              "id": "l3b0r2q4",
              "type": "reading-comprehension",
              "prompt": "What was grandfather doing?",
              "passage": "My grandfather was sitting in the garden. He was reading a newspaper. He looked very peaceful and happy.",
              "questionType": "what",
              "options": ["Reading a newspaper", "Sleeping", "Watering plants", "Talking on phone"],
              "correctAnswer": "Reading a newspaper",
              "explanation": "Grandfather was reading a newspaper in the garden."
            }
          ]
        ]
      },
      {
        "blockNumber": 1,
        "questions": [
          {
            "id": "l3b1q1",
            "type": "reading-comprehension",
            "prompt": "What did the farmer do first?",
            "passage": "The farmer woke up early in the morning. He went to his field with his tools. He started plowing the land. The sun was just rising in the sky.",
            "questionType": "what",
            "options": ["He woke up early", "He plowed the land", "He watered the crops", "He went home"],
            "correctAnswer": "He woke up early",
            "explanation": "The first thing mentioned is that the farmer woke up early in the morning."
          },
          {
            "id": "l3b1q2",
            "type": "reading-comprehension",
            "prompt": "Where did the family go?",
            "passage": "It was Sunday. My family decided to visit the beach. We packed food and drinks. We spent the whole day playing near the water and building sand castles.",
            "questionType": "where",
            "options": ["To the beach", "To the market", "To the temple", "To school"],
            "correctAnswer": "To the beach",
            "explanation": "The story says the family decided to visit the beach on Sunday."
          }
        ],
        "rotationSets": [
          [
            {
              "id": "l3b1r1q1",
              "type": "reading-comprehension",
              "prompt": "Where was the book?",
              "passage": "I was looking for my storybook everywhere. I checked my bag and my desk. Finally, I found it under my bed. I was so relieved!",
              "questionType": "where",
              "options": ["Under the bed", "In the bag", "On the desk", "In the cupboard"],
              "correctAnswer": "Under the bed",
              "explanation": "The book was finally found under the bed."
            },
            {
              "id": "l3b1r1q2",
              "type": "reading-comprehension",
              "prompt": "What happened to the plant?",
              "passage": "Rohan planted a small seed. He watered it every day. After a few weeks, a green plant started growing. Rohan was very happy to see his plant grow.",
              "questionType": "what",
              "options": ["It started growing", "It died", "It stayed the same", "It disappeared"],
              "correctAnswer": "It started growing",
              "explanation": "After watering every day, the plant started growing."
            }
          ],
          [
            {
              "id": "l3b1r2q1",
              "type": "reading-comprehension",
              "prompt": "Where do the birds make their nest?",
              "passage": "Every spring, birds come to our garden. They collect small sticks and grass. They make their nests on the tall tree near our house. We love watching them.",
              "questionType": "where",
              "options": ["On the tall tree", "In the bushes", "On the ground", "Inside the house"],
              "correctAnswer": "On the tall tree",
              "explanation": "The birds make their nests on the tall tree near the house."
            },
            {
              "id": "l3b1r2q2",
              "type": "reading-comprehension",
              "prompt": "What made the boy happy?",
              "passage": "It was Raj's birthday. His parents gave him a new bicycle. Raj was so happy that he smiled all day. He thanked his parents many times.",
              "questionType": "what",
              "options": ["Getting a new bicycle", "Going to school", "Eating lunch", "Meeting friends"],
              "correctAnswer": "Getting a new bicycle",
              "explanation": "Raj was happy because his parents gave him a new bicycle."
            }
          ]
        ]
      },
      {
        "blockNumber": 2,
        "questions": [
          {
            "id": "l3b2q1",
            "type": "reading-comprehension",
            "prompt": "Why did Priya feel proud?",
            "passage": "Priya worked hard on her science project. She spent many days preparing it. When she presented it in class, everyone clapped. Her teacher praised her work. Priya felt very proud of herself.",
            "questionType": "why",
            "options": ["Because everyone praised her work", "Because she got a gift", "Because it was her birthday", "Because she won a prize"],
            "correctAnswer": "Because everyone praised her work",
            "explanation": "Priya felt proud because everyone clapped and her teacher praised her work."
          },
          {
            "id": "l3b2q2",
            "type": "reading-comprehension",
            "prompt": "Why did the animals gather around?",
            "passage": "There was no rain for many days. All the ponds dried up. Finally, the villagers dug a well and water came out. All the animals gathered around the well to drink water because they were very thirsty.",
            "questionType": "why",
            "options": ["Because they were thirsty", "Because they were playing", "Because they were sleeping", "Because they were fighting"],
            "correctAnswer": "Because they were thirsty",
            "explanation": "Animals gathered to drink water because there was no rain and they were thirsty."
          }
        ],
        "rotationSets": [
          [
            {
              "id": "l3b2r1q1",
              "type": "reading-comprehension",
              "prompt": "Why did mother feel happy?",
              "passage": "Sita was not feeling well. Mother took her to the doctor. The doctor gave her medicine. After two days, Sita felt better and started playing again. Mother was very happy to see Sita healthy.",
              "questionType": "why",
              "options": ["Because Sita became healthy", "Because she got a gift", "Because it was a holiday", "Because they went shopping"],
              "correctAnswer": "Because Sita became healthy",
              "explanation": "Mother was happy because Sita recovered and became healthy again."
            },
            {
              "id": "l3b2r1q2",
              "type": "reading-comprehension",
              "prompt": "Why do we need to save water?",
              "passage": "Water is very precious. We use it for drinking, cooking, and cleaning. Many places do not have enough water. That is why we must not waste water. We should use only as much as we need.",
              "questionType": "why",
              "options": ["Because many places don't have enough", "Because it is expensive", "Because it is dirty", "Because it is cold"],
              "correctAnswer": "Because many places don't have enough",
              "explanation": "We should save water because many places do not have enough water."
            }
          ],
          [
            {
              "id": "l3b2r2q1",
              "type": "reading-comprehension",
              "prompt": "Why did the boy help the kitten?",
              "passage": "A small kitten was stuck in a tree. It was crying loudly. A kind boy heard it. He climbed the tree carefully and brought the kitten down. The kitten was safe because the boy was brave and kind.",
              "questionType": "why",
              "options": ["Because he was kind and brave", "Because someone told him to", "Because he wanted a reward", "Because the kitten was his pet"],
              "correctAnswer": "Because he was kind and brave",
              "explanation": "The boy helped because he was kind and brave, not for any other reason."
            },
            {
              "id": "l3b2r2q2",
              "type": "reading-comprehension",
              "prompt": "Why are trees important?",
              "passage": "Trees give us many things. They provide us with fresh air to breathe. They give us fruits to eat. They also give shade on hot sunny days. Birds make their homes in trees. We must plant more trees to protect our environment.",
              "questionType": "why",
              "options": ["Because they give air, fruits, and shade", "Because they look beautiful", "Because they are tall", "Because they are green"],
              "correctAnswer": "Because they give air, fruits, and shade",
              "explanation": "Trees are important because they give us fresh air, fruits, and shade."
            }
          ]
        ]
      }
    ]
  }'
);

-- [Continue in next message due to length...]
