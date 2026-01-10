'use client'

import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { playSoundEffect, SoundEffect } from '@/lib/soundEffects'
import { Button } from '@/components/ui/Button'

interface LessonCompleteModalProps {
  show: boolean
  totalScore: number
  maxScore: number
  accuracy: number
  onClose: () => void
}

export function LessonCompleteModal({
  show,
  totalScore,
  maxScore,
  accuracy,
  onClose,
}: LessonCompleteModalProps) {
  useEffect(() => {
    if (show) {
      playSoundEffect(SoundEffect.LEVEL_COMPLETE)
    }
  }, [show])

  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="bg-white rounded-child shadow-2xl p-8 max-w-md w-full text-center"
      >
        {/* Rocket Image */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex justify-center mb-6"
        >
          <img
            src="/assets/visuals/image-rocket.png"
            alt="Lesson Complete"
            className="w-32 h-32 object-contain"
          />
        </motion.div>

        {/* Title */}
        <h2 className="text-child-3xl font-display font-bold text-gray-900 mb-4">
          Lesson Complete!
        </h2>

        {/* Score Display */}
        <div className="bg-secondary-50 rounded-child p-6 mb-4">
          <p className="text-child-base text-neutral-700 mb-2">Total Score</p>
          <p className="text-child-4xl font-display font-bold text-secondary-600">
            {totalScore}/{maxScore}
          </p>
          <p className="text-child-sm text-neutral-600 mt-2">
            {Math.round(accuracy)}% Accuracy
          </p>
        </div>

        {/* Button */}
        <Button
          onClick={onClose}
          size="lg"
          variant="primary"
          className="w-full"
        >
          Back to Lessons
        </Button>
      </motion.div>
    </div>
  )
}
