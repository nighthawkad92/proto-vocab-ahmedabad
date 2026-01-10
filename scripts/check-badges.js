#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function checkBadges() {
  const { data: badges } = await supabase
    .from('badges')
    .select('name')
    .order('name')

  const existing = badges.map(b => b.name)
  const expected = [
    'First Steps',
    'Week Warrior',
    'Perfect Practice',
    'Bookworm',
    'Century',
    'Dedicated Learner',
    'Master Student',
    'Quick Learner'
  ]

  const missing = expected.filter(name => !existing.includes(name))

  console.log('Existing badges:', existing.join(', '))
  console.log('\nMissing badges:', missing.length > 0 ? missing.join(', ') : 'None')

  if (missing.length > 0) {
    console.log('\n⚠️  Need to insert missing badges!')
  }
}

checkBadges().then(() => process.exit(0))
