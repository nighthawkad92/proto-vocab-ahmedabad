import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: { lessonId: string } }
) {
  try {
    const { lessonId } = params
    const { searchParams } = new URL(request.url)
    const studentId = searchParams.get('studentId')

    // Get lesson with content
    const { data: lesson, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('id', lessonId)
      .single()

    if (error || !lesson) {
      return NextResponse.json(
        { error: 'Lesson not found' },
        { status: 404 }
      )
    }

    // Count previous attempts for this student and lesson
    let attemptNumber = 1
    if (studentId) {
      const { count } = await supabase
        .from('attempts')
        .select('id', { count: 'exact', head: true })
        .eq('student_id', studentId)
        .eq('lesson_id', lessonId)

      attemptNumber = (count || 0) + 1
    }

    return NextResponse.json({
      lesson,
      attemptNumber
    })
  } catch (error) {
    console.error('Error fetching lesson:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
