import { CURRENT_YEAR } from '@/constants'

const Footer = () => {
  return (
    <footer className="relative z-10 mt-auto flex w-full justify-center border-t border-border/70 py-2">
      <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
        © {CURRENT_YEAR} Noir Crown Barber Atelier. All Rights Reserved.
      </p>
    </footer>
  )
}

export default Footer
