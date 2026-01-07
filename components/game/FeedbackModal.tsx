'use client'

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'

interface FeedbackModalProps {
  isCorrect: boolean
  show: boolean
  onClose: () => void
  explanation?: string
}

export default function FeedbackModal({
  isCorrect,
  show,
  onClose,
  explanation,
}: FeedbackModalProps) {
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (show) {
      // Longer timeout if there's an explanation to read
      const timeout = explanation && !isCorrect ? 3500 : 1500
      const timer = setTimeout(onClose, timeout)
      return () => clearTimeout(timer)
    }
  }, [show, onClose, explanation, isCorrect])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{
              type: shouldReduceMotion ? 'tween' : 'spring',
              duration: shouldReduceMotion ? 0.15 : 0.3,
            }}
            className={`bg-white rounded-child shadow-2xl p-8 text-center max-w-lg ${
              isCorrect ? 'border-8 border-secondary-400' : 'border-8 border-primary-400'
            }`}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: shouldReduceMotion ? 1 : [0, 1.2, 1] }}
              transition={{ duration: shouldReduceMotion ? 0.1 : 0.3 }}
              className="text-9xl mb-4"
            >
              {isCorrect ? '🎉' : '🤔'}
            </motion.div>
            <h2
              className={`text-child-xl font-display font-bold mb-4 ${
                isCorrect ? 'text-secondary-600' : 'text-primary-600'
              }`}
            >
              {isCorrect ? 'Great job!' : 'Keep trying!'}
            </h2>

            {/* Show explanation for incorrect answers */}
            {!isCorrect && explanation && (
              <div className="mt-4 p-4 bg-primary-50 rounded-child border-2 border-primary-200 text-left">
                <p className="text-child-sm font-medium text-gray-800 leading-relaxed">
                  💡 {explanation}
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
