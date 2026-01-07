import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { text, languageCode = 'en-IN', voiceName = 'en-IN-Wavenet-D' } = await request.json()

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 })
    }

    const apiKey = process.env.GOOGLE_CLOUD_TTS_API_KEY

    if (!apiKey) {
      console.warn('Google Cloud TTS API key not configured')
      return NextResponse.json(
        { error: 'TTS service not configured' },
        { status: 503 }
      )
    }

    // Call Google Cloud TTS API
    const response = await fetch(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: { text },
          voice: {
            languageCode,
            name: voiceName,
            ssmlGender: 'FEMALE',
          },
          audioConfig: {
            audioEncoding: 'MP3',
            speakingRate: 0.9, // Slightly slower for children
            pitch: 0.5, // Slightly higher pitch
          },
        }),
      }
    )

    if (!response.ok) {
      const error = await response.text()
      console.error('Google TTS API error:', error)
      return NextResponse.json(
        { error: 'Failed to generate speech' },
        { status: 500 }
      )
    }

    const data = await response.json()

    // Return base64 audio data
    // In production, you'd want to save this to Supabase Storage and return the URL
    const audioDataUri = `data:audio/mp3;base64,${data.audioContent}`

    return NextResponse.json({
      audioUrl: audioDataUri,
    })
  } catch (error) {
    console.error('TTS generation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
