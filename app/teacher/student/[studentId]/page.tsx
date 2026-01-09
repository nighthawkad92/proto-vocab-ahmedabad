'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { TeacherSessionManager } from '@/lib/teacherSession'

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
          levels_completed,
          levels_stopped_at,
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
        levels_completed: attempt.levels_completed || 0,
        levels_stopped_at: attempt.levels_stopped_at,
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

    // Check if we already have the responses loaded
    const attempt = attempts.find((a) => a.id === attemptId)
    if (attempt?.responses) {
      setExpandedAttempt(attemptId)
      return
    }

    // Load responses for this attempt
    setLoadingDetails(attemptId)
    try {
      // Get responses
      const { data: responsesData } = await supabase
        .from('responses')
        .select('question_id, question_type, level_number, student_answer, is_correct, answered_at')
        .eq('attempt_id', attemptId)
        .order('answered_at', { ascending: true })

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
          question_prompt: questionDetails?.prompt || 'Question not found',
          correct_answer: questionDetails?.correctAnswer || '',
        }
      }) as Response[]

      // Update the attempt with enriched responses
      setAttempts((prev) =>
        prev.map((a) =>
          a.id === attemptId
            ? { ...a, responses: enrichedResponses }
            : a
        )
      )
      setExpandedAttempt(attemptId)
    } catch (error) {
      console.error('Failed to load attempt details:', error)
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
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-secondary-600 hover:bg-secondary-700 text-white rounded-child text-child-sm font-bold active:scale-95"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  const totalAttempts = attempts.length
  const completedAttempts = attempts.filter((a) => a.completed_at).length
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
            <button
              onClick={() => router.back()}
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-child text-child-sm font-medium transition-colors active:scale-95"
            >
              ← Back
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-primary-50 rounded-child shadow-lg p-6 border-2 border-primary-200">
            <div className="text-3xl mb-2">📝</div>
            <div className="text-child-base font-bold text-gray-800">Total Attempts</div>
            <div className="text-child-xl font-display font-bold text-primary-600">
              {totalAttempts}
            </div>
          </div>

          <div className="bg-secondary-50 rounded-child shadow-lg p-6 border-2 border-secondary-200">
            <div className="text-3xl mb-2">✅</div>
            <div className="text-child-base font-bold text-gray-800">Completed</div>
            <div className="text-child-xl font-display font-bold text-secondary-600">
              {completedAttempts}
            </div>
          </div>

          <div className="bg-accent-50 rounded-child shadow-lg p-6 border-2 border-accent-200">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-child-base font-bold text-gray-800">Accuracy</div>
            <div className="text-child-xl font-display font-bold text-accent-600">
              {overallAccuracy}%
            </div>
          </div>

          <div className="bg-green-50 rounded-child shadow-lg p-6 border-2 border-green-200">
            <div className="text-3xl mb-2">💯</div>
            <div className="text-child-base font-bold text-gray-800">Questions Correct</div>
            <div className="text-child-xl font-display font-bold text-green-600">
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
                <thead className="bg-gray-50">
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
                    const difficulty = getDifficultyLevel(
                      attempt.levels_completed,
                      attempt.levels_stopped_at
                    )
                    const isExpanded = expandedAttempt === attempt.id
                    const isLoading = loadingDetails === attempt.id

                    return (
                      <tr
                        key={attempt.id}
                        className={`hover:bg-gray-50 cursor-pointer transition-colors ${
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
                if (!attempt || !attempt.responses) return null

                // Calculate level-by-level stats
                const levelStats = attempt.responses.reduce((acc, response) => {
                  if (!acc[response.level_number]) {
                    acc[response.level_number] = { total: 0, correct: 0 }
                  }
                  acc[response.level_number].total++
                  if (response.is_correct) acc[response.level_number].correct++
                  return acc
                }, {} as Record<number, { total: number; correct: number }>)

                return (
                  <>
                    {/* Lesson Info */}
                    <div className="bg-secondary-50 rounded-child p-4 border-2 border-secondary-200">
                      <h4 className="text-child-base font-bold text-gray-800 mb-2">
                        {attempt.lesson.title}
                      </h4>
                      <div className="grid grid-cols-2 gap-4 text-child-sm text-gray-600">
                        <div>
                          <span className="font-medium">Started:</span>{' '}
                          {new Date(attempt.started_at).toLocaleString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                        <div>
                          <span className="font-medium">Status:</span>{' '}
                          {attempt.completed_at ? (
                            <span className="text-green-600 font-bold">✓ Completed</span>
                          ) : (
                            <span className="text-yellow-600 font-bold">⏳ In Progress</span>
                          )}
                        </div>
                        <div>
                          <span className="font-medium">Accuracy:</span>{' '}
                          <span className="font-bold">
                            {calculateAccuracy(attempt.questions_correct, attempt.questions_attempted)}%
                          </span>
                        </div>
                        <div>
                          <span className="font-medium">Levels:</span>{' '}
                          <span className="font-bold">{attempt.levels_completed}</span>
                        </div>
                      </div>
                    </div>

                    {/* Level-by-level breakdown */}
                    <div>
                      <h4 className="text-child-base font-bold text-gray-800 mb-3">
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
                      <h4 className="text-child-base font-bold text-gray-800 mb-3">
                        Question History
                      </h4>
                      <div className="space-y-3">
                        {attempt.responses.map((response, idx) => (
                          <div
                            key={response.question_id}
                            className={`rounded-lg p-4 border-2 ${
                              response.is_correct
                                ? 'border-green-200 bg-green-50'
                                : 'border-red-200 bg-red-50'
                            }`}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <span className="text-child-xs font-bold text-gray-600">
                                  #{idx + 1}
                                </span>
                                <span className="text-child-xs text-gray-500">
                                  Level {response.level_number}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                {response.is_correct ? (
                                  <span className="text-green-600 font-bold text-child-xs">
                                    ✓ Correct
                                  </span>
                                ) : (
                                  <span className="text-red-600 font-bold text-child-xs">
                                    ✗ Incorrect
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div>
                                <p className="text-child-xs text-gray-500 mb-1 capitalize">
                                  {response.question_type.replace('-', ' ')}
                                </p>
                                <p className="text-child-sm font-medium text-gray-800">
                                  {response.question_prompt}
                                </p>
                              </div>

                              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-200">
                                <div>
                                  <p className="text-child-xs text-gray-600 mb-1">Student Answer:</p>
                                  <p
                                    className={`text-child-sm font-bold ${
                                      response.is_correct ? 'text-green-700' : 'text-red-700'
                                    }`}
                                  >
                                    {response.student_answer || '(No answer)'}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-child-xs text-gray-600 mb-1">Correct Answer:</p>
                                  <p className="text-child-sm font-bold text-blue-700">
                                    {response.correct_answer}
                                  </p>
                                </div>
                              </div>

                              <div className="text-child-xs text-gray-500 pt-1">
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
                )
              })()}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
