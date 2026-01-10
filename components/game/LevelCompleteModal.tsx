'use client'

import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { playSoundEffect, SoundEffect } from '@/lib/soundEffects'
import { generateSpeech } from '@/lib/googleTTS'
import { playAudio } from '@/lib/audioCache'
import { Button } from '@/components/ui/Button'

interface LevelCompleteModalProps {
  show: boolean
  stoppedEarly: boolean
  currentLevel: number
  nextLevel?: number
  currentLevelName?: string
  nextLevelName?: string
  levelScore?: number
  maxLevelScore?: number
  onContinue: () => void
  onFinish: () => void
}

export default function LevelCompleteModal({
  show,
  stoppedEarly,
  currentLevel,
  nextLevel,
  currentLevelName,
  nextLevelName,
  levelScore,
  maxLevelScore,
  onContinue,
  onFinish,
}: LevelCompleteModalProps) {
  // Generate dynamic title text
  const titleText = currentLevelName
    ? `You finished level ${currentLevel}: ${currentLevelName}`
    : `You finished level ${currentLevel}`

  // Generate dynamic description text
  const descriptionText = stoppedEarly
    ? 'You can try again later.'
    : nextLevel
      ? nextLevelName
        ? `Ready to try level ${nextLevel}: ${nextLevelName}`
        : `Ready to try level ${nextLevel}`
      : "You've completed the lesson!"

  useEffect(() => {
    if (show) {
      if (!stoppedEarly) {
        // Play completion sound only if level completed successfully
        playSoundEffect(SoundEffect.LEVEL_COMPLETE)
      }

      // Play TTS for completion message
      const completionText = `${titleText}. ${descriptionText}`

      generateSpeech({ text: completionText })
        .then(audioUrl => playAudio(audioUrl))
        .catch(error => console.error('Failed to play completion audio:', error))
    }
  }, [show, stoppedEarly, titleText, descriptionText])

  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="bg-white rounded-child shadow-2xl p-8 max-w-md w-full text-center space-y-6"
      >
        {/* Rocket Image */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex justify-center"
        >
          <img
            src="/assets/visuals/image-rocket.png"
            alt="Rocket celebrating completion"
            className="w-32 h-32 object-contain"
          />
        </motion.div>

        <div className="space-y-2">
          <h2 className="text-child-lg font-body font-medium text-gray-800">
            {titleText}
          </h2>

          {/* Score Display */}
          {levelScore !== undefined && maxLevelScore !== undefined && (
            <div className="mt-3 mb-2">
              <p className="text-child-base text-neutral-700">
                Score: <span className="font-bold text-neutral-800">{levelScore}/{maxLevelScore}</span>
              </p>
            </div>
          )}

          <p className="text-base text-gray-600">
            {descriptionText}
          </p>
        </div>

        <div className="space-y-3">
          {!stoppedEarly && (
            <Button
              onClick={() => {
                playSoundEffect(SoundEffect.TAP)
                onContinue()
              }}
              variant="primary"
              size="lg"
              className="w-full"
            >
              I'm ready
            </Button>
          )}

          <Button
            onClick={() => {
              playSoundEffect(SoundEffect.TAP)
              onFinish()
            }}
            variant="optional"
            size="lg"
            className="w-full"
          >
            {stoppedEarly ? 'Back to Lessons' : 'Finish'}
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
