#!/usr/bin/env node

/**
 * Load test questions into Supabase database
 * This script reads seed-test-questions.sql and executes it against the remote Supabase instance
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function loadTestQuestions() {
  console.log('🚀 Loading test questions into Supabase...\n');

  // First, check if test lesson already exists
  const { data: existingLesson, error: checkError } = await supabase
    .from('lessons')
    .select('id, title')
    .eq('title', 'Test Lesson - New Question Types')
    .single();

  if (existingLesson) {
    console.log('⚠️  Test lesson already exists. Deleting old version...');
    const { error: deleteError } = await supabase
      .from('lessons')
      .delete()
      .eq('id', existingLesson.id);

    if (deleteError) {
      console.error('❌ Error deleting old test lesson:', deleteError.message);
      process.exit(1);
    }
    console.log('✅ Old test lesson deleted\n');
  }

  // Define test lesson content
  const testLesson = {
    title: 'Test Lesson - New Question Types',
    description: 'Validation lesson for sentence-rearrange, story-sequence, sentence-gap-fill, reading-comprehension, and add-word components',
    grade: 4,
    order: 0,
    content: {
      title: 'Test Lesson - New Question Types',
      description: 'Testing all 5 new question type components',
      rotationEnabled: false,
      blocks: [
        {
          blockNumber: 0,
          introduction: {
            concept: 'New Question Types - EASY Level',
            explanation: 'This block tests all 5 new question types at EASY difficulty',
            example: 'Drag words, select answers, read stories',
            activity: 'Complete each question to validate the component works'
          },
          questions: [
            // Sentence Rearrange - EASY
            {
              id: 'test-sr-1',
              type: 'sentence-rearrange',
              prompt: 'Arrange the words to make a sentence',
              scrambledItems: ['runs', 'dog', 'The'],
              correctOrder: [2, 1, 0],
              correctAnswer: 'The dog runs',
              explanation: 'Sentences start with "The", then the subject "dog", then the verb "runs".'
            },
            {
              id: 'test-sr-2',
              type: 'sentence-rearrange',
              prompt: 'Arrange the words to make a sentence',
              scrambledItems: ['flies', 'The', 'bird', 'fast'],
              correctOrder: [1, 2, 0, 3],
              correctAnswer: 'The bird flies fast',
              explanation: 'The correct order is: The bird flies fast.'
            },
            // Story Sequence - EASY
            {
              id: 'test-ss-1',
              type: 'story-sequence',
              prompt: 'Put the events in the correct order',
              passage: 'Ravi woke up in the morning. He brushed his teeth. Then he ate breakfast and went to school.',
              scrambledItems: [
                'Ravi ate breakfast and went to school',
                'Ravi woke up in the morning',
                'Ravi brushed his teeth'
              ],
              correctOrder: [1, 2, 0],
              correctAnswer: '1,2,0',
              explanation: 'First Ravi woke up, then he brushed his teeth, finally he ate and went to school.'
            },
            {
              id: 'test-ss-2',
              type: 'story-sequence',
              prompt: 'Put the events in the correct order',
              passage: 'Meena went to the market. She bought vegetables. Then she came home and cooked food.',
              scrambledItems: [
                'Meena came home and cooked food',
                'Meena went to the market',
                'Meena bought vegetables'
              ],
              correctOrder: [1, 2, 0],
              correctAnswer: '1,2,0',
              explanation: 'First Meena went to market, then bought vegetables, finally came home and cooked.'
            },
            // Gap Fill - EASY
            {
              id: 'test-sgf-1',
              type: 'sentence-gap-fill',
              prompt: 'Choose the word that makes the most sense',
              baseSentence: 'The cat is ___.',
              gapPosition: 3,
              options: ['happy', 'sad', 'angry', 'tired'],
              correctAnswer: 'happy',
              explanation: 'All options can work, but "happy" is the most common and positive.'
            },
            {
              id: 'test-sgf-2',
              type: 'sentence-gap-fill',
              prompt: 'Choose the word that makes the most sense',
              baseSentence: 'I feel ___ after playing.',
              gapPosition: 2,
              options: ['tired', 'cold', 'hungry', 'angry'],
              correctAnswer: 'tired',
              explanation: 'After playing, we usually feel tired because we use energy.'
            },
            // Reading Comprehension - EASY
            {
              id: 'test-rc-1',
              type: 'reading-comprehension',
              prompt: 'Read the passage and answer the question',
              passage: 'Ravi has a dog. The dog is brown. It likes to play.',
              question: 'Who has a dog?',
              questionType: 'who',
              options: ['Ravi', 'Meena', 'Teacher', 'Mother'],
              correctAnswer: 'Ravi',
              explanation: 'The passage says "Ravi has a dog".'
            },
            {
              id: 'test-rc-2',
              type: 'reading-comprehension',
              prompt: 'Read the passage and answer the question',
              passage: 'The bird is sitting on a tree. It is singing a song.',
              question: 'What is the bird doing?',
              questionType: 'what',
              options: ['Flying', 'Singing', 'Sleeping', 'Eating'],
              correctAnswer: 'Singing',
              explanation: 'The passage says "It is singing a song".'
            },
            // Add Word - EASY
            {
              id: 'test-aw-1',
              type: 'add-word',
              prompt: 'Choose a word to make the sentence better',
              baseSentence: 'The dog runs',
              insertPosition: 1,
              wordType: 'adjective',
              options: ['big', 'small', 'brown', 'happy'],
              correctAnswers: ['big', 'small', 'brown', 'happy'],
              correctAnswer: 'big',
              explanation: 'All these words can describe the dog. Any choice is correct!'
            },
            {
              id: 'test-aw-2',
              type: 'add-word',
              prompt: 'Choose a word to make the sentence better',
              baseSentence: 'The bird flies',
              insertPosition: 1,
              wordType: 'adjective',
              options: ['small', 'colorful', 'beautiful', 'fast'],
              correctAnswers: ['small', 'colorful', 'beautiful', 'fast'],
              correctAnswer: 'small',
              explanation: 'All these words can describe the bird. Any choice is correct!'
            }
          ]
        },
        {
          blockNumber: 1,
          introduction: {
            concept: 'New Question Types - MEDIUM Level',
            explanation: 'This block tests all 5 new question types at MEDIUM difficulty',
            example: 'More complex sentences and passages',
            activity: 'Complete each question carefully'
          },
          questions: [
            {
              id: 'test-sr-3',
              type: 'sentence-rearrange',
              prompt: 'Arrange the words to make a sentence',
              scrambledItems: ['farmer', 'The', 'happy', 'works', 'hard'],
              correctOrder: [1, 2, 0, 3, 4],
              correctAnswer: 'The happy farmer works hard',
              explanation: 'Article + adjective + noun + verb + adverb: The happy farmer works hard.'
            },
            {
              id: 'test-ss-3',
              type: 'story-sequence',
              prompt: 'Put the events in the correct order',
              passage: 'Amit is a farmer. Every morning he wakes up early. He goes to his field and works hard. In the evening he comes home tired but happy.',
              scrambledItems: [
                'Amit comes home tired but happy',
                'Amit wakes up early in the morning',
                'Amit goes to his field',
                'Amit works hard in the field'
              ],
              correctOrder: [1, 2, 3, 0],
              correctAnswer: '1,2,3,0',
              explanation: 'First he wakes up, then goes to field, works hard, and finally comes home.'
            },
            {
              id: 'test-sgf-3',
              type: 'sentence-gap-fill',
              prompt: 'Choose the word that makes the most sense',
              baseSentence: 'We must be ___ when crossing the road.',
              gapPosition: 3,
              options: ['careful', 'happy', 'fast', 'tired'],
              correctAnswer: 'careful',
              explanation: 'Safety requires us to be careful when crossing roads.'
            },
            {
              id: 'test-rc-3',
              type: 'reading-comprehension',
              prompt: 'Read the passage and answer the question',
              passage: 'Kiran is a farmer. He grows rice and wheat in his field. Every day he works from morning till evening. He loves his work.',
              question: 'What does Kiran grow?',
              questionType: 'what',
              options: ['Rice and wheat', 'Vegetables', 'Fruits', 'Flowers'],
              correctAnswer: 'Rice and wheat',
              explanation: 'The passage says "He grows rice and wheat in his field".'
            },
            {
              id: 'test-aw-3',
              type: 'add-word',
              prompt: 'Choose the best word to complete the sentence',
              baseSentence: 'The boy ran to school',
              insertPosition: 3,
              wordType: 'adverb',
              options: ['quickly', 'slowly', 'carefully', 'happily'],
              correctAnswers: ['quickly', 'slowly'],
              correctAnswer: 'quickly',
              explanation: '"Quickly" or "slowly" best describe how someone runs.'
            }
          ]
        },
        {
          blockNumber: 2,
          introduction: {
            concept: 'New Question Types - HARD Level',
            explanation: 'This block tests all 5 new question types at HARD difficulty',
            example: 'Complex sentences requiring inference',
            activity: 'Think carefully about each question'
          },
          questions: [
            {
              id: 'test-sr-4',
              type: 'sentence-rearrange',
              prompt: 'Arrange the words to make a sentence',
              scrambledItems: ['in', 'morning', 'the', 'birds', 'The', 'sing', 'beautiful'],
              correctOrder: [0, 1, 2, 3, 4, 5, 6],
              correctAnswer: 'The beautiful birds sing in the morning',
              explanation: 'Article + adjective + noun + verb + prepositional phrase: The beautiful birds sing in the morning.'
            },
            {
              id: 'test-ss-4',
              type: 'story-sequence',
              prompt: 'Put the events in the correct order',
              passage: 'Priya wanted to make a drawing for her mother. First she thought about what to draw. Then she got paper and colors. She drew a beautiful picture of a garden. Finally she gave it to her mother who was very happy.',
              scrambledItems: [
                'Priya gave the picture to her mother',
                'Priya thought about what to draw',
                'Priya got paper and colors',
                'Priya drew a beautiful picture',
                'Her mother was very happy'
              ],
              correctOrder: [1, 2, 3, 0, 4],
              correctAnswer: '1,2,3,0,4',
              explanation: 'The sequence is: think, get materials, draw, give gift, mother happy.'
            },
            {
              id: 'test-sgf-4',
              type: 'sentence-gap-fill',
              prompt: 'Choose the word that makes the most sense',
              baseSentence: 'The student felt ___ because the math problem was difficult.',
              gapPosition: 3,
              options: ['confused', 'happy', 'hungry', 'sleepy'],
              correctAnswer: 'confused',
              explanation: 'Difficult problems make us feel confused as we try to understand them.'
            },
            {
              id: 'test-rc-4',
              type: 'reading-comprehension',
              prompt: 'Read the passage and answer the question',
              passage: 'Rohan studied hard every day. He did all his homework carefully. He always paid attention in class. When the exam results came, Rohan got the highest marks in his class.',
              question: 'Why did Rohan get the highest marks?',
              questionType: 'why',
              options: [
                'Because he was lucky',
                'Because he studied hard and paid attention',
                'Because the exam was easy',
                'Because his teacher helped him'
              ],
              correctAnswer: 'Because he studied hard and paid attention',
              explanation: 'The passage shows that Rohan\'s hard work and attention led to his success.'
            },
            {
              id: 'test-aw-4',
              type: 'add-word',
              prompt: 'Choose the BEST word to complete the sentence',
              baseSentence: 'The peacock danced in the rain',
              insertPosition: 3,
              wordType: 'adverb',
              options: ['beautifully', 'quickly', 'slowly', 'carefully'],
              correctAnswers: ['beautifully'],
              correctAnswer: 'beautifully',
              explanation: 'Peacocks are known for dancing beautifully. This is the most appropriate word.'
            }
          ]
        }
      ]
    }
  };

  // Insert test lesson
  console.log('📝 Inserting test lesson...');
  const { data: insertedLesson, error: insertError } = await supabase
    .from('lessons')
    .insert([testLesson])
    .select();

  if (insertError) {
    console.error('❌ Error inserting test lesson:', insertError.message);
    console.error('Details:', insertError);
    process.exit(1);
  }

  console.log('✅ Test lesson inserted successfully!');
  console.log(`   ID: ${insertedLesson[0].id}`);
  console.log(`   Title: ${insertedLesson[0].title}`);
  console.log(`   Grade: ${insertedLesson[0].grade}`);
  console.log(`   Order: ${insertedLesson[0].order}\n`);

  // Verify the data
  console.log('🔍 Verifying test lesson...');
  const { data: verifyLesson, error: verifyError } = await supabase
    .from('lessons')
    .select('id, title, grade, content')
    .eq('title', 'Test Lesson - New Question Types')
    .single();

  if (verifyError) {
    console.error('❌ Error verifying test lesson:', verifyError.message);
    process.exit(1);
  }

  const blockCount = verifyLesson.content.blocks.length;
  const totalQuestions = verifyLesson.content.blocks.reduce(
    (sum, block) => sum + block.questions.length,
    0
  );

  console.log('✅ Verification successful!');
  console.log(`   Blocks: ${blockCount}`);
  console.log(`   Total questions: ${totalQuestions}`);

  verifyLesson.content.blocks.forEach((block, index) => {
    console.log(`   Block ${block.blockNumber}: ${block.questions.length} questions`);
    const types = {};
    block.questions.forEach(q => {
      types[q.type] = (types[q.type] || 0) + 1;
    });
    Object.entries(types).forEach(([type, count]) => {
      console.log(`     - ${type}: ${count}`);
    });
  });

  console.log('\n🎉 Test questions loaded successfully!');
  console.log('\n📋 Next steps:');
  console.log('   1. Go to http://localhost:3003');
  console.log('   2. Log in as teacher');
  console.log('   3. Find "Test Lesson - New Question Types"');
  console.log('   4. Unlock it for a class');
  console.log('   5. Switch to student view and test!\n');
}

loadTestQuestions().catch(error => {
  console.error('❌ Fatal error:', error.message);
  process.exit(1);
});
