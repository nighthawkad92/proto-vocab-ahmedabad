import { SVGProps } from 'react'

export type IconName = string

export interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName
  size?: number
  className?: string
}

/**
 * Icon component for using SVG icons from the assets/icons folder
 *
 * Usage:
 * <Icon name="search" size={24} className="text-primary-500" />
 *
 * The icon system uses SVG icons from the design system in the assets folder.
 * Icons are loaded dynamically from: /icons/Children Mobile App (Community) - Design System (Community)/
 */
export const Icon = ({ name, size = 24, className = '', ...props }: IconProps) => {
  const iconPath = `/icons/Children Mobile App (Community) - Design System (Community)/${name}.svg`

  return (
    <img
      src={iconPath}
      alt={name}
      width={size}
      height={size}
      className={`inline-block ${className}`}
      style={{ width: size, height: size }}
      {...props as any}
    />
  )
}

Icon.displayName = 'Icon'
