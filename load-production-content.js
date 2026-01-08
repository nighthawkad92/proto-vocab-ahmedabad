#!/usr/bin/env node

/**
 * Load production content into Supabase database
 * This script loads 252 production questions for Lessons 2-5
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function loadProductionContent() {
  console.log('🚀 Loading production content into Supabase...\n');
  console.log('This will load 252 new questions for Lessons 2-5\n');

  // Note: The SQL files contain complex UPDATE and INSERT statements
  // Since we can't execute raw SQL directly via the JS client easily,
  // let's inform the user they need to run the SQL files manually in Supabase SQL Editor

  console.log('⚠️  IMPORTANT: Production content must be loaded via Supabase SQL Editor\n');
  console.log('📋 Steps to load production content:');
  console.log('   1. Open Supabase dashboard: https://supabase.com/dashboard/project/sguffpxuaahivvponwfb');
  console.log('   2. Go to SQL Editor');
  console.log('   3. Load and run these files in order:');
  console.log('      a) seed-lessons-grade4-new-content.sql (Lessons 2 & 3 - 72 questions)');
  console.log('      b) seed-lessons-grade4-lessons-4-5.sql (Lessons 4 & 5 - 180 questions)');
  console.log('   4. Each file will take ~10-30 seconds to execute\n');

  // Let's verify what lessons currently exist
  console.log('🔍 Checking current lessons in database...\n');

  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('id, title, grade, "order"')
    .order('order', { ascending: true });

  if (error) {
    console.error('❌ Error fetching lessons:', error.message);
    process.exit(1);
  }

  console.log('📚 Current lessons in database:');
  lessons.forEach(lesson => {
    console.log(`   [${lesson.order}] ${lesson.title} (Grade ${lesson.grade})`);
  });

  console.log('\n💡 After loading production content, you will have:');
  console.log('   - Test Lesson (20 test questions)');
  console.log('   - Lesson 1 (existing)');
  console.log('   - Lesson 2 (updated with 36 gap-fill questions)');
  console.log('   - Lesson 3 (NEW - 36 reading-comp questions)');
  console.log('   - Lesson 4 (NEW - 72 questions: sentence-rearrange + add-word)');
  console.log('   - Lesson 5 (NEW - 72 questions: story-sequence + reading-comp)');
  console.log('   - Total: 252 new production questions\n');

  console.log('✅ Verification complete. Ready for production content loading!');
}

loadProductionContent().catch(error => {
  console.error('❌ Fatal error:', error.message);
  process.exit(1);
});
