#!/usr/bin/env node

/**
 * Fix adverb insertion positions for grammatical correctness
 * Adverbs typically go after the verb or at the end of the sentence
 */

const fs = require('fs');

console.log('🔧 Fixing adverb insertion positions...\n');

// Read the SQL file
const sqlFile = 'seed-lessons-grade4-lessons-4-5.sql';
let content = fs.readFileSync(sqlFile, 'utf8');

// Define corrections for specific sentences
const corrections = [
  {
    baseSentence: "The teacher explains the lesson",
    oldPosition: 4,
    newPosition: 5,  // After "lesson"
    explanation: "Adverb goes after object: 'explains the lesson clearly'"
  },
  {
    baseSentence: "The doctor treats patients",
    oldPosition: 3,
    newPosition: 4,  // After "patients"
    explanation: "Adverb goes after object: 'treats patients carefully'"
  },
  {
    baseSentence: "The gardener waters the plants",
    oldPosition: 4,
    newPosition: 5,  // After "plants"
    explanation: "Adverb goes after object: 'waters the plants regularly'"
  }
];

let fixesApplied = 0;

corrections.forEach(({ baseSentence, oldPosition, newPosition, explanation }) => {
  // Find the question and update insertPosition
  const escapedSentence = baseSentence.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(
    `("baseSentence": "${escapedSentence}",\\s*\\n\\s*"wordType": "adverb",\\s*\\n\\s*)"insertPosition": ${oldPosition}`,
    'g'
  );

  const beforeCount = (content.match(pattern) || []).length;
  content = content.replace(pattern, `$1"insertPosition": ${newPosition}`);
  const afterCount = (content.match(pattern) || []).length;

  if (beforeCount > afterCount) {
    fixesApplied++;
    console.log(`✅ Fixed: "${baseSentence}"`);
    console.log(`   Position: ${oldPosition} → ${newPosition}`);
    console.log(`   ${explanation}\n`);
  }
});

// Write the updated content back
fs.writeFileSync(sqlFile, content, 'utf8');

console.log('='.repeat(60));
console.log(`\n✅ Applied ${fixesApplied} fixes`);
console.log(`\n📄 File updated: ${sqlFile}\n`);

// Now regenerate example sentences with correct positions
console.log('🔄 Regenerating example sentences with corrected positions...\n');
const { execSync } = require('child_process');
execSync('node add-example-sentences.js', { stdio: 'inherit' });
