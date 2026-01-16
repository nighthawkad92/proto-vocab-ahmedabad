const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://sguffpxuaahivvponwfb.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNndWZmcHh1YWFoaXZ2cG9ud2ZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3NzczNzMsImV4cCI6MjA4MzM1MzM3M30.xxPnlV0nYMF0DxCw48cn1xTv3o6iyJV22OgEugEG9PE'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNndWZmcHh1YWFoaXZ2cG9ud2ZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Nzc3NzM3MywiZXhwIjoyMDgzMzUzMzczfQ.UHYyz6Iy40ffYYrkFa6v4SXxbkxook5l5n-xuIfW8G8'

const classId = 'ad78faa4-7442-4df7-8b6f-800d9c5565a5'

async function diagnoseRLS() {
  console.log('='.repeat(80))
  console.log('COMPREHENSIVE RLS DIAGNOSIS')
  console.log('='.repeat(80))

  // Test 1: Service role - get all policies
  console.log('\n[TEST 1] Using Service Role to check current RLS policies')
  console.log('-'.repeat(80))

  const serviceClient = createClient(supabaseUrl, supabaseServiceKey)

  // Get all unlocks with service role
  const { data: serviceUnlocks, error: serviceError } = await serviceClient
    .from('lesson_unlocks')
    .select('*')
    .eq('class_id', classId)

  console.log(`Service Role Query Result:`)
  console.log(`  - Total unlocks: ${serviceUnlocks?.length || 0}`)
  console.log(`  - Error: ${serviceError ? JSON.stringify(serviceError) : 'None'}`)
  if (serviceUnlocks && serviceUnlocks.length > 0) {
    console.log(`  - Unlock IDs: ${serviceUnlocks.map(u => u.id.substring(0, 8)).join(', ')}`)
    console.log(`  - Unlocked at times:`)
    serviceUnlocks.forEach(u => {
      console.log(`    * ${u.lesson_id.substring(0, 8)}: ${u.unlocked_at}`)
    })
  }

  // Test 2: Anon role - basic query
  console.log('\n[TEST 2] Using Anon Key - Basic query')
  console.log('-'.repeat(80))

  const anonClient1 = createClient(supabaseUrl, supabaseAnonKey)

  const { data: anonUnlocks1, error: anonError1 } = await anonClient1
    .from('lesson_unlocks')
    .select('*')
    .eq('class_id', classId)

  console.log(`Anon Key Query Result:`)
  console.log(`  - Total unlocks: ${anonUnlocks1?.length || 0}`)
  console.log(`  - Error: ${anonError1 ? JSON.stringify(anonError1) : 'None'}`)
  if (anonUnlocks1 && anonUnlocks1.length > 0) {
    console.log(`  - Unlock IDs: ${anonUnlocks1.map(u => u.id.substring(0, 8)).join(', ')}`)
  }

  // Test 3: Anon role - select only lesson_id (like the API does)
  console.log('\n[TEST 3] Using Anon Key - Select only lesson_id (API query)')
  console.log('-'.repeat(80))

  const anonClient2 = createClient(supabaseUrl, supabaseAnonKey)

  const { data: anonUnlocks2, error: anonError2 } = await anonClient2
    .from('lesson_unlocks')
    .select('lesson_id')
    .eq('class_id', classId)

  console.log(`Anon Key Query Result:`)
  console.log(`  - Total unlocks: ${anonUnlocks2?.length || 0}`)
  console.log(`  - Error: ${anonError2 ? JSON.stringify(anonError2) : 'None'}`)
  if (anonUnlocks2 && anonUnlocks2.length > 0) {
    console.log(`  - Lesson IDs: ${anonUnlocks2.map(u => u.lesson_id.substring(0, 8)).join(', ')}`)
  }

  // Test 4: Fresh anon client with different options
  console.log('\n[TEST 4] Using Anon Key - Fresh client with no cache')
  console.log('-'.repeat(80))

  const anonClient3 = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    },
    global: {
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    }
  })

  const { data: anonUnlocks3, error: anonError3 } = await anonClient3
    .from('lesson_unlocks')
    .select('lesson_id')
    .eq('class_id', classId)

  console.log(`Anon Key Query Result:`)
  console.log(`  - Total unlocks: ${anonUnlocks3?.length || 0}`)
  console.log(`  - Error: ${anonError3 ? JSON.stringify(anonError3) : 'None'}`)

  // Test 5: Check if there's ordering or filtering happening
  console.log('\n[TEST 5] Using Anon Key - With different ordering')
  console.log('-'.repeat(80))

  const { data: anonUnlocks4, error: anonError4 } = await anonClient3
    .from('lesson_unlocks')
    .select('lesson_id, unlocked_at')
    .eq('class_id', classId)
    .order('unlocked_at', { ascending: true })

  console.log(`Anon Key Query Result (ordered by unlocked_at):`)
  console.log(`  - Total unlocks: ${anonUnlocks4?.length || 0}`)
  console.log(`  - Error: ${anonError4 ? JSON.stringify(anonError4) : 'None'}`)
  if (anonUnlocks4) {
    console.log(`  - Results in order:`)
    anonUnlocks4.forEach((u, i) => {
      console.log(`    ${i + 1}. ${u.lesson_id.substring(0, 8)} at ${u.unlocked_at}`)
    })
  }

  // Test 6: Check table permissions
  console.log('\n[TEST 6] Check RLS is actually enabled')
  console.log('-'.repeat(80))

  const { data: tableInfo, error: tableError } = await serviceClient
    .from('lesson_unlocks')
    .select('*')
    .limit(1)

  console.log(`Table access test:`)
  console.log(`  - Can access table: ${!tableError}`)
  console.log(`  - Error: ${tableError ? JSON.stringify(tableError) : 'None'}`)

  // Summary
  console.log('\n' + '='.repeat(80))
  console.log('SUMMARY')
  console.log('='.repeat(80))
  console.log(`Service Role returns: ${serviceUnlocks?.length || 0} unlocks`)
  console.log(`Anon Key Test 1 returns: ${anonUnlocks1?.length || 0} unlocks`)
  console.log(`Anon Key Test 2 returns: ${anonUnlocks2?.length || 0} unlocks`)
  console.log(`Anon Key Test 3 returns: ${anonUnlocks3?.length || 0} unlocks`)
  console.log(`Anon Key Test 4 returns: ${anonUnlocks4?.length || 0} unlocks`)

  if (anonUnlocks1?.length !== serviceUnlocks?.length) {
    console.log('\n⚠️  ISSUE DETECTED: Anon key returns different count than service role')
    console.log('This confirms RLS is filtering results unexpectedly.')
  } else {
    console.log('\n✅ Anon key returns same count as service role locally')
    console.log('The issue may be Vercel-specific (caching, environment, etc.)')
  }
}

diagnoseRLS().catch(console.error)
