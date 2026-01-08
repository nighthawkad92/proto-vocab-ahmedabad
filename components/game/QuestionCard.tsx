'use client'

import { motion } from 'framer-motion'
import type { Question } from '@/lib/types'
import { playSoundEffect, SoundEffect } from '@/lib/soundEffects'

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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-white rounded-child shadow-xl p-8 space-y-8">
        {/* Question Prompt - increased font size per spec */}
        <div className="text-center space-y-4">
          <h2 className="text-[32px] font-body font-medium text-gray-800 leading-tight">
            {question.prompt}
          </h2>

          {question.imageUrl && (
            <div className="flex justify-center mt-6">
              <img
                src={question.imageUrl}
                alt="Question image"
                className="max-w-xs rounded-child shadow-md"
              />
            </div>
          )}
        </div>

        {/* Options - vertical stack, solid colors, no speaker icons */}
        <div className="flex flex-col gap-4 mt-8">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => {
                if (!disabled) {
                  playSoundEffect(SoundEffect.TAP)
                  onAnswer(option)
                }
              }}
              disabled={disabled}
              className="w-full bg-accent-500 hover:bg-accent-600 text-white font-medium text-[30px] py-6 px-6 rounded-child shadow-md active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[4rem] text-left"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
