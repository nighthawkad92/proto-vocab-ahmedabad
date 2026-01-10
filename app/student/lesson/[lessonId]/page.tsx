'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { StudentSessionManager } from '@/lib/studentSession'
import { LessonEngine } from '@/lib/lessonEngine'
import { OfflineQueue, AttemptStateManager } from '@/lib/offlineQueue'
import { playAudio, preloadLessonAudio } from '@/lib/audioCache'
import { playTextToSpeech, generateSpeech } from '@/lib/googleTTS'
import { playSoundEffect, SoundEffect } from '@/lib/soundEffects'
import { audioQueue } from '@/lib/audioQueue'
import QuestionCard from '@/components/game/QuestionCard'
import ProgressBar from '@/components/game/ProgressBar'
import LevelCompleteModal from '@/components/game/LevelCompleteModal'
import IntroductionCard from '@/components/game/IntroductionCard'
import ConnectionStatus from '@/components/layout/ConnectionStatus'
import { Header } from '@/components/navigation/Header'
import { Loader } from '@/components/ui/Loader'
import { getLessonCache } from '@/lib/lessonCache'
import { PointAnimation } from '@/components/game/PointAnimation'
import { LessonCompleteModal } from '@/components/game/LessonCompleteModal'
import type { LessonContent, Question, LevelIntroduction, FeedbackState } from '@/lib/types'

