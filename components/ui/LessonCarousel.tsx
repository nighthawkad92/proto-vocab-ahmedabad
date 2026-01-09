'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Button } from './Button'
import { getLessonImage } from '@/lib/lessonImageMap'

interface Lesson {
  id: string
  title: string
  description: string
  order: number
}

interface LessonCarouselProps {
  lessons: Lesson[]
  unlocks: Record<string, boolean>
  onStartLesson: (lessonId: string) => void
}

export function LessonCarousel({ lessons, unlocks, onStartLesson }: LessonCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsToShow, setItemsToShow] = useState(2.5)
  const [containerWidth, setContainerWidth] = useState(0)

  // Update layout on window resize and initial mount
  useEffect(() => {
    const updateLayout = () => {
      const width = containerRef.current?.offsetWidth || 0
      setContainerWidth(width)

      if (window.innerWidth >= 1024) {
        setItemsToShow(2.5)
      } else if (window.innerWidth >= 768) {
        setItemsToShow(2)
      } else {
        setItemsToShow(1.5)
      }
    }

    updateLayout()
    window.addEventListener('resize', updateLayout)
    return () => window.removeEventListener('resize', updateLayout)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1)
      }
      if (e.key === 'ArrowRight' && currentIndex < lessons.length - 1) {
        setCurrentIndex(currentIndex + 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex, lessons.length])

  const gap = 24 // gap-6 in Tailwind
  const itemWidth = containerWidth > 0 ? (containerWidth - (gap * (itemsToShow - 1))) / itemsToShow : 0
  const offset = -(currentIndex * (itemWidth + gap))
  const maxDrag = -((lessons.length - itemsToShow) * (itemWidth + gap))

  const handleDragEnd = (e: any, { offset: dragOffset, velocity }: any) => {
    const swipeThreshold = 50
    const swipeVelocityThreshold = 500

    if (
      (dragOffset.x < -swipeThreshold || velocity.x < -swipeVelocityThreshold) &&
      currentIndex < lessons.length - 1
    ) {
      setCurrentIndex(currentIndex + 1)
    } else if (
      (dragOffset.x > swipeThreshold || velocity.x > swipeVelocityThreshold) &&
      currentIndex > 0
    ) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  if (lessons.length === 0) {
    return null
  }

  return (
    <div ref={containerRef} className="relative py-4">
      <div className="overflow-hidden touch-pan-y">
        <motion.div
          className="flex gap-6"
          animate={{ x: offset }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          drag={lessons.length > 1 ? "x" : false}
          dragConstraints={{ left: maxDrag, right: 0 }}
          onDragEnd={handleDragEnd}
          style={{ cursor: lessons.length > 1 ? 'grab' : 'default' }}
        >
          {lessons.map((lesson, index) => {
            const isUnlocked = unlocks[lesson.id]

            return (
              <div
                key={lesson.id}
                className="flex-shrink-0 flex flex-col select-none cursor-pointer"
                style={{ width: itemWidth > 0 ? `${itemWidth}px` : 'auto' }}
                onClick={() => isUnlocked && onStartLesson(lesson.id)}
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] rounded-child overflow-hidden mb-4 bg-transparent flex items-center justify-center">
                  <img
                    src={getLessonImage(lesson.title)}
                    alt={lesson.title}
                    className={`w-[80%] h-[80%] object-contain transition-all pointer-events-none ${
                      !isUnlocked ? 'grayscale opacity-60' : ''
                    }`}
                    onError={(e) => {
                      e.currentTarget.src = '/lesson-images/image-breaking-big-words.png'
                    }}
                    draggable={false}
                  />
                </div>

                {/* Start Button */}
                <div className="flex justify-center">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation()
                      onStartLesson(lesson.id)
                    }}
                    disabled={!isUnlocked}
                    size="md"
                    variant="primary"
                  >
                    {isUnlocked ? 'Start' : 'Lesson locked'}
                  </Button>
                </div>
              </div>
            )
          })}
        </motion.div>
      </div>

      {/* Horizontal Scrollbar - Touch-friendly */}
      {lessons.length > 1 && (
        <div className="mt-8 px-4 py-4">
          <div
            className="h-3 bg-secondary-100 rounded-full relative overflow-visible cursor-pointer"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              const clickX = e.clientX - rect.left
              const maxIndex = lessons.length - Math.ceil(itemsToShow)
              const newIndex = Math.round((clickX / rect.width) * maxIndex)
              setCurrentIndex(Math.max(0, Math.min(maxIndex, newIndex)))
            }}
          >
            {/* Scrollbar thumb - larger hit area for touch */}
            <div
              className="absolute top-1/2 -translate-y-1/2 h-8 bg-secondary-500 rounded-full transition-all duration-300 cursor-grab active:cursor-grabbing shadow-md hover:shadow-lg"
              style={{
                width: `max(${(itemsToShow / lessons.length) * 100}%, 48px)`,
                left: `${(currentIndex / Math.max(1, lessons.length - itemsToShow)) * 100}%`,
                transform: 'translateY(-50%)',
              }}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* Navigation Buttons Below Carousel */}
      {lessons.length > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8" data-testid="carousel-navigation">
          <button
            onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
            className="w-16 h-16 rounded-full bg-tertiary-50 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-tertiary-100 transition-colors active:scale-95"
            aria-label="Previous lesson"
          >
            <img
              src="/icons/Children Mobile App (Community) - Design System (Community)/angle-left.svg"
              alt="Previous"
              className="w-6 h-6"
            />
          </button>
          <button
            onClick={() => setCurrentIndex(Math.min(lessons.length - 1, currentIndex + 1))}
            disabled={currentIndex >= lessons.length - Math.ceil(itemsToShow)}
            className="w-16 h-16 rounded-full bg-tertiary-50 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-tertiary-100 transition-colors active:scale-95"
            aria-label="Next lesson"
          >
            <img
              src="/icons/Children Mobile App (Community) - Design System (Community)/angle-right.svg"
              alt="Next"
              className="w-6 h-6"
            />
          </button>
        </div>
      )}
    </div>
  )
}
