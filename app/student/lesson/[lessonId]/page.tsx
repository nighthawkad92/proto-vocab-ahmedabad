'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { StudentSessionManager } from '@/lib/studentSession'
import { LessonEngine } from '@/lib/lessonEngine'
import { OfflineQueue, AttemptStateManager } from '@/lib/offlineQueue'
import { playAudio, preloadLessonAudio } from '@/lib/audioCache'
import { generateSpeech } from '@/lib/googleTTS'
import QuestionCard from '@/components/game/QuestionCard'
import FeedbackModal from '@/components/game/FeedbackModal'
import ProgressBar from '@/components/game/ProgressBar'
import BlockCompleteModal from '@/components/game/BlockCompleteModal'
import IntroductionCard from '@/components/game/IntroductionCard'
import ConnectionStatus from '@/components/layout/ConnectionStatus'
import { getLessonCache } from '@/lib/lessonCache'
import type { LessonContent, Question, BlockIntroduction } from '@/lib/types'

export default function LessonPage() {
  const router = useRouter()
  const params = useParams()
  const lessonId = params.lessonId as string

  const [loading, setLoading] = useState(true)
  const [engine, setEngine] = useState<LessonEngine | null>(null)
  const [lessonContent, setLessonContent] = useState<LessonContent | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [showIntroduction, setShowIntroduction] = useState(false)
  const [currentIntroduction, setCurrentIntroduction] = useState<BlockIntroduction | null>(null)
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
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)

  useEffect(() => {
    const session = StudentSessionManager.load()
    if (!session) {
      router.push('/student')
      return
    }

    loadLesson(session)
  }, [lessonId, router])

  const loadLesson = async (session: any) => {
    try {
      // Try to load from cache first
      const cache = getLessonCache()
      let content: LessonContent | null = null

      try {
        content = await cache.getCachedLesson(lessonId)
      } catch (error) {
        console.error('Failed to load from cache:', error)
      }

      // If not in cache or cache failed, fetch from network
      let attemptNumber = 1
      if (!content) {
        const response = await fetch(`/api/student/lesson/${lessonId}?studentId=${session.studentId}`)
        if (!response.ok) {
          throw new Error('Failed to load lesson')
        }

        const data = await response.json()
        content = data.lesson.content
        attemptNumber = data.attemptNumber || 1

        // Cache for offline use
        try {
          await cache.cacheLessonContent(lessonId, content)
        } catch (error) {
          console.error('Failed to cache lesson:', error)
        }
      }

      setLessonContent(content)

      // Create attempt
      const attemptResponse = await fetch('/api/student/attempt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: session.studentId,
          lessonId,
        }),
      })

      if (!attemptResponse.ok) {
        const errorData = await attemptResponse.json()
        throw new Error(errorData.error || 'Failed to create attempt')
      }

      const attemptData = await attemptResponse.json()
      const attemptId = attemptData.attemptId

      if (!attemptId) {
        throw new Error('No attempt ID returned')
      }

      // Initialize lesson engine with attempt number for rotation sets
      const lessonEngine = new LessonEngine(attemptId, lessonId, content, attemptNumber)
      setEngine(lessonEngine)

      // Check if first block has an introduction
      const firstBlock = content.blocks[0]
      if (firstBlock?.introduction) {
        setCurrentIntroduction(firstBlock.introduction)
        setShowIntroduction(true)
      } else {
        setCurrentQuestion(lessonEngine.getCurrentQuestion())
      }

      setProgress(lessonEngine.getProgress())

      // Preload audio if available
      const audioUrls = content.blocks
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

  // Handler to play question prompt audio
  const handlePlayQuestionAudio = useCallback(async (text: string) => {
    setIsPlayingAudio(true)
    try {
      const audioUrl = await generateSpeech({ text })
      await playAudio(audioUrl)
    } catch (error) {
      console.error('Failed to play question audio:', error)
    } finally {
      setIsPlayingAudio(false)
    }
  }, [])

  // Auto-play question audio when question changes
  useEffect(() => {
    if (currentQuestion && !showIntroduction) {
      handlePlayQuestionAudio(currentQuestion.prompt)
    }
  }, [currentQuestion, showIntroduction, handlePlayQuestionAudio])

  const handleAnswer = useCallback(async (answer: string) => {
    if (!engine || waitingForNext) return

    setWaitingForNext(true)

    // Submit answer to engine (removed auto-play audio per UX spec)
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

      // Check if next block has an introduction
      const currentBlockNum = engine.getAttemptState().currentBlock
      const nextBlock = lessonContent?.blocks[currentBlockNum]

      if (nextBlock?.introduction) {
        setCurrentIntroduction(nextBlock.introduction)
        setShowIntroduction(true)
      } else {
        setCurrentQuestion(engine.getCurrentQuestion())
      }

      setProgress(engine.getProgress())
      setWaitingForNext(false)
    } else {
      handleFinishLesson()
    }
  }

  const handleIntroductionComplete = () => {
    setShowIntroduction(false)
    setCurrentIntroduction(null)
    if (engine) {
      setCurrentQuestion(engine.getCurrentQuestion())
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

  // Show introduction if available
  if (showIntroduction && currentIntroduction) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <IntroductionCard
          introduction={currentIntroduction}
          onContinue={handleIntroductionComplete}
          disabled={isPlayingAudio}
        />
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
      {/* Connection Status */}
      <div className="fixed top-4 right-4 z-30">
        <ConnectionStatus />
      </div>

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
          disabled={waitingForNext || isPlayingAudio}
        />

        {/* Back button */}
        <div className="flex justify-center">
          <button
            onClick={() => {
              if (confirm('Exit now? Progress is saved.')) {
                router.push('/student/dashboard')
              }
            }}
            className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-child text-base font-medium transition-colors active:scale-95 min-h-[3rem]"
          >
            Back to Lessons
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
