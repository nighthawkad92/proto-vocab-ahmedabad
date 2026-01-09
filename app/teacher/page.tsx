'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { TeacherSessionManager } from '@/lib/teacherSession'
import { LoginBackground } from '@/components/ui/LoginBackground'

export default function TeacherLoginPage() {
  const router = useRouter()
  const [teacherName, setTeacherName] = useState('Varnika')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/teacher/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teacherName }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Login failed')
      }

      // Save session
      TeacherSessionManager.save({
        teacherId: data.teacherId,
        teacherName: data.teacherName,
      })

      router.push('/teacher/dashboard')
    } catch (err: any) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-secondary-50 relative">
      <LoginBackground />
      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center space-y-4">
          <div className="text-7xl">👩‍🏫</div>
          <h1 className="text-child-xl font-display font-bold text-secondary-600">
            Teacher Portal
          </h1>
          <p className="text-child-base text-gray-700">
            Enter your name to continue
          </p>
        </div>

        <form onSubmit={handleLogin} className="bg-white rounded-child shadow-lg p-8 space-y-6">
          <div>
            <label className="block text-child-sm font-medium text-gray-700 mb-2">
              Your Name
            </label>
            <input
              type="text"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              placeholder="Varnika"
              className="w-full px-4 py-4 text-child-base border-2 border-gray-300 rounded-child focus:border-secondary-500 focus:outline-none focus:ring-2 focus:ring-secondary-200"
              required
              autoFocus
            />
          </div>

          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-child p-4">
              <p className="text-child-sm text-red-700">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-secondary-500 hover:bg-secondary-600 text-white font-bold text-child-base py-4 px-8 rounded-child shadow-lg hover:shadow-xl active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? 'Please wait...' : 'Continue'}
          </button>
        </form>

        <div className="text-center">
          <a href="/student" className="text-child-sm text-gray-500 hover:text-gray-700 underline">
            Student Login
          </a>
        </div>
      </div>
    </div>
  )
}
