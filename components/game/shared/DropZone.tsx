'use client'

import { useDroppable } from '@dnd-kit/core'
import { motion } from 'framer-motion'

interface DropZoneProps {
  id: string
  children?: React.ReactNode
  label?: string
  isOccupied?: boolean
  className?: string
}

/**
 * Reusable drop zone component for question types
 * Used in: SentenceRearrange, StorySequence
 *
 * Features:
 * - Visual highlighting when item hovers
 * - Optional label (e.g., "First", "Then", "Finally")
 * - Touch-friendly (large target area)
 * - Accessible
 */
export default function DropZone({
  id,
  children,
  label,
  isOccupied = false,
  className = '',
}: DropZoneProps) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  })

  return (
    <div className={`relative ${className}`}>
      {/* Label above drop zone */}
      {label && (
        <div className="text-center text-sm font-medium text-gray-600 mb-2">
          {label}
        </div>
      )}

      {/* Drop zone container */}
      <motion.div
        ref={setNodeRef}
        animate={{
          scale: isOver ? 1.05 : 1,
          borderColor: isOver ? '#60a5fa' : isOccupied ? '#10b981' : '#d1d5db',
        }}
        transition={{ duration: 0.2 }}
        className={`
          min-h-[4rem] min-w-[6rem]
          border-4 border-dashed rounded-child
          flex items-center justify-center
          p-4
          ${isOver ? 'bg-accent-50' : isOccupied ? 'bg-green-50' : 'bg-gray-50'}
          ${isOver ? 'shadow-lg' : 'shadow-sm'}
          transition-all duration-200
        `}
      >
        {children || (
          <span className="text-gray-400 text-sm">
            {isOver ? 'Drop here' : 'Drag here'}
          </span>
        )}
      </motion.div>
    </div>
  )
}
