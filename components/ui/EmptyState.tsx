import { Button } from './Button'

export interface EmptyStateProps {
  icon?: string | React.ReactNode
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
}

export function EmptyState({
  icon = '📚',
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="text-6xl mb-4">{typeof icon === 'string' ? icon : icon}</div>

      <h3 className="text-child-xl font-semibold text-gray-900 mb-2">
        {title}
      </h3>

      {description && (
        <p className="text-child-base text-gray-500 max-w-md mb-6">
          {description}
        </p>
      )}

      {action && <Button onClick={action.onClick}>{action.label}</Button>}
    </div>
  )
}
