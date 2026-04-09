import React, { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia('(hover: none)').matches) return

    let dotX = 0, dotY = 0
    let ringX = 0, ringY = 0
    let raf

    const onMove = (e) => {
      dotX = e.clientX
      dotY = e.clientY
    }

    const animate = () => {
      ringX += (dotX - ringX) * 0.14
      ringY += (dotY - ringY) * 0.14

      if (dotRef.current) {
        dotRef.current.style.left = `${dotX}px`
        dotRef.current.style.top = `${dotY}px`
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`
        ringRef.current.style.top = `${ringY}px`
      }
      raf = requestAnimationFrame(animate)
    }

    const onHoverIn = () => setHovered(true)
    const onHoverOut = () => setHovered(false)

    window.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', onHoverIn)
      el.addEventListener('mouseleave', onHoverOut)
    })

    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className={`cursor-ring ${hovered ? 'hovered' : ''}`} />
    </>
  )
}
