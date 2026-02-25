"use client"

import { memo, useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react"
import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion"

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

type UseMediaQueryOptions = {
  defaultValue?: boolean
  initializeWithValue?: boolean
}

const IS_SERVER = typeof window === "undefined"

export function useMediaQuery(
  query: string,
  {
    defaultValue = false,
    initializeWithValue = true,
  }: UseMediaQueryOptions = {}
): boolean {
  const getMatches = (query: string): boolean => {
    if (IS_SERVER) {
      return defaultValue
    }
    return window.matchMedia(query).matches
  }

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) {
      return getMatches(query)
    }
    return defaultValue
  })

  const handleChange = useCallback(() => {
    setMatches(getMatches(query))
  }, [query])

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query)
    handleChange()
    matchMedia.addEventListener("change", handleChange)
    return () => {
      matchMedia.removeEventListener("change", handleChange)
    }
  }, [query, handleChange])

  return matches
}

const galleryImagePaths = [
  "/images/products/dry-red-chilli.jpg",
  "/images/products/turmeric.jpg",
  "/images/products/black-pepper.jpg",
  "/images/products/cardamom.jpg",
  "/images/products/cumin.jpg",
  "/images/products/cinnamon.png",
  "/images/products/maize.jpg",
  "/images/products/rice.jpg",
  "/images/products/wheat.jpg",
  "/images/products/cashew-nuts.jpg",
  "/images/products/peanuts.jpg",
  "/images/products/mango.png",
  "/images/products/apple.png",
  "/images/products/watermelon.png",
  "/images/products/pomegranate.png",
  "/images/products/tomato.png",
  "/images/products/onion.png",
  "/images/products/carrot.png",
  "/images/products/coffee.jpg",
  "/images/products/dehydrated-ginger.png",
]

const duration = 0.15
const transition = { duration, ease: [0.32, 0.72, 0, 1] as const }

const Carousel = memo(
  ({
    controls,
    cards,
    isCarouselActive,
    bgColor = "bg-mint",
  }: {
    controls: ReturnType<typeof useAnimation>
    cards: string[]
    isCarouselActive: boolean
    bgColor?: string
  }) => {
    const isScreenSizeSm = useMediaQuery("(max-width: 640px)")
    const cylinderWidth = isScreenSizeSm ? 2250 : 3750
    const faceCount = cards.length
    const faceWidth = cylinderWidth / faceCount
    const radius = cylinderWidth / (2 * Math.PI)
    const rotation = useMotionValue(0)
    const transform = useTransform(
      rotation,
      (value) => `rotate3d(0, 1, 0, ${value}deg)`
    )

    return (
      <div
        className={`flex h-full items-center justify-center ${bgColor}`}
        style={{
          perspective: "1200px",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <motion.div
          drag={isCarouselActive ? "x" : false}
          className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
          style={{
            transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          onDrag={(_, info) =>
            isCarouselActive &&
            rotation.set(rotation.get() + info.offset.x * 0.02)
          }
          onDragEnd={(_, info) =>
            isCarouselActive &&
            controls.start({
              rotateY: rotation.get() + info.velocity.x * 0.02,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 30,
                mass: 0.1,
              },
            })
          }
          animate={controls}
        >
          {cards.map((imgUrl, i) => (
            <motion.div
              key={`key-${imgUrl}-${i}`}
              className={`absolute flex h-full origin-center items-center justify-center rounded-xl ${bgColor} p-3`}
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${
                  i * (360 / faceCount)
                }deg) translateZ(${radius}px)`,
              }}
            >
              <motion.img
                src={imgUrl}
                alt={`Product image ${i + 1}`}
                className="pointer-events-none w-full rounded-xl object-cover aspect-square"
                initial={{ filter: "blur(4px)" }}
                layout="position"
                animate={{ filter: "blur(0px)" }}
                transition={transition}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    )
  }
)
Carousel.displayName = "Carousel"

function ThreeDPhotoCarousel({ images, bgColor }: { images?: string[], bgColor?: string }) {
  const controls = useAnimation()
  const cards = useMemo(() => images ?? galleryImagePaths, [images])

  return (
    <div className="relative h-[560px] md:h-[700px] w-full overflow-hidden">
      <Carousel
        controls={controls}
        cards={cards}
        isCarouselActive={true}
        bgColor={bgColor}
      />
    </div>
  )
}

export { ThreeDPhotoCarousel }
