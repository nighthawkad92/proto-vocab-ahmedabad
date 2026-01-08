'use client'

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { playSoundEffect, SoundEffect } from '@/lib/soundEffects'
import { generateSpeech } from '@/lib/googleTTS'
import { playAudio } from '@/lib/audioCache'

interface FeedbackModalProps {
  isCorrect: boolean
  show: boolean
  onClose: () => void
  explanation?: string
  onReplayAudio?: () => void // New: replay audio for incorrect answers
}

export default function FeedbackModal({
  isCorrect,
  show,
  onClose,
  explanation,
  onReplayAudio,
}: FeedbackModalProps) {
  const shouldReduceMotion = useReducedMotion()
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)

  useEffect(() => {
    if (show) {
      // Play appropriate sound effect
      playSoundEffect(isCorrect ? SoundEffect.CORRECT : SoundEffect.INCORRECT)

      // Play TTS for feedback message
      const feedbackText = isCorrect ? 'You answered correctly.' : 'Try listening again.'
      generateSpeech({ text: feedbackText })
        .then(audioUrl => playAudio(audioUrl))
        .catch(error => console.error('Failed to play feedback audio:', error))

      // Longer timeout if there's an explanation to read
      const timeout = explanation && !isCorrect ? 3500 : 1500
      const timer = setTimeout(onClose, timeout)
      return () => clearTimeout(timer)
    }
  }, [show, onClose, explanation, isCorrect])

  const handleReplayAudio = () => {
    if (onReplayAudio) {
      setIsPlayingAudio(true)
      onReplayAudio()
      // Reset playing state after animation
      setTimeout(() => setIsPlayingAudio(false), 1000)
    }
  }

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

            {/* Feedback text - neutral, specific, max 12 words */}
            <h2 className="text-child-lg font-body font-medium mb-4 text-gray-800">
              {isCorrect ? 'You answered correctly.' : 'Try listening again.'}
            </h2>

            {/* Show explanation for incorrect answers */}
            {!isCorrect && explanation && (
              <div className="mt-4 p-4 bg-gray-50 rounded-child text-left">
                <p className="text-base font-medium text-gray-700 leading-relaxed">
                  {explanation}
                </p>
              </div>
            )}

            {/* Replay audio button for incorrect answers */}
            {!isCorrect && onReplayAudio && (
              <button
                onClick={handleReplayAudio}
                className="mt-6 flex items-center justify-center gap-2 mx-auto px-6 py-3 bg-accent-500 text-white rounded-child font-medium text-base active:scale-95 transition-transform min-h-[3rem]"
                aria-label="Replay question audio"
              >
                <svg
                  className={`w-6 h-6 ${isPlayingAudio ? 'animate-pulse' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                  />
                </svg>
                <span>Replay audio</span>
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
