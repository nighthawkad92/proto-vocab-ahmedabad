import { ButtonHTMLAttributes, forwardRef } from 'react'
import { motion } from 'framer-motion'

export type ButtonVariant = 'primary' | 'secondary' | 'optional' | 'text'
export type ButtonSize = 'sm' | 'md' | 'lg'
export type IconPosition = 'left' | 'right' | 'only'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: React.ReactNode
  iconPosition?: IconPosition
  loading?: boolean
  children?: React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      icon,
      iconPosition = 'left',
      loading = false,
      disabled = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      'rounded-child transition-all duration-200 active:scale-95 font-medium flex items-center justify-center gap-2'

    const variantClasses = {
      primary:
        'bg-accent-500 hover:bg-accent-600 text-white shadow-child disabled:bg-gray-300 disabled:cursor-not-allowed',
      secondary:
        'border-2 border-secondary-500 text-secondary-500 hover:bg-secondary-50 disabled:border-gray-300 disabled:text-gray-300 disabled:cursor-not-allowed',
      optional:
        'border-2 border-gray-400 text-gray-700 hover:bg-gray-50 disabled:border-gray-200 disabled:text-gray-300 disabled:cursor-not-allowed',
      text: 'text-secondary-500 hover:underline disabled:text-gray-300 disabled:cursor-not-allowed',
    }

    const sizeClasses = {
      sm: 'px-4 py-2 text-child-sm min-h-[2.5rem]',
      md: 'px-6 py-3 text-child-base min-h-[3rem]',
      lg: 'px-8 py-6 text-child-lg min-h-[3.5rem]',
    }

    const iconOnlyClass =
      iconPosition === 'only' ? 'px-3 aspect-square' : ''

    // Separate motion props from button props
    const { onAnimationStart, onAnimationComplete, ...buttonProps } = props as any

    return (
      <motion.button
        ref={ref}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${iconOnlyClass} ${className}`}
        disabled={disabled || loading}
        whileTap={{ scale: disabled || loading ? 1 : 0.95 }}
        {...buttonProps}
      >
        {loading && (
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="inline-block"
          >
            ⏳
          </motion.span>
        )}
        {!loading &&
          icon &&
          (iconPosition === 'left' || iconPosition === 'only') &&
          icon}
        {!loading && iconPosition !== 'only' && children}
        {!loading && icon && iconPosition === 'right' && icon}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'
