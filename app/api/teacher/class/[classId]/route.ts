import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { classId: string } }
) {
  try {
    const { classId } = params

    if (!classId) {
      return NextResponse.json(
        { error: 'Class ID is required' },
        { status: 400 }
      )
    }

    // Delete class (cascade will handle related records)
    // Order: responses -> attempts -> lesson_unlocks -> students -> class

    // Get all students in this class
    const { data: students } = await supabase
      .from('students')
      .select('id')
      .eq('class_id', classId)

    if (students && students.length > 0) {
      const studentIds = students.map(s => s.id)

      // Delete responses for all attempts by these students
      const { data: attempts } = await supabase
        .from('attempts')
        .select('id')
        .in('student_id', studentIds)

      if (attempts && attempts.length > 0) {
        const attemptIds = attempts.map(a => a.id)

        await supabase
          .from('responses')
          .delete()
          .in('attempt_id', attemptIds)
      }

      // Delete attempts
      await supabase
        .from('attempts')
        .delete()
        .in('student_id', studentIds)

      // Delete lesson unlocks
      await supabase
        .from('lesson_unlocks')
        .delete()
        .eq('class_id', classId)

      // Delete students
      await supabase
        .from('students')
        .delete()
        .in('id', studentIds)
    }

    // Delete the class
    const { error } = await supabase
      .from('classes')
      .delete()
      .eq('id', classId)

    if (error) throw error

    return NextResponse.json({
      success: true,
      message: 'Class and all related data deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting class:', error)
    return NextResponse.json(
      { error: 'Failed to delete class' },
      { status: 500 }
    )
  }
}
