import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Particles from './Particles'
import Clock from './Clock'
import Silhouette from './Silhouette'
import CalendarPages from './CalendarPages'
import CigaretteEl from './CigaretteEl'
import HealthBar from './HealthBar'
import FinalText from './FinalText'
import './Scene.css'

export default function Scene() {
  const sceneRef = useRef(null)
  const bgRef = useRef(null)
  const vignetteRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 })

      // BG color shifts across scenes
      tl.to(bgRef.current, { background: 'radial-gradient(ellipse at 50% 70%, #1a100a 0%, #0a0a0b 65%)', duration: 2, ease: 'power1.inOut' }, 'scene2')
        .to(bgRef.current, { background: 'radial-gradient(ellipse at 50% 70%, #120808 0%, #060608 70%)', duration: 3, ease: 'power1.inOut' }, 'scene3')
        .to(bgRef.current, { background: 'radial-gradient(ellipse at 50% 70%, #0d0506 0%, #040407 70%)', duration: 2, ease: 'power1.inOut' }, 'scene4')
        .to(bgRef.current, { background: 'radial-gradient(ellipse at 50% 50%, #06110a 0%, #060a0b 70%)', duration: 3, ease: 'power2.inOut' }, 'scene6')

      // Vignette intensifies then relaxes
      tl.to(vignetteRef.current, { opacity: 0.7, duration: 4 }, 'scene3')
        .to(vignetteRef.current, { opacity: 0.9, duration: 2 }, 'scene4')
        .to(vignetteRef.current, { opacity: 0.2, duration: 4, ease: 'power2.inOut' }, 'scene6')

    }, sceneRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sceneRef} className="scene">
      <div ref={bgRef} className="scene-bg" />
      <div ref={vignetteRef} className="scene-vignette" />
      <div className="grain-overlay" />

      <Particles />
      <Clock />
      <CalendarPages />
      <CigaretteEl />
      <Silhouette />
      <HealthBar />
      <FinalText />
    </div>
  )
}
