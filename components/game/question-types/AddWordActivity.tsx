'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import WordBank from '../shared/WordBank'
import { Question } from '@/lib/types'
import { playSoundEffect, SoundEffect } from '@/lib/soundEffects'

interface AddWordActivityProps {
  question: Question
  onAnswer: (answer: string) => void
  disabled?: boolean
}

/**
 * Add Word Activity Component
 * Used in: Lesson 4 (Sentence Expansion)
 *
 * Functionality:
 * - Display base sentence with insertion point
 * - Word bank below (adjectives/adverbs)
 * - Tap word to insert
 * - Live preview of expanded sentence
 * - Support multiple correct answers
 * - Visual highlighting of insertion point
 *
 * Question Structure:
 * {
 *   type: "add-word",
 *   prompt: "Add a describing word to make the sentence better",
 *   baseSentence: "The dog runs",
 *   wordType: "adjective",
 *   insertPosition: 1,  // Between "The" and "dog"
 *   options: ["big", "small", "fast", "brown"],
 *   correctAnswers: ["big", "small", "brown"],  // Multiple valid
 *   correctAnswer: "big",
 *   explanation: "Describing words tell us more about the dog."
 * }
 */
export default function AddWordActivity({
  question,
  onAnswer,
  disabled = false,
}: AddWordActivityProps) {
  // Validate question has required fields
  if (!question.baseSentence || question.insertPosition === undefined) {
    console.error('AddWordActivity: Missing baseSentence or insertPosition')
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

  // Handle word selection from word bank
  const handleSelectWord = (word: string) => {
    if (disabled || hasSubmitted) return

    // Toggle selection (tap same word to deselect)
    if (selectedWord === word) {
      setSelectedWord(null)
    } else {
      setSelectedWord(word)
    }
  }

  // Handle submit
  const handleSubmit = () => {
    if (disabled || hasSubmitted || !selectedWord) return

    setHasSubmitted(true)
    playSoundEffect(SoundEffect.TAP)
    onAnswer(selectedWord)
  }

  // Get expanded sentence with selected word inserted
  const getExpandedSentence = () => {
    if (!selectedWord) {
      return null
    }

    const words = question.baseSentence.split(' ')
    const insertPos = question.insertPosition!

    // Insert word at specified position
    const expandedWords = [
      ...words.slice(0, insertPos),
      selectedWord,
      ...words.slice(insertPos),
    ]

    return expandedWords.join(' ')
  }

  // Render base sentence with highlighted insertion point
  const renderBaseWithInsertionPoint = () => {
    const words = question.baseSentence.split(' ')
    const insertPos = question.insertPosition!

    return (
      <div className="flex flex-wrap items-center justify-center gap-2 text-xl text-gray-800">
        {words.map((word, index) => (
          <span key={index}>
            {index === insertPos && (
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="inline-flex items-center mx-1"
              >
                <span className="text-accent-500 text-3xl font-bold">↓</span>
              </motion.span>
            )}
            <span className={index === insertPos ? 'font-medium' : ''}>
              {word}
            </span>
          </span>
        ))}
        {insertPos === words.length && (
          <motion.span
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="inline-flex items-center mx-1"
          >
            <span className="text-accent-500 text-3xl font-bold">↓</span>
          </motion.span>
        )}
      </div>
    )
  }

  // Get word type description
  const getWordTypeDescription = () => {
    const descriptions: Record<string, string> = {
      adjective: 'describing word (tells what kind)',
      adverb: 'adverb (tells how, when, or where)',
      'prepositional-phrase': 'phrase (tells where or when)',
    }

    return question.wordType ? descriptions[question.wordType] || 'word' : 'word'
  }

  const expandedSentence = getExpandedSentence()

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Base Sentence with Insertion Point */}
      <div className="space-y-2">
        <div className="text-center text-sm font-medium text-gray-600">
          Base sentence:
        </div>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-50 rounded-child p-6 shadow-inner"
        >
          {renderBaseWithInsertionPoint()}
        </motion.div>
      </div>

      {/* Instructions */}
      <div className="text-center">
        <p className="text-base text-gray-600">
          Add a {getWordTypeDescription()} to make the sentence better
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Tap a word from the word bank below
        </p>
      </div>

      {/* Preview of Expanded Sentence */}
      {expandedSentence && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-accent-50 rounded-child p-6 border-2 border-accent-300"
        >
          <div className="text-center text-sm font-medium text-accent-700 mb-2">
            Preview:
          </div>
          <p className="text-center text-xl font-medium text-gray-800">
            {expandedSentence}
          </p>
        </motion.div>
      )}

      {/* Word Bank */}
      <WordBank
        words={question.options}
        onSelect={handleSelectWord}
        selectedWords={selectedWord ? [selectedWord] : []}
        disabled={disabled || hasSubmitted}
        multiSelect={false}
      />

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={disabled || hasSubmitted || !selectedWord}
        className="w-full bg-accent-500 hover:bg-accent-600 text-white font-medium text-base py-6 px-8 rounded-child shadow-lg active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[3rem]"
      >
        {hasSubmitted ? 'Submitted' : selectedWord ? 'Check Answer' : 'Select a word first'}
      </button>

      {/* Hint about multiple correct answers */}
      {question.correctAnswers && question.correctAnswers.length > 1 && !hasSubmitted && (
        <div className="text-center text-sm text-gray-500">
          <p>💡 Hint: Multiple words may work well in this sentence</p>
        </div>
      )}
    </div>
  )
}
