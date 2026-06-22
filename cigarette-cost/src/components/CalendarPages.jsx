import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './CalendarPages.css'

const PAGES = [
  { year: '2024', month: 'JAN' },
  { year: '2025', month: 'APR' },
  { year: '2026', month: 'AUG' },
  { year: '2027', month: 'MAR' },
  { year: '2028', month: 'NOV' },
  { year: '2029', month: 'JUL' },
  { year: '2030', month: 'FEB' },
  { year: '2031', month: 'OCT' },
  { year: '2033', month: 'JUN' },
  { year: '2036', month: 'DEC' },
]

export default function CalendarPages() {
  const containerRef = useRef(null)
  const pagesRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const pages = pagesRef.current.filter(Boolean)

      pages.forEach((page, i) => {
        const delay = 5 + i * 0.7
        gsap.fromTo(page,
          { opacity: 0, x: -20, y: 0, rotation: -5, scale: 0.9 },
          {
            opacity: 1, x: 0, y: 0, rotation: 0, scale: 1,
            duration: 0.4, ease: 'back.out(1.5)',
            delay
          }
        )
        gsap.to(page, {
          opacity: 0, x: 120, y: -80, rotation: 20, scale: 0.7,
          duration: 0.6, ease: 'power2.in',
          delay: delay + 0.6
        })
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="calendar-container">
      {PAGES.map((p, i) => (
        <div
          key={i}
          ref={el => pagesRef.current[i] = el}
          className="calendar-page"
          style={{ opacity: 0 }}
        >
          <div className="cal-month">{p.month}</div>
          <div className="cal-year">{p.year}</div>
          <div className="cal-grid">
            {Array.from({length:28}).map((_,j) => (
              <span key={j} className="cal-day">{j+1}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
