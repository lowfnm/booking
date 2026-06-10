'use client'

import { useEffect, useRef } from 'react'

const BrandVideoPanel = () => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const play = () => {
      void video.play().catch(() => {})
    }

    video.addEventListener('canplay', play)
    play()

    return () => video.removeEventListener('canplay', play)
  }, [])

  return (
    <section className="relative hidden min-h-full self-stretch overflow-hidden rounded-2xl border border-border/70 bg-black lg:block">
      <video
        ref={videoRef}
        src="/assets/bg.mp4"
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/45 to-black/75" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.16),transparent_30%)]" />

      <div className="relative z-10 flex h-full min-h-[inherit] flex-col justify-end p-8">
        <p className="text-5xl font-light uppercase tracking-[0.18em] text-white/95">
          Noir Crown
        </p>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80">
          Precision grooming for men who treat style as identity.
        </p>
      </div>
    </section>
  )
}

export default BrandVideoPanel
