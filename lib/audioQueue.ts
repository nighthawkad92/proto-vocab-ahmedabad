/**
 * Audio Queue Manager
 *
 * Prevents audio overlaps by queuing audio playback with priority levels.
 * Higher priority audio plays first (sound effects > TTS > question audio).
 *
 * Usage:
 * - Sound effects: priority 100
 * - TTS feedback: priority 50
 * - Question audio: priority 25
 */

interface AudioTask {
  url: string
  priority: number
  resolve: () => void
}

class AudioQueueManager {
  private queue: AudioTask[] = []
  private isPlaying = false
  private currentAudio: HTMLAudioElement | null = null

  /**
   * Add audio to queue and play when ready
   * @param url Audio file URL or data URL
   * @param priority Higher priority plays first (default 0)
   * @returns Promise that resolves when audio finishes playing
   */
  async playAudio(url: string, priority: number = 0): Promise<void> {
    return new Promise((resolve) => {
      this.queue.push({ url, priority, resolve })
      // Sort by priority descending (higher priority first)
      this.queue.sort((a, b) => b.priority - a.priority)
      this.processQueue()
    })
  }

  /**
   * Process the next audio in queue
   */
  private async processQueue() {
    if (this.isPlaying || this.queue.length === 0) {
      return
    }

    this.isPlaying = true
    const task = this.queue.shift()!

    this.currentAudio = new Audio(task.url)

    // Set up event listeners
    this.currentAudio.onended = () => {
      this.isPlaying = false
      task.resolve()
      this.processQueue() // Process next in queue
    }

    this.currentAudio.onerror = (error) => {
      console.error('Audio playback error:', error)
      this.isPlaying = false
      task.resolve() // Resolve even on error to continue queue
      this.processQueue()
    }

    try {
      await this.currentAudio.play()
    } catch (error) {
      console.error('Failed to play audio:', error)
      this.isPlaying = false
      task.resolve()
      this.processQueue()
    }
  }

  /**
   * Stop all audio and clear queue
   * Call this when user exits lesson or changes question
   */
  stopAll() {
    this.queue = []
    if (this.currentAudio) {
      this.currentAudio.pause()
      this.currentAudio.currentTime = 0
      this.currentAudio = null
    }
    this.isPlaying = false
  }

  /**
   * Check if audio is currently playing
   */
  get playing(): boolean {
    return this.isPlaying
  }

  /**
   * Get queue length
   */
  get queueLength(): number {
    return this.queue.length
  }
}

// Export singleton instance
export const audioQueue = new AudioQueueManager()
