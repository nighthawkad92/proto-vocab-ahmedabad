'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

interface PointAnimationProps {
  show: boolean
  onComplete: () => void
}

export function PointAnimation({ show, onComplete }: PointAnimationProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onComplete, 500) // 500ms animation
      return () => clearTimeout(timer)
    }
  }, [show, onComplete])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 0, opacity: 1, scale: 1 }}
          animate={{ y: -60, opacity: 0, scale: 1.2 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
        >
          <div className="text-primary-600 text-child-3xl font-display font-bold drop-shadow-lg">
            +1
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
