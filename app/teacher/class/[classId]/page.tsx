'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { TeacherSessionManager } from '@/lib/teacherSession'
import { Button } from '@/components/ui/Button'

interface Student {
  id: string
  name: string
  last_active: string | null
  attempts_count: number
  avg_accuracy: number
}

interface Lesson {
  id: string
  title: string
  description: string
  order: number
  is_unlocked: boolean
}

export default function ClassDetailPage() {
  const router = useRouter()
  const params = useParams()
  const classId = params.classId as string

  const [classData, setClassData] = useState<any>(null)
  const [students, setStudents] = useState<Student[]>([])
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'students' | 'lessons'>('lessons')
  const [deleting, setDeleting] = useState<string | null>(null)
  const [showDeleteClassConfirm, setShowDeleteClassConfirm] = useState(false)

  useEffect(() => {
    loadClassData()
  }, [classId])

  const loadClassData = async () => {
    try {
      // Get class info
      const { data: classInfo } = await supabase
        .from('classes')
        .select('*')
        .eq('id', classId)
        .single()

      setClassData(classInfo)

      // Get students
      const { data: studentsData } = await supabase
        .from('students')
        .select(`
          id,
          name,
          last_active,
          attempts(count)
        `)
        .eq('class_id', classId)
        .order('name')

      const studentsWithStats = studentsData?.map((student: any) => ({
        id: student.id,
        name: student.name,
        last_active: student.last_active,
        attempts_count: student.attempts?.[0]?.count || 0,
        avg_accuracy: 0, // We'll calculate this separately if needed
      }))

      setStudents(studentsWithStats || [])

      // Get lessons and unlock status
      const { data: lessonsData } = await supabase
        .from('lessons')
        .select('id, title, description, order')
        .eq('grade', 4)
        .order('order')

      const { data: unlocksData } = await supabase
        .from('lesson_unlocks')
        .select('lesson_id')
        .eq('class_id', classId)

      const unlockedIds = new Set(unlocksData?.map((u: any) => u.lesson_id) || [])

      const lessonsWithUnlocks = lessonsData?.map((lesson: any) => ({
        ...lesson,
        is_unlocked: unlockedIds.has(lesson.id),
      }))

      setLessons(lessonsWithUnlocks || [])
    } catch (error) {
      console.error('Failed to load class data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleLesson = async (lessonId: string, isUnlocked: boolean) => {
    try {
      const session = TeacherSessionManager.get()

      if (!session) return

      if (isUnlocked) {
        // Remove unlock
        const { error: deleteError } = await supabase
          .from('lesson_unlocks')
          .delete()
          .eq('class_id', classId)
          .eq('lesson_id', lessonId)

        if (deleteError) {
          console.error('Error removing unlock:', deleteError)
          throw deleteError
        }
        console.log('✅ Lesson unlocked removed')
      } else {
        // Add unlock
        // @ts-ignore - Supabase types are strict when env vars aren't set
        const { data, error: insertError } = await supabase.from('lesson_unlocks').insert({
          class_id: classId,
          lesson_id: lessonId,
          unlocked_by: session.teacherId,
        }).select()

        if (insertError) {
          console.error('Error adding unlock:', insertError)
          throw insertError
        }
        console.log('✅ Lesson unlocked:', data)
      }

      // Reload lessons
      await loadClassData()
    } catch (error) {
      console.error('Failed to toggle lesson:', error)
      alert('Failed to update lesson status')
    }
  }

  const handleDeleteStudent = async (studentId: string, studentName: string) => {
    if (!confirm(`Are you sure you want to delete ${studentName}? This will permanently delete all their attempts and responses.`)) {
      return
    }

    setDeleting(studentId)
    try {
      const response = await fetch(`/api/teacher/student/${studentId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete student')
      }

      // Reload class data to refresh student list
      await loadClassData()
      alert(`${studentName} has been deleted successfully`)
    } catch (error) {
      console.error('Failed to delete student:', error)
      alert('Failed to delete student. Please try again.')
    } finally {
      setDeleting(null)
    }
  }

  const handleDeleteClass = async () => {
    setShowDeleteClassConfirm(false)
    setDeleting('class')

    try {
      const response = await fetch(`/api/teacher/class/${classId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Delete class error response:', errorData)
        throw new Error(errorData.details || errorData.error || 'Failed to delete class')
      }

      alert(`Class "${classData?.name}" has been deleted successfully`)
      router.push('/teacher/dashboard')
    } catch (error) {
      console.error('Failed to delete class:', error)
      alert('Failed to delete class. Please try again.')
      setDeleting(null)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-6xl animate-bounce-gentle">📋</div>
          <p className="text-child-base text-gray-700">Loading class data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-child shadow-lg p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-child-lg font-display font-bold text-secondary-600">
                {classData?.name}
              </h1>
              <div className="flex gap-4 text-child-sm text-gray-600 mt-2">
                <span>Code: <strong>{classData?.class_code}</strong></span>
                <span>{students.length} students</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setShowDeleteClassConfirm(true)}
                variant="optional"
                size="md"
                className="bg-red-100 text-red-700 hover:bg-red-200 border-red-300"
                disabled={deleting === 'class'}
              >
                {deleting === 'class' ? '⏳ Deleting...' : '🗑️ Delete Class'}
              </Button>
              <Button
                onClick={() => router.push('/teacher/dashboard')}
                variant="optional"
                size="md"
              >
                ← Back
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 bg-white rounded-child shadow p-2">
          <button
            onClick={() => setActiveTab('lessons')}
            className={`flex-1 py-3 px-6 rounded-child text-child-sm font-bold transition-all ${
              activeTab === 'lessons'
                ? 'bg-secondary-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            📚 Lessons
          </button>
          <button
            onClick={() => setActiveTab('students')}
            className={`flex-1 py-3 px-6 rounded-child text-child-sm font-bold transition-all ${
              activeTab === 'students'
                ? 'bg-secondary-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            👨‍🎓 Students
          </button>
        </div>

        {/* Content */}
        {activeTab === 'lessons' ? (
          <div className="space-y-4">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-child p-4">
              <p className="text-child-sm text-blue-800">
                💡 Toggle lessons on/off to control what students can access
              </p>
            </div>

            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="bg-white rounded-child shadow-lg p-6 flex items-center justify-between"
              >
                <div className="flex-1">
                  <h3 className="text-child-base font-display font-semibold text-gray-800 mb-1">
                    {lesson.title}
                  </h3>
                  <p className="text-child-sm text-gray-600">{lesson.description}</p>
                </div>

                <Button
                  onClick={() => handleToggleLesson(lesson.id, lesson.is_unlocked)}
                  variant="optional"
                  size="md"
                  className={lesson.is_unlocked ? 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200 border-secondary-300' : ''}
                >
                  {lesson.is_unlocked ? '✅ Unlocked' : '🔒 Locked'}
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {students.length === 0 ? (
              <div className="bg-white rounded-child shadow p-8 text-center">
                <div className="text-6xl mb-4">👥</div>
                <p className="text-child-base text-gray-600">
                  No students yet. Share the class code <strong>{classData?.class_code}</strong> with your students!
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-child shadow-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-secondary-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-child-sm font-bold text-gray-700">
                        Student Name
                      </th>
                      <th className="px-6 py-4 text-left text-child-sm font-bold text-gray-700">
                        Attempts
                      </th>
                      <th className="px-6 py-4 text-left text-child-sm font-bold text-gray-700">
                        Last Active
                      </th>
                      <th className="px-6 py-4 text-left text-child-sm font-bold text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {students.map((student) => (
                      <tr
                        key={student.id}
                        className="hover:bg-secondary-50"
                      >
                        <td
                          className="px-6 py-4 text-child-sm text-gray-800 cursor-pointer"
                          onClick={() => router.push(`/teacher/student/${student.id}`)}
                        >
                          {student.name}
                        </td>
                        <td
                          className="px-6 py-4 text-child-sm text-gray-600 cursor-pointer"
                          onClick={() => router.push(`/teacher/student/${student.id}`)}
                        >
                          {student.attempts_count}
                        </td>
                        <td
                          className="px-6 py-4 text-child-sm text-gray-600 cursor-pointer"
                          onClick={() => router.push(`/teacher/student/${student.id}`)}
                        >
                          {student.last_active
                            ? new Date(student.last_active).toLocaleDateString()
                            : 'Never'}
                        </td>
                        <td className="px-6 py-4">
                          <Button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteStudent(student.id, student.name)
                            }}
                            variant="optional"
                            size="sm"
                            className="bg-red-100 text-red-700 hover:bg-red-200 border-red-300"
                            disabled={deleting === student.id}
                          >
                            {deleting === student.id ? '⏳' : '🗑️'}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Delete Class Confirmation Modal */}
      {showDeleteClassConfirm && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowDeleteClassConfirm(false)}
          />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-child shadow-2xl z-50 p-8 max-w-md w-full mx-4">
            <div className="text-center space-y-4">
              <div className="text-6xl">⚠️</div>
              <h3 className="text-child-lg font-display font-bold text-gray-800">
                Delete Class?
              </h3>
              <p className="text-child-sm text-gray-600">
                Are you sure you want to delete <strong>{classData?.name}</strong>?
              </p>
              <p className="text-child-sm text-red-600 font-medium">
                This will permanently delete:
              </p>
              <ul className="text-child-xs text-gray-700 text-left space-y-1">
                <li>• All {students.length} students in this class</li>
                <li>• All lesson attempts and responses</li>
                <li>• All lesson unlocks</li>
              </ul>
              <p className="text-child-xs text-red-700 font-bold">
                This action cannot be undone!
              </p>
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => setShowDeleteClassConfirm(false)}
                  variant="optional"
                  size="md"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleDeleteClass}
                  variant="secondary"
                  size="md"
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white border-red-700"
                >
                  Delete Class
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
