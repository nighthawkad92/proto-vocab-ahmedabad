'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { StudentSessionManager } from '@/lib/studentSession'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { LoginBackground } from '@/components/ui/LoginBackground'
import { VocabPalLogo } from '@/components/ui/VocabPalLogo'

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
    <div className="min-h-screen bg-secondary-50 flex items-center justify-center p-4 relative">
      <LoginBackground />
      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center">
          <VocabPalLogo className="mb-6" />
          <p className="text-child-base text-gray-700">
            Enter your class code to start learning
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <Input
              id="classCode"
              type="text"
              value={classCode}
              onChange={(e) => setClassCode(e.target.value.toUpperCase())}
              label="Class Code"
              placeholder="ABC123"
              maxLength={6}
              disabled={loading}
              required
              error={error && classCode.trim() === '' ? 'Class code is required' : ''}
            />

            <Input
              id="studentName"
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              label="Your Name"
              placeholder="Raj"
              disabled={loading}
              required
              error={error && studentName.trim() === '' ? 'Name is required' : ''}
            />
          </div>

          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-child p-4">
              <p className="text-child-sm text-red-700 text-center">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            loading={loading}
            size="lg"
            className="w-full"
            variant="primary"
          >
            {loading ? 'Starting' : "Let's Learn"}
          </Button>
        </form>

        <div className="text-center">
          <a href="/teacher" className="text-child-sm text-gray-500 hover:text-gray-700 underline">
            Teacher Login
          </a>
        </div>
      </div>
    </div>
  )
}
