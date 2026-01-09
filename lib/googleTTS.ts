// Google Cloud Text-to-Speech integration
// Indian English female voice
import { audioQueue } from './audioQueue'

export interface TTSRequest {
  text: string
  languageCode?: string
  voiceName?: string
}

export async function generateSpeech(request: TTSRequest): Promise<string> {
  try {
    const response = await fetch('/api/tts/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      throw new Error('Failed to generate speech')
    }

    const data = await response.json()
    return data.audioUrl
  } catch (error) {
    console.error('TTS generation error:', error)
    throw error
  }
}

// Generate and play TTS using audio queue (medium priority)
export async function playTextToSpeech(text: string): Promise<void> {
  try {
    const audioUrl = await generateSpeech({ text })
    await audioQueue.playAudio(audioUrl, 50) // Medium priority
  } catch (error) {
    console.error('Failed to play text-to-speech:', error)
    throw error
  }
}

// Batch generate audio for lesson content
export async function generateLessonAudio(lessonId: string): Promise<void> {
  try {
    await fetch('/api/tts/generate-lesson', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lessonId }),
    })
  } catch (error) {
    console.error('Failed to generate lesson audio:', error)
    throw error
  }
}
