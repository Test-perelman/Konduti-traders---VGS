'use client'

import { useEffect, useRef, useCallback } from 'react'

const TOTAL_FRAMES = 60
const FRAME_PREFIX = '/scroll_animation_frames/ezgif-frame-'
const EAGER_PRELOAD_COUNT = 12

function padFrame(n: number): string {
  return String(n).padStart(3, '0')
}

interface UseScrollAnimationOptions {
  /** Height multiplier for the scroll container in vh units. Default: 600 */
  scrollHeightVh?: number
}

export function useScrollAnimation(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  containerRef: React.RefObject<HTMLDivElement>,
  options: UseScrollAnimationOptions = {}
) {
  const { scrollHeightVh = 600 } = options
  const framesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null))
  const currentFrameRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const resizeRafRef = useRef<number | null>(null)
  const isReducedMotionRef = useRef(false)

  // Draw a specific frame index to the canvas
  const drawFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d', { alpha: false })
      if (!ctx) return

      const clampedIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, index))
      const img = framesRef.current[clampedIndex]
      if (!img || !img.complete || img.naturalWidth === 0) return

      // Cover-fit the image to canvas
      const canvasAspect = canvas.width / canvas.height
      const imgAspect = img.naturalWidth / img.naturalHeight
      let drawX = 0,
        drawY = 0,
        drawW = canvas.width,
        drawH = canvas.height

      if (imgAspect > canvasAspect) {
        drawH = canvas.height
        drawW = canvas.height * imgAspect
        drawX = (canvas.width - drawW) / 2
      } else {
        drawW = canvas.width
        drawH = canvas.width / imgAspect
        drawY = (canvas.height - drawH) / 2
      }

      ctx.drawImage(img, drawX, drawY, drawW, drawH)
    },
    [canvasRef]
  )

  // Load all frames — first EAGER_PRELOAD_COUNT eagerly, the rest lazily
  const loadFrames = useCallback(() => {
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image()
      img.src = `${FRAME_PREFIX}${padFrame(i)}.jpg`
      if (i <= EAGER_PRELOAD_COUNT) {
        img.decoding = 'sync'
      } else {
        img.decoding = 'async'
        img.loading = 'lazy'
      }
      img.onload = () => {
        framesRef.current[i - 1] = img
        // Redraw if this is the current frame
        if (i - 1 === currentFrameRef.current) {
          drawFrame(currentFrameRef.current)
        }
      }
      framesRef.current[i - 1] = img
    }
  }, [drawFrame])

  // Handle scroll: calculate frame index and schedule draw
  const handleScroll = useCallback(() => {
    if (isReducedMotionRef.current) return

    const container = containerRef.current
    if (!container) return

    const containerTop = container.getBoundingClientRect().top + window.scrollY
    const scrolled = window.scrollY - containerTop
    const scrollHeight = container.scrollHeight - window.innerHeight
    const progress = Math.max(0, Math.min(1, scrolled / scrollHeight))
    const targetFrame = Math.floor(progress * (TOTAL_FRAMES - 1))

    if (targetFrame !== currentFrameRef.current) {
      currentFrameRef.current = targetFrame
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        drawFrame(targetFrame)
        rafRef.current = null
      })
    }
  }, [containerRef, drawFrame])

  // Handle resize: update canvas dimensions and redraw
  const handleResize = useCallback(() => {
    if (resizeRafRef.current !== null) cancelAnimationFrame(resizeRafRef.current)
    resizeRafRef.current = requestAnimationFrame(() => {
      const canvas = canvasRef.current
      if (!canvas) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      const ctx = canvas.getContext('2d', { alpha: false })
      if (ctx) ctx.scale(dpr, dpr)
      drawFrame(currentFrameRef.current)
      resizeRafRef.current = null
    })
  }, [canvasRef, drawFrame])

  useEffect(() => {
    // Check reduced motion preference
    isReducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    loadFrames()
    handleResize()

    // Draw first frame after short delay to ensure canvas is mounted
    const initialDrawTimer = setTimeout(() => {
      drawFrame(0)
    }, 50)

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      clearTimeout(initialDrawTimer)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      if (resizeRafRef.current !== null) cancelAnimationFrame(resizeRafRef.current)
    }
  }, [loadFrames, handleScroll, handleResize, drawFrame, scrollHeightVh])

  return { currentFrame: currentFrameRef.current }
}
