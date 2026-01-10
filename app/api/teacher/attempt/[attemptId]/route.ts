import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { attemptId: string } }
) {
  try {
    const { attemptId } = params

    if (!attemptId) {
      return NextResponse.json(
        { error: 'Attempt ID is required' },
        { status: 400 }
      )
    }

    // Delete in correct order: responses -> attempt

    // Delete all responses for this attempt
    await supabase
      .from('responses')
      .delete()
      .eq('attempt_id', attemptId)

    // Delete the attempt
    const { error } = await supabase
      .from('attempts')
      .delete()
      .eq('id', attemptId)

    if (error) throw error

    return NextResponse.json({
      success: true,
      message: 'Attempt deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting attempt:', error)
    return NextResponse.json(
      { error: 'Failed to delete attempt' },
      { status: 500 }
    )
  }
}
