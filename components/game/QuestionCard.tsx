'use client'

import { motion } from 'framer-motion'
import type { Question } from '@/lib/types'

interface QuestionCardProps {
  question: Question
  onAnswer: (answer: string) => void
  disabled?: boolean
}

export default function QuestionCard({
  question,
  onAnswer,
  disabled = false,
}: QuestionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-white rounded-child shadow-xl p-8 space-y-8">
        {/* Question Prompt */}
        <div className="text-center space-y-4">
          <h2 className="text-child-lg font-display font-semibold text-gray-800">
            {question.prompt}
          </h2>

          {question.imageUrl && (
            <div className="flex justify-center">
              <img
                src={question.imageUrl}
                alt="Question image"
                className="max-w-xs rounded-child shadow-md"
              />
            </div>
          )}
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !disabled && onAnswer(option)}
              disabled={disabled}
              className="bg-gradient-to-br from-accent-100 to-accent-200 hover:from-accent-200 hover:to-accent-300 border-4 border-accent-400 text-gray-800 font-bold text-child-base py-6 px-6 rounded-child shadow-md hover:shadow-lg active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed tap-feedback"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
