'use client'

import { motion } from 'framer-motion'

export interface LoaderProps {
  size?: 'sm' | 'md' | 'lg'
  message?: string
}

export function Loader({ size = 'md', message = 'Loading' }: LoaderProps) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  }

  const iconSizes = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl',
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <motion.div
        className={`${sizeClasses[size]} rounded-full bg-secondary-100 flex items-center justify-center`}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <span className={iconSizes[size]}>🦕</span>
      </motion.div>

      <motion.p
        className="text-child-base text-gray-600"
        animate={{
          opacity: [1, 0.5, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {message}
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ...
        </motion.span>
      </motion.p>
    </div>
  )
}
