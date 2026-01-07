'use client'

import { motion } from 'framer-motion'

interface BlockCompleteModalProps {
  show: boolean
  stoppedEarly: boolean
  onContinue: () => void
  onFinish: () => void
}

export default function BlockCompleteModal({
  show,
  stoppedEarly,
  onContinue,
  onFinish,
}: BlockCompleteModalProps) {
  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-child shadow-2xl p-8 max-w-md w-full text-center space-y-6"
      >
        <div className="text-8xl">{stoppedEarly ? '🛑' : '🎊'}</div>

        <div className="space-y-2">
          <h2 className="text-child-xl font-display font-bold text-gray-800">
            {stoppedEarly ? 'Nice Try!' : 'Great Work!'}
          </h2>
          <p className="text-child-base text-gray-600">
            {stoppedEarly
              ? 'You can practice more later!'
              : 'Ready for the next part?'}
          </p>
        </div>

        <div className="space-y-3">
          {!stoppedEarly && (
            <button
              onClick={onContinue}
              className="w-full bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white font-bold text-child-base py-5 px-8 rounded-child shadow-lg hover:shadow-xl active:scale-95 transition-all"
            >
              Continue →
            </button>
          )}

          <button
            onClick={onFinish}
            className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold text-child-base py-5 px-8 rounded-child shadow-lg hover:shadow-xl active:scale-95 transition-all"
          >
            {stoppedEarly ? 'Back to Lessons' : 'Finish'}
          </button>
        </div>
      </motion.div>
    </div>
  )
}
