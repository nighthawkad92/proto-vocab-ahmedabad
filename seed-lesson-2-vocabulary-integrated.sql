-- Lesson 2: Vocabulary in Context (Meaning Matters)
-- Integrated from: Grade 4 English PAL-Integrated Lesson Plans PDF
-- Test questions integrated: sentence-gap-fill (4 questions)
-- Difficulty progression: EASY (2) → MEDIUM (1) → HARD (1)

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
