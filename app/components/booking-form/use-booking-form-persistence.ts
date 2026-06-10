'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useWatch, type UseFormReturn } from 'react-hook-form'

import { BOOKING_FORM_DEFAULTS } from '@/constants/booking-form'
import { BOOKING_STEP_QUERY_PARAM } from '@/constants/booking-steps'
import {
  clearBookingDraft,
  readBookingDraft,
  writeBookingDraft,
} from '@/lib/booking-form-persistence'
import {
  clampStepToProgress,
  formatStepParam,
  isCanonicalStepParam,
  parseStepParam,
} from '@/lib/booking-step'
import { formatPhoneMask } from '@/lib/format-phone-mask'
import type { BookingFormStateType } from '@/types/booking-form'

type UseBookingFormPersistenceParams = {
  form: UseFormReturn<BookingFormStateType>
}

export const useBookingFormPersistence = ({
  form,
}: UseBookingFormPersistenceParams) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [step, setStepState] = useState(1)
  const [isHydrated, setIsHydrated] = useState(false)
  const watchedValues = useWatch({ control: form.control }) as BookingFormStateType

  const syncStepToUrl = useCallback(
    (nextStep: number) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(BOOKING_STEP_QUERY_PARAM, formatStepParam(nextStep))
      const query = params.toString()
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      })
    },
    [pathname, router, searchParams]
  )

  useEffect(() => {
    const draft = readBookingDraft()
    const values = { ...(draft?.values ?? BOOKING_FORM_DEFAULTS) }

    if (values.phone) {
      values.phone = formatPhoneMask(values.phone)
    }

    form.reset(values)

    const rawStepParam = new URLSearchParams(window.location.search).get(
      BOOKING_STEP_QUERY_PARAM
    )
    const urlStep = parseStepParam(rawStepParam)
    const resolvedStep = clampStepToProgress(urlStep, values)

    setStepState(resolvedStep)
    setIsHydrated(true)
    // Hydrate once on mount from storage + initial URL.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!isHydrated) return

    const currentStepParam = searchParams.get(BOOKING_STEP_QUERY_PARAM)
    if (isCanonicalStepParam(currentStepParam, step)) return

    syncStepToUrl(step)
  }, [isHydrated, searchParams, step, syncStepToUrl])

  useEffect(() => {
    if (!isHydrated) return
    writeBookingDraft(watchedValues)
  }, [isHydrated, watchedValues])

  const setStep = useCallback(
    (next: number | ((prev: number) => number)) => {
      setStepState((prev) => {
        const target = typeof next === 'function' ? next(prev) : next
        return clampStepToProgress(target, form.getValues())
      })
    },
    [form]
  )

  const clearPersistence = useCallback(() => {
    clearBookingDraft()
    const params = new URLSearchParams(searchParams.toString())
    params.delete(BOOKING_STEP_QUERY_PARAM)
    const query = params.toString()
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false })
  }, [pathname, router, searchParams])

  return {
    step,
    setStep,
    isHydrated,
    clearPersistence,
  }
}
