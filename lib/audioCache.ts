// Audio cache manager for offline playback
import { audioQueue } from './audioQueue'

export class AudioCache {
  private static instance: AudioCache
  private cache: Map<string, HTMLAudioElement> = new Map()
  private preloading: Set<string> = new Set()

  private constructor() {}

  public static getInstance(): AudioCache {
    if (!AudioCache.instance) {
      AudioCache.instance = new AudioCache()
    }
    return AudioCache.instance
  }

  public async preload(urls: string[]): Promise<void> {
    const promises = urls.map((url) => this.preloadSingle(url))
    await Promise.allSettled(promises)
  }

  private async preloadSingle(url: string): Promise<void> {
    if (this.cache.has(url) || this.preloading.has(url)) {
      return // Already cached or being preloaded
    }

    this.preloading.add(url)

    return new Promise((resolve, reject) => {
      const audio = new Audio()

      audio.addEventListener('canplaythrough', () => {
        this.cache.set(url, audio)
        this.preloading.delete(url)
        resolve()
      })

      audio.addEventListener('error', (error) => {
        this.preloading.delete(url)
        console.error('Failed to preload audio:', url, error)
        reject(error)
      })

      audio.preload = 'auto'
      audio.src = url
    })
  }

  public async play(url: string): Promise<void> {
    // Use audio queue for sequential playback (low priority)
    return audioQueue.playAudio(url, 25)
  }

  public pause(url: string) {
    const audio = this.cache.get(url)
    if (audio) {
      audio.pause()
    }
  }

  public stop(url: string) {
    const audio = this.cache.get(url)
    if (audio) {
      audio.pause()
      audio.currentTime = 0
    }
  }

  public clear() {
    this.cache.forEach((audio) => {
      audio.pause()
      audio.src = ''
    })
    this.cache.clear()
  }

  public isCached(url: string): boolean {
    return this.cache.has(url)
  }

  public getCacheSize(): number {
    return this.cache.size
  }
}

// Preload audio for a lesson
export async function preloadLessonAudio(audioUrls: string[]): Promise<void> {
  const cache = AudioCache.getInstance()
  await cache.preload(audioUrls)
}

// Play audio with fallback
export async function playAudio(url: string): Promise<void> {
  const cache = AudioCache.getInstance()
  await cache.play(url)
}
