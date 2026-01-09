import type { LessonContent } from './types'

const DB_NAME = 'pal_vocab_cache'
const DB_VERSION = 2  // Bumped to invalidate old cache with 'blocks' structure
const STORE_NAME = 'lessons'

export class LessonCache {
  private db: IDBDatabase | null = null

  async init(): Promise<void> {
    if (typeof window === 'undefined') return

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

        let content = result.content

        // Migrate legacy 'blocks' to 'levels' structure
        if (content && !content.levels && (content as any).blocks) {
          content = {
            ...content,
            levels: (content as any).blocks
          }
          delete (content as any).blocks
        }

        resolve(content)
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
