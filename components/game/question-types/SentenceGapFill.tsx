'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Question } from '@/lib/types'
import { playSoundEffect, SoundEffect } from '@/lib/soundEffects'

interface SentenceGapFillProps {
  question: Question
  onAnswer: (answer: string) => void
  disabled?: boolean
}

/**
 * Sentence Gap Fill Component
 * Used in: Lesson 2 (Vocabulary in Context)
 *
 * Functionality:
 * - Display sentence with visible gap (blank or underscore)
 * - 3-4 button options below
 * - Selected word fills gap with preview
 * - Context-based feedback
 *
 * Question Structure:
 * {
 *   type: "sentence-gap-fill",
 *   prompt: "Choose the word that makes the most sense",
 *   baseSentence: "I feel ___ after playing outside.",
 *   gapPosition: 2,  // Word index where gap appears
 *   options: ["hungry", "tired", "happy", "confused"],
 *   correctAnswer: "tired",
 *   explanation: "After playing, people usually feel tired..."
 * }
 */
export default function SentenceGapFill({
  question,
  onAnswer,
  disabled = false,
}: SentenceGapFillProps) {
  // Validate question has required fields
  if (!question.baseSentence) {
    console.error('SentenceGapFill: Missing baseSentence')
    return (
      <div className="text-center text-red-600 p-4">
        Error: Invalid question format
      </div>
    )
  }

  const [selectedWord, setSelectedWord] = useState<string | null>(null)
  const [hasSubmitted, setHasSubmitted] = useState(false)

  // Reset selection when question changes
  useEffect(() => {
    setSelectedWord(null)
    setHasSubmitted(false)
  }, [question.id])

  // Handle word selection
  const handleSelectWord = (word: string) => {
    if (disabled || hasSubmitted) return

    playSoundEffect(SoundEffect.TAP)
    setSelectedWord(word)
  }

  // Handle submit
  const handleSubmit = () => {
    if (disabled || hasSubmitted || !selectedWord) return

    setHasSubmitted(true)
    playSoundEffect(SoundEffect.TAP)
    onAnswer(selectedWord)
  }

  // Get preview sentence with selected word
  const getPreviewSentence = () => {
    if (!selectedWord) {
      return question.baseSentence
    }

    // Replace underscore or gap marker with selected word
    const sentence = question.baseSentence
      .replace('___', selectedWord)
      .replace('__', selectedWord)
      .replace('_', selectedWord)

    return sentence
  }

  // Split sentence into parts for rendering with highlighted gap
  const renderSentenceWithGap = () => {
    const sentence = question.baseSentence
    const gapMarkers = ['___', '__', '_']

    // Find which gap marker is used
    let gapMarker = '_'
    for (const marker of gapMarkers) {
      if (sentence.includes(marker)) {
        gapMarker = marker
        break
      }
    }

    const parts = sentence.split(gapMarker)

    return (
      <div className="flex flex-wrap items-center justify-center gap-2 text-xl text-gray-800">
        {parts.map((part, index) => (
          <span key={index}>
            {part}
            {index < parts.length - 1 && (
              <span className="inline-flex items-center">
                <motion.span
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`
                    inline-block px-4 py-2 mx-1 rounded-child font-medium
                    ${
                      selectedWord
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-200 text-gray-500 border-2 border-dashed border-gray-400'
                    }
                    min-w-[80px] text-center
                  `}
                >
                  {selectedWord || '____'}
                </motion.span>
              </span>
            )}
          </span>
        ))}
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Question Prompt */}
      {question.prompt && (
        <div className="text-center mb-4">
          <h2 className="text-2xl font-medium text-gray-800">
            {question.prompt}
          </h2>
        </div>
      )}

      {/* Sentence with Gap */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-50 rounded-child p-6 shadow-inner"
      >
        {renderSentenceWithGap()}
      </motion.div>

      {/* Word Options */}
      <div className="text-center">
        <p className="text-base text-gray-600">
          {selectedWord ? 'Selected word is shown above' : 'Tap a word to fill the gap'}
        </p>
      </div>

      {/* Word Options */}
      <div className="grid grid-cols-1 gap-3">
        {question.options.map((option, index) => {
          const isSelected = selectedWord === option

          return (
            <motion.button
              key={index}
              onClick={() => handleSelectWord(option)}
              disabled={disabled || hasSubmitted}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className={`
                w-full py-5 px-6 rounded-child shadow-md
                font-medium text-[28px]
                border-2 transition-all
                ${
                  isSelected
                    ? 'bg-primary-500 text-white border-primary-600 shadow-lg scale-105'
                    : 'bg-white text-gray-800 border-gray-300 hover:border-accent-400 hover:shadow-lg'
                }
                ${disabled || hasSubmitted ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:scale-95'}
                min-h-[4rem]
              `}
            >
              {option}
            </motion.button>
          )
        })}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={disabled || hasSubmitted || !selectedWord}
        className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium text-base py-6 px-8 rounded-child shadow-lg active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[3rem]"
      >
        {hasSubmitted ? 'Submitted' : selectedWord ? 'Check Answer' : 'Select a word first'}
      </button>
    </div>
  )
}
