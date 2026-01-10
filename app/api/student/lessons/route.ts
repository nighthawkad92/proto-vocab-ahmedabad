import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

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
    console.log('🔍 Querying unlocks for class:', classId)
    const { data: unlocks, error: unlocksError } = await supabase
      .from('lesson_unlocks')
      .select('lesson_id')
      .eq('class_id', classId)

    console.log('🔓 Found unlocks:', unlocks?.length || 0, unlocks)

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
