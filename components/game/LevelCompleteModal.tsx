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
  onContinue: () => void
  onFinish: () => void
}

export default function LevelCompleteModal({
  show,
  stoppedEarly,
  onContinue,
  onFinish,
}: LevelCompleteModalProps) {
  useEffect(() => {
    if (show) {
      if (!stoppedEarly) {
        // Play completion sound only if level completed successfully
        playSoundEffect(SoundEffect.BLOCK_COMPLETE)
      }

      // Play TTS for completion message
      const completionText = stoppedEarly
        ? 'You finished this level. You can try again later.'
        : 'You finished this level. Ready for the next level?'

      generateSpeech({ text: completionText })
        .then(audioUrl => playAudio(audioUrl))
        .catch(error => console.error('Failed to play completion audio:', error))
    }
  }, [show, stoppedEarly])

  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="bg-white rounded-child shadow-2xl p-8 max-w-md w-full text-center space-y-6"
      >
        <div className="space-y-2">
          <h2 className="text-child-lg font-body font-medium text-gray-800">
            {stoppedEarly ? 'You finished this block.' : 'You finished this block.'}
          </h2>
          <p className="text-base text-gray-600">
            {stoppedEarly
              ? 'You can try again later.'
              : 'Ready for the next block?'}
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
              Continue
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
