'use client'

import BezierEasing from 'bezier-easing'
import type { LenisOptions } from 'lenis'
import 'lenis/dist/lenis.css'
import type { LenisRef, LenisProps as ReactLenisProps } from 'lenis/react'
import { ReactLenis, useLenis } from 'lenis/react'
import Snap from 'lenis/snap'
import { useCallback, useEffect, useRef } from 'react'
import { useTempus } from 'tempus/react'
import { useStore } from '@/libs/store'

interface LenisProps extends Omit<ReactLenisProps, 'ref'> {
  root?: boolean
  options?: LenisOptions
}

function LenisManager() {
  const setIsNavigationCollapsed = useStore(
    (state) => state.setIsNavigationCollapsed
  )

  const isLoading = useStore((state) => state.isLoading)

  const lenis = useLenis()

  useEffect(() => {
    if (isLoading) {
      lenis?.stop()
    } else {
      lenis?.start()
    }
  }, [isLoading, lenis])

  const safeSize = 100
  const minimumDistance = 50
  const lastSwitchPosition = useRef(0)
  const distanceSinceLastSwitch = useRef(0)

  const update = useCallback(() => {
    if (!lenis) return

    distanceSinceLastSwitch.current = Math.abs(
      lenis.scroll - lastSwitchPosition.current
    )

    if (
      distanceSinceLastSwitch.current > minimumDistance ||
      lenis.scroll < safeSize
    ) {
      lastSwitchPosition.current = lenis.scroll
      setIsNavigationCollapsed(
        (lenis.direction || 0) > 0 && lenis.scroll > safeSize
      )
    }
  }, [lenis, setIsNavigationCollapsed])

  useLenis(update, [update])

  const setLenisSnap = useStore((state) => state.setLenisSnap)

  useEffect(() => {
    if (lenis) {
      const snap = new Snap(lenis, {
        easing: BezierEasing(0.3, 0, 0, 1),
        duration: 0.75,
      })
      setLenisSnap(snap)

      return () => {
        snap.destroy()
      }
    }
  }, [lenis, setLenisSnap])

  return null
}

export function Lenis({ options, children }: LenisProps) {
  const lenisRef = useRef<LenisRef>(null)

  useTempus((time: number) => {
    if (lenisRef.current?.lenis) {
      lenisRef.current.lenis.raf(time)
    }
  })

  return (
    <>
      <LenisManager />
      <ReactLenis
        ref={lenisRef}
        root="asChild"
        options={{
          ...options,
          lerp: options?.lerp ?? 0.125,
          autoRaf: false,
          anchors: true,
          wheelMultiplier: options?.wheelMultiplier ?? 1,
          touchMultiplier: options?.touchMultiplier ?? 1,
          syncTouch: true,
          prevent: (node: Element | null) =>
            node?.nodeName === 'VERCEL-LIVE-FEEDBACK' ||
            node?.id === 'theatrejs-studio-root',
        }}
        id="lenis"
      >
        {children}
      </ReactLenis>
    </>
  )
}