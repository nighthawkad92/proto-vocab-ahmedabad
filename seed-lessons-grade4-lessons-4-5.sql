-- Production Content for Lessons 4 & 5 (New Question Types)
-- Sentence Rearrange, Add Word, Story Sequence
-- Created: 2026-01-08
-- Run AFTER seed-lessons-grade4-new-content.sql

-- ============================================================================
-- LESSON 4: SENTENCE EXPANSION
-- New Question Types: sentence-rearrange (36 q) + add-word (36 q) = 72 total
-- ============================================================================

DELETE FROM lessons WHERE title = 'Making Better Sentences' OR "order" = 4;

INSERT INTO lessons (title, description, grade, "order", content) VALUES (
  'Making Better Sentences',
  'Learn to arrange words and make sentences more interesting',
  4,
  4,
  '{
    "title": "Making Better Sentences",
    "description": "I can build sentences and make them better with describing words",
    "rotationEnabled": true,
    "blocks": [
      {
        "blockNumber": 0,
        "introduction": {
          "concept": "Sentence Building",
          "explanation": "Every sentence has words in a special order. When we arrange words correctly, we can understand the meaning. We can also add describing words to make sentences more interesting!",
          "example": "Words: dog, The, runs → Correct: The dog runs. Add word: The big dog runs.",
          "activity": "Try arranging words and adding describing words"
        },
        "questions": [
          {
            "id": "l4b0q1",
            "type": "sentence-rearrange",
            "prompt": "Arrange the words to make a sentence",
            "scrambledItems": ["runs", "dog", "The"],
            "correctOrder": [2, 1, 0],
            "correctAnswer": "The dog runs",
            "explanation": "Sentences start with The, then the subject dog, then the action runs."
          },
          {
            "id": "l4b0q2",
            "type": "sentence-rearrange",
            "prompt": "Put these words in the right order",
            "scrambledItems": ["The", "shines", "sun"],
            "correctOrder": [0, 2, 1],
            "correctAnswer": "The sun shines",
            "explanation": "The correct order is: The sun shines."
          },
          {
            "id": "l4b0q3",
            "type": "add-word",
            "prompt": "Add a describing word to make the sentence better",
            "exampleSentence": "The big dog runs",
            "baseSentence": "The dog runs",
            "wordType": "adjective",
            "insertPosition": 1,
            "options": ["big", "small", "brown", "happy"],
            "correctAnswers": ["big", "small", "brown", "happy"],
            "correctAnswer": "big",
            "explanation": "All these describing words tell us more about the dog. The big dog runs!"
          },
          {
            "id": "l4b0q4",
            "type": "add-word",
            "prompt": "Make this sentence more interesting",
            "exampleSentence": "The lazy cat sleeps",
            "baseSentence": "The cat sleeps",
            "wordType": "adjective",
            "insertPosition": 1,
            "options": ["fat", "lazy", "soft", "white"],
            "correctAnswers": ["fat", "lazy", "soft", "white"],
            "correctAnswer": "lazy",
            "explanation": "All these words can describe the cat nicely!"
          }
        ],
        "rotationSets": [
          [
            {
              "id": "l4b0r1q1",
              "type": "sentence-rearrange",
              "prompt": "Arrange these words correctly",
              "scrambledItems": ["bird", "The", "flies"],
              "correctOrder": [1, 0, 2],
              "correctAnswer": "The bird flies",
              "explanation": "The bird flies is the correct sentence."
            },
            {
              "id": "l4b0r1q2",
              "type": "sentence-rearrange",
              "prompt": "Make a sentence from these words",
              "scrambledItems": ["plays", "child", "The"],
              "correctOrder": [2, 1, 0],
              "correctAnswer": "The child plays",
              "explanation": "We say: The child plays."
            },
            {
              "id": "l4b0r1q3",
              "type": "add-word",
            "prompt": "Add a word to describe the bird",
            "exampleSentence": "The small bird sings",
            "baseSentence": "The bird sings",
            "wordType": "adjective",
            "insertPosition": 1,
            "options": ["small", "colorful", "beautiful", "happy"],
            "correctAnswers": ["small", "colorful", "beautiful", "happy"],
            "correctAnswer": "small",
              "explanation": "These words all describe the bird well!"
            },
            {
              "id": "l4b0r1q4",
              "type": "add-word",
            "prompt": "Make the sentence better",
            "exampleSentence": "The tall boy walks",
            "baseSentence": "The boy walks",
            "wordType": "adjective",
            "insertPosition": 1,
            "options": ["tall", "young", "smart", "strong"],
            "correctAnswers": ["tall", "young", "smart", "strong"],
            "correctAnswer": "tall",
              "explanation": "All these words tell us about the boy!"
            }
          ],
          [
            {
              "id": "l4b0r2q1",
              "type": "sentence-rearrange",
              "prompt": "Put the words in order",
              "scrambledItems": ["rains", "It"],
              "correctOrder": [1, 0],
              "correctAnswer": "It rains",
              "explanation": "It rains is a complete sentence."
            },
            {
              "id": "l4b0r2q2",
              "type": "sentence-rearrange",
              "prompt": "Arrange to make a sentence",
              "scrambledItems": ["grows", "tree", "The"],
              "correctOrder": [2, 1, 0],
              "correctAnswer": "The tree grows",
              "explanation": "The tree grows is correct."
            },
            {
              "id": "l4b0r2q3",
              "type": "add-word",
            "prompt": "Add a describing word",
            "exampleSentence": "The red flower blooms",
            "baseSentence": "The flower blooms",
            "wordType": "adjective",
            "insertPosition": 1,
            "options": ["red", "yellow", "beautiful", "fresh"],
            "correctAnswers": ["red", "yellow", "beautiful", "fresh"],
            "correctAnswer": "red",
              "explanation": "These words make the sentence more colorful!"
            },
            {
              "id": "l4b0r2q4",
              "type": "add-word",
            "prompt": "Improve this sentence",
            "exampleSentence": "The smart girl reads",
            "baseSentence": "The girl reads",
            "wordType": "adjective",
            "insertPosition": 1,
            "options": ["smart", "young", "quiet", "studious"],
            "correctAnswers": ["smart", "young", "quiet", "studious"],
            "correctAnswer": "smart",
              "explanation": "All these words describe the girl nicely!"
            }
          ]
        ]
      },
      {
        "blockNumber": 1,
        "questions": [
          {
            "id": "l4b1q1",
            "type": "sentence-rearrange",
            "prompt": "Arrange these words correctly",
            "scrambledItems": ["The", "big", "runs", "dog", "fast"],
            "correctOrder": [0, 1, 3, 2, 4],
            "correctAnswer": "The big dog runs fast",
            "explanation": "Adjectives like big come before the noun dog. Adverbs like fast come after the verb runs."
          },
          {
            "id": "l4b1q2",
            "type": "sentence-rearrange",
            "prompt": "Make a complete sentence",
            "scrambledItems": ["flies", "The", "high", "bird"],
            "correctOrder": [1, 3, 0, 2],
            "correctAnswer": "The bird flies high",
            "explanation": "The bird flies high is the natural word order."
          },
          {
            "id": "l4b1q3",
            "type": "add-word",
            "prompt": "Add a word to tell HOW the boy runs",
            "exampleSentence": "The boy runs quickly",
            "baseSentence": "The boy runs",
            "wordType": "adverb",
            "insertPosition": 3,
            "options": ["quickly", "slowly", "happily", "loudly"],
            "correctAnswers": ["quickly", "slowly"],
            "correctAnswer": "quickly",
            "explanation": "Adverbs like quickly and slowly tell us HOW someone runs."
          },
          {
            "id": "l4b1q4",
            "type": "add-word",
            "prompt": "Tell us HOW the girl sings",
            "exampleSentence": "The girl sings sweetly",
            "baseSentence": "The girl sings",
            "wordType": "adverb",
            "insertPosition": 3,
            "options": ["sweetly", "loudly", "softly", "beautifully"],
            "correctAnswers": ["sweetly", "loudly", "softly", "beautifully"],
            "correctAnswer": "sweetly",
            "explanation": "All these adverbs tell us how someone sings!"
          }
        ],
        "rotationSets": [
          [
            {
              "id": "l4b1r1q1",
              "type": "sentence-rearrange",
              "prompt": "Put these words in order",
              "scrambledItems": ["plays", "child", "The", "happily"],
              "correctOrder": [2, 1, 0, 3],
              "correctAnswer": "The child plays happily",
              "explanation": "Adverbs like happily come at the end."
            },
            {
              "id": "l4b1r1q2",
              "type": "sentence-rearrange",
              "prompt": "Arrange correctly",
              "scrambledItems": ["bright", "shines", "The", "sun"],
              "correctOrder": [2, 0, 3, 1],
              "correctAnswer": "The bright sun shines",
              "explanation": "Bright describes the sun, so it comes before sun."
            },
            {
              "id": "l4b1r1q3",
              "type": "add-word",
            "prompt": "How does the cat move?",
            "exampleSentence": "The cat walks quietly",
            "baseSentence": "The cat walks",
            "wordType": "adverb",
            "insertPosition": 3,
            "options": ["quietly", "carefully", "slowly", "gracefully"],
            "correctAnswers": ["quietly", "carefully", "slowly", "gracefully"],
            "correctAnswer": "quietly",
              "explanation": "These words tell us how the cat walks!"
            },
            {
              "id": "l4b1r1q4",
              "type": "add-word",
            "prompt": "How does the rain fall?",
            "exampleSentence": "The rain falls heavily",
            "baseSentence": "The rain falls",
            "wordType": "adverb",
            "insertPosition": 3,
            "options": ["heavily", "lightly", "gently", "steadily"],
            "correctAnswers": ["heavily", "lightly", "gently", "steadily"],
            "correctAnswer": "heavily",
              "explanation": "All these words describe how rain can fall!"
            }
          ],
          [
            {
              "id": "l4b1r2q1",
              "type": "sentence-rearrange",
              "prompt": "Make a good sentence",
              "scrambledItems": ["colorful", "flies", "The", "butterfly"],
              "correctOrder": [2, 0, 3, 1],
              "correctAnswer": "The colorful butterfly flies",
              "explanation": "Colorful describes butterfly, so it comes before it."
            },
            {
              "id": "l4b1r2q2",
              "type": "sentence-rearrange",
              "prompt": "Arrange these words",
              "scrambledItems": ["works", "hard", "farmer", "The"],
              "correctOrder": [3, 2, 0, 1],
              "correctAnswer": "The farmer works hard",
              "explanation": "Hard is an adverb that comes after works."
            },
            {
              "id": "l4b1r2q3",
              "type": "add-word",
            "prompt": "How does the wind blow?",
            "exampleSentence": "The wind blows strongly",
            "baseSentence": "The wind blows",
            "wordType": "adverb",
            "insertPosition": 3,
            "options": ["strongly", "gently", "fiercely", "softly"],
            "correctAnswers": ["strongly", "gently", "fiercely", "softly"],
            "correctAnswer": "strongly",
              "explanation": "These adverbs tell us about the wind!"
            },
            {
              "id": "l4b1r2q4",
              "type": "add-word",
            "prompt": "How do children play?",
            "exampleSentence": "Children play joyfully",
            "baseSentence": "Children play",
            "wordType": "adverb",
            "insertPosition": 2,
            "options": ["joyfully", "noisily", "actively", "energetically"],
            "correctAnswers": ["joyfully", "noisily", "actively", "energetically"],
            "correctAnswer": "joyfully",
              "explanation": "All these words describe how children play!"
            }
          ]
        ]
      },
      {
        "blockNumber": 2,
        "questions": [
          {
            "id": "l4b2q1",
            "type": "sentence-rearrange",
            "prompt": "Arrange to make a complete sentence",
            "scrambledItems": ["in", "The", "runs", "boy", "the", "park"],
            "correctOrder": [1, 3, 2, 0, 4, 5],
            "correctAnswer": "The boy runs in the park",
            "explanation": "The prepositional phrase in the park comes at the end."
          },
          {
            "id": "l4b2q2",
            "type": "sentence-rearrange",
            "prompt": "Put these words in correct order",
            "scrambledItems": ["reads", "The", "books", "interesting", "girl"],
            "correctOrder": [1, 4, 0, 3, 2],
            "correctAnswer": "The girl reads interesting books",
            "explanation": "Interesting describes books, so it comes before books."
          },
          {
            "id": "l4b2q3",
            "type": "add-word",
            "prompt": "Add the BEST word that fits",
            "exampleSentence": "The girl sings beautifully at the function",
            "baseSentence": "The girl sings at the function",
            "wordType": "adverb",
            "insertPosition": 3,
            "options": ["beautifully", "loudly", "softly", "nervously"],
            "correctAnswers": ["beautifully"],
            "correctAnswer": "beautifully",
            "explanation": "At a function, singing beautifully is most appropriate!"
          },
          {
            "id": "l4b2q4",
            "type": "add-word",
            "prompt": "Choose the word that fits BEST",
            "exampleSentence": "The teacher explains the lesson clearly",
            "baseSentence": "The teacher explains the lesson",
            "wordType": "adverb",
            "insertPosition": 5,
            "options": ["clearly", "quickly", "slowly", "loudly"],
            "correctAnswers": ["clearly"],
            "correctAnswer": "clearly",
            "explanation": "Teachers should explain clearly so students understand well."
          }
        ],
        "rotationSets": [
          [
            {
              "id": "l4b2r1q1",
              "type": "sentence-rearrange",
              "prompt": "Make a proper sentence",
              "scrambledItems": ["on", "sits", "The", "branch", "bird", "the"],
              "correctOrder": [2, 4, 1, 0, 3, 5],
              "correctAnswer": "The bird sits on the branch",
              "explanation": "The prepositional phrase on the branch comes after the verb."
            },
            {
              "id": "l4b2r1q2",
              "type": "sentence-rearrange",
              "prompt": "Arrange these words correctly",
              "scrambledItems": ["his", "does", "homework", "carefully", "He"],
              "correctOrder": [4, 1, 0, 2, 3],
              "correctAnswer": "He does his homework carefully",
              "explanation": "Carefully is an adverb that describes how he does homework."
            },
            {
              "id": "l4b2r1q3",
              "type": "add-word",
            "prompt": "Pick the BEST word",
            "exampleSentence": "The doctor treats patients carefully",
            "baseSentence": "The doctor treats patients",
            "wordType": "adverb",
            "insertPosition": 4,
            "options": ["carefully", "roughly", "carelessly", "badly"],
            "correctAnswers": ["carefully"],
            "correctAnswer": "carefully",
              "explanation": "Doctors should treat patients carefully!"
            },
            {
              "id": "l4b2r1q4",
              "type": "add-word",
            "prompt": "What word fits BEST?",
            "exampleSentence": "The students listen attentively to their teacher",
            "baseSentence": "The students listen to their teacher",
            "wordType": "adverb",
            "insertPosition": 3,
            "options": ["attentively", "carelessly", "lazily", "rudely"],
            "correctAnswers": ["attentively"],
            "correctAnswer": "attentively",
              "explanation": "Good students listen attentively to learn well."
            }
          ],
          [
            {
              "id": "l4b2r2q1",
              "type": "sentence-rearrange",
              "prompt": "Build a complete sentence",
              "scrambledItems": ["under", "sleeps", "dog", "The", "the", "tree"],
              "correctOrder": [3, 2, 1, 0, 4, 5],
              "correctAnswer": "The dog sleeps under the tree",
              "explanation": "Under the tree tells us where the dog sleeps."
            },
            {
              "id": "l4b2r2q2",
              "type": "sentence-rearrange",
              "prompt": "Put in the right order",
              "scrambledItems": ["with", "plays", "her", "friends", "She", "happily"],
              "correctOrder": [4, 1, 5, 0, 2, 3],
              "correctAnswer": "She plays happily with her friends",
              "explanation": "Happily describes how, and with her friends tells us with whom."
            },
            {
              "id": "l4b2r2q3",
              "type": "add-word",
            "prompt": "Choose the most suitable word",
            "exampleSentence": "The athlete runs swiftly in the race",
            "baseSentence": "The athlete runs in the race",
            "wordType": "adverb",
            "insertPosition": 3,
            "options": ["swiftly", "slowly", "lazily", "tiredly"],
            "correctAnswers": ["swiftly"],
            "correctAnswer": "swiftly",
              "explanation": "Athletes run swiftly to win races!"
            },
            {
              "id": "l4b2r2q4",
              "type": "add-word",
            "prompt": "Pick the BEST fitting word",
            "exampleSentence": "The gardener waters the plants regularly",
            "baseSentence": "The gardener waters the plants",
            "wordType": "adverb",
            "insertPosition": 5,
            "options": ["regularly", "rarely", "never", "sometimes"],
            "correctAnswers": ["regularly"],
            "correctAnswer": "regularly",
              "explanation": "Plants need to be watered regularly to stay healthy."
            }
          ]
        ]
      }
    ]
  }'
);

