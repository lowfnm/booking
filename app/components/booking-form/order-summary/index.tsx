'use client'

import {
  calculateBookingPriceBreakdown,
  formatMoney,
} from '@/lib/booking-pricing'
import type { BookingService } from '@/lib/mock-booking-api'
import { cn } from '@/lib/utils'

type OrderSummaryProps = {
  service: BookingService | undefined
  addOnIds: string[]
  tipOption: string
  tipCustomAmount: string
  paymentMethodLabel?: string
  className?: string
}

const SummaryRow = ({
  label,
  value,
  emphasis = false,
}: {
  label: string
  value: string
  emphasis?: boolean
}) => (
  <div
    className={cn(
      'flex items-center justify-between gap-3 text-sm',
      emphasis ? 'text-foreground' : 'text-muted-foreground'
    )}
  >
    <span>{label}</span>
    <span className={emphasis ? 'font-semibold' : ''}>{value}</span>
  </div>
)

const OrderSummary = ({
  service,
  addOnIds,
  tipOption,
  tipCustomAmount,
  paymentMethodLabel,
  className,
}: OrderSummaryProps) => {
  const breakdown = calculateBookingPriceBreakdown(
    service,
    addOnIds,
    tipOption,
    tipCustomAmount
  )

  return (
    <aside
      className={cn(
        'rounded-lg border border-border/80 bg-secondary/30 p-4',
        className
      )}
    >
      <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
        Order summary
      </p>

      <div className="mt-4 space-y-2 border-b border-border/70 pb-4">
        {breakdown.lineItems.map((item) => (
          <SummaryRow
            key={item.label}
            label={item.label}
            value={formatMoney(item.amount)}
          />
        ))}
        {breakdown.lineItems.length === 0 && (
          <p className="text-sm text-muted-foreground">No services selected.</p>
        )}
      </div>

      <div className="mt-4 space-y-2">
        <SummaryRow
          label="Subtotal"
          value={formatMoney(breakdown.subtotal)}
        />
        <SummaryRow
          label={`VAT (${Math.round(breakdown.vatRate * 100)}%)`}
          value={formatMoney(breakdown.vat)}
        />
        {breakdown.tip > 0 && (
          <SummaryRow label="Tip" value={formatMoney(breakdown.tip)} />
        )}
        {paymentMethodLabel && (
          <SummaryRow label="Payment" value={paymentMethodLabel} />
        )}
      </div>

      <div className="mt-4 flex items-end justify-between border-t border-border/70 pt-4">
        <span className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
          Total due
        </span>
        <span className="text-2xl font-semibold text-foreground">
          {formatMoney(breakdown.total)}
        </span>
      </div>
    </aside>
  )
}

export default OrderSummary
