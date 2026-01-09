#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const sqlFiles = [
  'seed-lesson-2-vocabulary-integrated.sql',
  'seed-lesson-3-reading-integrated.sql',
  'seed-lesson-4-sentence-expansion-integrated.sql',
  'seed-lesson-5-reading-writing-integrated.sql',
  'seed-lessons-grade4-lessons-4-5.sql',
  'seed-lessons-grade4-new-content.sql',
  'seed-lessons-grade4-backup.sql',
  'seed-lessons.sql',
  'seed-test-questions.sql',
]

console.log('🔍 Verifying Block→Level Migration in Seed Files\n')
console.log('=' .repeat(60))

let totalBlockRefs = 0
let filesWithBlockRefs = 0

sqlFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file)

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  ${file}: FILE NOT FOUND`)
    return
  }

  const content = fs.readFileSync(filePath, 'utf8')
  const blockNumberCount = (content.match(/"blockNumber"/g) || []).length
  const levelNumberCount = (content.match(/"levelNumber"/g) || []).length

  console.log(`\n📄 ${file}`)
  console.log(`   "blockNumber": ${blockNumberCount} occurrences`)
  console.log(`   "levelNumber": ${levelNumberCount} occurrences`)

  if (blockNumberCount > 0) {
    console.log(`   ❌ Still has blockNumber references - NEEDS MIGRATION`)
    totalBlockRefs += blockNumberCount
    filesWithBlockRefs++
  } else if (levelNumberCount > 0) {
    console.log(`   ✅ Successfully migrated to levelNumber`)
  } else {
    console.log(`   ⚠️  No block or level references found`)
  }
})

console.log('\n' + '='.repeat(60))
console.log('📊 SUMMARY')
console.log('='.repeat(60))
console.log(`Total files checked: ${sqlFiles.length}`)
console.log(`Files with "blockNumber": ${filesWithBlockRefs}`)
console.log(`Total "blockNumber" occurrences: ${totalBlockRefs}`)

if (totalBlockRefs === 0) {
  console.log('\n✅ SUCCESS: All seed files have been migrated to "levelNumber"')
  process.exit(0)
} else {
  console.log('\n❌ INCOMPLETE: Migration not finished. Please update remaining files.')
  process.exit(1)
}
