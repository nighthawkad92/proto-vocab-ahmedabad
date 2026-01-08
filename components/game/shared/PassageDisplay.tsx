'use client'

import { motion } from 'framer-motion'
import { playSoundEffect, SoundEffect } from '@/lib/soundEffects'

interface PassageDisplayProps {
  passage: string
  onReadAgain?: () => void
  disabled?: boolean
  className?: string
}

/**
 * Reusable passage display component for reading comprehension
 * Used in: ReadingComprehension, StorySequence
 *
 * Features:
 * - Formatted story text with proper line spacing
 * - "Read again" button
 * - Scrollable for longer passages
 * - Child-friendly typography
 */
export default function PassageDisplay({
  passage,
  onReadAgain,
  disabled = false,
  className = '',
}: PassageDisplayProps) {
  const handleReadAgain = () => {
    if (disabled || !onReadAgain) return
    playSoundEffect(SoundEffect.TAP)
    onReadAgain()
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Passage container */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-gray-50 rounded-child p-6 max-h-64 overflow-y-auto shadow-inner"
      >
        <p className="text-lg text-gray-800 leading-relaxed whitespace-pre-wrap">
          {passage}
        </p>
      </motion.div>

      {/* Read again button */}
      {onReadAgain && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleReadAgain}
            disabled={disabled}
            className="flex items-center gap-2 px-4 py-2 bg-accent-500 text-white rounded-child font-medium text-sm hover:bg-accent-600 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[2.5rem]"
          >
            <svg
              className="w-5 h-5"
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
            <span>Read again</span>
          </button>
        </div>
      )}
    </div>
  )
}
