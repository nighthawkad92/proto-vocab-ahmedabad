'use client'

import {
  ArrowLeftIcon,
  Bars3Icon,
  BellIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/Button'

export type HeaderVariant = 'simple' | 'back' | 'backWithTitle' | 'full'

export interface HeaderProps {
  variant?: HeaderVariant
  title?: string
  greeting?: string
  onBack?: () => void
  onMenu?: () => void
  onLogout?: () => void
  showLogoutButton?: boolean
  onNotifications?: () => void
  onProfile?: () => void
  showNotificationBadge?: boolean
}

export function Header({
  variant = 'simple',
  title,
  greeting,
  onBack,
  onMenu,
  onLogout,
  showLogoutButton = false,
  onNotifications,
  onProfile,
  showNotificationBadge = false,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-child-sm">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Left Section */}
        <div className="flex items-center gap-2">
          {(variant === 'back' ||
            variant === 'backWithTitle' ||
            variant === 'full') &&
            onBack && (
              <Button
                variant="text"
                icon={<ArrowLeftIcon className="w-6 h-6" />}
                iconPosition="only"
                onClick={onBack}
                aria-label="Go back"
                size="sm"
              />
            )}
          {(variant === 'backWithTitle' || variant === 'full') && title && (
            <h1 className="text-child-xl font-semibold">{title}</h1>
          )}
          {greeting && (
            <h1 className="text-child-lg font-semibold text-gray-800">{greeting}</h1>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {variant === 'full' && onNotifications && (
            <div className="relative">
              <Button
                variant="text"
                icon={<BellIcon className="w-6 h-6" />}
                iconPosition="only"
                onClick={onNotifications}
                aria-label="Notifications"
                size="sm"
              />
              {showNotificationBadge && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-primary-500 rounded-full" />
              )}
            </div>
          )}
          {variant === 'full' && onProfile && (
            <Button
              variant="text"
              icon={<UserCircleIcon className="w-6 h-6" />}
              iconPosition="only"
              onClick={onProfile}
              aria-label="Profile"
              size="sm"
            />
          )}
          {(variant === 'simple' ||
            variant === 'back' ||
            variant === 'backWithTitle') && (
            <>
              {showLogoutButton && onLogout ? (
                <Button
                  variant="text"
                  onClick={onLogout}
                  aria-label="Logout"
                  size="sm"
                >
                  Logout
                </Button>
              ) : onMenu ? (
                <Button
                  variant="text"
                  icon={<Bars3Icon className="w-6 h-6" />}
                  iconPosition="only"
                  onClick={onMenu}
                  aria-label="Menu"
                  size="sm"
                />
              ) : null}
            </>
          )}
        </div>
      </div>
    </header>
  )
}
