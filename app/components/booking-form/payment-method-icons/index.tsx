import {
  PAYMENT_ICON_DARK_SLOT,
  PAYMENT_ICON_PATHS,
} from '@/assets/icons/payment'
import type { PaymentMethodId } from '@/constants/payment'
import { cn } from '@/lib/utils'

type PaymentMethodIconMarkProps = {
  methodId: PaymentMethodId
}

export const PaymentMethodIconMark = ({
  methodId,
}: PaymentMethodIconMarkProps) => {
  const src = PAYMENT_ICON_PATHS[methodId]
  const isDarkSlot = PAYMENT_ICON_DARK_SLOT.has(methodId)
  const isFullBleed = methodId === 'amex'

  return (
    <span
      className={cn(
        'flex h-8 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md',
        isDarkSlot ? 'bg-black px-1' : 'bg-white px-1.5',
        isFullBleed && 'p-0'
      )}
    >
      <img
        src={src}
        alt=""
        aria-hidden
        className={cn(
          'object-contain',
          isFullBleed ? 'h-full w-full' : 'h-5 w-full max-w-[40px]'
        )}
      />
    </span>
  )
}
