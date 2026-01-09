'use client'

import { motion } from 'framer-motion'
import { playSoundEffect, SoundEffect } from '@/lib/soundEffects'

interface WordBankProps {
  words: string[]
  onSelect: (word: string) => void
  selectedWords?: string[]
  disabled?: boolean
  multiSelect?: boolean
  className?: string
}

/**
 * Reusable word bank component for question types
 * Used in: AddWordActivity, potentially other future types
 *
 * Features:
 * - Tap to select words
 * - Visual feedback for selected state
 * - Multi-select support
 * - Touch-optimized buttons (≥48px)
 * - Accessible
 */
export default function WordBank({
  words,
  onSelect,
  selectedWords = [],
  disabled = false,
  multiSelect = false,
  className = '',
}: WordBankProps) {
  const handleWordClick = (word: string) => {
    if (disabled) return

    playSoundEffect(SoundEffect.TAP)
    onSelect(word)
  }

  const isSelected = (word: string) => selectedWords.includes(word)

  return (
    <div className={`w-full ${className}`}>
      <div className="text-center text-sm font-medium text-gray-600 mb-4">
        {multiSelect ? 'Tap words to select' : 'Tap a word to select'}
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        {words.map((word, index) => {
          const selected = isSelected(word)

          return (
            <motion.button
              key={`${word}-${index}`}
              onClick={() => handleWordClick(word)}
              disabled={disabled}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className={`
                min-h-[3rem] min-w-[5rem]
                px-6 py-3
                rounded-child shadow-md
                font-medium text-base
                border-2
                ${
                  selected
                    ? 'bg-primary-500 text-white border-primary-600 shadow-lg'
                    : 'bg-white text-gray-800 border-gray-300 hover:border-accent-400'
                }
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:scale-95'}
                transition-all duration-200
                touch-none select-none
              `}
            >
              {word}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
