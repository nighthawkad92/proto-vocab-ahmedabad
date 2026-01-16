const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://sguffpxuaahivvponwfb.supabase.co'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNndWZmcHh1YWFoaXZ2cG9ud2ZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Nzc3NzM3MywiZXhwIjoyMDgzMzUzMzczfQ.UHYyz6Iy40ffYYrkFa6v4SXxbkxook5l5n-xuIfW8G8'

const serviceClient = createClient(supabaseUrl, supabaseServiceKey)

async function checkRLS() {
  console.log('\n=== Checking RLS Policies on lesson_unlocks ===')

  const { data: policies, error } = await serviceClient
    .rpc('exec_sql', {
      sql: `SELECT
        schemaname,
        tablename,
        policyname,
        permissive,
        roles,
        cmd,
        qual
      FROM pg_policies
      WHERE tablename = 'lesson_unlocks'
      ORDER BY policyname`
    })

  if (error) {
    console.error('Error:', error)
    // Try alternative approach
    console.log('\nTrying direct query...')
    const { data: tableInfo, error: tableError } = await serviceClient
      .from('pg_policies')
      .select('*')
      .eq('tablename', 'lesson_unlocks')

    if (tableError) {
      console.error('Table error:', tableError)
    } else {
      console.log('Policies:', JSON.stringify(tableInfo, null, 2))
    }
  } else {
    console.log('Policies:', JSON.stringify(policies, null, 2))
  }

  console.log('\n=== Checking if RLS is enabled ===')
  const { data: rlsStatus, error: rlsError } = await serviceClient
    .from('pg_class')
    .select('relname, relrowsecurity, relforcerowsecurity')
    .eq('relname', 'lesson_unlocks')
    .single()

  if (rlsError) {
    console.error('RLS status error:', rlsError)
  } else {
    console.log('RLS Status:', rlsStatus)
  }
}

checkRLS()
