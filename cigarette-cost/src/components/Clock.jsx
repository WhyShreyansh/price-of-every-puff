import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './Clock.css'

export default function Clock() {
  const wrapRef = useRef(null)
  const hourRef = useRef(null)
  const minRef = useRef(null)
  const secRef = useRef(null)
  const glowRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // Fade in clock at scene 2
      tl.fromTo(wrapRef.current,
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, duration: 1.5, ease: 'back.out(1.7)' },
        2.8
      )

      // Normal speed rotation initially
      tl.to(secRef.current, { rotation: 360 * 3, duration: 4, ease: 'none' }, 3)
      tl.to(minRef.current, { rotation: 360, duration: 4, ease: 'none' }, 3)
      tl.to(hourRef.current, { rotation: 60, duration: 4, ease: 'none' }, 3)

      // Scene 3-4: ACCELERATE — years flying
      tl.to(secRef.current, { rotation: '+=360*20', duration: 6, ease: 'power2.in' }, 7)
      tl.to(minRef.current, { rotation: '+=360*8', duration: 6, ease: 'power2.in' }, 7)
      tl.to(hourRef.current, { rotation: '+=360*3', duration: 6, ease: 'power2.in' }, 7)

      // Glow red as time flies
      tl.to(glowRef.current, { opacity: 0.7, duration: 2 }, 8)
      tl.to(wrapRef.current, { '--clock-color': '#cc3300', duration: 2 }, 8)

      // Scene 5-6: Throw cigarette, time slows
      tl.to(secRef.current, { rotation: '+=360*2', duration: 4, ease: 'power2.out' }, 14)
      tl.to(minRef.current, { rotation: '+=60', duration: 4, ease: 'power2.out' }, 14)
      tl.to(glowRef.current, { opacity: 0, duration: 2.5 }, 15)
      tl.to(wrapRef.current, { opacity: 0.3, duration: 2 }, 17)

    }, wrapRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapRef} className="clock-wrap" style={{ opacity: 0 }}>
      <div ref={glowRef} className="clock-glow" />
      <svg className="clock-face" viewBox="0 0 100 100">
        {/* Tick marks */}
        {Array.from({length: 12}).map((_, i) => {
          const angle = (i * 30 - 90) * Math.PI / 180
          const x1 = 50 + 42 * Math.cos(angle)
          const y1 = 50 + 42 * Math.sin(angle)
          const x2 = 50 + 36 * Math.cos(angle)
          const y2 = 50 + 36 * Math.sin(angle)
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(232,224,208,0.3)" strokeWidth="1.5" />
        })}
        {/* Minor ticks */}
        {Array.from({length: 60}).map((_, i) => {
          if (i % 5 === 0) return null
          const angle = (i * 6 - 90) * Math.PI / 180
          const x1 = 50 + 42 * Math.cos(angle)
          const y1 = 50 + 42 * Math.sin(angle)
          const x2 = 50 + 39 * Math.cos(angle)
          const y2 = 50 + 39 * Math.sin(angle)
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(232,224,208,0.1)" strokeWidth="0.8" />
        })}
        <circle cx="50" cy="50" r="43" fill="none" stroke="rgba(232,224,208,0.15)" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="2" fill="rgba(232,224,208,0.6)" />
      </svg>

      {/* Hour hand */}
      <div ref={hourRef} className="clock-hand clock-hour" style={{ transformOrigin: '50% 70%' }}>
        <div className="hand-bar hand-hour-bar" />
      </div>

      {/* Minute hand */}
      <div ref={minRef} className="clock-hand clock-min" style={{ transformOrigin: '50% 72%' }}>
        <div className="hand-bar hand-min-bar" />
      </div>

      {/* Second hand */}
      <div ref={secRef} className="clock-hand clock-sec" style={{ transformOrigin: '50% 75%' }}>
        <div className="hand-bar hand-sec-bar" />
      </div>
    </div>
  )
}
