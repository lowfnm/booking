import type { FC, PropsWithChildren, ReactElement, ReactNode } from 'react'
import { Children, cloneElement, isValidElement, useState } from 'react'
import { ChevronLeft, ChevronRight, Circle } from 'tabler-icons-react'
import { motion } from 'framer-motion'

export type StepperChildProps = {
  onSubmitStep?: () => any
}

const convertToNewChildren = (
  children: ReactNode,
  extraProps: StepperChildProps
): ReactElement<StepperChildProps>[] => {
  const mappedChildren = Children.map(children, (child) => {
    if (isValidElement<StepperChildProps>(child)) {
      return cloneElement(child, extraProps)
    }
    return null
  })

  return mappedChildren?.filter(Boolean) as ReactElement<StepperChildProps>[]
}

const Stepper: FC<PropsWithChildren> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [maxVisitedStep, setMaxVisitedStep] = useState(0)

  const goToStep = (step: number) => {
    setCurrentStep(step)
    setMaxVisitedStep((prev) => Math.max(prev, step))
  }

  const ChildrenArray = convertToNewChildren(children, {
    onSubmitStep: () => !isLastStep && goToStep(currentStep + 1),
  })

  if (!ChildrenArray.length) return null

  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === ChildrenArray.length - 1
  const isPrevButtonActive = !isFirstStep
  const isNextButtonActive = !isLastStep && currentStep < maxVisitedStep

  return (
    <div className="mx-auto">
      <div className="relative mx-auto mb-5 mt-5 flex w-44 items-center justify-center">
        {isPrevButtonActive && (
          <motion.button
            type="button"
            disabled={!isPrevButtonActive}
            onClick={() => goToStep(currentStep - 1)}
            whileHover={{ scale: 1.1 }}
            className="absolute left-0 mr-auto"
          >
            <ChevronLeft size={30} strokeWidth={1} />
          </motion.button>
        )}
        <div className="flex w-20 items-center justify-between">
          {ChildrenArray.map((child, index) => (
            <motion.button
              key={index}
              type="button"
              onClick={() => goToStep(index)}
              disabled={index > maxVisitedStep}
              whileHover={
                index < maxVisitedStep ? { scale: 1.1 } : { scale: 1 }
              }
              whileTap={index < maxVisitedStep ? { scale: 0.9 } : { scale: 1 }}
            >
              <Circle
                size={15}
                strokeWidth={2}
                color={currentStep !== index ? '#bda25b' : '#fff'}
                fill={currentStep === index ? '#bda25b' : '#fff'}
              />
            </motion.button>
          ))}
        </div>
        {isNextButtonActive && (
          <motion.button
            type="button"
            disabled={!isNextButtonActive}
            onClick={() => goToStep(currentStep + 1)}
            whileHover={{ scale: 1.1 }}
            className="absolute right-0 ml-auto"
          >
            <ChevronRight size={30} strokeWidth={1} />
          </motion.button>
        )}
      </div>
      {ChildrenArray.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0.5, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className={`${currentStep !== index && 'hidden'}`}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}

export default Stepper