export default function LessonPage() {
  const router = useRouter()
  const params = useParams()
  const lessonId = params.lessonId as string

  const [loading, setLoading] = useState(true)
  const [engine, setEngine] = useState<LessonEngine | null>(null)
  const [lessonContent, setLessonContent] = useState<LessonContent | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [showIntroduction, setShowIntroduction] = useState(false)
  const [currentIntroduction, setCurrentIntroduction] = useState<LevelIntroduction | null>(null)
  const [progress, setProgress] = useState({
    currentLevel: 0,
    totalLevels: 0,
    questionsInCurrentLevel: 0,
    currentQuestionInLevel: 0,
    accuracy: 0,
  })
  const [feedbackState, setFeedbackState] = useState<FeedbackState>({ type: null })
  const [showLevelComplete, setShowLevelComplete] = useState(false)
  const [levelStoppedEarly, setLevelStoppedEarly] = useState(false)
  const [completedLevelNum, setCompletedLevelNum] = useState<number>(0)
  const [completedLevelName, setCompletedLevelName] = useState<string | undefined>()
  const [nextLevelNum, setNextLevelNum] = useState<number | undefined>()
  const [nextLevelName, setNextLevelName] = useState<string | undefined>()
  const [waitingForNext, setWaitingForNext] = useState(false)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)

  // Gamification state
  const [score, setScore] = useState(0)
  const [levelScore, setLevelScore] = useState(0)
  const [showPointAnimation, setShowPointAnimation] = useState(false)
  const [lessonStartTime] = useState(Date.now())
  const [showLessonComplete, setShowLessonComplete] = useState(false)
  const [finalScore, setFinalScore] = useState(0)

  useEffect(() => {
    const session = StudentSessionManager.load()
    if (!session) {
      router.push('/student')
      return
    }

    loadLesson(session)
  }, [lessonId, router])

  // Handle page unload/close to mark lesson as abandoned
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (engine) {
        const attemptState = engine.getAttemptState()
        // Only mark as abandoned if lesson is not complete
        if (attemptState && !attemptState.levelsCompleted) {
          const queue = OfflineQueue.getInstance()
          queue.add({
            type: 'attempt',
            data: {
              attemptId: attemptState.attemptId,
              isAbandoned: true,
              abandonedAt: new Date().toISOString(),
              ...attemptState,
            },
          })
        }
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [engine])

  const loadLesson = async (session: any) => {
    try {
      // Try to load from cache first
      const cache = getLessonCache()
      let content: LessonContent | null = null

      try {
        content = await cache.getCachedLesson(lessonId)

        // Validate cached content has correct number of questions (4 per level)
        if (content && content.levels) {
          const hasInvalidQuestionCount = content.levels.some(level =>
            !level.questions || level.questions.length !== 4
          )

          if (hasInvalidQuestionCount) {
            console.warn('Cached lesson has invalid question count, fetching fresh data')
            content = null // Force refetch from network
          }
        }
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
        console.log('API Response:', data)

        if (!data.lesson) {
          throw new Error('No lesson data returned from API')
        }

        if (!data.lesson.content) {
          throw new Error('Lesson content is missing or null')
        }

        content = data.lesson.content
        attemptNumber = data.attemptNumber || 1

        // Cache for offline use
        try {
          await cache.cacheLessonContent(lessonId, content)
        } catch (error) {
          console.error('Failed to cache lesson:', error)
        }
      }

      if (!content) {
        throw new Error('Lesson content is null after loading')
      }

      if (!content.levels || !Array.isArray(content.levels) || content.levels.length === 0) {
        console.error('Invalid content structure:', content)
        throw new Error('Lesson content is missing levels array')
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

      // Check if first level has an introduction
      const firstLevel = content.levels[0]
      if (firstLevel?.introduction) {
        setCurrentIntroduction(firstLevel.introduction)
        setShowIntroduction(true)
      } else {
        setCurrentQuestion(lessonEngine.getCurrentQuestion())
      }

      setProgress(lessonEngine.getProgress())

      // Preload audio if available
      const audioUrls = content.levels
        .flatMap((level) => level.questions)
        .map((q) => q.audioUrl)
        .filter((url): url is string => !!url)

      if (audioUrls.length > 0) {
        preloadLessonAudio(audioUrls).catch(console.error)
      }

      setLoading(false)
    } catch (error) {
      console.error('Failed to load lesson:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      alert(`Failed to load lesson: ${errorMessage}`)
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

    // Submit answer to engine
    const result = engine.submitAnswer(answer)

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

    // NEW INLINE FEEDBACK FLOW

    // Increment score and show point animation for correct answers
    if (result.isCorrect) {
      setScore(prev => prev + 1)
      setLevelScore(prev => prev + 1)
      setShowPointAnimation(true)
    }

    // 1. Play sound effect immediately (high priority in audio queue)
    await playSoundEffect(result.isCorrect ? SoundEffect.CORRECT : SoundEffect.INCORRECT)

    // 2. Set feedback state to trigger inline feedback (shake/highlight in question components)
    setFeedbackState({
      type: result.isCorrect ? 'correct' : 'incorrect',
      correctAnswer: result.isCorrect ? undefined : currentQuestion?.correctAnswer,
    })

    // 3. Play TTS feedback (medium priority, waits for sound effect in audio queue)
    const feedbackText = result.isCorrect
      ? currentQuestion?.feedback?.correct || 'You answered correctly!'
      : currentQuestion?.feedback?.incorrect || 'Try again next time!'

    try {
      await playTextToSpeech(feedbackText)
    } catch (error) {
      console.error('Failed to play TTS feedback:', error)
    }

    // 4. Wait 1 second after TTS completes
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // 5. Clear feedback state and advance
    setFeedbackState({ type: null })

    // Check if level is complete
    if (result.isLevelComplete) {
      // Get completed level info
      const justCompletedLevel = engine.getAttemptState().currentLevel // 0-based
      const completedLevelNum = justCompletedLevel + 1 // Convert to 1-based
      const completedLevel = lessonContent?.levels[justCompletedLevel]
      const completedLevelName = completedLevel?.introduction?.concept

      // Get next level info
      const nextLevelIndex = justCompletedLevel + 1
      const nextLevel = lessonContent?.levels[nextLevelIndex]
      const nextLevelNum = nextLevel ? nextLevelIndex + 1 : undefined
      const nextLevelName = nextLevel?.introduction?.concept

      // Set state
      setCompletedLevelNum(completedLevelNum)
      setCompletedLevelName(completedLevelName)
      setNextLevelNum(nextLevelNum)
      setNextLevelName(nextLevelName)

      setLevelStoppedEarly(result.shouldStopLevel)
      setShowLevelComplete(true)
    } else {
      // Move to next question
      setCurrentQuestion(engine.getCurrentQuestion())
      setWaitingForNext(false)
    }
  }, [engine, waitingForNext, currentQuestion, lessonContent])

  const handleContinueToNextLevel = () => {
    if (!engine) return

    const hasNextLevel = engine.moveToNextLevel()

    if (hasNextLevel) {
      setShowLevelComplete(false)
      setLevelStoppedEarly(false)
      setLevelScore(0) // Reset level score for next level

      // Check if next level has an introduction
      const currentLevelNum = engine.getAttemptState().currentLevel
      const nextLevel = lessonContent?.levels[currentLevelNum]

      if (nextLevel?.introduction) {
        setCurrentIntroduction(nextLevel.introduction)
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

  const handleAbandonLesson = useCallback(async () => {
    if (!engine) return

    // Stop all audio playback
    audioQueue.stopAll()

    const attemptState = engine.getAttemptState()

    // Mark attempt as abandoned
    const queue = OfflineQueue.getInstance()
    queue.add({
      type: 'attempt',
      data: {
        attemptId: attemptState.attemptId,
        isAbandoned: true,
        abandonedAt: new Date().toISOString(),
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
  }, [engine])

  const handleFinishLesson = async () => {
    if (!engine) return

    const attemptState = engine.getAttemptState()
    const durationSeconds = Math.floor((Date.now() - lessonStartTime) / 1000)

    // Mark attempt as completed
    const queue = OfflineQueue.getInstance()
    queue.add({
      type: 'attempt',
      data: {
        attemptId: attemptState.attemptId,
        completedAt: new Date().toISOString(),
        duration: durationSeconds,
        score: score,
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

    // Show lesson complete modal with final score
    setFinalScore(score)
    setShowLessonComplete(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
        <Loader message="Loading lesson" />
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
            Level complete! Moving to next level...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Connection Status - Hidden */}
      <div className="fixed top-4 right-4 z-30 hidden">
        <ConnectionStatus />
      </div>

      {/* Header with Back Button */}
      <Header
        variant="back"
        onBack={async () => {
          if (confirm('Exit now? Progress will be lost.')) {
            await handleAbandonLesson()
            router.push('/student/dashboard')
          }
        }}
      />

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {/* Progress */}
        <ProgressBar
          current={progress.currentQuestionInLevel + 1}
          total={progress.questionsInCurrentLevel}
          mistakes={engine?.getAttemptState().mistakesInLevel || 0}
          maxMistakes={2}
        />

        {/* Question */}
        <QuestionCard
          question={currentQuestion}
          onAnswer={handleAnswer}
          disabled={waitingForNext || isPlayingAudio}
          feedbackState={feedbackState}
        />
      </div>

      {/* Level Complete Modal */}
      <LevelCompleteModal
        show={showLevelComplete}
        stoppedEarly={levelStoppedEarly}
        currentLevel={completedLevelNum}
        nextLevel={nextLevelNum}
        currentLevelName={completedLevelName}
        nextLevelName={nextLevelName}
        levelScore={levelScore}
        maxLevelScore={4}
        onContinue={handleContinueToNextLevel}
        onFinish={handleFinishLesson}
      />

      {/* Point Animation */}
      <PointAnimation
        show={showPointAnimation}
        onComplete={() => setShowPointAnimation(false)}
      />

      {/* Lesson Complete Modal */}
      <LessonCompleteModal
        show={showLessonComplete}
        totalScore={finalScore}
        maxScore={12}
        accuracy={progress.accuracy}
        onClose={() => {
          setShowLessonComplete(false)
          router.push('/student/dashboard')
        }}
      />
    </div>
  )
}
