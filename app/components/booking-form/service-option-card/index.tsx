import { Loader2 } from 'lucide-react'

import { cn } from '@/lib/utils'

type ServiceOptionCardProps = {
  title: string
  description?: string
  meta?: string
  selected?: boolean
  loading?: boolean
  disabled?: boolean
  empty?: boolean
  onClick?: () => void
}

const ServiceOptionCard = ({
  title,
  description,
  meta,
  selected = false,
  loading = false,
  disabled = false,
  empty = false,
  onClick,
}: ServiceOptionCardProps) => {
  return (
    <button
      type="button"
      disabled={disabled || loading || empty}
      onClick={onClick}
      className={cn(
        'w-full rounded-lg border bg-secondary/80 p-4 text-left transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        selected && 'border-primary bg-primary/15',
        !selected && 'border-border hover:border-primary/50 hover:bg-secondary',
        (disabled || empty) && 'cursor-not-allowed opacity-60'
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-sm font-semibold uppercase tracking-[0.1em] text-foreground">
            {title}
          </p>
          {description ? (
            <p className="text-xs text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        ) : null}
      </div>

      {empty ? (
        <p className="mt-2 text-xs text-muted-foreground">
          No options available.
        </p>
      ) : null}

      {meta ? (
        <p className="mt-3 text-xs uppercase tracking-[0.08em] text-primary">
          {meta}
        </p>
      ) : null}
    </button>
  )
}

export default ServiceOptionCard
