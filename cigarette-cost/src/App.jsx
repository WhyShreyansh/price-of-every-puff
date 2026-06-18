import { useRef, useState } from 'react'
import gsap from 'gsap'
import Scene from './components/Scene'
import './index.css'
import './App.css'

export default function App() {
  const [started, setStarted] = useState(false)
  const overlayRef = useRef(null)

  const handleStart = () => {
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut',
      onComplete: () => setStarted(true)
    })
  }

  return (
    <div className="app">
      {!started && (
        <div ref={overlayRef} className="start-overlay">
          <div className="start-content">
            <p className="start-eyebrow">A CINEMATIC EXPERIENCE</p>
            <h1 className="start-title">The Cost of<br /><em>a Cigarette</em></h1>
            <p className="start-sub">A short film about time, choice, and the life you get back.</p>
            <button className="start-btn" onClick={handleStart}>
              <span>Begin</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <div className="start-grain" />
        </div>
      )}
      {started && <Scene />}
    </div>
  )
}
