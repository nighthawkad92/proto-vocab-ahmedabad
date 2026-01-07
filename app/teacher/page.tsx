'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function TeacherLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [teacherName, setTeacherName] = useState('')

  useEffect(() => {
    // Check if already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.push('/teacher/dashboard')
      }
    })
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      if (data.session) {
        router.push('/teacher/dashboard')
      }
    } catch (err: any) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Sign up with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) throw error

      if (data.user) {
        // Create teacher record
        const { error: teacherError } = await supabase.from('teachers').insert({
          id: data.user.id,
          email,
          name: teacherName,
        })

        if (teacherError) throw teacherError

        alert('Account created! Please log in.')
        setIsSignUp(false)
      }
    } catch (err: any) {
      setError(err.message || 'Sign up failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center space-y-4">
          <div className="text-7xl">👩‍🏫</div>
          <h1 className="text-child-xl font-display font-bold text-secondary-600">
            Teacher Portal
          </h1>
          <p className="text-child-base text-gray-700">
            {isSignUp ? 'Create your account' : 'Sign in to manage your classes'}
          </p>
        </div>

        <form onSubmit={isSignUp ? handleSignUp : handleLogin} className="space-y-6">
          <div className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-child-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={teacherName}
                  onChange={(e) => setTeacherName(e.target.value)}
                  placeholder="Ms. Sharma"
                  className="w-full px-4 py-3 text-child-sm border-2 border-gray-300 rounded-child focus:border-secondary-500 focus:outline-none focus:ring-2 focus:ring-secondary-200"
                  required={isSignUp}
                />
              </div>
            )}

            <div>
              <label className="block text-child-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="teacher@school.com"
                className="w-full px-4 py-3 text-child-sm border-2 border-gray-300 rounded-child focus:border-secondary-500 focus:outline-none focus:ring-2 focus:ring-secondary-200"
                required
              />
            </div>

            <div>
              <label className="block text-child-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 text-child-sm border-2 border-gray-300 rounded-child focus:border-secondary-500 focus:outline-none focus:ring-2 focus:ring-secondary-200"
                required
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-child p-4">
              <p className="text-child-sm text-red-700">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white font-bold text-child-base py-4 px-8 rounded-child shadow-lg hover:shadow-xl active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? 'Please wait...' : isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div className="text-center space-y-2">
          <button
            onClick={() => {
              setIsSignUp(!isSignUp)
              setError('')
            }}
            className="text-child-sm text-secondary-600 hover:text-secondary-700 underline"
          >
            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </button>

          <div>
            <a href="/" className="text-child-sm text-gray-500 hover:text-gray-700 underline">
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
