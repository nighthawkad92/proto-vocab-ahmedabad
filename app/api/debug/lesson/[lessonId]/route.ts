import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: { lessonId: string } }
) {
  try {
    const { lessonId } = params

    // Get lesson with full content
    const { data: lesson, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('id', lessonId)
      .single()

    if (error) {
      return NextResponse.json({
        error: error.message,
        details: error
      }, { status: 500 })
    }

    if (!lesson) {
      return NextResponse.json({
        error: 'Lesson not found'
      }, { status: 404 })
    }

    // Debug information
    const debug = {
      lessonId: lesson.id,
      title: lesson.title,
      grade: lesson.grade,
      hasContent: !!lesson.content,
      contentType: typeof lesson.content,
      contentIsNull: lesson.content === null,
      contentKeys: lesson.content ? Object.keys(lesson.content) : null,
      hasLevelsArray: lesson.content?.levels ? true : false,
      levelsIsArray: Array.isArray(lesson.content?.levels),
      levelsLength: lesson.content?.levels?.length || 0,
      firstLevelStructure: lesson.content?.levels?.[0] ? {
        hasIntroduction: !!lesson.content.levels[0].introduction,
        hasQuestions: !!lesson.content.levels[0].questions,
        questionsLength: lesson.content.levels[0].questions?.length || 0
      } : null,
      rawContent: lesson.content
    }

    return NextResponse.json(debug)
  } catch (error) {
    console.error('Error in debug endpoint:', error)
    return NextResponse.json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
