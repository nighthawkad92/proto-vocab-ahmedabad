'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Question, FeedbackState } from '@/lib/types'
import { playSoundEffect, SoundEffect } from '@/lib/soundEffects'
import { Button } from '@/components/ui/Button'

interface ReadingComprehensionProps {
  question: Question
  onAnswer: (answer: string) => void
  disabled?: boolean
  feedbackState?: FeedbackState
}

/**
 * Reading Comprehension Component
 * Used in: Lesson 3 (Reading Short Paragraphs), Lesson 5 (Reading → Writing Connection)
 *
 * Functionality:
 * - Passage display at top (scrollable if long)
 * - "Read again" button
 * - Question below with clear formatting
 * - 3-4 MCQ options
 * - Different styling for passage vs question
 *
 * Question Structure:
 * {
 *   type: "reading-comprehension",
 *   prompt: "Read the story and answer: Who is in the story?",
 *   passage: "Ravi went to the park. He played with his ball.",
 *   questionType: "who",
 *   options: ["Ravi", "The teacher", "The farmer", "A dog"],
 *   correctAnswer: "Ravi",
 *   explanation: "The story says 'Ravi went to the park'."
 * }
 */
export default function ReadingComprehension({
  question,
  onAnswer,
  disabled = false,
  feedbackState,
}: ReadingComprehensionProps) {
  // Validate question has required fields
  if (!question.passage) {
    console.error('ReadingComprehension: Missing passage')
    return (
      <div className="text-center text-red-600 p-4">
        Error: Invalid question format
      </div>
    )
  }

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [hasSubmitted, setHasSubmitted] = useState(false)

  // Reset selection when question changes
  useEffect(() => {
    setSelectedAnswer(null)
    setHasSubmitted(false)
  }, [question.id])

  // Handle answer selection
  const handleSelectAnswer = (answer: string) => {
    if (disabled || hasSubmitted) return

    playSoundEffect(SoundEffect.TAP)
    setSelectedAnswer(answer)
  }

  // Handle submit
  const handleSubmit = () => {
    if (disabled || hasSubmitted || !selectedAnswer) return

    setHasSubmitted(true)
    playSoundEffect(SoundEffect.TAP)
    onAnswer(selectedAnswer)
  }

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Question Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <p className="text-lg font-medium text-gray-800">
          {question.prompt}
        </p>
      </motion.div>

      {/* Story Passage */}
      <div className="bg-gray-50 rounded-child p-6 max-h-64 overflow-y-auto shadow-inner">
        <p className="text-child-lg text-gray-800 leading-relaxed whitespace-pre-wrap">
          {question.passage}
        </p>
      </div>

      {/* Answer Options */}
      <motion.div
        className="grid grid-cols-1 gap-3"
        animate={
          feedbackState?.type === 'incorrect'
            ? { x: [-10, 10, -10, 10, 0] }
            : {}
        }
        transition={{ duration: 0.5 }}
      >
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === option

          return (
            <motion.button
              key={index}
              onClick={() => handleSelectAnswer(option)}
              disabled={disabled || hasSubmitted}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 + 0.3 }}
              className={`
                w-full py-5 px-6 rounded-child shadow-md
                font-medium text-[26px]
                border-2 transition-all text-left
                ${
                  isSelected
                    ? 'bg-secondary-600 text-white border-secondary-700 shadow-lg scale-105'
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
      </motion.div>

      {/* Correct Answer Highlight */}
      {feedbackState?.type === 'incorrect' && feedbackState.correctAnswer && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-100 border-2 border-green-500 rounded-child p-4"
        >
          <p className="text-center text-sm font-semibold text-green-700 mb-2">
            Correct Answer:
          </p>
          <p className="text-center text-2xl font-medium text-green-800">
            {feedbackState.correctAnswer}
          </p>
        </motion.div>
      )}

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        disabled={disabled || hasSubmitted || !selectedAnswer}
        variant="primary"
        size="lg"
        className="w-full"
      >
        {hasSubmitted ? 'Submitted' : selectedAnswer ? 'Check Answer' : 'Select an answer first'}
      </Button>
    </div>
  )
}
