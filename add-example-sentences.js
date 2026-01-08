#!/usr/bin/env node

/**
 * Add example sentences to all add-word questions in the SQL file
 * This follows the "I do, You do" pedagogical pattern
 */

const fs = require('fs');

console.log('📝 Adding example sentences to add-word questions...\n');

// Read the SQL file
const sqlFile = 'seed-lessons-grade4-lessons-4-5.sql';
let content = fs.readFileSync(sqlFile, 'utf8');

// Function to create example sentence by inserting word at position
function createExampleSentence(baseSentence, insertPosition, exampleWord) {
  const words = baseSentence.split(' ');
  const exampleWords = [
    ...words.slice(0, insertPosition),
    exampleWord,
    ...words.slice(insertPosition)
  ];
  return exampleWords.join(' ');
}

// Find all add-word questions and add example sentences
let questionsUpdated = 0;
let questionsSkipped = 0;

// Pattern to match add-word questions
const addWordPattern = /"type": "add-word",\s*\n\s*"prompt": "([^"]+)",\s*\n\s*("exampleSentence": "[^"]+",\s*\n\s*)?"baseSentence": "([^"]+)",\s*\n\s*"wordType": "([^"]+)",\s*\n\s*"insertPosition": (\d+),\s*\n\s*"options": \[(.*?)\],\s*\n\s*"correctAnswers": \[(.*?)\],\s*\n\s*"correctAnswer": "([^"]+)"/g;

content = content.replace(addWordPattern, (match, prompt, existingExample, baseSentence, wordType, insertPosition, options, correctAnswers, correctAnswer) => {
  // If example sentence already exists, skip
  if (existingExample) {
    questionsSkipped++;
    console.log(`⏭️  Skipped: "${baseSentence}" (already has example)`);
    return match;
  }

  // Create example sentence using the first correct answer
  const exampleSentence = createExampleSentence(baseSentence, parseInt(insertPosition), correctAnswer);

  questionsUpdated++;
  console.log(`✅ Added example: "${baseSentence}" → "${exampleSentence}"`);

  // Build the replacement with example sentence added
  return `"type": "add-word",
            "prompt": "${prompt}",
            "exampleSentence": "${exampleSentence}",
            "baseSentence": "${baseSentence}",
            "wordType": "${wordType}",
            "insertPosition": ${insertPosition},
            "options": [${options}],
            "correctAnswers": [${correctAnswers}],
            "correctAnswer": "${correctAnswer}"`;
});

// Write the updated content back
fs.writeFileSync(sqlFile, content, 'utf8');

console.log('\n' + '='.repeat(60));
console.log(`\n✅ Updated ${questionsUpdated} add-word questions`);
console.log(`⏭️  Skipped ${questionsSkipped} questions (already had examples)`);
console.log(`\n📄 File updated: ${sqlFile}`);
console.log('\n💡 Example sentences now follow "I do, You do" pattern');
console.log('   Students see a completed example before attempting each question\n');
