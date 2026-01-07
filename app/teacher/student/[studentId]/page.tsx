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
  block_number: number
  student_answer: string | null
  is_correct: boolean
  answered_at: string
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
  blocks_completed: number
  blocks_stopped_at: number | null
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
        blocks_completed: attempt.blocks_completed || 0,
        blocks_stopped_at: attempt.blocks_stopped_at,
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

  const getDifficultyLevel = (blocksCompleted: number, blocksStopped: number | null) => {
    // Determine the highest block the student reached
    // blocks_stopped_at indicates the block where they stopped (due to 2 mistakes)
    // blocks_completed indicates blocks they successfully completed
    const maxBlockReached = blocksStopped !== null ? blocksStopped : blocksCompleted

    if (maxBlockReached === 0) {
      return { level: 'EASY', color: 'bg-green-100 text-green-700', emoji: '🟢' }
    } else if (maxBlockReached === 1) {
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
      const { data: responsesData } = await supabase
        .from('responses')
        .select('question_id, question_type, block_number, student_answer, is_correct, answered_at')
        .eq('attempt_id', attemptId)
        .order('answered_at', { ascending: true })

      // Update the attempt with responses
      setAttempts((prev) =>
        prev.map((a) =>
          a.id === attemptId
            ? { ...a, responses: responsesData as Response[] }
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
            className="px-6 py-3 bg-secondary-600 hover:bg-secondary-700 text-white rounded-child text-child-sm font-bold"
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
    <div className="min-h-screen p-6">
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
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-child text-child-sm font-medium transition-colors"
            >
              ← Back
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-primary-50 to-white rounded-child shadow-lg p-6 border-2 border-primary-200">
            <div className="text-3xl mb-2">📝</div>
            <div className="text-child-base font-bold text-gray-800">Total Attempts</div>
            <div className="text-child-xl font-display font-bold text-primary-600">
              {totalAttempts}
            </div>
          </div>

          <div className="bg-gradient-to-br from-secondary-50 to-white rounded-child shadow-lg p-6 border-2 border-secondary-200">
            <div className="text-3xl mb-2">✅</div>
            <div className="text-child-base font-bold text-gray-800">Completed</div>
            <div className="text-child-xl font-display font-bold text-secondary-600">
              {completedAttempts}
            </div>
          </div>

          <div className="bg-gradient-to-br from-accent-50 to-white rounded-child shadow-lg p-6 border-2 border-accent-200">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-child-base font-bold text-gray-800">Accuracy</div>
            <div className="text-child-xl font-display font-bold text-accent-600">
              {overallAccuracy}%
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-white rounded-child shadow-lg p-6 border-2 border-green-200">
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
                      Blocks
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
                      attempt.blocks_completed,
                      attempt.blocks_stopped_at
                    )
                    const isExpanded = expandedAttempt === attempt.id
                    const isLoading = loadingDetails === attempt.id

                    // Calculate block-by-block stats
                    const blockStats = attempt.responses
                      ? attempt.responses.reduce((acc, response) => {
                          if (!acc[response.block_number]) {
                            acc[response.block_number] = { total: 0, correct: 0 }
                          }
                          acc[response.block_number].total++
                          if (response.is_correct) acc[response.block_number].correct++
                          return acc
                        }, {} as Record<number, { total: number; correct: number }>)
                      : {}

                    return (
                      <>
                        <tr
                          key={attempt.id}
                          className="hover:bg-gray-50 cursor-pointer"
                          onClick={() => toggleAttemptDetails(attempt.id)}
                        >
                          <td className="px-6 py-4">
                            <button className="text-gray-600 hover:text-gray-900 transition-transform">
                              {isLoading ? (
                                <span className="text-xs">⏳</span>
                              ) : (
                                <span
                                  className={`transition-transform inline-block ${
                                    isExpanded ? 'rotate-90' : ''
                                  }`}
                                >
                                  ▶
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
                            {attempt.blocks_completed}
                          </td>
                        </tr>
                        {isExpanded && attempt.responses && (
                          <tr>
                            <td colSpan={8} className="px-6 py-4 bg-gray-50">
                              <div className="space-y-4">
                                <h4 className="text-child-base font-bold text-gray-800 mb-3">
                                  Detailed Performance
                                </h4>

                                {/* Block-by-block breakdown */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  {Object.entries(blockStats).map(([blockNum, stats]) => {
                                    const blockAccuracy = calculateAccuracy(stats.correct, stats.total)
                                    const blockDifficulty =
                                      Number(blockNum) === 0
                                        ? 'EASY'
                                        : Number(blockNum) === 1
                                        ? 'MEDIUM'
                                        : 'HARD'

                                    return (
                                      <div
                                        key={blockNum}
                                        className="bg-white rounded-lg p-4 border-2 border-gray-200"
                                      >
                                        <div className="flex items-center justify-between mb-2">
                                          <span className="text-child-sm font-bold text-gray-800">
                                            Block {blockNum}
                                          </span>
                                          <span className="text-child-xs font-bold text-gray-600">
                                            {blockDifficulty}
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
                                                className={`h-2 rounded-full ${
                                                  blockAccuracy >= 80
                                                    ? 'bg-green-500'
                                                    : blockAccuracy >= 60
                                                    ? 'bg-yellow-500'
                                                    : 'bg-red-500'
                                                }`}
                                                style={{ width: `${blockAccuracy}%` }}
                                              />
                                            </div>
                                            <span className="text-child-xs font-bold min-w-[40px]">
                                              {blockAccuracy}%
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  })}
                                </div>

                                {/* Question-by-question details */}
                                <div className="mt-4">
                                  <h5 className="text-child-sm font-bold text-gray-700 mb-2">
                                    Question History
                                  </h5>
                                  <div className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden">
                                    <table className="w-full text-child-xs">
                                      <thead className="bg-gray-100">
                                        <tr>
                                          <th className="px-3 py-2 text-left font-bold text-gray-700">
                                            #
                                          </th>
                                          <th className="px-3 py-2 text-left font-bold text-gray-700">
                                            Block
                                          </th>
                                          <th className="px-3 py-2 text-left font-bold text-gray-700">
                                            Type
                                          </th>
                                          <th className="px-3 py-2 text-left font-bold text-gray-700">
                                            Result
                                          </th>
                                          <th className="px-3 py-2 text-left font-bold text-gray-700">
                                            Time
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-gray-200">
                                        {attempt.responses.map((response, idx) => (
                                          <tr key={response.question_id} className="hover:bg-gray-50">
                                            <td className="px-3 py-2 text-gray-700">{idx + 1}</td>
                                            <td className="px-3 py-2 text-gray-700">
                                              Block {response.block_number}
                                            </td>
                                            <td className="px-3 py-2 text-gray-600 capitalize">
                                              {response.question_type.replace('-', ' ')}
                                            </td>
                                            <td className="px-3 py-2">
                                              {response.is_correct ? (
                                                <span className="text-green-600 font-bold">✓ Correct</span>
                                              ) : (
                                                <span className="text-red-600 font-bold">✗ Incorrect</span>
                                              )}
                                            </td>
                                            <td className="px-3 py-2 text-gray-600">
                                              {new Date(response.answered_at).toLocaleTimeString('en-IN', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                              })}
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
