// Sound effects manager for UI feedback
// Uses provided sound effects from assets folder
import { audioQueue } from './audioQueue'

export enum SoundEffect {
  CORRECT = 'correct',
  INCORRECT = 'incorrect',
  TAP = 'tap',
  LEVEL_COMPLETE = 'level_complete',
}

class SoundEffectsManager {
  private static instance: SoundEffectsManager
  private sounds: Map<SoundEffect, HTMLAudioElement> = new Map()
  private enabled: boolean = true

  // Sound effect file paths (in public folder)
  private soundPaths: Record<SoundEffect, string> = {
    [SoundEffect.CORRECT]: '/sounds/correct.wav',
    [SoundEffect.INCORRECT]: '/sounds/incorrect.wav',
    [SoundEffect.TAP]: '/sounds/tap.wav',
    [SoundEffect.LEVEL_COMPLETE]: '/sounds/level-complete.wav',
  }

  private constructor() {
    this.preloadSounds()
  }

  public static getInstance(): SoundEffectsManager {
    if (!SoundEffectsManager.instance) {
      SoundEffectsManager.instance = new SoundEffectsManager()
    }
    return SoundEffectsManager.instance
  }

  private preloadSounds(): void {
    // Only preload in browser environment
    if (typeof window === 'undefined') return

    Object.entries(this.soundPaths).forEach(([effect, path]) => {
      const audio = new Audio(path)
      audio.preload = 'auto'
      audio.volume = 0.6 // Moderate volume for children
      this.sounds.set(effect as SoundEffect, audio)
    })
  }

  public async play(effect: SoundEffect): Promise<void> {
    if (!this.enabled) return

    const audio = this.sounds.get(effect)
    if (!audio) {
      console.warn(`Sound effect not found: ${effect}`)
      return
    }

    try {
      // Use audio queue for sequential playback (high priority)
      await audioQueue.playAudio(audio.src, 100)
    } catch (error) {
      console.warn('Error playing sound effect:', effect, error)
    }
  }

  public setEnabled(enabled: boolean): void {
    this.enabled = enabled
  }

  public isEnabled(): boolean {
    return this.enabled
  }
}

// Export singleton instance methods
export async function playSoundEffect(effect: SoundEffect): Promise<void> {
  return SoundEffectsManager.getInstance().play(effect)
}

export function setSoundEffectsEnabled(enabled: boolean): void {
  SoundEffectsManager.getInstance().setEnabled(enabled)
}

export function areSoundEffectsEnabled(): boolean {
  return SoundEffectsManager.getInstance().isEnabled()
}
