'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { StudentSessionManager } from '@/lib/studentSession'
import ConnectionStatus from '@/components/layout/ConnectionStatus'
import type { StudentSession, LessonUnlock } from '@/lib/types'

interface Lesson {
  id: string
  title: string
  description: string
  order: number
}

export default function StudentDashboard() {
  const router = useRouter()
  const [session, setSession] = useState<StudentSession | null>(null)
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [unlocks, setUnlocks] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentSession = StudentSessionManager.load()
    if (!currentSession) {
      router.push('/student')
      return
    }

    setSession(currentSession)
    loadLessons(currentSession.classId)
  }, [router])

  const loadLessons = async (classId: string) => {
    try {
      const response = await fetch(`/api/student/lessons?classId=${classId}`)
      const data = await response.json()

      if (response.ok) {
        setLessons(data.lessons)

        // Create unlock map
        const unlockMap: Record<string, boolean> = {}
        data.unlocks.forEach((unlock: { lesson_id: string }) => {
          unlockMap[unlock.lesson_id] = true
        })
        setUnlocks(unlockMap)
      }
    } catch (error) {
      console.error('Failed to load lessons:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    StudentSessionManager.clear()
    router.push('/student')
  }

  const handleStartLesson = (lessonId: string) => {
    router.push(`/student/lesson/${lessonId}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-6xl animate-bounce-gentle">📚</div>
          <p className="text-child-base text-gray-700">Loading your lessons...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6">
      {/* Connection Status */}
      <div className="fixed top-4 right-4 z-30">
        <ConnectionStatus />
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-child shadow-lg p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-child-lg font-body font-medium text-gray-800">
                Hello, {session?.studentName}.
              </h1>
              <p className="text-base text-gray-600">
                Class: {session?.classCode}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-child text-base font-medium transition-colors active:scale-95 min-h-[3rem]"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Lessons */}
        <div>
          <h2 className="text-child-lg font-display font-semibold text-gray-800 mb-4">
            Your Lessons
          </h2>

          {lessons.length === 0 ? (
            <div className="bg-white rounded-child shadow p-8 text-center">
              <div className="text-6xl mb-4">📖</div>
              <p className="text-child-base text-gray-600">
                No lessons yet. Ask your teacher to unlock lessons for you!
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {lessons.map((lesson) => {
                const isUnlocked = unlocks[lesson.id]

                return (
                  <div
                    key={lesson.id}
                    className={`bg-white rounded-child shadow-lg p-6 transition-all ${
                      isUnlocked
                        ? 'border-2 border-accent-400'
                        : 'opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-base font-medium text-gray-800">
                            {lesson.title}
                          </h3>
                          {!isUnlocked && (
                            <span className="text-sm text-gray-500">
                              (Locked)
                            </span>
                          )}
                        </div>
                        <p className="text-base text-gray-600">
                          {lesson.description}
                        </p>
                      </div>

                      {isUnlocked && (
                        <button
                          className="px-6 py-3 bg-accent-500 hover:bg-accent-600 text-white font-medium text-base rounded-child shadow-md active:scale-95 transition-all min-h-[3rem]"
                          onClick={() => handleStartLesson(lesson.id)}
                        >
                          Start
                        </button>
                      )}
                    </div>

                    {!isUnlocked && (
                      <div className="ml-12 mt-2">
                        <p className="text-child-xs text-gray-500">
                          Ask your teacher to unlock this lesson
                        </p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
