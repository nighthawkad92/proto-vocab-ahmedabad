import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { lessonId: string } }
) {
  try {
    const { lessonId } = params

    if (!lessonId) {
      return NextResponse.json(
        { error: 'Lesson ID is required' },
        { status: 400 }
      )
    }

    // Delete in correct order: responses -> attempts -> lesson_unlocks -> lesson
    // Note: Database CASCADE constraints will handle related records

    // Get all attempts for this lesson
    const { data: attempts } = await supabase
      .from('attempts')
      .select('id')
      .eq('lesson_id', lessonId)

    if (attempts && attempts.length > 0) {
      const attemptIds = attempts.map((a: { id: string }) => a.id)

      // Delete all responses for these attempts
      await supabase
        .from('responses')
        .delete()
        .in('attempt_id', attemptIds)

      // Delete all attempts for this lesson
      await supabase
        .from('attempts')
        .delete()
        .in('id', attemptIds)
    }

    // Delete lesson unlocks for this lesson
    await supabase
      .from('lesson_unlocks')
      .delete()
      .eq('lesson_id', lessonId)

    // Delete the lesson
    const { error } = await supabase
      .from('lessons')
      .delete()
      .eq('id', lessonId)

    if (error) throw error

    return NextResponse.json({
      success: true,
      message: 'Lesson and all related data deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting lesson:', error)
    return NextResponse.json(
      { error: 'Failed to delete lesson' },
      { status: 500 }
    )
  }
}
