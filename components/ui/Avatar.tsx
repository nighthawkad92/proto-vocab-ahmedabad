export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export interface AvatarProps {
  name: string
  size?: AvatarSize
  className?: string
}

const sizeClasses = {
  xs: 'w-6 h-6 text-child-xs',
  sm: 'w-8 h-8 text-child-sm',
  md: 'w-12 h-12 text-child-base',
  lg: 'w-16 h-16 text-child-lg',
  xl: 'w-20 h-20 text-child-xl',
  '2xl': 'w-24 h-24 text-child-2xl',
}

const colorVariants = [
  'bg-primary-100 text-primary-700',
  'bg-secondary-100 text-secondary-700',
  'bg-accent-100 text-accent-700',
  'bg-blue-100 text-blue-700',
  'bg-purple-100 text-purple-700',
]

function getColorForName(name: string): string {
  const index = name.charCodeAt(0) % colorVariants.length
  return colorVariants[index]
}

export function Avatar({ name, size = 'md', className = '' }: AvatarProps) {
  const initial = name.charAt(0).toUpperCase()
  const colorClass = getColorForName(name)

  return (
    <div
      className={`
        ${sizeClasses[size]}
        ${colorClass}
        rounded-full
        flex items-center justify-center
        font-bold
        ${className}
      `}
      aria-label={`Avatar for ${name}`}
    >
      {initial}
    </div>
  )
}
