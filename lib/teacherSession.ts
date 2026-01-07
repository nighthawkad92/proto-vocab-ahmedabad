// Teacher session management (localStorage-based, no authentication)

export interface TeacherSession {
  teacherId: string
  teacherName: string
}

const SESSION_KEY = 'pal_teacher_session'

export class TeacherSessionManager {
  public static save(session: TeacherSession): void {
    if (typeof window === 'undefined') return
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  }

  public static get(): TeacherSession | null {
    if (typeof window === 'undefined') return null
    const stored = localStorage.getItem(SESSION_KEY)
    if (!stored) return null
    try {
      return JSON.parse(stored)
    } catch {
      return null
    }
  }

  public static clear(): void {
    if (typeof window === 'undefined') return
    localStorage.removeItem(SESSION_KEY)
  }
}
