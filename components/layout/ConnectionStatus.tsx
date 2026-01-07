'use client'

import { useConnectionStatus } from '@/lib/connectionMonitor'
import { useState } from 'react'

export default function ConnectionStatus() {
  const { isOnline, connectionQuality } = useConnectionStatus()
  const [showTooltip, setShowTooltip] = useState(false)

  const getStatusColor = () => {
    if (connectionQuality === 'offline') return 'bg-red-500'
    if (connectionQuality === 'slow') return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const getStatusText = () => {
    if (connectionQuality === 'offline') return 'Offline'
    if (connectionQuality === 'slow') return 'Slow connection'
    return 'Connected'
  }

  const getStatusIcon = () => {
    if (connectionQuality === 'offline') return '📴'
    if (connectionQuality === 'slow') return '📶'
    return '✓'
  }

  return (
    <div className="relative inline-block">
      <div
        className="flex items-center gap-2 cursor-help"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <div
          className={`w-3 h-3 rounded-full ${getStatusColor()} animate-pulse`}
        />
      </div>

      {showTooltip && (
        <div className="absolute top-full right-0 mt-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap z-50 shadow-lg">
          <div className="flex items-center gap-2">
            <span>{getStatusIcon()}</span>
            <span>{getStatusText()}</span>
          </div>
          {connectionQuality === 'offline' && (
            <div className="mt-1 text-gray-300 text-[10px]">
              Your progress is saved
            </div>
          )}
        </div>
      )}
    </div>
  )
}
