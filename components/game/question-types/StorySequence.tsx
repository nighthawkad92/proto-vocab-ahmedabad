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
import { Question, FeedbackState } from '@/lib/types'
import { playSoundEffect, SoundEffect } from '@/lib/soundEffects'
import { Button } from '@/components/ui/Button'

interface StorySequenceProps {
  question: Question
  onAnswer: (answer: string) => void
  disabled?: boolean
  feedbackState?: FeedbackState
}

/**
 * Story Sequence Component
 * Used in: Lesson 5 (Reading → Writing Connection)
 *
 * Functionality:
 * - Display scrambled story events
 * - Numbered positions (First, Then, Next, Finally)
 * - Drag events to correct sequence
 * - Show passage context (optional read again)
 * - Check sequence on submit
 *
 * Question Structure:
 * {
 *   type: "story-sequence",
 *   prompt: "Put the events in the correct order",
 *   passage: "Full story text...",
 *   scrambledItems: ["Event 1", "Event 2", "Event 3"],
 *   correctOrder: [2, 0, 1],
 *   correctAnswer: "2,0,1",
 *   explanation: "First... then... finally..."
 * }
 */
export default function StorySequence({
  question,
  onAnswer,
  disabled = false,
  feedbackState,
}: StorySequenceProps) {
  // Validate question has required fields
  if (!question.scrambledItems || !question.correctOrder || !question.passage) {
    console.error('StorySequence: Missing scrambledItems, correctOrder, or passage')
    return (
      <div className="text-center text-red-600 p-4">
        Error: Invalid question format
      </div>
    )
  }

  // Initialize items with unique IDs for drag-and-drop
  const [items, setItems] = useState<Array<{ id: string; event: string; originalIndex: number }>>(
    []
  )
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)

  // Position labels
  const positionLabels = ['First', 'Then', 'Next', 'After that', 'Finally']

  // Initialize items when question changes
  useEffect(() => {
    const initialItems = question.scrambledItems!.map((event, index) => ({
      id: `event-${index}-${event.substring(0, 10)}`,
      event,
      originalIndex: index,
    }))
    setItems(initialItems)
    setHasSubmitted(false)
  }, [question.id, question.scrambledItems])

  // Configure sensors for drag-and-drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150,
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

    // Build answer as comma-separated indices
    const currentOrder = items.map((item) => item.originalIndex)
    const answer = currentOrder.join(',')

    // Submit answer
    onAnswer(answer)
  }

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Question Prompt */}
      {question.prompt && (
        <div className="text-center mb-4">
          <h2 className="text-2xl font-medium text-gray-800">
            {question.prompt}
          </h2>
        </div>
      )}

      {/* Story Passage */}
      {question.passage && (
        <div className="bg-gray-50 rounded-child p-6 max-h-64 overflow-y-auto shadow-inner mb-6">
          <p className="text-child-lg text-gray-800 leading-relaxed whitespace-pre-wrap">
            {question.passage}
          </p>
        </div>
      )}

      {/* Drag and Drop Area with Position Labels */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
          <motion.div
            className="space-y-5"
            animate={
              feedbackState?.type === 'incorrect'
                ? { x: [-10, 10, -10, 10, 0] }
                : {}
            }
            transition={{ duration: 0.5 }}
          >
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.06 }}
                className="flex items-center gap-4"
              >
                {/* Position label */}
                <motion.div
                  className="flex-shrink-0 w-28"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.06 + 0.1 }}
                >
                  <span className="inline-block bg-gradient-to-r from-secondary-500 to-secondary-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">
                    {positionLabels[index] || `Step ${index + 1}`}
                  </span>
                </motion.div>

                {/* Event card */}
                <div className="flex-grow">
                  <DraggableCard
                    id={item.id}
                    disabled={disabled || hasSubmitted}
                    className="text-base"
                    showHandle={true}
                  >
                    {item.event}
                  </DraggableCard>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </SortableContext>
        <DragOverlay dropAnimation={{
          duration: 200,
          easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        }}>
          {activeId ? (
            <div className="bg-white rounded-2xl shadow-2xl border-2 border-accent-500 p-5 text-base font-medium text-gray-800 cursor-grabbing max-w-lg transform rotate-2">
              {items.find((item) => item.id === activeId)?.event}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

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
          <p className="text-center text-xl font-medium text-green-800">
            {feedbackState.correctAnswer}
          </p>
        </motion.div>
      )}

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        disabled={disabled || hasSubmitted || items.length === 0}
        variant="primary"
        size="lg"
        className="w-full"
      >
        {hasSubmitted ? 'Submitted' : 'Check Answer'}
      </Button>
    </div>
  )
}
