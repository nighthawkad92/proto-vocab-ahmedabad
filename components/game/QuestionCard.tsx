'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import type { Question } from '@/lib/types'
import { playSoundEffect, SoundEffect } from '@/lib/soundEffects'

interface QuestionCardProps {
  question: Question
  onAnswer: (answer: string) => void
  disabled?: boolean
  onPlayOptionAudio?: (text: string) => void // New: play audio for individual options
}

export default function QuestionCard({
  question,
  onAnswer,
  disabled = false,
  onPlayOptionAudio,
}: QuestionCardProps) {
  const [playingOption, setPlayingOption] = useState<string | null>(null)

  const handlePlayAudio = (option: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (onPlayOptionAudio) {
      setPlayingOption(option)
      onPlayOptionAudio(option)
      setTimeout(() => setPlayingOption(null), 1000)
    }
  }

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

        {/* Options - vertical stack, solid colors, speaker icons */}
        <div className="flex flex-col gap-4 mt-8">
          {question.options.map((option, index) => (
            <div key={index} className="relative">
              <button
                onClick={() => {
                  if (!disabled) {
                    playSoundEffect(SoundEffect.TAP)
                    onAnswer(option)
                  }
                }}
                disabled={disabled}
                className="w-full bg-accent-500 hover:bg-accent-600 text-white font-medium text-[30px] py-6 px-6 pr-16 rounded-child shadow-md active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[4rem] text-left"
              >
                {option}
              </button>

              {/* Speaker icon for tap-to-hear audio */}
              {onPlayOptionAudio && (
                <button
                  onClick={(e) => handlePlayAudio(option, e)}
                  disabled={disabled}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-white/20 rounded-full transition-colors active:scale-95"
                  aria-label={`Hear pronunciation of ${option}`}
                >
                  <svg
                    className={`w-8 h-8 text-white ${playingOption === option ? 'animate-pulse' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                    />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
