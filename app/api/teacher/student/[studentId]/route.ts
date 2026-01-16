import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/lib/database.types'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { studentId: string } }
) {
  try {
    const { studentId } = params

    console.log('🗑️ [DELETE STUDENT API] Delete request:', { studentId })

    if (!studentId) {
      return NextResponse.json(
        { error: 'Student ID is required' },
        { status: 400 }
      )
    }

    // Create fresh Supabase client with cache disabled
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
    const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey, {
      db: { schema: 'public' },
      auth: { persistSession: false },
      global: { headers: { 'cache-control': 'no-cache' } }
    })

    // Delete in correct order: responses -> attempts -> student

    // Get all attempts for this student
    const { data: attempts } = await supabase
      .from('attempts')
      .select('id')
      .eq('student_id', studentId)

    if (attempts && attempts.length > 0) {
      const attemptIds = attempts.map((a: { id: string }) => a.id)

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
    const { data: deletedStudent, error, count } = await supabase
      .from('students')
      .delete({ count: 'exact' })
      .eq('id', studentId)
      .select()

    console.log('✅ [DELETE STUDENT API] Delete result:', {
      deletedCount: count,
      deletedStudent,
      error
    })

    if (error) throw error

    return NextResponse.json({
      success: true,
      message: 'Student and all related data deleted successfully',
      deletedCount: count
    })
  } catch (error) {
    console.error('❌ [DELETE STUDENT API] Error deleting student:', error)
    return NextResponse.json(
      { error: 'Failed to delete student' },
      { status: 500 }
    )
  }
}
