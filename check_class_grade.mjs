import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function checkGrade() {
  const classId = 'ddda4bbd-9d22-4b44-8f40-9ed9e88d2c53'
  
  // Get class details
  const { data: classData } = await supabase
    .from('classes')
    .select('id, name, class_code, grade')
    .eq('id', classId)
    .single()
  
  console.log('Class data:', JSON.stringify(classData, null, 2))
}

checkGrade().then(() => process.exit(0))
