const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://sguffpxuaahivvponwfb.supabase.co'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNndWZmcHh1YWFoaXZ2cG9ud2ZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Nzc3NzM3MywiZXhwIjoyMDgzMzUzMzczfQ.UHYyz6Iy40ffYYrkFa6v4SXxbkxook5l5n-xuIfW8G8'

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function runFix() {
  console.log('\n=== CHECKING CURRENT POLICIES ===')

  // Get current policies using raw SQL through rpc
  const currentPoliciesQuery = `
    SELECT policyname, cmd, qual::text as using_clause
    FROM pg_policies
    WHERE tablename = 'lesson_unlocks'
    ORDER BY policyname;
  `

  try {
    const { data: beforeData, error: beforeError } = await supabase.rpc('exec_sql', {
      query: currentPoliciesQuery
    })

    if (beforeError) {
      console.log('Cannot query via rpc, using alternative method...')
    } else {
      console.log('Current policies:', beforeData)
    }
  } catch (e) {
    console.log('RPC not available, proceeding with fix...')
  }

  console.log('\n=== DROPPING ALL EXISTING POLICIES ===')

  // Drop all known policies
  const policiesToDrop = [
    'Allow public read access to lesson unlocks',
    'Lesson unlocks: Anyone can create',
    'Lesson unlocks: Anyone can read',
    'Lesson unlocks: Anyone can delete',
    'Teachers can view unlocks for their classes',
    'Teachers can unlock lessons for their classes',
    'Teachers can remove unlocks from their classes',
    'Students can view unlocks for their class',
    'allow_all_reads',
    'allow_all_inserts',
    'allow_all_deletes'
  ]

  for (const policy of policiesToDrop) {
    const { error } = await supabase.rpc('exec_sql', {
      query: `DROP POLICY IF EXISTS "${policy}" ON lesson_unlocks;`
    })
    if (!error) {
      console.log(`✓ Dropped policy: ${policy}`)
    }
  }

  console.log('\n=== CREATING NEW POLICIES ===')

  // Enable RLS
  await supabase.rpc('exec_sql', {
    query: 'ALTER TABLE lesson_unlocks ENABLE ROW LEVEL SECURITY;'
  })
  console.log('✓ RLS enabled')

  // Create SELECT policy
  const { error: selectError } = await supabase.rpc('exec_sql', {
    query: `
      CREATE POLICY "allow_all_reads"
      ON lesson_unlocks
      FOR SELECT
      USING (true);
    `
  })
  if (selectError) {
    console.error('Error creating SELECT policy:', selectError)
  } else {
    console.log('✓ Created SELECT policy: allow_all_reads')
  }

  // Create INSERT policy
  const { error: insertError } = await supabase.rpc('exec_sql', {
    query: `
      CREATE POLICY "allow_all_inserts"
      ON lesson_unlocks
      FOR INSERT
      WITH CHECK (true);
    `
  })
  if (insertError) {
    console.error('Error creating INSERT policy:', insertError)
  } else {
    console.log('✓ Created INSERT policy: allow_all_inserts')
  }

  // Create DELETE policy
  const { error: deleteError } = await supabase.rpc('exec_sql', {
    query: `
      CREATE POLICY "allow_all_deletes"
      ON lesson_unlocks
      FOR DELETE
      USING (true);
    `
  })
  if (deleteError) {
    console.error('Error creating DELETE policy:', deleteError)
  } else {
    console.log('✓ Created DELETE policy: allow_all_deletes')
  }

  console.log('\n=== TESTING WITH ANON KEY ===')

  // Test with anon key
  const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNndWZmcHh1YWFoaXZ2cG9ud2ZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3NzczNzMsImV4cCI6MjA4MzM1MzM3M30.xxPnlV0nYMF0DxCw48cn1xTv3o6iyJV22OgEugEG9PE'
  const anonClient = createClient(supabaseUrl, anonKey)

  const { data: testData, error: testError } = await anonClient
    .from('lesson_unlocks')
    .select('lesson_id')
    .eq('class_id', 'ad78faa4-7442-4df7-8b6f-800d9c5565a5')

  if (testError) {
    console.error('❌ Test query failed:', testError)
  } else {
    console.log(`✓ Test query returned ${testData.length} unlocks`)
    console.log('Lesson IDs:', testData.map(u => u.lesson_id))
  }

  console.log('\n=== FIX COMPLETE ===')
}

runFix().catch(console.error)
