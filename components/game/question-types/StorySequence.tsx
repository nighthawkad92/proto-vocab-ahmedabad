'use client'

import { useState, useEffect } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { restrictToVerticalAxis, restrictToParentElement } from '@dnd-kit/modifiers'
import { motion } from 'framer-motion'
import DraggableCard from '../shared/DraggableCard'
import PassageDisplay from '../shared/PassageDisplay'
import { Question } from '@/lib/types'
import { playSoundEffect, SoundEffect } from '@/lib/soundEffects'
import { generateSpeech } from '@/lib/googleTTS'
import { playAudio } from '@/lib/audioCache'

interface StorySequenceProps {
  question: Question
  onAnswer: (answer: string) => void
  disabled?: boolean
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
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)

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
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

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

  // Handle read passage again
  const handleReadAgain = async () => {
    if (isPlayingAudio) return

    setIsPlayingAudio(true)
    try {
      const audioUrl = await generateSpeech({ text: question.passage! })
      await playAudio(audioUrl)
    } catch (error) {
      console.error('Failed to play passage audio:', error)
    } finally {
      setIsPlayingAudio(false)
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Story Passage */}
      {question.passage && (
        <PassageDisplay
          passage={question.passage}
          onReadAgain={handleReadAgain}
          disabled={isPlayingAudio}
        />
      )}

      {/* Instructions */}
      <div className="text-center">
        <p className="text-base text-gray-600 mb-2">
          Drag the events to put them in the correct order
        </p>
        <p className="text-sm text-gray-500">
          Or use keyboard arrows to reorder
        </p>
      </div>

      {/* Drag and Drop Area with Position Labels */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      >
        <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={item.id} className="space-y-2">
                {/* Position label */}
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-24 text-center">
                    <span className="inline-block bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {positionLabels[index] || `Step ${index + 1}`}
                    </span>
                  </div>

                  {/* Event card */}
                  <div className="flex-grow">
                    <DraggableCard
                      id={item.id}
                      disabled={disabled || hasSubmitted}
                      className="text-base"
                    >
                      {item.event}
                    </DraggableCard>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={disabled || hasSubmitted || items.length === 0}
        className="w-full bg-accent-500 hover:bg-accent-600 text-white font-medium text-base py-6 px-8 rounded-child shadow-lg active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[3rem]"
      >
        {hasSubmitted ? 'Submitted' : 'Check Answer'}
      </button>

      {/* Accessibility hint */}
      <div className="text-center text-xs text-gray-500">
        <p>💡 Tip: Tap and hold to drag on touch devices</p>
        <p>Use Tab + Arrow keys for keyboard navigation</p>
      </div>
    </div>
  )
}
