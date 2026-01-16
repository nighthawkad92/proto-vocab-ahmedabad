'use client'

import { Button } from './Button'
import { getLessonImage } from '@/lib/lessonImageMap'

interface Lesson {
  id: string
  title: string
  description: string
  order: number
}

interface LessonGridProps {
  lessons: Lesson[]
  onStartLesson: (lessonId: string) => void
}

export function LessonGrid({ lessons, onStartLesson }: LessonGridProps) {
  if (lessons.length === 0) {
    return null
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {lessons.map((lesson) => {
          return (
            <div
              key={lesson.id}
              className="flex flex-col cursor-pointer"
              onClick={() => onStartLesson(lesson.id)}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] rounded-child overflow-hidden mb-4 bg-transparent flex items-center justify-center">
                <img
                  src={getLessonImage(lesson.title)}
                  alt={lesson.title}
                  className="w-[80%] h-[80%] object-contain transition-all"
                  onError={(e) => {
                    e.currentTarget.src = '/lesson-images/image-breaking-big-words.png'
                  }}
                />
              </div>

              {/* Start Button */}
              <div className="flex justify-center">
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    onStartLesson(lesson.id)
                  }}
                  size="md"
                  variant="primary"
                >
                  Start
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
