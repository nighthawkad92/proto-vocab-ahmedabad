import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const queueItem = await request.json()

    if (queueItem.type === 'response') {
      // Save response
      const { attemptId, response } = queueItem.data

      // @ts-ignore - Supabase types are strict when env vars aren't set
      const { error } = await supabase.from('responses').insert({
        attempt_id: attemptId,
        question_id: response.questionId,
        question_type: response.questionType,
        level_number: response.levelNumber,
        student_answer: response.studentAnswer,
        is_correct: response.isCorrect,
        answered_at: response.answeredAt,
      })

      if (error) throw error
    } else if (queueItem.type === 'attempt') {
      // Update attempt completion
      const {
        attemptId,
        completedAt,
        questionsAttempted,
        questionsCorrect,
        levelsCompleted,
        levels_stopped_at,
      } = queueItem.data

      // @ts-ignore - Supabase types are strict when env vars aren't set
      const { error } = await supabase
        .from('attempts')
        // @ts-ignore
        .update({
          completed_at: completedAt,
          questions_attempted: questionsAttempted,
          questions_correct: questionsCorrect,
          levels_completed: levelsCompleted,
          levels_stopped_at: levels_stopped_at,
        })
        .eq('id', attemptId)

      if (error) throw error
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Sync error:', error)
    return NextResponse.json(
      { error: 'Failed to sync data' },
      { status: 500 }
    )
  }
}
