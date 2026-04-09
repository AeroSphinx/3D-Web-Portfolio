import { useEffect, useRef, useState } from 'react'

/**
 * useScrollAnimation — returns { ref, inView }
 * Triggers once when the element enters the viewport.
 *
 * @param {string} margin - IntersectionObserver rootMargin (default: '-10% 0px')
 */
export function useScrollAnimation(margin = '-10% 0px') {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(el) // trigger once
        }
      },
      { rootMargin: margin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [margin])

  return { ref, inView }
}

/**
 * useParallax — returns a Y offset value based on scroll position.
 * Bind the returned value to a motion element's `y` prop.
 *
 * @param {number} speed - Parallax multiplier (default: 0.15)
 */
export function useParallax(speed = 0.15) {
  const [offsetY, setOffsetY] = useState(0)

  useEffect(() => {
    const onScroll = () => setOffsetY(window.scrollY * speed)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [speed])

  return offsetY
}
