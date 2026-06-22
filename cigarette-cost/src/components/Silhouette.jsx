import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './Silhouette.css'

export default function Silhouette() {
  const wrapRef = useRef(null)
  const figureRef = useRef(null)
  const hairRef = useRef(null)
  const ageLineRef = useRef(null)
  const yearCountRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // Scene 3: silhouette appears
      tl.fromTo(wrapRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 2, ease: 'power2.out' },
        5
      )

      // Aging: posture worsens, hair grays
      tl.to(figureRef.current, {
        skewX: -3, scaleY: 0.96, y: 6,
        duration: 6, ease: 'power1.inOut'
      }, 7)

      // Hair grays
      tl.to(hairRef.current, {
        fill: '#8a8a8a', duration: 5, ease: 'power1.inOut'
      }, 8)

      // Years counter
      const obj = { year: 2024 }
      tl.to(obj, {
        year: 2044, duration: 7, ease: 'power2.in',
        onUpdate: () => {
          if (yearCountRef.current)
            yearCountRef.current.textContent = Math.floor(obj.year)
        }
      }, 6)

      // Scene 5: straighten up (quit)
      tl.to(figureRef.current, {
        skewX: 0, scaleY: 1, y: 0,
        duration: 2, ease: 'power2.out'
      }, 15)

      // Scene 6: recover
      tl.to(hairRef.current, {
        fill: '#2c1a0e', duration: 3, ease: 'power1.inOut'
      }, 17)

      // Age counter slows and stabilizes
      tl.to(obj, {
        year: 2024, duration: 3, ease: 'power2.out',
        onUpdate: () => {
          if (yearCountRef.current)
            yearCountRef.current.textContent = Math.floor(obj.year)
        }
      }, 15.5)

      tl.to(ageLineRef.current, {
        opacity: 0, duration: 2
      }, 18)

    }, wrapRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapRef} className="silhouette-wrap" style={{ opacity: 0 }}>
      <div ref={ageLineRef} className="age-display">
        <span className="age-label">YEAR</span>
        <span ref={yearCountRef} className="age-year">2024</span>
      </div>

      <svg ref={figureRef} className="figure-svg" viewBox="0 0 120 220" fill="none">
        {/* Head */}
        <circle cx="60" cy="28" r="18" fill="rgba(232,224,208,0.15)" stroke="rgba(232,224,208,0.4)" strokeWidth="1"/>

        {/* Hair */}
        <path
          ref={hairRef}
          d="M42 22 Q44 8 60 6 Q76 8 78 22 Q76 14 60 12 Q44 14 42 22Z"
          fill="#2c1a0e"
        />

        {/* Neck */}
        <rect x="56" y="44" width="8" height="12" rx="2" fill="rgba(232,224,208,0.2)" stroke="rgba(232,224,208,0.3)" strokeWidth="0.8"/>

        {/* Torso */}
        <path d="M38 58 Q38 50 60 50 Q82 50 82 58 L88 110 Q88 118 60 118 Q32 118 32 110 Z"
          fill="rgba(232,224,208,0.08)" stroke="rgba(232,224,208,0.3)" strokeWidth="0.8"/>

        {/* Left arm */}
        <path d="M38 62 Q26 78 22 100" stroke="rgba(232,224,208,0.35)" strokeWidth="7" strokeLinecap="round"/>
        <path d="M22 100 Q18 112 20 120" stroke="rgba(232,224,208,0.25)" strokeWidth="6" strokeLinecap="round"/>

        {/* Right arm */}
        <path d="M82 62 Q94 78 98 100" stroke="rgba(232,224,208,0.35)" strokeWidth="7" strokeLinecap="round"/>
        <path d="M98 100 Q102 112 100 120" stroke="rgba(232,224,208,0.25)" strokeWidth="6" strokeLinecap="round"/>

        {/* Left leg */}
        <path d="M50 118 Q46 148 44 172" stroke="rgba(232,224,208,0.35)" strokeWidth="8" strokeLinecap="round"/>
        <path d="M44 172 Q42 188 40 200" stroke="rgba(232,224,208,0.3)" strokeWidth="7" strokeLinecap="round"/>

        {/* Right leg */}
        <path d="M70 118 Q74 148 76 172" stroke="rgba(232,224,208,0.35)" strokeWidth="8" strokeLinecap="round"/>
        <path d="M76 172 Q78 188 80 200" stroke="rgba(232,224,208,0.3)" strokeWidth="7" strokeLinecap="round"/>

        {/* Feet */}
        <ellipse cx="38" cy="204" rx="10" ry="4" fill="rgba(232,224,208,0.2)"/>
        <ellipse cx="82" cy="204" rx="10" ry="4" fill="rgba(232,224,208,0.2)"/>
      </svg>
    </div>
  )
}
