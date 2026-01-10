-- Lesson 4: Sentence Expansion (Writing with Meaning)
-- Integrated from: Grade 4 English PAL-Integrated Lesson Plans PDF
-- Test questions integrated: sentence-rearrange (4) + add-word (4) = 8 total
-- Difficulty progression: EASY (4) → MEDIUM (2) → HARD (2)

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
    "levels": [
      {
        "levelNumber": 0,
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
        "levelNumber": 1,
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
        "levelNumber": 2,
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
        "levelNumber": 3,
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
