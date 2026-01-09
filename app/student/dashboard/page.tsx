'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { StudentSessionManager } from '@/lib/studentSession'
import ConnectionStatus from '@/components/layout/ConnectionStatus'
import { Header } from '@/components/navigation/Header'
import { EmptyState } from '@/components/ui/EmptyState'
import { Loader } from '@/components/ui/Loader'
import { LessonCarousel } from '@/components/ui/LessonCarousel'
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
      <div className="min-h-screen flex items-center justify-center bg-secondary-50">
        <Loader message="Loading your lessons" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Connection Status */}
      <div className="fixed top-20 right-4 z-30 hidden">
        <ConnectionStatus />
      </div>

      <Header
        variant="simple"
        greeting={`Hello, ${session?.studentName}`}
        showLogoutButton={true}
        onLogout={handleLogout}
      />

      <div className="max-w-7xl mx-auto px-6 py-6">
        {lessons.length === 0 ? (
          <div className="bg-white rounded-child shadow-child">
            <EmptyState
              icon="📖"
              title="No Lessons Yet"
              description="Your teacher will assign lessons soon. Check back later."
            />
          </div>
        ) : (
          <LessonCarousel
            lessons={lessons}
            unlocks={unlocks}
            onStartLesson={handleStartLesson}
          />
        )}
      </div>
    </div>
  )
}
