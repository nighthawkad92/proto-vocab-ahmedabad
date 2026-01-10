import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: { lessonId: string } }
) {
  try {
    const { lessonId } = params

    // Get lesson with full content
    // @ts-ignore - Supabase types are strict when env vars aren't set
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
    // @ts-ignore
    const debug = {
      // @ts-ignore
      lessonId: lesson.id,
      // @ts-ignore
      title: lesson.title,
      // @ts-ignore
      grade: lesson.grade,
      // @ts-ignore
      hasContent: !!lesson.content,
      // @ts-ignore
      contentType: typeof lesson.content,
      // @ts-ignore
      contentIsNull: lesson.content === null,
      // @ts-ignore
      contentKeys: lesson.content ? Object.keys(lesson.content) : null,
      // @ts-ignore
      hasLevelsArray: lesson.content?.levels ? true : false,
      // @ts-ignore
      levelsIsArray: Array.isArray(lesson.content?.levels),
      // @ts-ignore
      levelsLength: lesson.content?.levels?.length || 0,
      // @ts-ignore
      firstLevelStructure: lesson.content?.levels?.[0] ? {
        // @ts-ignore
        hasIntroduction: !!lesson.content.levels[0].introduction,
        // @ts-ignore
        hasQuestions: !!lesson.content.levels[0].questions,
        // @ts-ignore
        questionsLength: lesson.content.levels[0].questions?.length || 0
      } : null,
      // @ts-ignore
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
