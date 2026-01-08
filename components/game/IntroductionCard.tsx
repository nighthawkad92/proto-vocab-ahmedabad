'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { BlockIntroduction } from '@/lib/types'

interface IntroductionCardProps {
  introduction: BlockIntroduction
  onContinue: () => void
  onPlayAudio?: (text: string) => void
  disabled?: boolean
}

export default function IntroductionCard({
  introduction,
  onContinue,
  onPlayAudio,
  disabled = false,
}: IntroductionCardProps) {
  const [currentStep, setCurrentStep] = useState(0)

  // Auto-play audio for explanation when component mounts
  useEffect(() => {
    if (currentStep === 0 && onPlayAudio) {
      onPlayAudio(introduction.explanation)
    }
  }, [currentStep, introduction.explanation, onPlayAudio])

  const steps = [
    {
      title: introduction.concept,
      content: introduction.explanation,
      label: 'What is this?',
    },
    {
      title: 'Example',
      content: introduction.example,
      label: 'Here is an example',
    },
    {
      title: 'Now try',
      content: introduction.activity,
      label: 'Your turn',
    },
  ]

  const currentStepData = steps[currentStep]
  const isLastStep = currentStep === steps.length - 1

  const handleNext = () => {
    if (isLastStep) {
      onContinue()
    } else {
      setCurrentStep(currentStep + 1)
    }
  }

  return (
    <motion.div
      key={currentStep}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="bg-white rounded-child shadow-xl p-8 space-y-6">
        {/* Progress dots */}
        <div className="flex justify-center gap-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentStep ? 'bg-accent-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Step label */}
        <div className="text-center">
          <p className="text-base font-medium text-gray-600">
            {currentStepData.label}
          </p>
        </div>

        {/* Title */}
        <div className="text-center">
          <h2 className="text-[32px] font-body font-medium text-gray-800 leading-tight">
            {currentStepData.title}
          </h2>
        </div>

        {/* Content */}
        <div className="bg-gray-50 rounded-child p-6">
          <p className="text-lg text-gray-800 leading-relaxed text-center">
            {currentStepData.content}
          </p>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleNext}
          disabled={disabled}
          className="w-full bg-accent-500 hover:bg-accent-600 text-white font-medium text-base py-6 px-8 rounded-child shadow-lg active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[3rem]"
        >
          {isLastStep ? 'Start' : 'Next'}
        </button>
      </div>
    </motion.div>
  )
}
