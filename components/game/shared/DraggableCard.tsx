'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { motion } from 'framer-motion'

interface DraggableCardProps {
  id: string
  children: React.ReactNode
  disabled?: boolean
  className?: string
}

/**
 * Reusable draggable card component for question types
 * Used in: SentenceRearrange, StorySequence, AddWordActivity
 *
 * Features:
 * - Touch-optimized (≥48px touch targets)
 * - Visual feedback (pressed state, drag ghost)
 * - Accessible (keyboard navigation)
 * - Works with @dnd-kit/sortable
 */
export default function DraggableCard({
  id,
  children,
  disabled = false,
  className = '',
}: DraggableCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    disabled,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={`
        ${className}
        ${isDragging ? 'opacity-50 scale-105 z-50' : 'opacity-100'}
        ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-grab active:cursor-grabbing'}
        bg-white rounded-child shadow-md
        min-h-[3rem] min-w-[3rem]
        flex items-center justify-center
        text-center font-medium text-gray-800
        border-2 border-gray-200
        hover:border-accent-400 hover:shadow-lg
        active:scale-95
        transition-all duration-200
        select-none
        touch-none
        p-4
      `}
    >
      {children}
    </motion.div>
  )
}
