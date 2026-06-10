'use client'

import ServiceOptionCard from '@/components/booking-form/service-option-card'
import StepHeading from '@/components/booking-form/steps/step-heading'
import { useCustomerTypes } from '@/lib/queries/use-booking-options'

type ClientTypeStepProps = {
  customer: string
  onSelect: (type: string) => void
}

const ClientTypeStep = ({ customer, onSelect }: ClientTypeStepProps) => {
  const customerTypesQuery = useCustomerTypes()

  return (
    <>
      <StepHeading>Step 1 - Client type</StepHeading>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {customerTypesQuery.data?.map((type) => (
          <ServiceOptionCard
            key={type.id}
            title={type.title}
            description={type.description}
            selected={customer === type.title}
            onClick={() => onSelect(type.title)}
          />
        ))}
        {customerTypesQuery.isLoading && (
          <>
            <ServiceOptionCard title="Loading..." loading />
            <ServiceOptionCard title="Loading..." loading />
          </>
        )}
        {!customerTypesQuery.isLoading &&
          (customerTypesQuery.data?.length ?? 0) === 0 && (
            <ServiceOptionCard title="No customer types" empty />
          )}
        {customerTypesQuery.isError && (
          <p className="text-xs text-destructive">
            Failed to load customer types.
          </p>
        )}
      </div>
    </>
  )
}

export default ClientTypeStep
