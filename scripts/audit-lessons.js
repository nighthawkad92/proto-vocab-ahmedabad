const fs = require('fs');
const data = JSON.parse(fs.readFileSync('/tmp/all-lessons-fresh.json', 'utf-8'));

console.log('📊 FINAL AUDIT - All Lessons Updated\n');
console.log('='.repeat(70));

let allPerfect = true;

data.forEach(lesson => {
  console.log(`\n📚 Lesson ${lesson.order}: ${lesson.title}`);
  console.log('-'.repeat(70));

  const content = lesson.content;
  console.log(`  Total Levels: ${content.levels.length}`);

  let lessonGood = true;
  content.levels.forEach((level, i) => {
    const numQuestions = level.questions ? level.questions.length : 0;
    const hasIntro = level.introduction ? '✓' : '✗';
    const numRotationSets = level.rotationSets ? level.rotationSets.length : 0;

    const status = numQuestions === 4 && numRotationSets === 2 ? '✅' : '❌';
    if (numQuestions !== 4 || numRotationSets !== 2) {
      lessonGood = false;
      allPerfect = false;
    }

    console.log(`  ${status} Level ${i}: ${numQuestions}/4 questions | ${numRotationSets}/2 rotation sets | Intro: ${hasIntro}`);
  });

  console.log(`  Status: ${lessonGood ? '✨ PERFECT' : '⚠️  NEEDS REVIEW'}`);
});

console.log('\n' + '='.repeat(70));
console.log(allPerfect ? '\n🎉 ALL LESSONS PERFECT!' : '\n⚠️  Some lessons still need attention');
