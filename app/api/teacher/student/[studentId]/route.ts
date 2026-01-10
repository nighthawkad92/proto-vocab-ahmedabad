import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { studentId: string } }
) {
  try {
    const { studentId } = params

    if (!studentId) {
      return NextResponse.json(
        { error: 'Student ID is required' },
        { status: 400 }
      )
    }

    // Delete in correct order: responses -> attempts -> student

    // Get all attempts for this student
    const { data: attempts } = await supabase
      .from('attempts')
      .select('id')
      .eq('student_id', studentId)

    if (attempts && attempts.length > 0) {
      const attemptIds = attempts.map(a => a.id)

      // Delete all responses for these attempts
      await supabase
        .from('responses')
        .delete()
        .in('attempt_id', attemptIds)
    }

    // Delete all attempts
    await supabase
      .from('attempts')
      .delete()
      .eq('student_id', studentId)

    // Delete the student
    const { error } = await supabase
      .from('students')
      .delete()
      .eq('id', studentId)

    if (error) throw error

    return NextResponse.json({
      success: true,
      message: 'Student and all related data deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting student:', error)
    return NextResponse.json(
      { error: 'Failed to delete student' },
      { status: 500 }
    )
  }
}
