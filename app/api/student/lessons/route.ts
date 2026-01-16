import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/lib/database.types'

// Mark this route as dynamic since it uses request parameters
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const classId = searchParams.get('classId')

    if (!classId) {
      return NextResponse.json(
        { error: 'Class ID is required' },
        { status: 400 }
      )
    }

    // Create a fresh Supabase client for this request
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

    console.log('🔍 Server: Has service key?', !!supabaseServiceKey)

    // Use service role key to bypass RLS (temporary debug)
    const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey)

    // Get all lessons for grade 4
    const { data: lessons, error: lessonsError } = await supabase
      .from('lessons')
      .select('id, title, description, order')
      .eq('grade', 4)
      .order('order', { ascending: true })

    if (lessonsError) {
      console.error('Failed to fetch lessons:', lessonsError)
      return NextResponse.json(
        { error: 'Failed to fetch lessons' },
        { status: 500 }
      )
    }

    // Get unlocked lessons for this class
    console.log('🔍 Server: Querying unlocks for class:', classId)
    console.log('🔍 Server: Supabase URL:', supabaseUrl)
    console.log('🔍 Server: Using SERVICE key (bypassing RLS)')

    const { data: unlocks, error: unlocksError } = await supabase
      .from('lesson_unlocks')
      .select('lesson_id')
      .eq('class_id', classId)

    console.log('🔓 Server: Found unlocks:', unlocks?.length || 0)
    console.log('🔓 Server: Unlocks data:', JSON.stringify(unlocks, null, 2))
    console.log('🔓 Server: Unlock error:', unlocksError)

    if (unlocksError) {
      console.error('Failed to fetch unlocks:', unlocksError)
      return NextResponse.json(
        { error: 'Failed to fetch unlocks' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      lessons: lessons || [],
      unlocks: unlocks || [],
    })
  } catch (error) {
    console.error('Error fetching lessons:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
