'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { TeacherSessionManager } from '@/lib/teacherSession'
import { Button } from '@/components/ui/Button'

interface StudentInfo {
  id: string
  name: string
  created_at: string
  last_active: string | null
  class: {
    name: string
    class_code: string
  }
}

interface Response {
  question_id: string
  question_type: string
  level_number: number
  student_answer: string | null
  is_correct: boolean
  answered_at: string
  question_prompt?: string
  correct_answer?: string
}

interface Attempt {
  id: string
  lesson: {
    title: string
  }
  started_at: string
  completed_at: string | null
  questions_attempted: number
  questions_correct: number
  levels_completed: number
  levels_stopped_at: number | null
  is_abandoned?: boolean
  abandoned_at?: string | null
  responses?: Response[]
}

export default function StudentDetailPage() {
  const router = useRouter()
  const params = useParams()
  const studentId = params.studentId as string

  const [student, setStudent] = useState<StudentInfo | null>(null)
  const [attempts, setAttempts] = useState<Attempt[]>([])
  const [expandedAttempt, setExpandedAttempt] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [loadingDetails, setLoadingDetails] = useState<string | null>(null)

  useEffect(() => {
    const session = TeacherSessionManager.get()
    if (!session) {
      router.push('/teacher')
      return
    }

    loadStudentData()
  }, [studentId, router])

  const loadStudentData = async () => {
    try {
      // Get student info
      // @ts-ignore - Supabase types are strict when env vars aren't set
      const { data: studentData } = await supabase
        .from('students')
        .select(`
          id,
          name,
          created_at,
          last_active,
          classes:class_id (
            name,
            class_code
          )
        `)
        .eq('id', studentId)
        .single()

      if (studentData) {
        setStudent({
          id: (studentData as any).id,
          name: (studentData as any).name,
          created_at: (studentData as any).created_at,
          last_active: (studentData as any).last_active,
          class: {
            name: (studentData as any).classes?.name || 'Unknown',
            class_code: (studentData as any).classes?.class_code || 'N/A',
          },
        })
      }

      // Get student attempts
      const { data: attemptsData } = await supabase
        .from('attempts')
        .select(`
          id,
          started_at,
          completed_at,
          questions_attempted,
          questions_correct,
          blocks_completed,
          blocks_stopped_at,
          is_abandoned,
          abandoned_at,
          lessons:lesson_id (
            title
          )
        `)
        .eq('student_id', studentId)
        .order('started_at', { ascending: false })

      const formattedAttempts = attemptsData?.map((attempt: any) => ({
        id: attempt.id,
        lesson: {
          title: attempt.lessons?.title || 'Unknown Lesson',
        },
        started_at: attempt.started_at,
        completed_at: attempt.completed_at,
        questions_attempted: attempt.questions_attempted || 0,
        questions_correct: attempt.questions_correct || 0,
        levels_completed: attempt.blocks_completed || 0, // DB uses "blocks" terminology
        levels_stopped_at: attempt.blocks_stopped_at,    // DB uses "blocks" terminology
        is_abandoned: attempt.is_abandoned || false,
        abandoned_at: attempt.abandoned_at,
      }))

      setAttempts(formattedAttempts || [])
    } catch (error) {
      console.error('Failed to load student data:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateAccuracy = (correct: number, attempted: number) => {
    if (attempted === 0) return 0
    return Math.round((correct / attempted) * 100)
  }

  const getDifficultyLevel = (levelsCompleted: number, levelsStopped: number | null) => {
    // Determine the highest level the student reached
    // levels_stopped_at indicates the level where they stopped (due to 2 mistakes)
    // levels_completed indicates levels they successfully completed
    const maxLevelReached = levelsStopped !== null ? levelsStopped : levelsCompleted

    if (maxLevelReached === 0) {
      return { level: 'EASY', color: 'bg-green-100 text-green-700', emoji: '🟢' }
    } else if (maxLevelReached === 1) {
      return { level: 'MEDIUM', color: 'bg-yellow-100 text-yellow-700', emoji: '🟡' }
    } else {
      return { level: 'HARD', color: 'bg-red-100 text-red-700', emoji: '🔴' }
    }
  }

  const toggleAttemptDetails = async (attemptId: string) => {
    if (expandedAttempt === attemptId) {
      setExpandedAttempt(null)
      return
    }

    // Open the side sheet immediately
    setExpandedAttempt(attemptId)

    // Check if we already have the responses loaded
    const attempt = attempts.find((a) => a.id === attemptId)
    if (attempt?.responses) {
      return
    }

    // Load responses for this attempt
    setLoadingDetails(attemptId)
    try {
      // Get responses - try both level_number (new schema) and block_number (old schema)
      const { data: responsesData, error: responsesError } = await supabase
        .from('responses')
        .select('*')
        .eq('attempt_id', attemptId)
        .order('answered_at', { ascending: true })

      if (responsesError) {
        console.error('Error fetching responses:', responsesError)
        throw responsesError
      }

      console.log('Raw responses from DB:', responsesData)

      // Get the attempt to find the lesson
      const currentAttempt = attempts.find((a) => a.id === attemptId)
      if (!currentAttempt) return

      // Get lesson content to match questions
      const { data: lessonData } = await supabase
        .from('attempts')
        .select(`
          lessons:lesson_id (
            content
          )
        `)
        .eq('id', attemptId)
        .single()

      // Extract questions from lesson content
      const lessonContent = (lessonData as any)?.lessons?.content
      const questionMap = new Map()

      // Handle both legacy 'blocks' and new 'levels' structure
      const levelsOrBlocks = lessonContent?.levels || lessonContent?.blocks
      if (levelsOrBlocks) {
        levelsOrBlocks.forEach((level: any) => {
          level.questions?.forEach((q: any) => {
            questionMap.set(q.id, {
              prompt: q.prompt,
              correctAnswer: q.correctAnswer,
            })
          })
        })
      }

      // Enrich responses with question details
      const enrichedResponses = responsesData?.map((response: any) => {
        const questionDetails = questionMap.get(response.question_id)
        return {
          ...response,
          // Handle both level_number (new) and block_number (old) column names
          level_number: response.level_number ?? response.block_number ?? 0,
          question_prompt: questionDetails?.prompt || 'Question not found',
          correct_answer: questionDetails?.correctAnswer || '',
        }
      }) as Response[]

      // Update the attempt with enriched responses
      console.log('Loaded responses:', enrichedResponses?.length || 0, 'for attempt', attemptId)
      setAttempts((prev) =>
        prev.map((a) =>
          a.id === attemptId
            ? { ...a, responses: enrichedResponses || [] }
            : a
        )
      )
    } catch (error) {
      console.error('Failed to load attempt details:', error)
      // Even if loading fails, keep the side sheet open to show summary data
    } finally {
      setLoadingDetails(null)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-6xl animate-bounce-gentle">📊</div>
          <p className="text-child-base text-gray-700">Loading student data...</p>
        </div>
      </div>
    )
  }

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-6xl">❌</div>
          <p className="text-child-base text-gray-700">Student not found</p>
          <Button
            onClick={() => router.back()}
            variant="secondary"
            size="md"
          >
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  const totalAttempts = attempts.length
  const completedAttempts = attempts.filter((a) => a.completed_at).length
  const abandonedAttempts = attempts.filter((a) => a.is_abandoned).length
  const totalQuestionsAttempted = attempts.reduce((sum, a) => sum + a.questions_attempted, 0)
  const totalQuestionsCorrect = attempts.reduce((sum, a) => sum + a.questions_correct, 0)
  const overallAccuracy = calculateAccuracy(totalQuestionsCorrect, totalQuestionsAttempted)

  return (
    <div className="min-h-screen p-6 relative">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-child shadow-lg p-6">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <h1 className="text-child-xl font-display font-bold text-secondary-600">
                {student.name}
              </h1>
              <div className="space-y-1 text-child-sm text-gray-600">
                <p>
                  Class: <strong>{student.class.name}</strong> (Code:{' '}
                  {student.class.class_code})
                </p>
                <p>
                  Joined:{' '}
                  {new Date(student.created_at).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
                <p>
                  Last Active:{' '}
                  {student.last_active
                    ? new Date(student.last_active).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })
                    : 'Never'}
                </p>
              </div>
            </div>
            <Button
              onClick={() => router.back()}
              variant="optional"
              size="md"
            >
              ← Back
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-primary-50 rounded-child shadow-lg p-6 border-2 border-primary-200">
            <div className="text-3xl mb-2">📝</div>
            <div className="text-child-base font-bold text-gray-800">Total Attempts</div>
            <div className="text-child-xl font-display font-bold text-primary-600">
              {totalAttempts}
            </div>
          </div>

          <div className="bg-green-50 rounded-child shadow-lg p-6 border-2 border-green-200">
            <div className="text-3xl mb-2">✅</div>
            <div className="text-child-base font-bold text-gray-800">Completed</div>
            <div className="text-child-xl font-display font-bold text-green-600">
              {completedAttempts}
            </div>
          </div>

          <div className="bg-red-50 rounded-child shadow-lg p-6 border-2 border-red-200">
            <div className="text-3xl mb-2">⚠️</div>
            <div className="text-child-base font-bold text-gray-800">Abandoned</div>
            <div className="text-child-xl font-display font-bold text-red-600">
              {abandonedAttempts}
            </div>
          </div>

          <div className="bg-accent-50 rounded-child shadow-lg p-6 border-2 border-accent-200">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-child-base font-bold text-gray-800">Accuracy</div>
            <div className="text-child-xl font-display font-bold text-accent-600">
              {overallAccuracy}%
            </div>
          </div>

          <div className="bg-secondary-50 rounded-child shadow-lg p-6 border-2 border-secondary-200">
            <div className="text-3xl mb-2">💯</div>
            <div className="text-child-base font-bold text-gray-800">Questions Correct</div>
            <div className="text-child-xl font-display font-bold text-secondary-600">
              {totalQuestionsCorrect}/{totalQuestionsAttempted}
            </div>
          </div>
        </div>

        {/* Attempts List */}
        <div className="bg-white rounded-child shadow-lg overflow-hidden">
          <div className="bg-secondary-50 px-6 py-4 border-b-2 border-secondary-200">
            <h2 className="text-child-lg font-display font-bold text-gray-800">
              Lesson Attempts
            </h2>
          </div>

          {attempts.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-6xl mb-4">📚</div>
              <p className="text-child-base text-gray-600">No attempts yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-child-sm font-bold text-gray-700 w-8"></th>
                    <th className="px-6 py-4 text-left text-child-sm font-bold text-gray-700">
                      Lesson
                    </th>
                    <th className="px-6 py-4 text-left text-child-sm font-bold text-gray-700">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-child-sm font-bold text-gray-700">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-child-sm font-bold text-gray-700">
                      Difficulty
                    </th>
                    <th className="px-6 py-4 text-left text-child-sm font-bold text-gray-700">
                      Questions
                    </th>
                    <th className="px-6 py-4 text-left text-child-sm font-bold text-gray-700">
                      Accuracy
                    </th>
                    <th className="px-6 py-4 text-left text-child-sm font-bold text-gray-700">
                      Levels
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {attempts.map((attempt) => {
                    const accuracy = calculateAccuracy(
                      attempt.questions_correct,
                      attempt.questions_attempted
                    )
                    const isCompleted = !!attempt.completed_at
                    const isAbandoned = !!attempt.is_abandoned
                    const difficulty = getDifficultyLevel(
                      attempt.levels_completed,
                      attempt.levels_stopped_at
                    )
                    const isExpanded = expandedAttempt === attempt.id
                    const isLoading = loadingDetails === attempt.id

                    return (
                      <tr
                        key={attempt.id}
                        className={`hover:bg-secondary-50 cursor-pointer transition-colors ${
                          isExpanded ? 'bg-secondary-50' : ''
                        }`}
                        onClick={() => toggleAttemptDetails(attempt.id)}
                      >
                        <td className="px-6 py-4">
                          <button className="text-gray-600 hover:text-gray-900">
                            {isLoading ? (
                              <span className="text-xs">⏳</span>
                            ) : (
                              <span className="text-lg">
                                {isExpanded ? '◀' : '▶'}
                              </span>
                            )}
                          </button>
                        </td>
                          <td className="px-6 py-4 text-child-sm text-gray-800 font-medium">
                            {attempt.lesson.title}
                          </td>
                          <td className="px-6 py-4 text-child-sm text-gray-600">
                            {new Date(attempt.started_at).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </td>
                          <td className="px-6 py-4">
                            {isCompleted ? (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-child-xs font-bold bg-green-100 text-green-700">
                                ✓ Completed
                              </span>
                            ) : isAbandoned ? (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-child-xs font-bold bg-red-100 text-red-700">
                                ⚠ Abandoned
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-child-xs font-bold bg-yellow-100 text-yellow-700">
                                ⏳ In Progress
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-child-xs font-bold ${difficulty.color}`}
                            >
                              {difficulty.emoji} {difficulty.level}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-child-sm text-gray-600">
                            <span className="font-bold text-green-600">
                              {attempt.questions_correct}
                            </span>
                            <span className="text-gray-400">/</span>
                            {attempt.questions_attempted}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                                <div
                                  className={`h-2 rounded-full transition-all ${
                                    accuracy >= 80
                                      ? 'bg-green-500'
                                      : accuracy >= 60
                                      ? 'bg-yellow-500'
                                      : 'bg-red-500'
                                  }`}
                                  style={{ width: `${accuracy}%` }}
                                />
                              </div>
                              <span className="text-child-sm font-bold text-gray-700 min-w-[45px]">
                                {accuracy}%
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-child-sm text-gray-600">
                            {attempt.levels_completed}
                          </td>
                        </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar for attempt details */}
      {expandedAttempt && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
            onClick={() => setExpandedAttempt(null)}
          />

          {/* Sidebar */}
          <div className="fixed top-0 right-0 h-full w-full md:w-2/3 lg:w-1/2 bg-white shadow-2xl z-50 overflow-y-auto transform transition-transform">
            <div className="sticky top-0 bg-secondary-50 px-6 py-4 border-b-2 border-secondary-200 flex justify-between items-center">
              <h3 className="text-child-lg font-display font-bold text-gray-800">
                Attempt Details
              </h3>
              <button
                onClick={() => setExpandedAttempt(null)}
                className="text-gray-600 hover:text-gray-900 text-2xl font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {(() => {
                const attempt = attempts.find((a) => a.id === expandedAttempt)
                if (!attempt) {
                  return (
                    <div className="bg-red-50 rounded-child p-6 border-2 border-red-200 text-center">
                      <p className="text-child-base text-gray-700">Attempt not found</p>
                    </div>
                  )
                }

                // Check if responses are loaded
                const hasResponses = attempt.responses && attempt.responses.length > 0
                const isLoadingResponses = loadingDetails === attempt.id

                console.log('Rendering attempt details:', {
                  attemptId: attempt.id,
                  hasResponses,
                  responsesLength: attempt.responses?.length,
                  isLoadingResponses,
                  loadingDetails
                })

                // Calculate level-by-level stats only if responses are available
                const levelStats = hasResponses
                  ? attempt.responses!.reduce((acc, response) => {
                      if (!acc[response.level_number]) {
                        acc[response.level_number] = { total: 0, correct: 0 }
                      }
                      acc[response.level_number].total++
                      if (response.is_correct) acc[response.level_number].correct++
                      return acc
                    }, {} as Record<number, { total: number; correct: number }>)
                  : {}

                // Calculate total questions in lesson (3 levels × 4 questions = 12)
                const totalQuestionsInLesson = 12
                const completionPercentage = Math.round((attempt.questions_attempted / totalQuestionsInLesson) * 100)

                return (
                  <>
                    {/* Lesson Title and Status */}
                    <div className="bg-white border-b-2 border-gray-200 pb-4">
                      <h4 className="text-child-lg font-display font-bold text-gray-800 mb-2">
                        {attempt.lesson?.title || 'Unknown Lesson'}
                      </h4>
                      <div className="flex items-center gap-2">
                        {attempt.completed_at ? (
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-child-xs font-bold">
                            ✓ Completed
                          </span>
                        ) : attempt.is_abandoned ? (
                          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-child-xs font-bold">
                            ⚠ Abandoned
                          </span>
                        ) : (
                          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-child-xs font-bold">
                            ⏳ In Progress
                          </span>
                        )}
                        <span className="text-child-xs text-gray-500">
                          {new Date(attempt.started_at).toLocaleString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Completion Status */}
                      <div className="bg-blue-50 rounded-child p-4 border-2 border-blue-200">
                        <div className="text-child-xs text-blue-600 font-medium mb-1">
                          Lesson Progress
                        </div>
                        <div className="text-child-lg font-bold text-gray-800">
                          {attempt.levels_completed} / 3
                        </div>
                        <div className="text-child-xs text-gray-600">
                          levels completed
                        </div>
                      </div>

                      {/* Questions Completed */}
                      <div className="bg-purple-50 rounded-child p-4 border-2 border-purple-200">
                        <div className="text-child-xs text-purple-600 font-medium mb-1">
                          Questions
                        </div>
                        <div className="text-child-lg font-bold text-gray-800">
                          {attempt.questions_attempted} / {totalQuestionsInLesson}
                        </div>
                        <div className="text-child-xs text-gray-600">
                          attempted ({completionPercentage}%)
                        </div>
                      </div>

                      {/* Accuracy */}
                      <div className={`rounded-child p-4 border-2 ${
                        calculateAccuracy(attempt.questions_correct, attempt.questions_attempted) >= 80
                          ? 'bg-green-50 border-green-200'
                          : calculateAccuracy(attempt.questions_correct, attempt.questions_attempted) >= 60
                          ? 'bg-yellow-50 border-yellow-200'
                          : 'bg-red-50 border-red-200'
                      }`}>
                        <div className={`text-child-xs font-medium mb-1 ${
                          calculateAccuracy(attempt.questions_correct, attempt.questions_attempted) >= 80
                            ? 'text-green-600'
                            : calculateAccuracy(attempt.questions_correct, attempt.questions_attempted) >= 60
                            ? 'text-yellow-600'
                            : 'text-red-600'
                        }`}>
                          Accuracy
                        </div>
                        <div className="text-child-lg font-bold text-gray-800">
                          {calculateAccuracy(attempt.questions_correct, attempt.questions_attempted)}%
                        </div>
                        <div className="text-child-xs text-gray-600">
                          {attempt.questions_correct} / {attempt.questions_attempted} correct
                        </div>
                      </div>

                      {/* Completion Status Detail */}
                      <div className="bg-gray-50 rounded-child p-4 border-2 border-gray-200">
                        <div className="text-child-xs text-gray-600 font-medium mb-1">
                          Status
                        </div>
                        {attempt.completed_at ? (
                          <>
                            <div className="text-child-sm font-bold text-green-600">
                              Finished
                            </div>
                            <div className="text-child-xs text-gray-600">
                              {new Date(attempt.completed_at).toLocaleString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </div>
                          </>
                        ) : attempt.is_abandoned && attempt.abandoned_at ? (
                          <>
                            <div className="text-child-sm font-bold text-red-600">
                              Left Early
                            </div>
                            <div className="text-child-xs text-gray-600">
                              {new Date(attempt.abandoned_at).toLocaleString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="text-child-sm font-bold text-yellow-600">
                              In Progress
                            </div>
                            <div className="text-child-xs text-gray-600">
                              Not yet completed
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Show loading state while responses are being fetched */}
                    {isLoadingResponses && (
                      <div className="bg-blue-50 rounded-child p-6 border-2 border-blue-200 text-center">
                        <div className="text-2xl mb-2">⏳</div>
                        <p className="text-child-base text-gray-700">Loading detailed responses...</p>
                      </div>
                    )}

                    {/* Show message if no responses and not loading */}
                    {!isLoadingResponses && !hasResponses && attempt.questions_attempted === 0 && (
                      <div className="bg-gray-50 rounded-child p-6 border-2 border-gray-200 text-center">
                        <div className="text-2xl mb-2">📝</div>
                        <p className="text-child-base text-gray-700">No questions attempted yet</p>
                      </div>
                    )}

                    {/* Show detailed breakdown only when responses are loaded */}
                    {hasResponses && (
                      <>
                        {/* Section Divider */}
                        <div className="border-t-2 border-gray-200 pt-4">
                          <h3 className="text-child-base font-display font-bold text-gray-800 mb-4">
                            📊 Detailed Breakdown
                          </h3>
                        </div>

                        {/* Level-by-level breakdown */}
                        <div>
                          <h4 className="text-child-sm font-bold text-gray-700 mb-3">
                            Performance by Level
                          </h4>
                          <div className="grid grid-cols-1 gap-3">
                            {Object.entries(levelStats).map(([levelNum, stats]) => {
                              const levelAccuracy = calculateAccuracy(stats.correct, stats.total)
                              const levelDifficulty =
                                Number(levelNum) === 0
                                  ? { level: 'EASY', color: 'border-green-200 bg-green-50', emoji: '🟢' }
                                  : Number(levelNum) === 1
                                  ? { level: 'MEDIUM', color: 'border-yellow-200 bg-yellow-50', emoji: '🟡' }
                                  : { level: 'HARD', color: 'border-red-200 bg-red-50', emoji: '🔴' }

                              return (
                                <div
                                  key={levelNum}
                                  className={`rounded-lg p-4 border-2 ${levelDifficulty.color}`}
                                >
                                  <div className="flex items-center justify-between mb-3">
                                    <span className="text-child-sm font-bold text-gray-800">
                                      Level {levelNum}
                                    </span>
                                    <span className="text-child-xs font-bold text-gray-600">
                                      {levelDifficulty.emoji} {levelDifficulty.level}
                                    </span>
                                  </div>
                                  <div className="space-y-2">
                                    <div className="flex justify-between text-child-xs text-gray-600">
                                      <span>Questions:</span>
                                      <span className="font-bold">
                                        {stats.correct}/{stats.total}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                                        <div
                                          className={`h-2 rounded-full transition-all ${
                                            levelAccuracy >= 80
                                              ? 'bg-green-500'
                                              : levelAccuracy >= 60
                                              ? 'bg-yellow-500'
                                              : 'bg-red-500'
                                          }`}
                                          style={{ width: `${levelAccuracy}%` }}
                                        />
                                      </div>
                                      <span className="text-child-xs font-bold min-w-[45px]">
                                        {levelAccuracy}%
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>

                        {/* Question-by-question details */}
                        <div>
                          <h4 className="text-child-sm font-bold text-gray-700 mb-3">
                            Questions Attempted ({attempt.responses!.length})
                          </h4>
                          <div className="space-y-3">
                            {attempt.responses!.map((response, idx) => (
                          <div
                            key={response.question_id}
                            className={`rounded-child p-4 border-l-4 ${
                              response.is_correct
                                ? 'border-l-green-500 bg-green-50'
                                : 'border-l-red-500 bg-red-50'
                            } shadow-sm`}
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-child-xs font-bold ${
                                  response.is_correct
                                    ? 'bg-green-200 text-green-700'
                                    : 'bg-red-200 text-red-700'
                                }`}>
                                  {idx + 1}
                                </span>
                                <div>
                                  <div className="text-child-xs text-gray-500 capitalize">
                                    {response.question_type.replace('-', ' ')} • Level {response.level_number}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {response.is_correct ? (
                                  <span className="bg-green-200 text-green-700 px-2 py-1 rounded-full text-child-xs font-bold">
                                    ✓ Correct
                                  </span>
                                ) : (
                                  <span className="bg-red-200 text-red-700 px-2 py-1 rounded-full text-child-xs font-bold">
                                    ✗ Wrong
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="space-y-3">
                              {/* Question */}
                              <div className="bg-white rounded-lg p-3 border border-gray-200">
                                <p className="text-child-xs text-gray-500 mb-1 font-medium">Question:</p>
                                <p className="text-child-sm text-gray-800">
                                  {response.question_prompt}
                                </p>
                              </div>

                              {/* Answers */}
                              <div className="grid grid-cols-1 gap-2">
                                <div className={`rounded-lg p-3 border-2 ${
                                  response.is_correct
                                    ? 'border-green-300 bg-green-100'
                                    : 'border-red-300 bg-red-100'
                                }`}>
                                  <p className="text-child-xs font-medium mb-1" style={{
                                    color: response.is_correct ? '#15803d' : '#b91c1c'
                                  }}>
                                    Student's Answer:
                                  </p>
                                  <p className="text-child-sm font-bold" style={{
                                    color: response.is_correct ? '#15803d' : '#b91c1c'
                                  }}>
                                    {response.student_answer || '(No answer)'}
                                  </p>
                                </div>

                                {!response.is_correct && (
                                  <div className="rounded-lg p-3 border-2 border-blue-300 bg-blue-50">
                                    <p className="text-child-xs text-blue-700 font-medium mb-1">
                                      Correct Answer:
                                    </p>
                                    <p className="text-child-sm font-bold text-blue-700">
                                      {response.correct_answer}
                                    </p>
                                  </div>
                                )}
                              </div>

                              <div className="text-child-xs text-gray-400 text-right">
                                {new Date(response.answered_at).toLocaleTimeString('en-IN', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  second: '2-digit',
                                })}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                      </>
                    )}
                  </>
                )
              })()}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
