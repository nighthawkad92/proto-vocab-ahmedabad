'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader } from '@/components/ui/Loader'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/student')
  }, [router])

  return (
    <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
      <Loader message="Loading" />
    </div>
  )
}