-- ============================================================================
-- LESSON 5: READING-WRITING CONNECTION
-- New Question Types: story-sequence (36 q) + reading-comprehension (36 q)
-- ============================================================================

DELETE FROM lessons WHERE title = 'Stories and Sequence' OR "order" = 5;

INSERT INTO lessons (title, description, grade, "order", content) VALUES (
  'Stories and Sequence',
  'Read stories, understand events, and put them in order',
  4,
  5,
  '{
    "title": "Stories and Sequence",
    "description": "I can read stories and understand what happens first, next, and last",
    "rotationEnabled": true,
    "blocks": [
      {
        "blockNumber": 0,
        "introduction": {
          "concept": "Story Sequence",
          "explanation": "Every story has events that happen in order. First something happens, then something else, and finally the story ends. Understanding the order helps us understand the story better!",
          "example": "Story: Ravi woke up. He ate breakfast. He went to school. Order: First woke up, Then ate, Finally went to school.",
          "activity": "Listen to stories and find what happens first, next, and last"
        },
        "questions": [
          {
            "id": "l5b0q1",
            "type": "story-sequence",
            "prompt": "Put the events in the correct order",
            "passage": "Ravi woke up in the morning. He brushed his teeth and washed his face. Then he ate breakfast and went to school.",
            "scrambledItems": [
              "Ravi ate breakfast and went to school",
              "Ravi woke up in the morning",
              "Ravi brushed his teeth and washed his face"
            ],
            "correctOrder": [1, 2, 0],
            "correctAnswer": "1,2,0",
            "explanation": "First Ravi woke up, then he brushed his teeth, finally he ate and went to school."
          },
          {
            "id": "l5b0q2",
            "type": "story-sequence",
            "prompt": "Arrange the story events in order",
            "passage": "The girl went to the park. She played on the swing and slide. Then she ate her snack and went home.",
            "scrambledItems": [
              "She went home",
              "She played on the swing and slide",
              "The girl went to the park"
            ],
            "correctOrder": [2, 1, 0],
            "correctAnswer": "2,1,0",
            "explanation": "First she went to the park, then played, finally went home."
          },
          {
            "id": "l5b0q3",
            "type": "reading-comprehension",
            "prompt": "Read and answer: Who helped the lost puppy?",
            "passage": "A small puppy was lost in the street. It was crying. Maya saw the puppy. She took it home and gave it milk. The puppy stopped crying.",
            "questionType": "who",
            "options": ["Maya", "Her mother", "A policeman", "The shopkeeper"],
            "correctAnswer": "Maya",
            "explanation": "Maya saw the puppy and helped it by taking it home."
          },
          {
            "id": "l5b0q4",
            "type": "reading-comprehension",
            "prompt": "What did the puppy do after getting milk?",
            "passage": "A small puppy was lost in the street. It was crying. Maya saw the puppy. She took it home and gave it milk. The puppy stopped crying.",
            "questionType": "what",
            "options": ["It stopped crying", "It ran away", "It barked loudly", "It slept"],
            "correctAnswer": "It stopped crying",
            "explanation": "After getting milk, the puppy stopped crying."
          }
        ],
        "rotationSets": [
          [
            {
              "id": "l5b0r1q1",
              "type": "story-sequence",
              "prompt": "Put these events in order",
              "passage": "My mother went to the market. She bought vegetables and fruits. Then she came home and cooked dinner for us.",
              "scrambledItems": [
                "She came home and cooked dinner",
                "She bought vegetables and fruits",
                "My mother went to the market"
              ],
              "correctOrder": [2, 1, 0],
              "correctAnswer": "2,1,0",
              "explanation": "First she went to market, then bought items, finally cooked dinner."
            },
            {
              "id": "l5b0r1q2",
              "type": "story-sequence",
              "prompt": "Arrange in correct order",
              "passage": "The sun rose in the morning. Birds started singing. People woke up and started their day.",
              "scrambledItems": [
                "People woke up and started their day",
                "The sun rose in the morning",
                "Birds started singing"
              ],
              "correctOrder": [1, 2, 0],
              "correctAnswer": "1,2,0",
              "explanation": "First sun rose, then birds sang, finally people woke up."
            },
            {
              "id": "l5b0r1q3",
              "type": "reading-comprehension",
              "prompt": "Who planted the seeds?",
              "passage": "Kiran wanted to grow tomatoes. He got seeds from the shop. He planted them in the garden. Every day he watered the seeds. Soon plants started growing.",
              "questionType": "who",
              "options": ["Kiran", "His father", "The shopkeeper", "His friend"],
              "correctAnswer": "Kiran",
              "explanation": "Kiran planted the seeds in the garden."
            },
            {
              "id": "l5b0r1q4",
              "type": "reading-comprehension",
              "prompt": "What happened to the seeds?",
              "passage": "Kiran wanted to grow tomatoes. He got seeds from the shop. He planted them in the garden. Every day he watered the seeds. Soon plants started growing.",
              "questionType": "what",
              "options": ["Plants started growing", "Birds ate them", "They dried up", "Nothing happened"],
              "correctAnswer": "Plants started growing",
              "explanation": "Because Kiran watered them daily, plants started growing."
            }
          ],
          [
            {
              "id": "l5b0r2q1",
              "type": "story-sequence",
              "prompt": "Put the story in order",
              "passage": "It started raining. Children ran inside their houses. The streets became wet and empty.",
              "scrambledItems": [
                "The streets became wet and empty",
                "Children ran inside their houses",
                "It started raining"
              ],
              "correctOrder": [2, 1, 0],
              "correctAnswer": "2,1,0",
              "explanation": "First it rained, children ran inside, then streets became empty."
            },
            {
              "id": "l5b0r2q2",
              "type": "story-sequence",
              "prompt": "Arrange these events",
              "passage": "The bell rang. Students packed their bags. They said goodbye to the teacher and went home happily.",
              "scrambledItems": [
                "They went home happily",
                "Students packed their bags",
                "The bell rang"
              ],
              "correctOrder": [2, 1, 0],
              "correctAnswer": "2,1,0",
              "explanation": "First bell rang, then students packed, finally they went home."
            },
            {
              "id": "l5b0r2q3",
              "type": "reading-comprehension",
              "prompt": "Who won the prize?",
              "passage": "There was a drawing competition in school. Many students participated. Neha drew a beautiful picture of her village. The teacher liked it very much. Neha won the first prize.",
              "questionType": "who",
              "options": ["Neha", "The teacher", "Many students", "Her friend"],
              "correctAnswer": "Neha",
              "explanation": "Neha won the first prize for her beautiful drawing."
            },
            {
              "id": "l5b0r2q4",
              "type": "reading-comprehension",
              "prompt": "What did Neha draw?",
              "passage": "There was a drawing competition in school. Many students participated. Neha drew a beautiful picture of her village. The teacher liked it very much. Neha won the first prize.",
              "questionType": "what",
              "options": ["A picture of her village", "A flower", "A bird", "Her school"],
              "correctAnswer": "A picture of her village",
              "explanation": "Neha drew a beautiful picture of her village."
            }
          ]
        ]
      },
      {
        "blockNumber": 1,
        "questions": [
          {
            "id": "l5b1q1",
            "type": "story-sequence",
            "prompt": "Put these events in the right order",
            "passage": "A farmer wanted to grow wheat. He plowed his field with his oxen. Then he planted the wheat seeds. He watered them regularly. After some months, the wheat grew tall and golden.",
            "scrambledItems": [
              "The wheat grew tall and golden",
              "He plowed his field",
              "He planted the wheat seeds",
              "He watered them regularly"
            ],
            "correctOrder": [1, 2, 3, 0],
            "correctAnswer": "1,2,3,0",
            "explanation": "First he plowed, then planted, then watered, finally wheat grew."
          },
          {
            "id": "l5b1q2",
            "type": "story-sequence",
            "prompt": "Arrange in correct sequence",
            "passage": "Rani was thirsty. She went to the kitchen. She poured water from the jug into a glass. Then she drank the water and felt better.",
            "scrambledItems": [
              "She felt better",
              "She went to the kitchen",
              "Rani was thirsty",
              "She drank the water"
            ],
            "correctOrder": [2, 1, 3, 0],
            "correctAnswer": "2,1,3,0",
            "explanation": "First she was thirsty, went to kitchen, drank water, then felt better."
          },
          {
            "id": "l5b1q3",
            "type": "reading-comprehension",
            "prompt": "Where did the family go on Sunday?",
            "passage": "It was Sunday morning. Rohan's family decided to visit the zoo. They saw many animals like lions, elephants, and monkeys. Rohan liked the elephants the most. They all had a great time and returned home in the evening.",
            "questionType": "where",
            "options": ["To the zoo", "To the park", "To the beach", "To the market"],
            "correctAnswer": "To the zoo",
            "explanation": "The family went to visit the zoo on Sunday."
          },
          {
            "id": "l5b1q4",
            "type": "reading-comprehension",
            "prompt": "Which animal did Rohan like the most?",
            "passage": "It was Sunday morning. Rohan's family decided to visit the zoo. They saw many animals like lions, elephants, and monkeys. Rohan liked the elephants the most. They all had a great time and returned home in the evening.",
            "questionType": "what",
            "options": ["Elephants", "Lions", "Monkeys", "Tigers"],
            "correctAnswer": "Elephants",
            "explanation": "The story says Rohan liked the elephants the most."
          }
        ],
        "rotationSets": [
          [
            {
              "id": "l5b1r1q1",
              "type": "story-sequence",
              "prompt": "Put in correct order",
              "passage": "Meera wanted to make a greeting card. She took colored paper and scissors. She cut the paper into shapes. Then she pasted them on the card and wrote a message. Her friend loved the card.",
              "scrambledItems": [
                "She wrote a message on the card",
                "She took paper and scissors",
                "She cut the paper into shapes",
                "Her friend loved the card"
              ],
              "correctOrder": [1, 2, 0, 3],
              "correctAnswer": "1,2,0,3",
              "explanation": "She took materials, cut shapes, wrote message, friend loved it."
            },
            {
              "id": "l5b1r1q2",
              "type": "story-sequence",
              "prompt": "Arrange these events",
              "passage": "The postman came to our house. He rang the doorbell. My mother opened the door. The postman gave her a letter. She thanked him and closed the door.",
              "scrambledItems": [
                "My mother opened the door",
                "The postman came",
                "She thanked him",
                "He gave her a letter"
              ],
              "correctOrder": [1, 0, 3, 2],
              "correctAnswer": "1,0,3,2",
              "explanation": "Postman came, mother opened door, he gave letter, she thanked."
            },
            {
              "id": "l5b1r1q3",
              "type": "reading-comprehension",
              "prompt": "Where was Ravi's book?",
              "passage": "Ravi could not find his English book. He looked in his bag and on his desk. He even checked under his bed. Finally, his sister found it on the dining table. Ravi thanked her.",
              "questionType": "where",
              "options": ["On the dining table", "In his bag", "On his desk", "Under his bed"],
              "correctAnswer": "On the dining table",
              "explanation": "The book was finally found on the dining table."
            },
            {
              "id": "l5b1r1q4",
              "type": "reading-comprehension",
              "prompt": "Who found Ravi's book?",
              "passage": "Ravi could not find his English book. He looked in his bag and on his desk. He even checked under his bed. Finally, his sister found it on the dining table. Ravi thanked her.",
              "questionType": "who",
              "options": ["His sister", "His mother", "His teacher", "His friend"],
              "correctAnswer": "His sister",
              "explanation": "Ravi's sister found the book for him."
            }
          ],
          [
            {
              "id": "l5b1r2q1",
              "type": "story-sequence",
              "prompt": "Put the story in order",
              "passage": "A crow was very thirsty. It saw a pot with little water at the bottom. The crow dropped pebbles into the pot. The water level rose. The crow drank the water happily.",
              "scrambledItems": [
                "The crow drank the water",
                "It saw a pot with water",
                "A crow was thirsty",
                "The water level rose"
              ],
              "correctOrder": [2, 1, 3, 0],
              "correctAnswer": "2,1,3,0",
              "explanation": "Crow was thirsty, saw pot, water rose, then it drank."
            },
            {
              "id": "l5b1r2q2",
              "type": "story-sequence",
              "prompt": "Arrange correctly",
              "passage": "Sita fell from her bicycle and hurt her knee. Her mother cleaned the wound. She applied medicine on it. Then she put a bandage. Sita felt much better.",
              "scrambledItems": [
                "She put a bandage",
                "Sita fell and hurt her knee",
                "Her mother cleaned the wound",
                "She applied medicine"
              ],
              "correctOrder": [1, 2, 3, 0],
              "correctAnswer": "1,2,3,0",
              "explanation": "Sita fell, mother cleaned, applied medicine, put bandage."
            },
            {
              "id": "l5b1r2q3",
              "type": "reading-comprehension",
              "prompt": "Where do birds build their nests?",
              "passage": "Every spring, birds come to our garden. They collect twigs and dry grass. They build their nests on the mango tree near our window. We enjoy watching the baby birds when they hatch.",
              "questionType": "where",
              "options": ["On the mango tree", "In the bushes", "On the ground", "In the house"],
              "correctAnswer": "On the mango tree",
              "explanation": "Birds build their nests on the mango tree near the window."
            },
            {
              "id": "l5b1r2q4",
              "type": "reading-comprehension",
              "prompt": "When do birds come to the garden?",
              "passage": "Every spring, birds come to our garden. They collect twigs and dry grass. They build their nests on the mango tree near our window. We enjoy watching the baby birds when they hatch.",
              "questionType": "when",
              "options": ["In spring", "In summer", "In winter", "In autumn"],
              "correctAnswer": "In spring",
              "explanation": "Birds come to the garden every spring."
            }
          ]
        ]
      },
      {
        "blockNumber": 2,
        "questions": [
          {
            "id": "l5b2q1",
            "type": "story-sequence",
            "prompt": "Put the story events in order",
            "passage": "Aditi was worried about her math test. She studied hard every night for a week. On test day, the teacher gave out the papers. Aditi answered all questions carefully. She got a very good score and felt proud of herself.",
            "scrambledItems": [
              "She felt proud of herself",
              "Aditi was worried about the test",
              "She studied hard every night",
              "The teacher gave out papers",
              "She got a very good score"
            ],
            "correctOrder": [1, 2, 3, 4, 0],
            "correctAnswer": "1,2,3,4,0",
            "explanation": "Aditi worried, so studied, took test, got good score, felt proud."
          },
          {
            "id": "l5b2q2",
            "type": "story-sequence",
            "prompt": "Arrange these events correctly",
            "passage": "The village had no electricity. The people lived in darkness at night. The government decided to help. Workers came and installed electric poles and wires. Now the whole village has bright lights at night. Everyone is happy.",
            "scrambledItems": [
              "Everyone is happy now",
              "The village had no electricity",
              "Workers installed poles and wires",
              "The government decided to help",
              "The village has bright lights"
            ],
            "correctOrder": [1, 3, 2, 4, 0],
            "correctAnswer": "1,3,2,4,0",
            "explanation": "No electricity, government helped, workers installed, lights came, people happy."
          },
          {
            "id": "l5b2q3",
            "type": "reading-comprehension",
            "prompt": "Why did Rahul feel sad?",
            "passage": "Rahul had a pet parrot named Mitthu. He loved Mitthu very much. One day, he forgot to close the cage door. Mitthu flew away and never came back. Rahul felt very sad and missed his parrot.",
            "questionType": "why",
            "options": ["Because his parrot flew away", "Because he lost his toy", "Because he failed the test", "Because it was raining"],
            "correctAnswer": "Because his parrot flew away",
            "explanation": "Rahul felt sad because his beloved parrot Mitthu flew away and never returned."
          },
          {
            "id": "l5b2q4",
            "type": "reading-comprehension",
            "prompt": "Why is it important to save trees?",
            "passage": "Trees are our best friends. They give us fresh air to breathe and shade to rest under. They provide us with fruits and wood. Animals and birds make their homes in trees. Without trees, life on Earth would be very difficult. That is why we must plant more trees and protect them.",
            "questionType": "why",
            "options": ["Because they give us air, shade, and fruits", "Because they are green", "Because they are tall", "Because they look beautiful"],
            "correctAnswer": "Because they give us air, shade, and fruits",
            "explanation": "Trees are important because they give us fresh air, shade, fruits, and homes for animals."
          }
        ],
        "rotationSets": [
          [
            {
              "id": "l5b2r1q1",
              "type": "story-sequence",
              "prompt": "Put in the correct sequence",
              "passage": "Priya lost her pencil box in school. She looked everywhere but could not find it. She felt upset and told her teacher. The teacher announced it in class. A kind classmate found it under a desk and returned it. Priya was very happy and thanked her friend.",
              "scrambledItems": [
                "Priya was very happy",
                "Priya lost her pencil box",
                "She told her teacher",
                "A classmate found it",
                "She thanked her friend"
              ],
              "correctOrder": [1, 2, 3, 0, 4],
              "correctAnswer": "1,2,3,0,4",
              "explanation": "Lost pencil box, told teacher, friend found it, she was happy, thanked friend."
            },
            {
              "id": "l5b2r1q2",
              "type": "story-sequence",
              "prompt": "Arrange in order",
              "passage": "There was a big flood in the village. Many houses were filled with water. People climbed to their rooftops. The rescue team arrived in boats. They saved all the people and took them to a safe place. Everyone was relieved.",
              "scrambledItems": [
                "Everyone was relieved",
                "There was a big flood",
                "People climbed to rooftops",
                "Rescue team arrived",
                "They saved all the people"
              ],
              "correctOrder": [1, 2, 3, 4, 0],
              "correctAnswer": "1,2,3,4,0",
              "explanation": "Flood came, people climbed up, rescue came, they saved people, everyone relieved."
            },
            {
              "id": "l5b2r1q3",
              "type": "reading-comprehension",
              "prompt": "Why did the boy help the injured bird?",
              "passage": "Amit saw a small bird with a broken wing lying on the ground. He felt sorry for it. He carefully picked it up and took it home. He made a soft bed for it and gave it food and water. After a few weeks, the bird's wing healed. Amit set it free and the bird flew away happily. Amit was happy because he had helped the bird.",
              "questionType": "why",
              "options": ["Because he felt sorry for it", "Because someone told him to", "Because he wanted a pet", "Because it was expensive"],
              "correctAnswer": "Because he felt sorry for it",
              "explanation": "Amit helped the bird because he felt sorry seeing it injured."
            },
            {
              "id": "l5b2r1q4",
              "type": "reading-comprehension",
              "prompt": "Why should we keep our surroundings clean?",
              "passage": "Keeping our surroundings clean is very important. Dirty places attract flies and mosquitoes. These insects spread diseases. Clean places are pleasant to live in. They keep us healthy and happy. We should never throw garbage on roads or in public places. We must use dustbins.",
              "questionType": "why",
              "options": ["Because dirty places spread diseases", "Because it looks nice", "Because it is easy", "Because everyone does it"],
              "correctAnswer": "Because dirty places spread diseases",
              "explanation": "We should keep clean because dirty places attract insects that spread diseases."
            }
          ],
          [
            {
              "id": "l5b2r2q1",
              "type": "story-sequence",
              "prompt": "Put these events in order",
              "passage": "Rohan wanted to surprise his mother on her birthday. He saved his pocket money for two months. He went to the market with his father. He bought a beautiful saree for her. On birthday morning, he gave her the gift. His mother was very touched and hugged him.",
              "scrambledItems": [
                "His mother hugged him",
                "He wanted to surprise her",
                "He saved pocket money",
                "He bought a saree",
                "He gave her the gift"
              ],
              "correctOrder": [1, 2, 3, 4, 0],
              "correctAnswer": "1,2,3,4,0",
              "explanation": "Wanted to surprise, saved money, bought saree, gave gift, mother hugged."
            },
            {
              "id": "l5b2r2q2",
              "type": "story-sequence",
              "prompt": "Arrange correctly",
              "passage": "A group of children wanted to clean their school playground. They made a plan together. They brought brooms, bags, and gloves. They picked up all the garbage and put it in bags. They swept the ground clean. The playground looked beautiful. Their principal praised their good work.",
              "scrambledItems": [
                "The principal praised them",
                "Children wanted to clean",
                "They made a plan",
                "They picked up garbage",
                "The playground looked beautiful"
              ],
              "correctOrder": [1, 2, 3, 4, 0],
              "correctAnswer": "1,2,3,4,0",
              "explanation": "Wanted to clean, made plan, picked garbage, playground beautiful, got praise."
            },
            {
              "id": "l5b2r2q3",
              "type": "reading-comprehension",
              "prompt": "Why is exercise important for children?",
              "passage": "Children should exercise every day. Exercise makes our bodies strong and healthy. It helps us grow properly. When we play and run, our muscles become stronger. Exercise also makes us feel happy and energetic. Children who exercise regularly do not fall sick often. That is why parents and teachers encourage children to play outdoor games.",
              "questionType": "why",
              "options": ["Because it makes us strong and healthy", "Because it is fun", "Because others do it", "Because we have free time"],
              "correctAnswer": "Because it makes us strong and healthy",
              "explanation": "Exercise is important because it makes our bodies strong, healthy, and helps us grow."
            },
            {
              "id": "l5b2r2q4",
              "type": "reading-comprehension",
              "prompt": "Why did the villagers build a well?",
              "passage": "In a small village, people had to walk very far to get water. Women carried heavy pots on their heads. Children could not play because they had to help fetch water. The villagers came together and decided to dig a well in the middle of the village. Now everyone has water nearby. Life has become much easier for everyone.",
              "questionType": "why",
              "options": ["Because they had to walk far for water", "Because they were bored", "Because someone told them", "Because it looked nice"],
              "correctAnswer": "Because they had to walk far for water",
              "explanation": "Villagers built a well because they had to walk very far to get water before."
            }
          ]
        ]
      }
    ]
  }'
);

-- Verification queries
SELECT title, "order",
       jsonb_array_length(content->'blocks') as blocks,
       (SELECT count(*) FROM jsonb_array_elements(content->'blocks') as b,
                             jsonb_array_elements(b->'questions') as q) as total_questions
FROM lessons
WHERE "order" IN (2, 3, 4, 5)
ORDER BY "order";

-- Count questions by type
SELECT
  l.title,
  q.value->>'type' as question_type,
  count(*) as count
FROM lessons l,
     jsonb_array_elements(l.content->'blocks') as b,
     jsonb_array_elements(b->'questions') as q
WHERE l."order" IN (2, 3, 4, 5)
GROUP BY l.title, q.value->>'type'
ORDER BY l.title, question_type;
