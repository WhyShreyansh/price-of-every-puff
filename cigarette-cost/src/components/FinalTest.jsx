import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './FinalText.css'

export default function FinalText() {
  const wrapRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const line3Ref = useRef(null)
  const subtitleRef = useRef(null)
  const replayRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // Scene 6 final text
      tl.fromTo(wrapRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.1 },
        19
      )

      tl.fromTo(line1Ref.current,
        { opacity: 0, y: 30, letterSpacing: '0.5em' },
        { opacity: 1, y: 0, letterSpacing: '-0.02em', duration: 2, ease: 'power3.out' },
        19.2
      )

      tl.fromTo(line2Ref.current,
        { opacity: 0, y: 20, scaleX: 0.9 },
        { opacity: 1, y: 0, scaleX: 1, duration: 2, ease: 'power3.out' },
        20.5
      )

      tl.fromTo(line3Ref.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: 'power2.out' },
        22.5
      )

      tl.fromTo(subtitleRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' },
        23.5
      )

      tl.fromTo(replayRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 1 },
        25
      )

    }, wrapRef)
    return () => ctx.revert()
  }, [])

  const handleReplay = () => window.location.reload()

  return (
    <div ref={wrapRef} className="final-wrap" style={{ opacity: 0 }}>
      <div className="final-inner">
        <p ref={line1Ref} className="final-eyebrow" style={{ opacity: 0 }}>EVERY CIGARETTE COSTS</p>
        <h2 ref={line2Ref} className="final-headline" style={{ opacity: 0 }}>
          QUIT<br /><em>TODAY.</em>
        </h2>
        <div ref={line3Ref} className="final-divider" style={{ opacity: 0 }} />
        <p ref={subtitleRef} className="final-sub" style={{ opacity: 0 }}>
          Your future self will thank you.
        </p>
        <button
          ref={replayRef}
          className="final-replay"
          onClick={handleReplay}
          style={{ opacity: 0 }}
        >
          Watch again
        </button>
      </div>
    </div>
  )
}
