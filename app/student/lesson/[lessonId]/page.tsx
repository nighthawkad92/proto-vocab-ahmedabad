'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { StudentSessionManager } from '@/lib/studentSession'
import { LessonEngine } from '@/lib/lessonEngine'
import { OfflineQueue, AttemptStateManager } from '@/lib/offlineQueue'
import { playAudio, preloadLessonAudio } from '@/lib/audioCache'
import QuestionCard from '@/components/game/QuestionCard'
import FeedbackModal from '@/components/game/FeedbackModal'
import ProgressBar from '@/components/game/ProgressBar'
import BlockCompleteModal from '@/components/game/BlockCompleteModal'
import type { LessonContent, Question } from '@/lib/types'

export default function LessonPage() {
  const router = useRouter()
  const params = useParams()
  const lessonId = params.lessonId as string

  const [loading, setLoading] = useState(true)
  const [engine, setEngine] = useState<LessonEngine | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [progress, setProgress] = useState({
    currentBlock: 0,
    totalBlocks: 0,
    questionsInCurrentBlock: 0,
    currentQuestionInBlock: 0,
    accuracy: 0,
  })
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackIsCorrect, setFeedbackIsCorrect] = useState(false)
  const [showBlockComplete, setShowBlockComplete] = useState(false)
  const [blockStoppedEarly, setBlockStoppedEarly] = useState(false)
  const [waitingForNext, setWaitingForNext] = useState(false)

  useEffect(() => {
    const session = StudentSessionManager.load()
    if (!session) {
      router.push('/student')
      return
    }

    loadLesson()
  }, [lessonId, router])

  const loadLesson = async () => {
    try {
      const response = await fetch(`/api/student/lesson/${lessonId}`)
      if (!response.ok) {
        throw new Error('Failed to load lesson')
      }

      const data = await response.json()
      const lessonContent: LessonContent = data.lesson.content

      // Create attempt
      const attemptResponse = await fetch('/api/student/attempt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: StudentSessionManager.load()?.studentId,
          lessonId,
        }),
      })

      const attemptData = await attemptResponse.json()
      const attemptId = attemptData.attemptId

      // Initialize lesson engine
      const lessonEngine = new LessonEngine(attemptId, lessonId, lessonContent)
      setEngine(lessonEngine)
      setCurrentQuestion(lessonEngine.getCurrentQuestion())
      setProgress(lessonEngine.getProgress())

      // Preload audio if available
      const audioUrls = lessonContent.blocks
        .flatMap((block) => block.questions)
        .map((q) => q.audioUrl)
        .filter((url): url is string => !!url)

      if (audioUrls.length > 0) {
        preloadLessonAudio(audioUrls).catch(console.error)
      }

      setLoading(false)
    } catch (error) {
      console.error('Failed to load lesson:', error)
      alert('Failed to load lesson. Please try again.')
      router.push('/student/dashboard')
    }
  }

  const handleAnswer = useCallback(async (answer: string) => {
    if (!engine || waitingForNext) return

    setWaitingForNext(true)

    // Play audio for the question if available
    const question = engine.getCurrentQuestion()
    if (question?.audioUrl) {
      playAudio(question.audioUrl).catch(console.error)
    }

    // Submit answer to engine
    const result = engine.submitAnswer(answer)

    // Show feedback
    setFeedbackIsCorrect(result.isCorrect)
    setShowFeedback(true)

    // Save response to queue for syncing
    const attemptState = engine.getAttemptState()
    const lastResponse = attemptState.responses[attemptState.responses.length - 1]

    const queue = OfflineQueue.getInstance()
    queue.add({
      type: 'response',
      data: {
        attemptId: attemptState.attemptId,
        response: lastResponse,
      },
    })

    // Save attempt state
    AttemptStateManager.save(attemptState.attemptId, attemptState)

    // Update progress
    setProgress(engine.getProgress())

    // Wait for feedback to close
    setTimeout(() => {
      setShowFeedback(false)

      // Check if block is complete
      if (result.isBlockComplete) {
        setBlockStoppedEarly(result.shouldStopBlock)
        setShowBlockComplete(true)
      } else {
        // Move to next question
        setCurrentQuestion(engine.getCurrentQuestion())
        setWaitingForNext(false)
      }
    }, 1500)
  }, [engine, waitingForNext])

  const handleContinueToNextBlock = () => {
    if (!engine) return

    const hasNextBlock = engine.moveToNextBlock()

    if (hasNextBlock) {
      setShowBlockComplete(false)
      setBlockStoppedEarly(false)
      setCurrentQuestion(engine.getCurrentQuestion())
      setProgress(engine.getProgress())
      setWaitingForNext(false)
    } else {
      handleFinishLesson()
    }
  }

  const handleFinishLesson = async () => {
    if (!engine) return

    const attemptState = engine.getAttemptState()

    // Mark attempt as completed
    const queue = OfflineQueue.getInstance()
    queue.add({
      type: 'attempt',
      data: {
        attemptId: attemptState.attemptId,
        completedAt: new Date().toISOString(),
        ...attemptState,
      },
    })

    // Sync if online
    if (navigator.onLine) {
      await queue.sync(async (item) => {
        await fetch('/api/student/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item),
        })
      })
    }

    // Clear attempt state
    AttemptStateManager.remove(attemptState.attemptId)

    // Navigate back to dashboard
    router.push('/student/dashboard')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-6xl animate-bounce-gentle">📚</div>
          <p className="text-child-base text-gray-700">Loading lesson...</p>
        </div>
      </div>
    )
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-6xl">✅</div>
          <p className="text-child-base text-gray-700">
            Block complete! Moving to next block...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6 space-y-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Progress */}
        <ProgressBar
          current={progress.currentQuestionInBlock + 1}
          total={progress.questionsInCurrentBlock}
          mistakes={engine?.getAttemptState().mistakesInBlock || 0}
          maxMistakes={2}
        />

        {/* Question */}
        <QuestionCard
          question={currentQuestion}
          onAnswer={handleAnswer}
          disabled={waitingForNext}
        />

        {/* Back button */}
        <div className="flex justify-center">
          <button
            onClick={() => {
              if (confirm('Are you sure you want to leave this lesson?')) {
                router.push('/student/dashboard')
              }
            }}
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-child text-child-sm font-medium transition-colors tap-feedback"
          >
            ← Back to Lessons
          </button>
        </div>
      </div>

      {/* Feedback Modal */}
      <FeedbackModal
        isCorrect={feedbackIsCorrect}
        show={showFeedback}
        onClose={() => setShowFeedback(false)}
      />

      {/* Block Complete Modal */}
      <BlockCompleteModal
        show={showBlockComplete}
        stoppedEarly={blockStoppedEarly}
        onContinue={handleContinueToNextBlock}
        onFinish={handleFinishLesson}
      />
    </div>
  )
}
