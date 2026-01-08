'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { StudentSessionManager } from '@/lib/studentSession'

export default function StudentLoginPage() {
  const router = useRouter()
  const [classCode, setClassCode] = useState('')
  const [studentName, setStudentName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // Check if already logged in
    if (StudentSessionManager.isLoggedIn()) {
      router.push('/student/dashboard')
    }
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!classCode.trim() || !studentName.trim()) {
      setError('Please enter both class code and your name')
      return
    }

    setLoading(true)

    try {
      // Validate class code and get/create student
      const response = await fetch('/api/student/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          classCode: classCode.toUpperCase().trim(),
          studentName: studentName.trim(),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Login failed. Please check your class code.')
        setLoading(false)
        return
      }

      // Save session
      StudentSessionManager.save({
        studentId: data.studentId,
        studentName: data.studentName,
        classId: data.classId,
        classCode: data.classCode,
      })

      // Redirect to dashboard
      router.push('/student/dashboard')
    } catch (err) {
      console.error('Login error:', err)
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center space-y-4">
          <div className="text-7xl">👨‍🎓</div>
          <h1 className="text-child-xl font-display font-bold text-primary-600">
            Welcome Student
          </h1>
          <p className="text-child-base text-gray-700">
            Enter your class code to start learning
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="classCode"
                className="block text-child-sm font-medium text-gray-700 mb-2"
              >
                Class Code
              </label>
              <input
                id="classCode"
                type="text"
                value={classCode}
                onChange={(e) => setClassCode(e.target.value.toUpperCase())}
                placeholder="ABC123"
                maxLength={6}
                className="w-full px-6 py-4 text-child-base text-center uppercase font-bold border-2 border-primary-300 rounded-child focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-200 transition-all"
                disabled={loading}
                required
              />
            </div>

            <div>
              <label
                htmlFor="studentName"
                className="block text-child-sm font-medium text-gray-700 mb-2"
              >
                Your Name
              </label>
              <input
                id="studentName"
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Raj"
                className="w-full px-6 py-4 text-child-base border-2 border-secondary-300 rounded-child focus:border-secondary-500 focus:outline-none focus:ring-4 focus:ring-secondary-200 transition-all"
                disabled={loading}
                required
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-child p-4">
              <p className="text-child-sm text-red-700 text-center">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold text-child-base py-6 px-8 rounded-child shadow-lg hover:shadow-xl active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Starting...' : "Let's Learn"}
          </button>
        </form>

        <div className="text-center">
          <a
            href="/"
            className="text-child-sm text-gray-500 hover:text-gray-700 underline"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}
