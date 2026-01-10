'use client'

import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { playSoundEffect, SoundEffect } from '@/lib/soundEffects'
import { Button } from '@/components/ui/Button'
import type { Badge } from '@/lib/types'

interface BadgeUnlockedModalProps {
  badge: Badge | null
  show: boolean
  onClose: () => void
}

export function BadgeUnlockedModal({
  badge,
  show,
  onClose,
}: BadgeUnlockedModalProps) {
  useEffect(() => {
    if (show && badge) {
      playSoundEffect(SoundEffect.LEVEL_COMPLETE)
    }
  }, [show, badge])

  if (!show || !badge) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="bg-gradient-to-b from-secondary-50 to-white rounded-child shadow-2xl p-8 max-w-md w-full text-center"
      >
        {/* Badge Earned Header */}
        <p className="text-child-lg text-secondary-600 font-display font-bold mb-4">
          🎉 Badge Earned!
        </p>

        {/* Badge Illustration */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="flex justify-center mb-6"
        >
          <img
            src={badge.imageUrl}
            alt={badge.name}
            className="w-32 h-32 object-contain drop-shadow-lg"
            onError={(e) => {
              // Fallback to emoji if image fails
              const target = e.currentTarget
              target.style.display = 'none'
              const parent = target.parentElement
              if (parent) {
                parent.innerHTML = `
                  <div class="text-8xl">${badge.icon}</div>
                `
              }
            }}
          />
        </motion.div>

        {/* Badge Name */}
        <h2 className="text-child-2xl font-display font-bold text-gray-900 mb-3">
          {badge.name}
        </h2>

        {/* Badge Description */}
        <p className="text-child-base text-neutral-700 mb-6">
          {badge.description}
        </p>

        {/* Close Button */}
        <Button
          onClick={onClose}
          size="lg"
          variant="primary"
          className="w-full"
        >
          Awesome!
        </Button>
      </motion.div>
    </div>
  )
}
