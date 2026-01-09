'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { TeacherSessionManager } from '@/lib/teacherSession'
import { LoginBackground } from '@/components/ui/LoginBackground'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

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
          <Input
            id="teacherName"
            type="text"
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
            label="Your Name"
            placeholder="Varnika"
            disabled={loading}
            required
            autoFocus
            error={error}
          />

          <Button
            type="submit"
            disabled={loading}
            loading={loading}
            size="lg"
            className="w-full"
            variant="secondary"
          >
            {loading ? 'Please wait...' : 'Continue'}
          </Button>
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
