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
}

export default function StudentDetailPage() {
  const router = useRouter()
  const params = useParams()
  const studentId = params.studentId as string

  const [student, setStudent] = useState<StudentInfo | null>(null)
  const [attempts, setAttempts] = useState<Attempt[]>([])
  const [loading, setLoading] = useState(true)

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

                    return (
                      <tr key={attempt.id} className="hover:bg-gray-50">
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
