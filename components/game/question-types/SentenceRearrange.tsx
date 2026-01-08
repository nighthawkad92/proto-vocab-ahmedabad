'use client'

import { useState, useEffect } from 'react'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { restrictToVerticalAxis, restrictToParentElement } from '@dnd-kit/modifiers'
import { motion } from 'framer-motion'
import DraggableCard from '../shared/DraggableCard'
import { Question } from '@/lib/types'
import { playSoundEffect, SoundEffect } from '@/lib/soundEffects'

interface SentenceRearrangeProps {
  question: Question
  onAnswer: (answer: string) => void
  disabled?: boolean
}

/**
 * Sentence Rearrange Component
 * Used in: Lesson 4 (Sentence Expansion)
 *
 * Functionality:
 * - Display scrambled word cards
 * - Drag-and-drop to reorder words
 * - Alternative: Tap-to-select sequence mode (accessibility)
 * - Check order on submit
 * - Visual feedback for correct arrangement
 *
 * Question Structure:
 * {
 *   type: "sentence-rearrange",
 *   prompt: "Arrange the words to make a sentence",
 *   scrambledItems: ["runs", "dog", "The"],
 *   correctOrder: [2, 1, 0],  // Indices in correct order
 *   correctAnswer: "The dog runs",
 *   explanation: "Sentences start with 'The'..."
 * }
 */
export default function SentenceRearrange({
  question,
  onAnswer,
  disabled = false,
}: SentenceRearrangeProps) {
  // Validate question has required fields
  if (!question.scrambledItems || !question.correctOrder) {
    console.error('SentenceRearrange: Missing scrambledItems or correctOrder')
    return (
      <div className="text-center text-red-600 p-4">
        Error: Invalid question format
      </div>
    )
  }

  // Initialize items with unique IDs for drag-and-drop
  const [items, setItems] = useState<Array<{ id: string; word: string; originalIndex: number }>>(
    []
  )
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)

  // Initialize items when question changes
  useEffect(() => {
    const initialItems = question.scrambledItems!.map((word, index) => ({
      id: `word-${index}-${word}`,
      word,
      originalIndex: index,
    }))
    setItems(initialItems)
    setHasSubmitted(false)
  }, [question.id, question.scrambledItems])

  // Configure sensors for drag-and-drop
  // PointerSensor for mouse/desktop, TouchSensor for mobile/tablet
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150, // 150ms delay for touch to distinguish from scroll
        tolerance: 5,
      },
    })
  )

  // Handle drag start event
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  // Handle drag end event
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)

        playSoundEffect(SoundEffect.TAP)
        return arrayMove(items, oldIndex, newIndex)
      })
    }

    setActiveId(null)
  }

  // Check if current order is correct
  const checkOrder = () => {
    const currentOrder = items.map((item) => item.originalIndex)
    const correctOrder = question.correctOrder!

    return (
      currentOrder.length === correctOrder.length &&
      currentOrder.every((value, index) => value === correctOrder[index])
    )
  }

  // Handle submit
  const handleSubmit = () => {
    if (disabled || hasSubmitted) return

    setHasSubmitted(true)
    playSoundEffect(SoundEffect.TAP)

    // Build the sentence from current order
    const sentenceArray = items.map((item) => item.word)
    const answer = sentenceArray.join(' ')

    // Check if correct
    const isCorrect = checkOrder()

    // Submit answer
    onAnswer(answer)
  }

  // Get preview sentence
  const previewSentence = items.map((item) => item.word).join(' ')

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Question Prompt */}
      {question.prompt && (
        <div className="text-center mb-6">
          <h2 className="text-2xl font-medium text-gray-800">
            {question.prompt}
          </h2>
        </div>
      )}

      {/* Drag and Drop Area */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      >
        <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {items.map((item) => (
              <DraggableCard
                key={item.id}
                id={item.id}
                disabled={disabled || hasSubmitted}
                className="text-xl"
              >
                {item.word}
              </DraggableCard>
            ))}
          </div>
        </SortableContext>
        <DragOverlay>
          {activeId ? (
            <div className="bg-white rounded-child shadow-xl border-2 border-accent-400 p-4 text-xl font-medium text-gray-800 cursor-grabbing">
              {items.find((item) => item.id === activeId)?.word}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Preview Sentence */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-accent-50 rounded-child p-4 border-2 border-accent-200"
      >
        <p className="text-center text-sm font-medium text-gray-600 mb-2">
          Preview:
        </p>
        <p className="text-center text-xl font-medium text-gray-800">
          {previewSentence || '(Arrange words above)'}
        </p>
      </motion.div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={disabled || hasSubmitted || items.length === 0}
        className="w-full bg-accent-500 hover:bg-accent-600 text-white font-medium text-base py-6 px-8 rounded-child shadow-lg active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[3rem]"
      >
        {hasSubmitted ? 'Submitted' : 'Check Answer'}
      </button>

      {/* Touch hint */}
      <div className="text-center text-xs text-gray-500">
        <p>💡 Tip: Tap and hold to drag on touch devices</p>
      </div>
    </div>
  )
}
