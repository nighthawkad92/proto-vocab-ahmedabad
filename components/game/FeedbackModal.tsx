'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

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
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 1500)
      return () => clearTimeout(timer)
    }
  }, [show, onClose])

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
            transition={{ type: 'spring', duration: 0.5 }}
            className={`bg-white rounded-child shadow-2xl p-12 text-center max-w-md ${
              isCorrect ? 'border-8 border-secondary-400' : 'border-8 border-primary-400'
            }`}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.6 }}
              className="text-9xl mb-4"
            >
              {isCorrect ? '🎉' : '🤔'}
            </motion.div>
            <h2
              className={`text-child-xl font-display font-bold ${
                isCorrect ? 'text-secondary-600' : 'text-primary-600'
              }`}
            >
              {isCorrect ? 'Great job!' : 'Keep trying!'}
            </h2>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
