'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { motion, AnimatePresence } from 'framer-motion'
import { GripVertical } from 'lucide-react'

interface DraggableCardProps {
  id: string
  children: React.ReactNode
  disabled?: boolean
  className?: string
  showHandle?: boolean
}

/**
 * Enhanced draggable card component with professional UX
 * Used in: SentenceRearrange, StorySequence, AddWordActivity
 *
 * Features:
 * - Smooth animations and transitions
 * - Clear drag handle (optional)
 * - Hover and focus states
 * - Touch-optimized (≥48px touch targets)
 * - Proper visual feedback during drag
 * - Accessibility support
 */
export default function DraggableCard({
  id,
  children,
  disabled = false,
  className = '',
  showHandle = false,
}: DraggableCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isSorting,
    over,
  } = useSortable({
    id,
    disabled,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || 'transform 200ms cubic-bezier(0.25, 0.1, 0.25, 1)',
  }

  const isOverCurrent = over?.id === id

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`
        ${className}
        group relative
        bg-white rounded-2xl
        min-h-[64px]
        flex items-center
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${isDragging ? 'opacity-30 scale-95' : 'opacity-100 scale-100'}
        ${isOverCurrent ? 'ring-2 ring-accent-500 ring-offset-2' : ''}
        ${!disabled && !isDragging ? 'hover:shadow-lg hover:scale-[1.02]' : ''}
        transition-all duration-200 ease-out
        select-none
        touch-manipulation
      `}
    >
      {/* Card Background with Border */}
      <div
        className={`
          absolute inset-0 rounded-2xl
          border-2
          ${isDragging ? 'border-accent-300' : 'border-gray-200'}
          ${!disabled && !isDragging ? 'group-hover:border-accent-400' : ''}
          ${isOverCurrent ? 'border-accent-500 bg-accent-50' : 'bg-white'}
          transition-all duration-200
        `}
      />

      {/* Drag Handle (optional) */}
      {showHandle && !disabled && (
        <div
          {...listeners}
          className="
            relative z-10 px-3 py-4
            cursor-grab active:cursor-grabbing
            text-gray-400 hover:text-accent-500
            transition-colors duration-200
          "
        >
          <GripVertical className="w-5 h-5" />
        </div>
      )}

      {/* Content */}
      <div
        {...(!showHandle && !disabled ? listeners : {})}
        className={`
          relative z-10 flex-1 px-5 py-4
          ${!showHandle && !disabled ? 'cursor-grab active:cursor-grabbing' : ''}
          text-center font-medium text-gray-800
        `}
      >
        {children}
      </div>

      {/* Drop Indicator */}
      <AnimatePresence>
        {isOverCurrent && !isDragging && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            className="
              absolute left-0 top-0 bottom-0 w-1
              bg-accent-500 rounded-l-2xl
            "
          />
        )}
      </AnimatePresence>

      {/* Subtle shimmer effect on hover */}
      {!disabled && !isDragging && (
        <div className="
          absolute inset-0 rounded-2xl
          bg-gradient-to-r from-transparent via-white to-transparent
          opacity-0 group-hover:opacity-20
          transition-opacity duration-300
          pointer-events-none
        " />
      )}
    </motion.div>
  )
}
