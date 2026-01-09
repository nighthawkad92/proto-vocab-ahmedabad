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
      <div className="overflow-hidden">
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
                className="flex-shrink-0 flex flex-col"
                style={{ width: itemWidth > 0 ? `${itemWidth}px` : 'auto' }}
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] rounded-child overflow-hidden mb-4 bg-white shadow-child">
                  <img
                    src={getLessonImage(lesson.title)}
                    alt={lesson.title}
                    className={`w-full h-full object-cover transition-all ${
                      !isUnlocked ? 'grayscale opacity-60' : ''
                    }`}
                    onError={(e) => {
                      e.currentTarget.src = '/lesson-images/image-breaking-big-words.png'
                    }}
                  />
                  {!isUnlocked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <span className="text-6xl" aria-hidden="true">
                        🔒
                      </span>
                    </div>
                  )}
                </div>

                {/* Lesson Text */}
                <div className="flex-1 mb-4">
                  <h3 className="text-child-base font-semibold text-gray-800 text-center mb-2">
                    {lesson.title}
                  </h3>
                  <p className="text-child-sm text-gray-600 text-center">
                    {lesson.description}
                  </p>
                  {!isUnlocked && (
                    <p className="text-child-xs text-gray-500 text-center mt-2">
                      Ask your teacher to unlock
                    </p>
                  )}
                </div>

                {/* Start Button */}
                <div className="flex justify-center">
                  <Button
                    onClick={() => onStartLesson(lesson.id)}
                    disabled={!isUnlocked}
                    size="md"
                    variant="primary"
                  >
                    Start
                  </Button>
                </div>
              </div>
            )
          })}
        </motion.div>
      </div>

      {/* Navigation Arrows (Desktop only) */}
      {lessons.length > 1 && (
        <>
          <button
            onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
            className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center bg-white rounded-full shadow-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-all"
            aria-label="Previous lesson"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentIndex(Math.min(lessons.length - 1, currentIndex + 1))}
            disabled={currentIndex >= lessons.length - Math.ceil(itemsToShow)}
            className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center bg-white rounded-full shadow-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-all"
            aria-label="Next lesson"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
    </div>
  )
}
