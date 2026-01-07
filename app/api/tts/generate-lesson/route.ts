import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { lessonId } = await request.json()

    if (!lessonId) {
      return NextResponse.json({ error: 'Lesson ID is required' }, { status: 400 })
    }

    const apiKey = process.env.GOOGLE_CLOUD_TTS_API_KEY

    if (!apiKey) {
      console.warn('Google Cloud TTS API key not configured')
      return NextResponse.json(
        { error: 'TTS service not configured' },
        { status: 503 }
      )
    }

    // Get lesson
    const { data: lesson, error } = await supabase
      .from('lessons')
      .select('content')
      .eq('id', lessonId)
      .single()

    if (error || !lesson) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 })
    }

    const content = (lesson as any).content

    // Extract all prompts that need audio
    const prompts: { questionId: string; text: string }[] = []

    content.blocks?.forEach((block: any) => {
      block.questions?.forEach((question: any) => {
        if (question.prompt && !question.audioUrl) {
          prompts.push({
            questionId: question.id,
            text: question.prompt,
          })
        }
      })
    })

    // Generate audio for each prompt
    const audioMap: Record<string, string> = {}

    for (const prompt of prompts) {
      try {
        const response = await fetch(
          `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              input: { text: prompt.text },
              voice: {
                languageCode: 'en-IN',
                name: 'en-IN-Wavenet-D',
                ssmlGender: 'FEMALE',
              },
              audioConfig: {
                audioEncoding: 'MP3',
                speakingRate: 0.9,
                pitch: 0.5,
              },
            }),
          }
        )

        if (response.ok) {
          const data = await response.json()
          audioMap[prompt.questionId] = `data:audio/mp3;base64,${data.audioContent}`
        }
      } catch (error) {
        console.error(`Failed to generate audio for question ${prompt.questionId}:`, error)
      }
    }

    // Update lesson content with audio URLs
    // Note: In production, you'd save the audio files to Supabase Storage
    // and update the content with proper URLs
    const updatedContent = { ...content }

    updatedContent.blocks = updatedContent.blocks.map((block: any) => ({
      ...block,
      questions: block.questions.map((question: any) => ({
        ...question,
        audioUrl: audioMap[question.id] || question.audioUrl,
      })),
    }))

    // Update lesson
    // @ts-ignore - Supabase types are strict when env vars aren't set
    await supabase
      .from('lessons')
      // @ts-ignore
      .update({ content: updatedContent })
      .eq('id', lessonId)

    return NextResponse.json({
      success: true,
      generatedCount: Object.keys(audioMap).length,
    })
  } catch (error) {
    console.error('Failed to generate lesson audio:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
