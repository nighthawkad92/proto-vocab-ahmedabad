'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { TeacherSessionManager } from '@/lib/teacherSession'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface Class {
  id: string
  name: string
  class_code: string
  grade: number
  student_count?: number
}

export default function TeacherDashboard() {
  const router = useRouter()
  const [teacher, setTeacher] = useState<any>(null)
  const [classes, setClasses] = useState<Class[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateClass, setShowCreateClass] = useState(false)
  const [newClassName, setNewClassName] = useState('')

  useEffect(() => {
    checkSession()
  }, [])

  const checkSession = async () => {
    const session = TeacherSessionManager.get()

    if (!session) {
      router.push('/teacher')
      return
    }

    // Get teacher data
    const { data: teacherData } = await supabase
      .from('teachers')
      .select('*')
      .eq('id', session.teacherId)
      .single()

    setTeacher(teacherData)
    loadClasses(session.teacherId)
  }

  const loadClasses = async (teacherId: string) => {
    try {
      const { data, error } = await supabase
        .from('classes')
        .select(`
          *,
          students(count)
        `)
        .eq('teacher_id', teacherId)
        .order('created_at', { ascending: false })

      if (error) throw error

      const classesWithCount = data?.map((cls: any) => ({
        ...cls,
        student_count: cls.students?.[0]?.count || 0,
      }))

      setClasses(classesWithCount || [])
    } catch (error) {
      console.error('Failed to load classes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateClass = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const { data, error } = await supabase.rpc('generate_class_code')

      if (error) throw error

      const classCode = data

      // @ts-ignore - Supabase types are strict when env vars aren't set
      const { error: createError } = await supabase.from('classes').insert({
        teacher_id: teacher.id,
        name: newClassName,
        class_code: classCode,
        grade: 4,
      })

      if (createError) throw createError

      setNewClassName('')
      setShowCreateClass(false)
      loadClasses(teacher.id)
    } catch (error) {
      console.error('Failed to create class:', error)
      alert('Failed to create class')
    }
  }

  const handleLogout = () => {
    TeacherSessionManager.clear()
    router.push('/teacher')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-6xl animate-bounce-gentle">📋</div>
          <p className="text-child-base text-gray-700">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6 bg-secondary-50">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-child shadow-lg p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-child-lg font-display font-bold text-secondary-600">
                Welcome, {teacher?.name}
              </h1>
              <p className="text-child-sm text-gray-600">Teacher Dashboard</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="optional"
              size="md"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Classes */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-child-lg font-display font-semibold text-gray-800">
              Your Classes
            </h2>
            <Button
              onClick={() => setShowCreateClass(!showCreateClass)}
              variant="secondary"
              size="md"
            >
              + New Class
            </Button>
          </div>

          {showCreateClass && (
            <form onSubmit={handleCreateClass} className="bg-white rounded-child shadow-lg p-6 mb-4">
              <div className="space-y-4">
                <Input
                  type="text"
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  label="Class Name"
                  placeholder="e.g., Class 3-A"
                  required
                />
                <div className="flex gap-3">
                  <Button
                    type="submit"
                    variant="secondary"
                    size="md"
                  >
                    Create
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setShowCreateClass(false)}
                    variant="optional"
                    size="md"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </form>
          )}

          {classes.length === 0 ? (
            <div className="bg-white rounded-child shadow p-8 text-center">
              <div className="text-6xl mb-4">📚</div>
              <p className="text-child-base text-gray-600">
                No classes yet. Create your first class to get started!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {classes.map((cls) => (
                <div
                  key={cls.id}
                  className="bg-white rounded-child shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => router.push(`/teacher/class/${cls.id}`)}
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="text-child-base font-display font-semibold text-gray-800">
                        {cls.name}
                      </h3>
                      <span className="px-4 py-2 bg-secondary-100 text-secondary-700 font-bold text-child-sm rounded-child">
                        {cls.class_code}
                      </span>
                    </div>
                    <p className="text-child-sm text-gray-600">
                      {cls.student_count} student{cls.student_count !== 1 ? 's' : ''}
                    </p>
                    <Button
                      variant="optional"
                      size="sm"
                      className="w-full"
                    >
                      Manage Class →
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
