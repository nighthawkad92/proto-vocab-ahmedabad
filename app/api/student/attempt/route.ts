import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { studentId, lessonId } = await request.json()

    if (!studentId || !lessonId) {
      return NextResponse.json(
        { error: 'Student ID and Lesson ID are required' },
        { status: 400 }
      )
    }

    // Create new attempt
    // @ts-ignore - Supabase types are strict when env vars aren't set
    const { data: attempt, error } = await supabase
      .from('attempts')
      // @ts-ignore
      .insert({
        student_id: studentId,
        lesson_id: lessonId,
        started_at: new Date().toISOString(),
      })
      .select('id')
      .single()

    if (error || !attempt) {
      console.error('Failed to create attempt:', error)
      return NextResponse.json(
        { error: 'Failed to create attempt' },
        { status: 500 }
      )
    }

    return NextResponse.json({ attemptId: (attempt as any).id })
  } catch (error) {
    console.error('Error creating attempt:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
