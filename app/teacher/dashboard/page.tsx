'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { TeacherSessionManager } from '@/lib/teacherSession'

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
        grade: 3,
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
    <div className="min-h-screen p-6 bg-gradient-to-b from-secondary-50 to-white">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-child shadow-lg p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-child-lg font-display font-bold text-secondary-600">
                Welcome, {teacher?.name}! 👩‍🏫
              </h1>
              <p className="text-child-sm text-gray-600">Teacher Dashboard</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-child text-child-sm font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Classes */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-child-lg font-display font-semibold text-gray-800">
              Your Classes
            </h2>
            <button
              onClick={() => setShowCreateClass(!showCreateClass)}
              className="px-6 py-3 bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white font-bold text-child-sm rounded-child shadow-md hover:shadow-lg transition-all"
            >
              + New Class
            </button>
          </div>

          {showCreateClass && (
            <form onSubmit={handleCreateClass} className="bg-white rounded-child shadow-lg p-6 mb-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-child-sm font-medium text-gray-700 mb-2">
                    Class Name
                  </label>
                  <input
                    type="text"
                    value={newClassName}
                    onChange={(e) => setNewClassName(e.target.value)}
                    placeholder="e.g., Class 3-A"
                    className="w-full px-4 py-3 text-child-sm border-2 border-gray-300 rounded-child focus:border-secondary-500 focus:outline-none"
                    required
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-secondary-600 hover:bg-secondary-700 text-white font-bold rounded-child transition-colors"
                  >
                    Create
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateClass(false)}
                    className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-child transition-colors"
                  >
                    Cancel
                  </button>
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
                    <button className="w-full px-4 py-2 bg-secondary-50 hover:bg-secondary-100 text-secondary-700 font-medium text-child-sm rounded-child transition-colors">
                      Manage Class →
                    </button>
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
