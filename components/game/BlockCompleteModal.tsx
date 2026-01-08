'use client'

import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { playSoundEffect, SoundEffect } from '@/lib/soundEffects'

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
  useEffect(() => {
    if (show && !stoppedEarly) {
      // Play completion sound only if block completed successfully
      playSoundEffect(SoundEffect.BLOCK_COMPLETE)
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
            <button
              onClick={() => {
                playSoundEffect(SoundEffect.TAP)
                onContinue()
              }}
              className="w-full bg-accent-500 hover:bg-accent-600 text-white font-medium text-base py-5 px-8 rounded-child shadow-lg active:scale-95 transition-all min-h-[3rem]"
            >
              Continue
            </button>
          )}

          <button
            onClick={() => {
              playSoundEffect(SoundEffect.TAP)
              onFinish()
            }}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-medium text-base py-5 px-8 rounded-child shadow-lg active:scale-95 transition-all min-h-[3rem]"
          >
            {stoppedEarly ? 'Back to Lessons' : 'Finish'}
          </button>
        </div>
      </motion.div>
    </div>
  )
}
