'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { StudentSessionManager } from '@/lib/studentSession'
import ConnectionStatus from '@/components/layout/ConnectionStatus'
import { Header } from '@/components/navigation/Header'
import { EmptyState } from '@/components/ui/EmptyState'
import { Loader } from '@/components/ui/Loader'
import { LessonGrid } from '@/components/ui/LessonGrid'
import type { StudentSession } from '@/lib/types'

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
      // Add timestamp to prevent any caching
      const timestamp = Date.now()
      const response = await fetch(`/api/student/lessons?classId=${classId}&t=${timestamp}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        }
      })
      const data = await response.json()

      if (response.ok) {
        console.log('📥 [STUDENT DASHBOARD] API Response received:', {
          lessonsCount: data.lessons?.length || 0
        })

        setLessons(data.lessons)
      } else {
        console.error('Failed to load lessons:', data)
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

      <div className="min-h-[calc(100vh-4rem)] py-8">
        {lessons.length === 0 ? (
          <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
            <div className="bg-white rounded-child shadow-child max-w-md mx-6">
              <EmptyState
                icon="📖"
                title="No Lessons Yet"
                description="Your teacher will assign lessons soon. Check back later."
              />
            </div>
          </div>
        ) : (
          <LessonGrid
            lessons={lessons}
            onStartLesson={handleStartLesson}
          />
        )}
      </div>
    </div>
  )
}
