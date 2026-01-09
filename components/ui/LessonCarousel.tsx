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

      {/* Navigation Buttons Below Carousel */}
      {lessons.length > 1 && (
        <div className="flex items-center justify-center gap-4 mt-6" data-testid="carousel-navigation">
          <Button
            onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
            variant="primary"
            size="lg"
            icon={
              <img
                src="/icons/Children Mobile App (Community) - Design System (Community)/angle-left.svg"
                alt="Previous"
                className="w-6 h-6 brightness-0 invert"
              />
            }
            iconPosition="only"
            aria-label="Previous lesson"
          />
          <Button
            onClick={() => setCurrentIndex(Math.min(lessons.length - 1, currentIndex + 1))}
            disabled={currentIndex >= lessons.length - Math.ceil(itemsToShow)}
            variant="primary"
            size="lg"
            icon={
              <img
                src="/icons/Children Mobile App (Community) - Design System (Community)/angle-right.svg"
                alt="Next"
                className="w-6 h-6 brightness-0 invert"
              />
            }
            iconPosition="only"
            aria-label="Next lesson"
          />
        </div>
      )}
    </div>
  )
}
