'use client'

import { useRouter } from 'next/navigation'
import { Header } from '@/components/navigation/Header'
import { BottomNav } from '@/components/navigation/BottomNav'
import {
  BookOpenIcon,
  ChartBarIcon,
  TrophyIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'

export default function StudentBadgesPage() {
  const router = useRouter()

  const navItems = [
    {
      id: 'lessons',
      label: 'Lessons',
      icon: <BookOpenIcon className="w-6 h-6" />,
      href: '/student/dashboard',
      color: 'secondary',
    },
    {
      id: 'progress',
      label: 'Progress',
      icon: <ChartBarIcon className="w-6 h-6" />,
      href: '/student/progress',
      color: 'primary',
    },
    {
      id: 'badges',
      label: 'Badges',
      icon: <TrophyIcon className="w-6 h-6" />,
      href: '/student/badges',
      color: 'achievement',
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: <UserCircleIcon className="w-6 h-6" />,
      href: '/student/profile',
      color: 'accent',
    },
  ]

  return (
    <div className="min-h-screen bg-secondary-50 pb-24">
      <Header
        variant="backWithTitle"
        title="My Badges"
        onBack={() => router.push('/student/dashboard')}
      />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-child shadow-child p-8 text-center">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-child-2xl font-semibold mb-4">
            Achievement Badges
          </h2>
          <p className="text-child-base text-gray-600 mb-4">
            Earn badges as you complete lessons and reach milestones.
          </p>
          <p className="text-child-sm text-gray-500">
            Complete your first lesson to earn your first badge
          </p>
        </div>
      </main>

      <BottomNav items={navItems} />
    </div>
  )
}
