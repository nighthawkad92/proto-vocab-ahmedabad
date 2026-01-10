import type { LessonContent } from './types'

const DB_NAME = 'pal_vocab_cache'
const DB_VERSION = 4  // Bumped to invalidate old cache with blocks terminology (Jan 11, 2026 update)
const STORE_NAME = 'lessons'

export class LessonCache {
  private db: IDBDatabase | null = null

  async init(): Promise<void> {
    if (typeof window === 'undefined') return

    // One-time cleanup: delete entire database if we haven't cleared v4 yet
    await this.clearOldDatabaseIfNeeded()

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { keyPath: 'lessonId' })
          store.createIndex('cachedAt', 'cachedAt', { unique: false })
        }
      }
    })
  }

  private async clearOldDatabaseIfNeeded(): Promise<void> {
    try {
      // Check if we've already done this cleanup
      const clearFlag = localStorage.getItem('lesson_cache_cleared_v4')
      if (clearFlag === 'done') return

      // Delete the entire old database
      await new Promise<void>((resolve) => {
        const request = indexedDB.deleteDatabase(DB_NAME)
        request.onsuccess = () => {
          console.log('🗑️ Cleared old lesson cache (blocks→levels migration)')
          localStorage.setItem('lesson_cache_cleared_v4', 'done')
          resolve()
        }
        request.onerror = () => {
          console.warn('Could not delete old cache, will continue anyway')
          resolve()
        }
        request.onblocked = () => {
          console.warn('Cache deletion blocked, will try next time')
          resolve()
        }
      })
    } catch (error) {
      console.error('Error clearing old cache:', error)
      // Don't block the app
    }
  }

  async cacheLessonContent(
    lessonId: string,
    content: LessonContent
  ): Promise<void> {
    if (!this.db) await this.init()
    if (!this.db) throw new Error('Failed to initialize database')

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite')
      const store = transaction.objectStore(STORE_NAME)

      const data = {
        lessonId,
        content,
        cachedAt: new Date().toISOString(),
      }

      const request = store.put(data)
      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }

  async getCachedLesson(lessonId: string): Promise<LessonContent | null> {
    if (!this.db) await this.init()
    if (!this.db) return null

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readonly')
      const store = transaction.objectStore(STORE_NAME)
      const request = store.get(lessonId)

      request.onsuccess = () => {
        const result = request.result
        if (!result) {
          resolve(null)
          return
        }

        // Validate: reject old cached data with "blocks" instead of "levels"
        const content = result.content
        if (content && (content as any).blocks && !(content as any).levels) {
          console.warn('Cached lesson has old "blocks" structure, forcing refresh')
          resolve(null)
          return
        }

        resolve(result.content)
      }
      request.onerror = () => reject(request.error)
    })
  }

  async preloadAllLessons(
    lessons: Array<{ id: string; title: string }>
  ): Promise<void> {
    for (const lesson of lessons) {
      try {
        // Check if already cached
        const cached = await this.getCachedLesson(lesson.id)
        if (cached) continue

        // Fetch and cache
        const response = await fetch(`/api/student/lesson/${lesson.id}`)
        if (!response.ok) continue

        const data = await response.json()
        await this.cacheLessonContent(lesson.id, data.lesson.content)
      } catch (error) {
        console.error(`Failed to preload lesson ${lesson.id}:`, error)
      }
    }
  }

  async getCacheStatus(): Promise<{
    cachedLessons: string[]
    totalSize: number
  }> {
    if (!this.db) await this.init()
    if (!this.db) return { cachedLessons: [], totalSize: 0 }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readonly')
      const store = transaction.objectStore(STORE_NAME)
      const request = store.getAllKeys()

      request.onsuccess = () => {
        const keys = request.result as string[]
        resolve({
          cachedLessons: keys,
          totalSize: keys.length,
        })
      }
      request.onerror = () => reject(request.error)
    })
  }

  async clearCache(): Promise<void> {
    if (!this.db) await this.init()
    if (!this.db) throw new Error('Failed to initialize database')

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite')
      const store = transaction.objectStore(STORE_NAME)
      const request = store.clear()

      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }

  async isCached(lessonId: string): Promise<boolean> {
    const content = await this.getCachedLesson(lessonId)
    return content !== null
  }
}

// Singleton instance
let instance: LessonCache | null = null

export function getLessonCache(): LessonCache {
  if (!instance) {
    instance = new LessonCache()
  }
  return instance
}
