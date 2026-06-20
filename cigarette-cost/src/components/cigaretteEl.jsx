import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './CigaretteEl.css'

export default function CigaretteEl() {
  const wrapRef = useRef(null)
  const cigaretteRef = useRef(null)
  const emberRef = useRef(null)
  const smokeRef = useRef(null)
  const burnRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // Scene 1: Cigarette materializes
      tl.fromTo(wrapRef.current,
        { opacity: 0, y: 30, scale: 0.85 },
        { opacity: 1, y: 0, scale: 1, duration: 2.5, ease: 'power3.out' }
      )

      // Scene 2: Light it - ember glows
      tl.to(emberRef.current, {
        opacity: 1, boxShadow: '0 0 12px 4px #ff4d00, 0 0 30px 10px rgba(255,77,0,0.3)',
        duration: 1.2, ease: 'power2.inOut'
      }, '+=0.5')

      // Smoke starts
      tl.to(smokeRef.current, { opacity: 1, duration: 1 }, '-=0.5')

      // Burn line progresses (cigarette shortens)
      tl.to(burnRef.current, {
        width: '65%', duration: 12, ease: 'none'
      }, '-=0.5')

      // Scene 5: Character looks at it, hesitates
      tl.to(wrapRef.current, {
        x: 0, rotation: 0, duration: 0.5
      }, '+=1')

      // Throws it: fly off screen
      tl.to(wrapRef.current, {
        x: 300, y: 200, rotation: 180,
        opacity: 0, scale: 0.3,
        duration: 1.2, ease: 'power2.in'
      }, '+=0.8')

    }, wrapRef)

    // Smoke puff loop
    const smokeCtx = gsap.context(() => {
      gsap.to('.smoke-particle', {
        y: -80, x: 'random(-15,15)', opacity: 0, scale: 1.5,
        duration: 2.5, ease: 'power1.out',
        stagger: { each: 0.4, repeat: -1, yoyo: false },
        delay: 3.5
      })
    })

    return () => { ctx.revert(); smokeCtx.revert() }
  }, [])

  return (
    <div ref={wrapRef} className="cigarette-wrap" style={{ opacity: 0 }}>
      <div ref={smokeRef} className="smoke-container" style={{ opacity: 0 }}>
        {[0,1,2].map(i => (
          <div key={i} className="smoke-particle" style={{ animationDelay: `${i*0.4}s` }} />
        ))}
      </div>
      <div ref={cigaretteRef} className="cigarette">
        <div ref={burnRef} className="cigarette-burn" />
        <div className="cigarette-body" />
        <div className="cigarette-filter" />
        <div ref={emberRef} className="cigarette-ember" style={{ opacity: 0 }} />
      </div>
      <div className="cigarette-label">A single cigarette</div>
    </div>
  )
}
