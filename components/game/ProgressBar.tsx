'use client'

interface ProgressBarProps {
  current: number
  total: number
  mistakes: number
  maxMistakes: number
}

export default function ProgressBar({
  current,
  total,
  mistakes,
  maxMistakes,
}: ProgressBarProps) {
  // Clamp current to never exceed total (fixes "Question 5 of 4" bug)
  const displayCurrent = Math.min(current, total)
  const progress = (displayCurrent / total) * 100

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {/* Question Progress */}
      <div className="bg-transparent p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-base font-medium text-gray-700">
            Question {displayCurrent} of {total}
          </span>
          <span className="text-base font-medium text-gray-700">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            className="bg-primary-500 h-4 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Mistakes Counter - neutral representation */}
      <div className="flex justify-center gap-3">
        {Array.from({ length: maxMistakes }).map((_, index) => (
          <div
            key={index}
            className={`w-12 h-12 rounded-full shadow-md transition-all ${
              index < mistakes
                ? 'bg-gray-400'
                : 'bg-gray-100 border-4 border-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
