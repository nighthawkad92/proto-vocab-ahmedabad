'use client'

import { motion } from 'framer-motion'
import type { Question, FeedbackState } from '@/lib/types'
import { playSoundEffect, SoundEffect } from '@/lib/soundEffects'

// Import question type components
import SentenceRearrange from './question-types/SentenceRearrange'
import StorySequence from './question-types/StorySequence'
import SentenceGapFill from './question-types/SentenceGapFill'
import ReadingComprehension from './question-types/ReadingComprehension'
import AddWordActivity from './question-types/AddWordActivity'

interface QuestionCardProps {
  question: Question
  onAnswer: (answer: string) => void
  disabled?: boolean
  feedbackState?: FeedbackState
}

/**
 * QuestionCard - Main router for all question types
 *
 * Routes to appropriate component based on question.type:
 * - multiple-choice, listen-and-select, word-match,
 *   sentence-completion, picture-word-match → Default MCQ UI
 * - sentence-rearrange → SentenceRearrange component
 * - story-sequence → StorySequence component
 * - sentence-gap-fill → SentenceGapFill component
 * - reading-comprehension → ReadingComprehension component
 * - add-word → AddWordActivity component
 */
export default function QuestionCard({
  question,
  onAnswer,
  disabled = false,
  feedbackState,
}: QuestionCardProps) {

  // Route to specialized components for new question types
  switch (question.type) {
    case 'sentence-rearrange':
      return <SentenceRearrange question={question} onAnswer={onAnswer} disabled={disabled} feedbackState={feedbackState} />

    case 'story-sequence':
      return <StorySequence question={question} onAnswer={onAnswer} disabled={disabled} feedbackState={feedbackState} />

    case 'sentence-gap-fill':
      return <SentenceGapFill question={question} onAnswer={onAnswer} disabled={disabled} feedbackState={feedbackState} />

    case 'reading-comprehension':
      return <ReadingComprehension question={question} onAnswer={onAnswer} disabled={disabled} feedbackState={feedbackState} />

    case 'add-word':
      return <AddWordActivity question={question} onAnswer={onAnswer} disabled={disabled} feedbackState={feedbackState} />

    // Default MCQ-style UI for existing question types
    case 'multiple-choice':
    case 'listen-and-select':
    case 'word-match':
    case 'sentence-completion':
    case 'picture-word-match':
    default:
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
                  className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium text-[30px] py-6 px-6 rounded-child shadow-md active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[4rem] text-left"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )
  }
}
