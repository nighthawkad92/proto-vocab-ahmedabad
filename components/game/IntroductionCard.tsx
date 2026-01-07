'use client'

import { motion } from 'framer-motion'
import { BlockIntroduction } from '@/lib/types'

interface IntroductionCardProps {
  introduction: BlockIntroduction
  onContinue: () => void
}

export default function IntroductionCard({
  introduction,
  onContinue,
}: IntroductionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="bg-gradient-to-br from-secondary-50 to-white rounded-child shadow-xl p-8 space-y-6 border-4 border-secondary-200">
        {/* Icon and Title */}
        <div className="text-center space-y-3">
          <div className="text-7xl">💡</div>
          <h2 className="text-child-xl font-display font-bold text-secondary-700">
            Let's Learn Something New!
          </h2>
          <p className="text-child-lg font-bold text-secondary-600">
            {introduction.concept}
          </p>
        </div>

        {/* Explanation */}
        <div className="bg-white rounded-child p-6 border-2 border-secondary-200">
          <p className="text-child-base text-gray-800 leading-relaxed">
            {introduction.explanation}
          </p>
        </div>

        {/* Example */}
        <div className="bg-primary-50 rounded-child p-6 border-2 border-primary-200">
          <div className="flex items-start gap-3">
            <span className="text-3xl">📝</span>
            <div>
              <p className="text-child-sm font-bold text-primary-700 mb-2">
                Example:
              </p>
              <p className="text-child-base text-gray-800">
                {introduction.example}
              </p>
            </div>
          </div>
        </div>

        {/* Activity */}
        <div className="bg-accent-50 rounded-child p-6 border-2 border-accent-200">
          <div className="flex items-start gap-3">
            <span className="text-3xl">✨</span>
            <div>
              <p className="text-child-sm font-bold text-accent-700 mb-2">
                Let's Try:
              </p>
              <p className="text-child-base text-gray-800">
                {introduction.activity}
              </p>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <motion.button
          onClick={onContinue}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white font-bold text-child-lg py-6 px-8 rounded-child shadow-lg hover:shadow-xl transition-all"
        >
          I'm Ready! Let's Start! 🚀
        </motion.button>
      </div>
    </motion.div>
  )
}
