import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './Particles.css'

function randomBetween(a, b) {
  return a + Math.random() * (b - a)
}

export default function Particles() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const smokeParticles = []
    const lifeParticles = []

    // Create smoke particles (dark phase)
    for (let i = 0; i < 22; i++) {
      const el = document.createElement('div')
      el.className = 'particle particle-smoke'
      el.style.cssText = `
        left: ${randomBetween(20,80)}%;
        top: ${randomBetween(20,80)}%;
        width: ${randomBetween(3,8)}px;
        height: ${randomBetween(3,8)}px;
        opacity: 0;
      `
      container.appendChild(el)
      smokeParticles.push(el)
    }

    // Life/hope particles (recovery phase)
    for (let i = 0; i < 30; i++) {
      const el = document.createElement('div')
      el.className = 'particle particle-life'
      el.style.cssText = `
        left: ${randomBetween(15,85)}%;
        top: ${randomBetween(20,90)}%;
        width: ${randomBetween(2,5)}px;
        height: ${randomBetween(2,5)}px;
        opacity: 0;
      `
      container.appendChild(el)
      lifeParticles.push(el)
    }

    const ctx = gsap.context(() => {
      // Smoke particles: begin scene 2, intensify scene 3-4
      smokeParticles.forEach((p, i) => {
        gsap.to(p, {
          opacity: randomBetween(0.04, 0.2),
          x: randomBetween(-30, 30),
          y: randomBetween(-40, 10),
          duration: randomBetween(4, 8),
          delay: 2 + i * 0.3,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true
        })
      })

      // Fade out smoke at scene 5
      gsap.to(smokeParticles, {
        opacity: 0, duration: 3, ease: 'power2.out', delay: 15
      })

      // Life particles appear after quit
      lifeParticles.forEach((p, i) => {
        gsap.to(p, {
          opacity: randomBetween(0.15, 0.5),
          x: randomBetween(-20, 20),
          y: randomBetween(-60, -10),
          scale: randomBetween(0.8, 2),
          duration: randomBetween(3, 7),
          delay: 16 + i * 0.2,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true
        })
      })
    })

    return () => {
      ctx.revert()
      smokeParticles.forEach(p => p.remove())
      lifeParticles.forEach(p => p.remove())
    }
  }, [])

  return <div ref={containerRef} className="particles-container" />
}
