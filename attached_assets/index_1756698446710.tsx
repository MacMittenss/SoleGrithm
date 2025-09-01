'use client'

import clsx from 'clsx'
import gsap from 'gsap'
import { useLayoutEffect, useRef, useState } from 'react'
import Logo from '~/assets/svgs/logo.svg'
import { Image } from '~/components/image'
import { Link } from '~/components/link'
import { useStore } from '~/libs/store'
import s from './navigation.module.css'

export const Navigation = () => {
  const headerInnerEl = useRef<HTMLDivElement>(null)
  const collapsed = useStore((state) => state.isNavigationCollapsed)
  const [path, setPath] = useState('')

  useLayoutEffect(() => {
    if (!headerInnerEl.current) return

    const tl = gsap.timeline()

    if (collapsed) {
      tl.to(headerInnerEl.current, {
        yPercent: -175,
        duration: 0.4,
        ease: 'power2.in',
        overwrite: 'auto',
      })
    } else {
      tl.to(headerInnerEl.current, {
        yPercent: 0,
        duration: 1,
        ease: 'expo.out',
        overwrite: 'auto',
      })
    }

    if (window?.location) {
      setPath(window.location.pathname)
    }

    return () => {
      tl.kill()
    }
  }, [collapsed])

  return (
    <div className={s.navigation}>
      <div className={s.headerInner} ref={headerInnerEl}>
        <div className={s.middle}>
          <a href="https://www.viture.com" className={s.logo}>
            <Logo />
          </a>
        </div>
        <div className={s.right}>
          <div className={s.glassesContainer}>
            <Image width={45} height={16} src="/images/icons/glasses.svg" />
          </div>
          <div
            className={clsx(s.basePrice, 'text16_24_normal', 'text-white-40')}
          >
            From <strong className="text-white">$399</strong>
          </div>
          <Link
            href={`https://www.viture.com/product/viture-luma-xr-glasses${path !== '/' ? `?discount=${path.replaceAll('/', '')}` : ''}`}
            className={s.buyLink}
          >
            <div className={s.buttonHover} />
            <span className={clsx(s.linkGradient, 'text16_24_600')}>
              Order Now
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
