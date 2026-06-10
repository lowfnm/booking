type StepHeadingProps = {
  children: string
}

const StepHeading = ({ children }: StepHeadingProps) => (
  <h3 className="text-sm uppercase tracking-[0.12em] text-muted-foreground">
    {children}
  </h3>
)

export default StepHeading
