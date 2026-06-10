'use client'

import ServiceOptionCard from '@/components/booking-form/service-option-card'
import StepHeading from '@/components/booking-form/steps/step-heading'
import { useLocations } from '@/lib/queries/use-booking-options'

type BranchStepProps = {
  location: string
  onSelect: (branch: string) => void
}

const BranchStep = ({ location, onSelect }: BranchStepProps) => {
  const locationsQuery = useLocations()

  return (
    <>
      <StepHeading>Step 2 - Branch</StepHeading>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {locationsQuery.data?.map((item) => (
          <ServiceOptionCard
            key={item.id}
            title={item.title}
            description={item.description}
            selected={location === item.title}
            onClick={() => onSelect(item.title)}
          />
        ))}
        {locationsQuery.isLoading && (
          <>
            <ServiceOptionCard title="Loading..." loading />
            <ServiceOptionCard title="Loading..." loading />
          </>
        )}
        {!locationsQuery.isLoading &&
          (locationsQuery.data?.length ?? 0) === 0 && (
            <ServiceOptionCard title="No locations" empty />
          )}
        {locationsQuery.isError && (
          <p className="text-xs text-destructive">Failed to load locations.</p>
        )}
      </div>
    </>
  )
}

export default BranchStep
