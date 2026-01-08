'use client'

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'
import { playSoundEffect, SoundEffect } from '@/lib/soundEffects'
import { generateSpeech } from '@/lib/googleTTS'
import { playAudio } from '@/lib/audioCache'

interface FeedbackModalProps {
  isCorrect: boolean
  show: boolean
  onClose: () => void
}

export default function FeedbackModal({
  isCorrect,
  show,
  onClose,
}: FeedbackModalProps) {
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (show) {
      // Play appropriate sound effect
      playSoundEffect(isCorrect ? SoundEffect.CORRECT : SoundEffect.INCORRECT)

      // Play TTS for feedback message
      const feedbackText = isCorrect ? 'You answered correctly.' : 'Keep practicing.'
      generateSpeech({ text: feedbackText })
        .then(audioUrl => playAudio(audioUrl))
        .catch(error => console.error('Failed to play feedback audio:', error))

      // Fixed timeout for all feedback
      const timeout = 1500
      const timer = setTimeout(onClose, timeout)
      return () => clearTimeout(timer)
    }
  }, [show, onClose, isCorrect])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="bg-white rounded-child shadow-2xl p-8 text-center max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Icon: checkmark for correct, neutral for retry */}
            <div className="mb-4">
              {isCorrect ? (
                <svg
                  className="w-20 h-20 mx-auto text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  className="w-20 h-20 mx-auto text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              )}
            </div>

            {/* Feedback text - simple and direct */}
            <h2 className="text-child-lg font-body font-medium mb-4 text-gray-800">
              {isCorrect ? 'You answered correctly.' : 'Keep practicing.'}
            </h2>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
