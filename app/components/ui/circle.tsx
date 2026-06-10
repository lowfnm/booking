import type { FC } from 'react'
import { motion } from 'framer-motion'

type Props = {
  text: string
  className?: string
  disabled?: boolean
}

const Circle: FC<Props> = (props) => {
  const { disabled, text, className } = props

  return (
    <motion.div
      whileHover={disabled ? {} : { scale: 1.1 }}
      className={`bg-primaryColor flex h-[85px] w-[85px] cursor-pointer items-center justify-center whitespace-pre-line rounded-full text-center text-[8.5px] font-semibold uppercase tracking-widest text-white hover:text-black hover:shadow-xl ${className}`}
    >
      {text}
    </motion.div>
  )
}

export default Circle
