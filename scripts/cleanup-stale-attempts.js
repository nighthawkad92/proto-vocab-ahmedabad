#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function cleanupStaleAttempts() {
  console.log('🔍 Finding stale attempts...\n')

  // Find attempts that are:
  // - Not completed (completed_at is null)
  // - Not abandoned (is_abandoned is false/null)
  // - Have 0 questions attempted
  // - Older than 5 minutes
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString()

  const { data: staleAttempts, error } = await supabase
    .from('attempts')
    .select('id, started_at, student_id, lessons(title)')
    .is('completed_at', null)
    .or('is_abandoned.is.null,is_abandoned.eq.false')
    .eq('questions_attempted', 0)
    .lt('started_at', fiveMinutesAgo)

  if (error) {
    console.error('Error finding stale attempts:', error)
    return
  }

  if (!staleAttempts || staleAttempts.length === 0) {
    console.log('✅ No stale attempts found!')
    return
  }

  console.log(`Found ${staleAttempts.length} stale attempt(s):\n`)

  for (const attempt of staleAttempts) {
    console.log(`  - ${attempt.lessons.title}`)
    console.log(`    Started: ${new Date(attempt.started_at).toLocaleString()}`)
    console.log(`    ID: ${attempt.id}`)
  }

  console.log('\n⚠️  Marking these attempts as abandoned...\n')

  // Mark all as abandoned
  const { error: updateError } = await supabase
    .from('attempts')
    .update({
      is_abandoned: true,
      abandoned_at: new Date().toISOString()
    })
    .in('id', staleAttempts.map(a => a.id))

  if (updateError) {
    console.error('Error updating attempts:', updateError)
    return
  }

  console.log(`✅ Successfully marked ${staleAttempts.length} attempt(s) as abandoned!`)
}

cleanupStaleAttempts()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Error:', err)
    process.exit(1)
  })
