import { InputHTMLAttributes, forwardRef, useState } from 'react'
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
  error?: string
  success?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  prefix?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      success,
      leftIcon,
      rightIcon,
      prefix,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false)

    // Updated border colors based on Figma design system
    const borderColor = error
      ? 'border-error-500'
      : success
      ? 'border-primary-500'
      : isFocused
      ? 'border-primary-500'
      : 'border-neutral-300'

    const textColor = disabled ? 'text-neutral-400' : 'text-neutral-900'

    return (
      <div className="w-full">
        {label && (
          <label className="block mb-2 font-semibold text-child-base text-neutral-900">
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
              {leftIcon}
            </div>
          )}

          {prefix && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-neutral-900">
              {prefix}
            </div>
          )}

          <input
            ref={ref}
            className={`
              w-full px-4 py-3 border-2 rounded-child
              font-sans text-child-base
              focus:outline-none focus:ring-0 transition-colors
              placeholder:text-neutral-400
              ${borderColor}
              ${textColor}
              ${leftIcon ? 'pl-12' : ''}
              ${prefix ? 'pl-16' : ''}
              ${rightIcon || error || success ? 'pr-12' : ''}
              ${disabled ? 'bg-neutral-100 cursor-not-allowed' : 'bg-white'}
              ${className}
            `}
            disabled={disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />

          {(rightIcon || error || success) && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              {error ? (
                <XCircleIcon className="w-5 h-5 text-error-500" />
              ) : success ? (
                <CheckCircleIcon className="w-5 h-5 text-primary-500" />
              ) : (
                <div className="text-neutral-400">{rightIcon}</div>
              )}
            </div>
          )}
        </div>

        {(helperText || error) && (
          <p
            className={`mt-2 text-child-sm ${
              error ? 'text-error-500' : 'text-neutral-500'
            }`}
          >
            {error || helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
