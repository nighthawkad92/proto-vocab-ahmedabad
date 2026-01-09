'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { StudentSessionManager } from '@/lib/studentSession'
import ConnectionStatus from '@/components/layout/ConnectionStatus'
import { Header } from '@/components/navigation/Header'
import { BottomNav } from '@/components/navigation/BottomNav'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { Loader } from '@/components/ui/Loader'
import {
  BookOpenIcon,
  ChartBarIcon,
  TrophyIcon,
  UserCircleIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline'
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

  const navItems = [
    {
      id: 'lessons',
      label: 'Lessons',
      icon: <BookOpenIcon className="w-6 h-6" />,
      href: '/student/dashboard',
      color: 'secondary',
    },
    {
      id: 'progress',
      label: 'Progress',
      icon: <ChartBarIcon className="w-6 h-6" />,
      href: '/student/progress',
      color: 'primary',
    },
    {
      id: 'badges',
      label: 'Badges',
      icon: <TrophyIcon className="w-6 h-6" />,
      href: '/student/badges',
      color: 'achievement',
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: <UserCircleIcon className="w-6 h-6" />,
      href: '/student/profile',
      color: 'accent',
    },
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader message="Loading your lessons" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Connection Status */}
      <div className="fixed top-20 right-4 z-30">
        <ConnectionStatus />
      </div>

      <Header
        variant="simple"
        onMenu={handleLogout}
      />

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Greeting Card */}
        <div className="bg-white rounded-child shadow-child p-6">
          <h1 className="text-child-xl font-semibold text-gray-800">
            Hello, {session?.studentName}
          </h1>
          <p className="text-child-base text-gray-600">
            Class: {session?.classCode}
          </p>
        </div>

        {/* Lessons */}
        <div>
          <h2 className="text-child-lg font-display font-semibold text-gray-800 mb-4">
            Your Lessons
          </h2>

          {lessons.length === 0 ? (
            <div className="bg-white rounded-child shadow-child">
              <EmptyState
                icon="📖"
                title="No Lessons Yet"
                description="Your teacher will assign lessons soon. Check back later."
              />
            </div>
          ) : (
            <div className="grid gap-4">
              {lessons.map((lesson) => {
                const isUnlocked = unlocks[lesson.id]

                return (
                  <div
                    key={lesson.id}
                    className={`bg-white rounded-child shadow-child p-6 transition-all ${
                      isUnlocked
                        ? 'border-2 border-accent-400'
                        : 'opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-child-base font-medium text-gray-800">
                            {lesson.title}
                          </h3>
                          {!isUnlocked && (
                            <span className="text-child-sm text-gray-500">
                              (Locked)
                            </span>
                          )}
                        </div>
                        <p className="text-child-sm text-gray-600">
                          {lesson.description}
                        </p>
                        {!isUnlocked && (
                          <p className="text-child-xs text-gray-500 mt-2">
                            Ask your teacher to unlock this lesson
                          </p>
                        )}
                      </div>

                      {isUnlocked && (
                        <Button
                          onClick={() => handleStartLesson(lesson.id)}
                          size="md"
                        >
                          Start
                        </Button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      <BottomNav items={navItems} />
    </div>
  )
}
