-- Grade 4 English PAL-Integrated Lessons
-- Based on below-grade-level learner curriculum
-- Each lesson includes an interactive concept introduction block

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
    "blocks": [
      {
        "blockNumber": 0,
        "introduction": {
          "concept": "Syllable Breaking",
          "explanation": "Big words are made of small sound parts called syllables. When we break words into syllables, reading becomes easier!",
          "example": "bas-ket (2 parts), win-dow (2 parts), mar-ket (2 parts)",
          "activity": "Clap your hands for each syllable: bas-ket (clap-clap)"
        },
        "questions": [
          {
            "id": "l1b0q1",
            "type": "multiple-choice",
            "prompt": "How many syllables in: basket",
            "options": ["1 syllable", "2 syllables", "3 syllables", "4 syllables"],
            "correctAnswer": "2 syllables"
          },
          {
            "id": "l1b0q2",
            "type": "multiple-choice",
            "prompt": "How many syllables in: window",
            "options": ["1 syllable", "2 syllables", "3 syllables", "4 syllables"],
            "correctAnswer": "2 syllables"
          },
          {
            "id": "l1b0q3",
            "type": "multiple-choice",
            "prompt": "Break this word: paper",
            "options": ["pa-per", "pap-er", "p-aper", "paper"],
            "correctAnswer": "pa-per"
          },
          {
            "id": "l1b0q4",
            "type": "multiple-choice",
            "prompt": "Break this word: teacher",
            "options": ["te-acher", "tea-cher", "teach-er", "t-eacher"],
            "correctAnswer": "tea-cher"
          }
        ]
      },
      {
        "blockNumber": 1,
        "questions": [
          {
            "id": "l1b1q1",
            "type": "multiple-choice",
            "prompt": "How many syllables in: market",
            "options": ["1 syllable", "2 syllables", "3 syllables", "4 syllables"],
            "correctAnswer": "2 syllables"
          },
          {
            "id": "l1b1q2",
            "type": "multiple-choice",
            "prompt": "How many syllables in: garden",
            "options": ["1 syllable", "2 syllables", "3 syllables", "4 syllables"],
            "correctAnswer": "2 syllables"
          },
          {
            "id": "l1b1q3",
            "type": "multiple-choice",
            "prompt": "Break this word: village",
            "options": ["vil-lage", "vi-llage", "villa-ge", "v-illage"],
            "correctAnswer": "vil-lage"
          },
          {
            "id": "l1b1q4",
            "type": "multiple-choice",
            "prompt": "Break this word: blanket",
            "options": ["blan-ket", "blank-et", "bla-nket", "b-lanket"],
            "correctAnswer": "blan-ket"
          }
        ]
      },
      {
        "blockNumber": 2,
        "questions": [
          {
            "id": "l1b2q1",
            "type": "multiple-choice",
            "prompt": "How many syllables in: remember",
            "options": ["1 syllable", "2 syllables", "3 syllables", "4 syllables"],
            "correctAnswer": "3 syllables"
          },
          {
            "id": "l1b2q2",
            "type": "multiple-choice",
            "prompt": "How many syllables in: important",
            "options": ["1 syllable", "2 syllables", "3 syllables", "4 syllables"],
            "correctAnswer": "3 syllables"
          },
          {
            "id": "l1b2q3",
            "type": "multiple-choice",
            "prompt": "Break this word: understand",
            "options": ["un-der-stand", "und-er-stand", "under-stand", "u-nder-stand"],
            "correctAnswer": "un-der-stand"
          },
          {
            "id": "l1b2q4",
            "type": "multiple-choice",
            "prompt": "Break this word: together",
            "options": ["to-geth-er", "tog-eth-er", "together", "to-ge-ther"],
            "correctAnswer": "to-geth-er"
          }
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
    "blocks": [
      {
        "blockNumber": 0,
        "introduction": {
          "concept": "Word Meanings",
          "explanation": "Words have meanings that help us describe how we feel and what we see. Learning new words helps us express ourselves better!",
          "example": "tired = feeling sleepy, happy = feeling joyful, afraid = feeling scared",
          "activity": "Act out these feelings: Show me a tired face! Show me a happy face!"
        },
        "questions": [
          {
            "id": "l2b0q1",
            "type": "sentence-completion",
            "prompt": "I am ___ after playing outside",
            "options": ["hungry", "tall", "blue", "yesterday"],
            "correctAnswer": "hungry"
          },
          {
            "id": "l2b0q2",
            "type": "sentence-completion",
            "prompt": "The boy feels ___ after school",
            "options": ["tired", "fast", "big", "round"],
            "correctAnswer": "tired"
          },
          {
            "id": "l2b0q3",
            "type": "sentence-completion",
            "prompt": "The glass is ___ of water",
            "options": ["full", "quick", "loud", "yesterday"],
            "correctAnswer": "full"
          },
          {
            "id": "l2b0q4",
            "type": "sentence-completion",
            "prompt": "The shop is ___ my house",
            "options": ["near", "happy", "green", "slowly"],
            "correctAnswer": "near"
          }
        ]
      },
      {
        "blockNumber": 1,
        "questions": [
          {
            "id": "l2b1q1",
            "type": "sentence-completion",
            "prompt": "Be ___ while crossing the road",
            "options": ["careful", "yellow", "round", "tasty"],
            "correctAnswer": "careful"
          },
          {
            "id": "l2b1q2",
            "type": "sentence-completion",
            "prompt": "The child was ___ of the dark",
            "options": ["afraid", "table", "window", "number"],
            "correctAnswer": "afraid"
          },
          {
            "id": "l2b1q3",
            "type": "sentence-completion",
            "prompt": "She felt ___ about the picnic",
            "options": ["excited", "chair", "pencil", "book"],
            "correctAnswer": "excited"
          },
          {
            "id": "l2b1q4",
            "type": "sentence-completion",
            "prompt": "The girl was ___ during the storm",
            "options": ["brave", "tree", "water", "paper"],
            "correctAnswer": "brave"
          }
        ]
      },
      {
        "blockNumber": 2,
        "questions": [
          {
            "id": "l2b2q1",
            "type": "sentence-completion",
            "prompt": "I felt ___ by the question",
            "options": ["confused", "table", "window", "pencil"],
            "correctAnswer": "confused"
          },
          {
            "id": "l2b2q2",
            "type": "sentence-completion",
            "prompt": "We must be ___ while waiting",
            "options": ["patient", "chair", "fast", "blue"],
            "correctAnswer": "patient"
          },
          {
            "id": "l2b2q3",
            "type": "sentence-completion",
            "prompt": "She felt ___ after practice",
            "options": ["confident", "tree", "yellow", "book"],
            "correctAnswer": "confident"
          },
          {
            "id": "l2b2q4",
            "type": "sentence-completion",
            "prompt": "He was ___ before the test",
            "options": ["nervous", "ball", "water", "door"],
            "correctAnswer": "nervous"
          }
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
    "blocks": [
      {
        "blockNumber": 0,
        "introduction": {
          "concept": "Reading with Understanding",
          "explanation": "When we read stories, we need to understand WHO is in the story and WHAT happened. This helps us remember and enjoy the story!",
          "example": "Story: Ravi played with his ball. WHO? Ravi. WHAT? He played with his ball.",
          "activity": "Listen carefully and think: Who is the story about? What did they do?"
        },
        "questions": [
          {
            "id": "l3b0q1",
            "type": "multiple-choice",
            "prompt": "Story: The boy walked to school. His friend was waiting at the gate. Who is in the story?",
            "options": ["The boy and his friend", "The teacher", "The dog", "The mother"],
            "correctAnswer": "The boy and his friend"
          },
          {
            "id": "l3b0q2",
            "type": "multiple-choice",
            "prompt": "Story: Meena saw a cat in the park. The cat was sleeping under a tree. Where was the cat?",
            "options": ["Under a tree", "In the house", "On the road", "In the shop"],
            "correctAnswer": "Under a tree"
          },
          {
            "id": "l3b0q3",
            "type": "multiple-choice",
            "prompt": "Story: The sun was shining. The children played in the park. They were very happy. How did the children feel?",
            "options": ["Happy", "Sad", "Angry", "Tired"],
            "correctAnswer": "Happy"
          },
          {
            "id": "l3b0q4",
            "type": "multiple-choice",
            "prompt": "Story: Ravi lost his book. His sister helped him find it under the table. What was lost?",
            "options": ["His book", "His bag", "His pencil", "His lunch"],
            "correctAnswer": "His book"
          }
        ]
      },
      {
        "blockNumber": 1,
        "questions": [
          {
            "id": "l3b1q1",
            "type": "multiple-choice",
            "prompt": "Story: The farmer worked in the field every morning. He grew rice and vegetables for the village. What did the farmer grow?",
            "options": ["Rice and vegetables", "Only flowers", "Only trees", "Animals"],
            "correctAnswer": "Rice and vegetables"
          },
          {
            "id": "l3b1q2",
            "type": "multiple-choice",
            "prompt": "Story: It started raining suddenly. The children ran inside the classroom quickly. What happened suddenly?",
            "options": ["It started raining", "The sun came out", "The bell rang", "School ended"],
            "correctAnswer": "It started raining"
          },
          {
            "id": "l3b1q3",
            "type": "multiple-choice",
            "prompt": "Story: The family went on a picnic near the river. They ate food and played games together. Where did they go?",
            "options": ["Near the river", "To the market", "To school", "To the temple"],
            "correctAnswer": "Near the river"
          },
          {
            "id": "l3b1q4",
            "type": "multiple-choice",
            "prompt": "Story: The teacher read a story. All students listened carefully and learned something new. What did the students do?",
            "options": ["Listened carefully", "Slept", "Played outside", "Ate lunch"],
            "correctAnswer": "Listened carefully"
          }
        ]
      },
      {
        "blockNumber": 2,
        "questions": [
          {
            "id": "l3b2q1",
            "type": "multiple-choice",
            "prompt": "Story: Suddenly, it started raining. The children quickly ran inside. They reached the classroom safely. What did the children do first?",
            "options": ["Ran inside quickly", "Played in rain", "Sat down", "Opened books"],
            "correctAnswer": "Ran inside quickly"
          },
          {
            "id": "l3b2q2",
            "type": "multiple-choice",
            "prompt": "Story: The boy walked carefully on the wet floor. He did not want to fall. Finally, he reached the door safely. How did the boy walk?",
            "options": ["Carefully", "Fast", "Jumping", "Running"],
            "correctAnswer": "Carefully"
          },
          {
            "id": "l3b2q3",
            "type": "multiple-choice",
            "prompt": "Story: The family worked together to clean the house. First, they swept the floor. Then, they arranged everything neatly. What did they do after sweeping?",
            "options": ["Arranged everything neatly", "Went outside", "Ate food", "Slept"],
            "correctAnswer": "Arranged everything neatly"
          },
          {
            "id": "l3b2q4",
            "type": "multiple-choice",
            "prompt": "Story: The girl quietly entered the library. She immediately found her favorite book. She sat down and read peacefully. Where did this happen?",
            "options": ["In the library", "At home", "In the park", "At school playground"],
            "correctAnswer": "In the library"
          }
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
    "blocks": [
      {
        "blockNumber": 0,
        "introduction": {
          "concept": "Adding Details",
          "explanation": "Simple sentences can become more interesting when we add words that tell us WHAT KIND and HOW. This makes our writing better!",
          "example": "Simple: The dog runs. Better: The brown dog runs fast.",
          "activity": "Think: What kind of dog? How does it run? Now the sentence is more interesting!"
        },
        "questions": [
          {
            "id": "l4b0q1",
            "type": "multiple-choice",
            "prompt": "Make this better: The dog runs. Add a describing word.",
            "options": ["The big dog runs", "Dog runs fast", "The runs dog", "Runs the dog"],
            "correctAnswer": "The big dog runs"
          },
          {
            "id": "l4b0q2",
            "type": "multiple-choice",
            "prompt": "Make this better: The girl sings. Add HOW she sings.",
            "options": ["The girl sings happily", "Girl the sings", "Sings girl happy", "The sings girl"],
            "correctAnswer": "The girl sings happily"
          },
          {
            "id": "l4b0q3",
            "type": "multiple-choice",
            "prompt": "Add a word: The cat sleeps.",
            "options": ["The small cat sleeps", "Cat small sleeps", "Sleeps small cat", "The sleeps cat"],
            "correctAnswer": "The small cat sleeps"
          },
          {
            "id": "l4b0q4",
            "type": "multiple-choice",
            "prompt": "Add a word: The boy runs.",
            "options": ["The boy runs quickly", "Runs boy quickly", "Boy quickly runs", "Quickly the runs"],
            "correctAnswer": "The boy runs quickly"
          }
        ]
      },
      {
        "blockNumber": 1,
        "questions": [
          {
            "id": "l4b1q1",
            "type": "multiple-choice",
            "prompt": "Make better: The sun shines.",
            "options": ["The hot sun shines", "Sun hot shines", "Shines sun hot", "The shines sun"],
            "correctAnswer": "The hot sun shines"
          },
          {
            "id": "l4b1q2",
            "type": "multiple-choice",
            "prompt": "Make better: The teacher speaks.",
            "options": ["The teacher speaks loudly", "Teacher loudly speaks", "Speaks teacher loud", "Loudly speaks teacher"],
            "correctAnswer": "The teacher speaks loudly"
          },
          {
            "id": "l4b1q3",
            "type": "multiple-choice",
            "prompt": "Add two words: The child writes.",
            "options": ["The child writes neatly in his notebook", "Child writes neatly notebook", "Writes child neatly", "Neatly writes child"],
            "correctAnswer": "The child writes neatly in his notebook"
          },
          {
            "id": "l4b1q4",
            "type": "multiple-choice",
            "prompt": "Add words: The dog barks.",
            "options": ["The dog barks loudly at night", "Dog barks loudly night", "Barks dog night", "Night barks dog"],
            "correctAnswer": "The dog barks loudly at night"
          }
        ]
      },
      {
        "blockNumber": 2,
        "questions": [
          {
            "id": "l4b2q1",
            "type": "multiple-choice",
            "prompt": "Make better with precision: The boy runs.",
            "options": ["The boy runs quickly in the park", "Boy runs park", "Runs boy quickly", "The runs boy park"],
            "correctAnswer": "The boy runs quickly in the park"
          },
          {
            "id": "l4b2q2",
            "type": "multiple-choice",
            "prompt": "Make better with precision: The child writes.",
            "options": ["The child writes neatly in his notebook", "Child neatly writes", "Writes child notebook", "Notebook writes child"],
            "correctAnswer": "The child writes neatly in his notebook"
          },
          {
            "id": "l4b2q3",
            "type": "multiple-choice",
            "prompt": "Add style: The girl answers.",
            "options": ["The girl answers politely in the class", "Girl politely answers", "Answers girl class", "Class answers girl"],
            "correctAnswer": "The girl answers politely in the class"
          },
          {
            "id": "l4b2q4",
            "type": "multiple-choice",
            "prompt": "Add style: The students walk.",
            "options": ["The students walk safely in a line", "Students safely walk", "Walk students line", "Line walk students"],
            "correctAnswer": "The students walk safely in a line"
          }
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
    "blocks": [
      {
        "blockNumber": 0,
        "introduction": {
          "concept": "Reading and Writing Together",
          "explanation": "When we read a story, we can write about it to show what we understood. We answer: WHO is in the story? WHAT happened?",
          "example": "Story: Ravi played with his ball. Answer: Ravi is in the story. He played with his ball.",
          "activity": "Read carefully, think about it, then write your answer in your own words!"
        },
        "questions": [
          {
            "id": "l5b0q1",
            "type": "multiple-choice",
            "prompt": "Story: Meena and her dog went to the park. The dog ran fast. Who is in the story?",
            "options": ["Meena and her dog", "Meena only", "The dog only", "Meena and her cat"],
            "correctAnswer": "Meena and her dog"
          },
          {
            "id": "l5b0q2",
            "type": "multiple-choice",
            "prompt": "Story: The girl went to school and met her friend. They played together. What happened?",
            "options": ["She met her friend and played", "She went home", "She studied alone", "She was sleeping"],
            "correctAnswer": "She met her friend and played"
          },
          {
            "id": "l5b0q3",
            "type": "multiple-choice",
            "prompt": "Story: The boy lost his bag. His friend helped him find it. What problem happened?",
            "options": ["The boy lost his bag", "The boy was hungry", "The boy was late", "The boy was sick"],
            "correctAnswer": "The boy lost his bag"
          },
          {
            "id": "l5b0q4",
            "type": "multiple-choice",
            "prompt": "Story: The family went on a picnic. They ate food and played games. What did the family do?",
            "options": ["Went on a picnic and played games", "Stayed at home", "Went to school", "Went to temple"],
            "correctAnswer": "Went on a picnic and played games"
          }
        ]
      },
      {
        "blockNumber": 1,
        "questions": [
          {
            "id": "l5b1q1",
            "type": "multiple-choice",
            "prompt": "Story: The farmer worked hard every morning in the field. He grew vegetables for his village. Who was important in the story?",
            "options": ["The farmer", "The teacher", "The doctor", "The student"],
            "correctAnswer": "The farmer"
          },
          {
            "id": "l5b1q2",
            "type": "multiple-choice",
            "prompt": "Story: It started raining. The children ran inside quickly. They were safe and dry. What happened first?",
            "options": ["It started raining", "Children played", "Children ate", "School ended"],
            "correctAnswer": "It started raining"
          },
          {
            "id": "l5b1q3",
            "type": "multiple-choice",
            "prompt": "Story: The teacher read a story. All students listened carefully. They learned something new. What did the character learn?",
            "options": ["Something new", "Nothing", "How to play", "How to sleep"],
            "correctAnswer": "Something new"
          },
          {
            "id": "l5b1q4",
            "type": "multiple-choice",
            "prompt": "Story: Ravi helped his mother clean the house. She was very happy. His mother thanked him. Who was helpful in the story?",
            "options": ["Ravi", "The teacher", "The friend", "The dog"],
            "correctAnswer": "Ravi"
          }
        ]
      },
      {
        "blockNumber": 2,
        "questions": [
          {
            "id": "l5b2q1",
            "type": "multiple-choice",
            "prompt": "Story: The boy lost his bag. His friend helped him find it under the table. Who is in the story and what happened?",
            "options": ["The boy and his friend. The boy lost his bag and the friend helped find it.", "The boy lost bag.", "Friend helped.", "Under table."],
            "correctAnswer": "The boy and his friend. The boy lost his bag and the friend helped find it."
          },
          {
            "id": "l5b2q2",
            "type": "multiple-choice",
            "prompt": "Story: It started raining suddenly. The children ran inside quickly. They were safe and dry. What happened first and what happened next?",
            "options": ["It started raining first, then children ran inside.", "Children played.", "Rain stopped.", "School ended."],
            "correctAnswer": "It started raining first, then children ran inside."
          },
          {
            "id": "l5b2q3",
            "type": "multiple-choice",
            "prompt": "Story: The farmer worked hard every day. He grew food for his village. Everyone was happy. What problem did the farmer solve?",
            "options": ["He grew food so people could eat.", "He worked hard.", "Village was big.", "Day was long."],
            "correctAnswer": "He grew food so people could eat."
          },
          {
            "id": "l5b2q4",
            "type": "multiple-choice",
            "prompt": "Story: The girl was afraid of the dark. Her mother gave her a small light. Now she feels safe. What changed in the story?",
            "options": ["The girl went from afraid to feeling safe.", "Mother came.", "Light was small.", "Dark was there."],
            "correctAnswer": "The girl went from afraid to feeling safe."
          }
        ]
      }
    ]
  }'::jsonb
);
