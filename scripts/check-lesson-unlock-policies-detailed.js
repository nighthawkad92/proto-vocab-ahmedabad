const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://sguffpxuaahivvponwfb.supabase.co'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNndWZmcHh1YWFoaXZ2cG9ud2ZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Nzc3NzM3MywiZXhwIjoyMDgzMzUzMzczfQ.UHYyz6Iy40ffYYrkFa6v4SXxbkxook5l5n-xuIfW8G8'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNndWZmcHh1YWFoaXZ2cG9ud2ZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3NzczNzMsImV4cCI6MjA4MzM1MzM3M30.xxPnlV0nYMF0DxCw48cn1xTv3o6iyJV22OgEugEG9PE'

async function checkPolicies() {
  const classId = 'ad78faa4-7442-4df7-8b6f-800d9c5565a5'

  console.log('\n=== Testing with SERVICE ROLE (bypasses RLS) ===')
  const serviceClient = createClient(supabaseUrl, supabaseServiceKey)

  const { data: serviceData, error: serviceError } = await serviceClient
    .from('lesson_unlocks')
    .select('lesson_id, class_id, id')
    .eq('class_id', classId)

  console.log('Service role results:', serviceData?.length || 0, 'unlocks')
  if (serviceError) console.error('Service role error:', serviceError)
  else console.log('Data:', JSON.stringify(serviceData, null, 2))

  console.log('\n=== Testing with ANON KEY (uses RLS) ===')
  const anonClient = createClient(supabaseUrl, supabaseAnonKey)

  const { data: anonData, error: anonError } = await anonClient
    .from('lesson_unlocks')
    .select('lesson_id, class_id, id')
    .eq('class_id', classId)

  console.log('Anon role results:', anonData?.length || 0, 'unlocks')
  if (anonError) console.error('Anon role error:', anonError)
  else console.log('Data:', JSON.stringify(anonData, null, 2))

  console.log('\n=== Testing with ANON KEY and different select ===')
  const { data: anonData2, error: anonError2 } = await anonClient
    .from('lesson_unlocks')
    .select('*')
    .eq('class_id', classId)

  console.log('Anon role results (select *):', anonData2?.length || 0, 'unlocks')
  if (anonError2) console.error('Anon role error:', anonError2)
  else console.log('Data:', JSON.stringify(anonData2, null, 2))
}

checkPolicies()
