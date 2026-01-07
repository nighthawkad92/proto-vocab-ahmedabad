import { useState, useEffect } from 'react'

export type ConnectionQuality = 'good' | 'slow' | 'offline'

export function useConnectionStatus() {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  )
  const [connectionQuality, setConnectionQuality] =
    useState<ConnectionQuality>('good')

  useEffect(() => {
    if (typeof window === 'undefined') return

    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine)
      if (!navigator.onLine) {
        setConnectionQuality('offline')
      }
    }

    const checkConnectionQuality = () => {
      if (!navigator.onLine) {
        setConnectionQuality('offline')
        return
      }

      // Use Network Information API if available
      const connection = (navigator as any).connection
      if (connection) {
        const effectiveType = connection.effectiveType

        // '4g' = good, '3g' = slow, '2g'/'slow-2g' = offline
        if (effectiveType === '4g') {
          setConnectionQuality('good')
        } else if (effectiveType === '3g') {
          setConnectionQuality('slow')
        } else {
          setConnectionQuality('slow')
        }
      } else {
        // Fallback: Assume good if online
        setConnectionQuality('good')
      }
    }

    // Initial check
    checkConnectionQuality()

    // Listen to online/offline events
    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)

    // Listen to connection change if available
    const connection = (navigator as any).connection
    if (connection) {
      connection.addEventListener('change', checkConnectionQuality)
    }

    // Periodic check every 30 seconds
    const interval = setInterval(checkConnectionQuality, 30000)

    return () => {
      window.removeEventListener('online', updateOnlineStatus)
      window.removeEventListener('offline', updateOnlineStatus)
      if (connection) {
        connection.removeEventListener('change', checkConnectionQuality)
      }
      clearInterval(interval)
    }
  }, [])

  return { isOnline, connectionQuality }
}
