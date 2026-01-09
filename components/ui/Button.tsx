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
      'rounded-[40px] transition-all duration-200 active:scale-95 font-semibold flex items-center justify-center gap-2'

    const variantClasses = {
      primary:
        'bg-primary-500 hover:bg-primary-600 text-white shadow-child disabled:bg-neutral-300 disabled:text-neutral-500 disabled:cursor-not-allowed disabled:shadow-none',
      secondary:
        'bg-primary-500 hover:bg-primary-600 text-white shadow-child disabled:bg-neutral-300 disabled:text-neutral-500 disabled:cursor-not-allowed disabled:shadow-none',
      optional:
        'border-2 border-primary-500 text-primary-500 hover:bg-primary-50 bg-white disabled:border-neutral-300 disabled:text-neutral-400 disabled:cursor-not-allowed disabled:bg-white',
      text: 'text-primary-500 hover:text-primary-600 hover:underline disabled:text-neutral-400 disabled:cursor-not-allowed bg-transparent',
    }

    const sizeClasses = {
      sm: 'h-8 px-4 text-[14px] leading-[20px]',
      md: 'h-10 px-6 text-[16px] leading-[24px]',
      lg: 'h-12 px-6 text-[16px] leading-[24px]',
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
