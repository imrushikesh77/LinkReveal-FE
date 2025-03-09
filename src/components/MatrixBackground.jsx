"use client"

import { useEffect, useRef } from "react"

function MatrixBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // Initialize canvas size
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Matrix effect variables
    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)
    const drops = []

    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -canvas.height)
    }

    // Characters to display
    const chars = "01"

    // Drawing function
    const draw = () => {
      // Add semi-transparent black rectangle on top of previous frame
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Set text color and font
      ctx.fillStyle = "#0f0"
      ctx.font = `${fontSize}px monospace`

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = chars[Math.floor(Math.random() * chars.length)]

        // Draw character
        const x = i * fontSize
        const y = drops[i] * fontSize

        // Vary the opacity for a more dynamic effect
        const opacity = Math.random() * 0.5 + 0.3
        ctx.fillStyle = `rgba(0, 255, 0, ${opacity})`

        ctx.fillText(char, x, y)

        // Move drop down
        drops[i]++

        // Reset drop position with some randomness
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = Math.floor(Math.random() * -20)
        }
      }
    }

    // Animation loop with reduced frame rate for better performance
    let lastTime = 0
    const interval = 50 // ms between frames (lower = faster)

    const animate = (time) => {
      if (time - lastTime >= interval) {
        draw()
        lastTime = time
      }
      animationId = requestAnimationFrame(animate)
    }

    let animationId = requestAnimationFrame(animate)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-30" aria-hidden="true" />
}

export default MatrixBackground

