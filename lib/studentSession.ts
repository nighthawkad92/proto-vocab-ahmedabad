import type { StudentSession } from './types'

const SESSION_KEY = 'pal_student_session'

export class StudentSessionManager {
  public static save(session: StudentSession) {
    if (typeof window === 'undefined') return

    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    } catch (error) {
      console.error('Failed to save student session:', error)
    }
  }

  public static load(): StudentSession | null {
    if (typeof window === 'undefined') return null

    try {
      const stored = localStorage.getItem(SESSION_KEY)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch (error) {
      console.error('Failed to load student session:', error)
    }
    return null
  }

  public static clear() {
    if (typeof window === 'undefined') return

    try {
      localStorage.removeItem(SESSION_KEY)
    } catch (error) {
      console.error('Failed to clear student session:', error)
    }
  }

  public static isLoggedIn(): boolean {
    return !!this.load()
  }
}
