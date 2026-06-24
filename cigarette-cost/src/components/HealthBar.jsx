import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './HealthBar.css'

const METRICS = [
  { label: 'Lung Capacity', id: 'lung', color: '#7ecba1' },
  { label: 'Energy',        id: 'energy', color: '#a8d8ea' },
  { label: 'Life Quality',  id: 'quality', color: '#c5a3d8' },
]

export default function HealthBar() {
  const wrapRef = useRef(null)
  const barsRef = useRef({})

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // Appear at scene 3
      tl.fromTo(wrapRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 1.5, ease: 'power2.out' },
        6
      )

      // Drain during time rush
      METRICS.forEach(m => {
        tl.to(barsRef.current[m.id], {
          width: '18%', duration: 7, ease: 'power2.in'
        }, 7)
      })

      // Recovery after quit
      METRICS.forEach(m => {
        tl.to(barsRef.current[m.id], {
          width: '72%',
          backgroundColor: m.color,
          boxShadow: `0 0 10px ${m.color}55`,
          duration: 4, ease: 'power2.out'
        }, 16)
      })

      // Fade at final text
      tl.to(wrapRef.current, { opacity: 0, duration: 1.5 }, 20)

    }, wrapRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapRef} className="health-wrap" style={{ opacity: 0 }}>
      <p className="health-title">VITALS</p>
      {METRICS.map(m => (
        <div key={m.id} className="health-row">
          <span className="health-label">{m.label}</span>
          <div className="health-track">
            <div
              ref={el => barsRef.current[m.id] = el}
              className="health-fill"
              style={{ width: '85%', backgroundColor: m.color }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
