'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export interface LoaderProps {
  size?: 'sm' | 'md' | 'lg'
  message?: string
}

export function Loader({ size = 'md', message = 'Loading' }: LoaderProps) {
  const spinnerSizes = {
    sm: 32,
    md: 48,
    lg: 64,
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <Image
          src="/icons/Children Mobile App (Community) - Design System (Community)/spinner.svg"
          alt="Loading"
          width={spinnerSizes[size]}
          height={spinnerSizes[size]}
          className="text-primary-500"
        />
      </motion.div>

      {message && (
        <motion.p
          className="text-child-base text-neutral-600 font-semibold"
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
      )}
    </div>
  )
}
