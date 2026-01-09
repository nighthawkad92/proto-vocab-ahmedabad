'use client'

export interface LoaderProps {
  size?: 'sm' | 'md' | 'lg'
  message?: string
}

export function Loader({ size = 'md', message }: LoaderProps) {
  const spinnerSizes = {
    sm: 100,
    md: 142,
    lg: 200,
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <img
        src="/loading-indicator.svg"
        alt="Loading"
        width={spinnerSizes[size]}
        height={spinnerSizes[size]}
        className="object-contain"
      />
    </div>
  )
}
