'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export interface NavItem {
  id: string
  label: string
  icon: React.ReactNode
  href: string
  color?: string
}

export interface BottomNavProps {
  items: NavItem[]
}

export function BottomNav({ items }: BottomNavProps) {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white shadow-child-lg rounded-t-child border-t border-gray-200">
      <div className="flex items-center justify-around h-20 px-2">
        {items.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + '/')

          const colorClass = item.color || 'secondary'
          const activeBgClass = isActive
            ? `bg-${colorClass}-100`
            : 'bg-transparent'
          const activeTextClass = isActive
            ? `text-${colorClass}-600 font-semibold`
            : 'text-gray-500 font-normal'

          return (
            <Link
              key={item.id}
              href={item.href}
              className="flex flex-col items-center justify-center gap-1 min-w-[4rem] min-h-[3rem] px-2 py-1 transition-colors"
            >
              <motion.div
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${activeBgClass}`}
                whileTap={{ scale: 0.9 }}
              >
                <div className={isActive ? `text-${colorClass}-600` : 'text-gray-500'}>
                  {item.icon}
                </div>
              </motion.div>
              <span className={`text-child-xs ${activeTextClass}`}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
