import { InputHTMLAttributes, forwardRef, useState } from 'react'
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
  error?: string
  success?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
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
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false)

    const borderColor = error
      ? 'border-primary-500'
      : success
      ? 'border-secondary-500'
      : isFocused
      ? 'border-secondary-500'
      : 'border-gray-300'

    return (
      <div className="w-full">
        {label && (
          <label className="block mb-2 font-semibold text-child-base text-gray-900">
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            className={`
              w-full px-4 py-3 border-2 rounded-child
              focus:outline-none transition-colors
              ${borderColor}
              ${leftIcon ? 'pl-10' : ''}
              ${rightIcon || error || success ? 'pr-10' : ''}
              ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
              ${className}
            `}
            disabled={disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />

          {(rightIcon || error || success) && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {error ? (
                <ExclamationCircleIcon className="w-6 h-6 text-primary-500" />
              ) : success ? (
                <CheckCircleIcon className="w-6 h-6 text-secondary-500" />
              ) : (
                <div className="text-gray-400">{rightIcon}</div>
              )}
            </div>
          )}
        </div>

        {(helperText || error) && (
          <p
            className={`mt-2 text-child-sm ${
              error ? 'text-primary-500' : 'text-gray-500'
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
