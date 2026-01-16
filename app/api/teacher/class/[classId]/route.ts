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
    // Order: responses -> attempts -> student_badges -> student_stats -> students -> class

    // Get all students in this class
    const { data: students } = await supabase
      .from('students')
      .select('id')
      .eq('class_id', classId)

    if (students && students.length > 0) {
      const studentIds = students.map((s: { id: string }) => s.id)

      // Delete responses for all attempts by these students
      const { data: attempts, error: attemptsError } = await supabase
        .from('attempts')
        .select('id')
        .in('student_id', studentIds)

      if (attemptsError) {
        console.error('Error fetching attempts:', attemptsError)
        throw attemptsError
      }

      if (attempts && attempts.length > 0) {
        const attemptIds = attempts.map((a: { id: string }) => a.id)

        const { error: responsesError } = await supabase
          .from('responses')
          .delete()
          .in('attempt_id', attemptIds)

        if (responsesError) {
          console.error('Error deleting responses:', responsesError)
          throw responsesError
        }
      }

      // Delete attempts
      const { error: deleteAttemptsError } = await supabase
        .from('attempts')
        .delete()
        .in('student_id', studentIds)

      if (deleteAttemptsError) {
        console.error('Error deleting attempts:', deleteAttemptsError)
        throw deleteAttemptsError
      }

      // Delete student badges (gamification)
      const { error: badgesError } = await supabase
        .from('student_badges')
        .delete()
        .in('student_id', studentIds)

      if (badgesError) {
        console.error('Error deleting student badges:', badgesError)
        throw badgesError
      }

      // Delete student stats (gamification)
      const { data: deletedStats, error: statsError } = await supabase
        .from('student_stats')
        .delete()
        .in('student_id', studentIds)
        .select()

      console.log(`Deleted ${deletedStats?.length || 0} student_stats records`)

      if (statsError) {
        console.error('Error deleting student stats:', statsError)
        throw statsError
      }

      // Delete students
      const { error: studentsError } = await supabase
        .from('students')
        .delete()
        .in('id', studentIds)

      if (studentsError) {
        console.error('Error deleting students:', studentsError)
        throw studentsError
      }
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
  } catch (error: any) {
    console.error('Error deleting class:', error)
    return NextResponse.json(
      {
        error: 'Failed to delete class',
        details: error?.message || 'Unknown error',
        code: error?.code
      },
      { status: 500 }
    )
  }
}
