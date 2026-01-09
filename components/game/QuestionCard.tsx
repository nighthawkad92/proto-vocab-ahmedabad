'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import type { Question, FeedbackState } from '@/lib/types'
import { playSoundEffect, SoundEffect } from '@/lib/soundEffects'
import { Button } from '@/components/ui/Button'

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
  // State for default MCQ types
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [hasSubmitted, setHasSubmitted] = useState(false)

  // Reset state when question changes
  useEffect(() => {
    setSelectedAnswer(null)
    setHasSubmitted(false)
  }, [question.id])

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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="w-full max-w-2xl mx-auto space-y-6"
        >
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

          {/* Options - vertical stack with shake animation */}
          <motion.div
            className="flex flex-col gap-4"
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
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className={`
                    w-full font-medium text-[28px] py-6 px-6 rounded-child shadow-md
                    transition-all min-h-[4rem] text-left border-2
                    ${
                      isSelected
                        ? 'bg-primary-500 text-white border-primary-600 shadow-lg scale-105'
                        : 'bg-white text-gray-800 border-gray-300 hover:border-accent-400 hover:shadow-lg'
                    }
                    ${disabled || hasSubmitted ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:scale-95'}
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
        </motion.div>
      )
  }
}
