import type { AttemptState } from './types'

const QUEUE_KEY = 'pal_offline_queue'
const ATTEMPT_STATE_KEY = 'pal_attempt_state'

export interface QueuedItem {
  id: string
  type: 'attempt' | 'response'
  data: any
  timestamp: string
}

// Offline queue for syncing data when online
export class OfflineQueue {
  private static instance: OfflineQueue
  private queue: QueuedItem[] = []
  private syncing: boolean = false

  private constructor() {
    this.loadQueue()
  }

  public static getInstance(): OfflineQueue {
    if (!OfflineQueue.instance) {
      OfflineQueue.instance = new OfflineQueue()
    }
    return OfflineQueue.instance
  }

  private loadQueue() {
    if (typeof window === 'undefined') return

    try {
      const stored = localStorage.getItem(QUEUE_KEY)
      if (stored) {
        this.queue = JSON.parse(stored)
      }
    } catch (error) {
      console.error('Failed to load offline queue:', error)
      this.queue = []
    }
  }

  private saveQueue() {
    if (typeof window === 'undefined') return

    try {
      localStorage.setItem(QUEUE_KEY, JSON.stringify(this.queue))
    } catch (error) {
      console.error('Failed to save offline queue:', error)
    }
  }

  public add(item: Omit<QueuedItem, 'id' | 'timestamp'>) {
    const queuedItem: QueuedItem = {
      ...item,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
    }
    this.queue.push(queuedItem)
    this.saveQueue()
  }

  public getQueue(): QueuedItem[] {
    return [...this.queue]
  }

  public remove(id: string) {
    this.queue = this.queue.filter((item) => item.id !== id)
    this.saveQueue()
  }

  public clear() {
    this.queue = []
    this.saveQueue()
  }

  public async sync(syncFn: (item: QueuedItem) => Promise<void>) {
    if (this.syncing || this.queue.length === 0) return

    this.syncing = true

    const itemsToSync = [...this.queue]
    const successfulIds: string[] = []

    for (const item of itemsToSync) {
      try {
        await syncFn(item)
        successfulIds.push(item.id)
      } catch (error) {
        console.error('Failed to sync item:', item, error)
        // Continue with other items
      }
    }

    // Remove successfully synced items
    successfulIds.forEach((id) => this.remove(id))

    this.syncing = false
  }

  public isSyncing(): boolean {
    return this.syncing
  }
}

// Attempt state management for offline mode
export class AttemptStateManager {
  private static readonly KEY_PREFIX = ATTEMPT_STATE_KEY

  public static save(attemptId: string, state: AttemptState) {
    if (typeof window === 'undefined') return

    try {
      const key = `${this.KEY_PREFIX}_${attemptId}`
      localStorage.setItem(key, JSON.stringify(state))
    } catch (error) {
      console.error('Failed to save attempt state:', error)
    }
  }

  public static load(attemptId: string): AttemptState | null {
    if (typeof window === 'undefined') return null

    try {
      const key = `${this.KEY_PREFIX}_${attemptId}`
      const stored = localStorage.getItem(key)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch (error) {
      console.error('Failed to load attempt state:', error)
    }
    return null
  }

  public static remove(attemptId: string) {
    if (typeof window === 'undefined') return

    try {
      const key = `${this.KEY_PREFIX}_${attemptId}`
      localStorage.removeItem(key)
    } catch (error) {
      console.error('Failed to remove attempt state:', error)
    }
  }

  public static clear() {
    if (typeof window === 'undefined') return

    try {
      const keys = Object.keys(localStorage)
      keys.forEach((key) => {
        if (key.startsWith(this.KEY_PREFIX)) {
          localStorage.removeItem(key)
        }
      })
    } catch (error) {
      console.error('Failed to clear attempt states:', error)
    }
  }
}
