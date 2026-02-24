# Gallery, Logo & Founder Integration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Integrate 3D sphere gallery on homepage, add custom logo to navbar/footer/about, and create a dedicated founder section on the about page with updated leadership team.

**Architecture:**
- Copy reference SphereImageGrid component to `src/components/ui/image-sphere.tsx`
- Create wrapper component `SphereImageGallery.tsx` in home section (between FeaturedCarousel and WhyChooseUs)
- Rename and copy logo image to `public/logo.jpeg`
- Update Navbar.tsx to display logo image instead of LogoMark
- Update Footer.tsx to include logo image
- Create "Meet the Founder" section on about page with prominent image and bio
- Update team array in about page to include founder with image

**Tech Stack:** Next.js 14, TypeScript, React, Framer Motion, Tailwind CSS

---

## Task 1: Copy SphereImageGrid Component

**Files:**
- Create: `konduti-traders/src/components/ui/image-sphere.tsx`

**Step 1: Create the SphereImageGrid component**

Copy the complete component code from the reference into `konduti-traders/src/components/ui/image-sphere.tsx`:

```tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X } from 'lucide-react';

/**
 * SphereImageGrid - Interactive 3D Image Sphere Component
 *
 * A React TypeScript component that displays images arranged in a 3D sphere layout.
 * Images are distributed using Fibonacci sphere distribution for optimal coverage.
 * Supports drag-to-rotate, momentum physics, auto-rotation, and modal image viewing.
 */

export interface Position3D {
  x: number;
  y: number;
  z: number;
}

export interface SphericalPosition {
  theta: number;
  phi: number;
  radius: number;
}

export interface WorldPosition extends Position3D {
  scale: number;
  zIndex: number;
  isVisible: boolean;
  fadeOpacity: number;
  originalIndex: number;
}

export interface ImageData {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

export interface SphereImageGridProps {
  images?: ImageData[];
  containerSize?: number;
  sphereRadius?: number;
  dragSensitivity?: number;
  momentumDecay?: number;
  maxRotationSpeed?: number;
  baseImageScale?: number;
  hoverScale?: number;
  perspective?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  className?: string;
}

interface RotationState {
  x: number;
  y: number;
  z: number;
}

interface VelocityState {
  x: number;
  y: number;
}

interface MousePosition {
  x: number;
  y: number;
}

const SPHERE_MATH = {
  degreesToRadians: (degrees: number): number => degrees * (Math.PI / 180),
  radiansToDegrees: (radians: number): number => radians * (180 / Math.PI),

  sphericalToCartesian: (radius: number, theta: number, phi: number): Position3D => ({
    x: radius * Math.sin(phi) * Math.cos(theta),
    y: radius * Math.cos(phi),
    z: radius * Math.sin(phi) * Math.sin(theta)
  }),

  calculateDistance: (pos: Position3D, center: Position3D = { x: 0, y: 0, z: 0 }): number => {
    const dx = pos.x - center.x;
    const dy = pos.y - center.y;
    const dz = pos.z - center.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  },

  normalizeAngle: (angle: number): number => {
    while (angle > 180) angle -= 360;
    while (angle < -180) angle += 360;
    return angle;
  }
};

const SphereImageGrid: React.FC<SphereImageGridProps> = ({
  images = [],
  containerSize = 400,
  sphereRadius = 200,
  dragSensitivity = 0.5,
  momentumDecay = 0.95,
  maxRotationSpeed = 5,
  baseImageScale = 0.12,
  hoverScale = 1.2,
  perspective = 1000,
  autoRotate = false,
  autoRotateSpeed = 0.3,
  className = ''
}) => {

  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [rotation, setRotation] = useState<RotationState>({ x: 15, y: 15, z: 0 });
  const [velocity, setVelocity] = useState<VelocityState>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [imagePositions, setImagePositions] = useState<SphericalPosition[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const lastMousePos = useRef<MousePosition>({ x: 0, y: 0 });
  const animationFrame = useRef<number | null>(null);

  const actualSphereRadius = sphereRadius || containerSize * 0.5;
  const baseImageSize = containerSize * baseImageScale;

  const generateSpherePositions = useCallback((): SphericalPosition[] => {
    const positions: SphericalPosition[] = [];
    const imageCount = images.length;

    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const angleIncrement = 2 * Math.PI / goldenRatio;

    for (let i = 0; i < imageCount; i++) {
      const t = i / imageCount;
      const inclination = Math.acos(1 - 2 * t);
      const azimuth = angleIncrement * i;

      let phi = inclination * (180 / Math.PI);
      let theta = (azimuth * (180 / Math.PI)) % 360;

      const poleBonus = Math.pow(Math.abs(phi - 90) / 90, 0.6) * 35;
      if (phi < 90) {
        phi = Math.max(5, phi - poleBonus);
      } else {
        phi = Math.min(175, phi + poleBonus);
      }

      phi = 15 + (phi / 180) * 150;

      const randomOffset = (Math.random() - 0.5) * 20;
      theta = (theta + randomOffset) % 360;
      phi = Math.max(0, Math.min(180, phi + (Math.random() - 0.5) * 10));

      positions.push({
        theta: theta,
        phi: phi,
        radius: actualSphereRadius
      });
    }

    return positions;
  }, [images.length, actualSphereRadius]);

  const calculateWorldPositions = useCallback((): WorldPosition[] => {
    const positions = imagePositions.map((pos, index) => {
      const thetaRad = SPHERE_MATH.degreesToRadians(pos.theta);
      const phiRad = SPHERE_MATH.degreesToRadians(pos.phi);
      const rotXRad = SPHERE_MATH.degreesToRadians(rotation.x);
      const rotYRad = SPHERE_MATH.degreesToRadians(rotation.y);

      let x = pos.radius * Math.sin(phiRad) * Math.cos(thetaRad);
      let y = pos.radius * Math.cos(phiRad);
      let z = pos.radius * Math.sin(phiRad) * Math.sin(thetaRad);

      const x1 = x * Math.cos(rotYRad) + z * Math.sin(rotYRad);
      const z1 = -x * Math.sin(rotYRad) + z * Math.cos(rotYRad);
      x = x1;
      z = z1;

      const y2 = y * Math.cos(rotXRad) - z * Math.sin(rotXRad);
      const z2 = y * Math.sin(rotXRad) + z * Math.cos(rotXRad);
      y = y2;
      z = z2;

      const worldPos: Position3D = { x, y, z };

      const fadeZoneStart = -10;
      const fadeZoneEnd = -30;
      const isVisible = worldPos.z > fadeZoneEnd;

      let fadeOpacity = 1;
      if (worldPos.z <= fadeZoneStart) {
        fadeOpacity = Math.max(0, (worldPos.z - fadeZoneEnd) / (fadeZoneStart - fadeZoneEnd));
      }

      const isPoleImage = pos.phi < 30 || pos.phi > 150;

      const distanceFromCenter = Math.sqrt(worldPos.x * worldPos.x + worldPos.y * worldPos.y);
      const maxDistance = actualSphereRadius;
      const distanceRatio = Math.min(distanceFromCenter / maxDistance, 1);

      const distancePenalty = isPoleImage ? 0.4 : 0.7;
      const centerScale = Math.max(0.3, 1 - distanceRatio * distancePenalty);

      const depthScale = (worldPos.z + actualSphereRadius) / (2 * actualSphereRadius);
      const scale = centerScale * Math.max(0.5, 0.8 + depthScale * 0.3);

      return {
        ...worldPos,
        scale,
        zIndex: Math.round(1000 + worldPos.z),
        isVisible,
        fadeOpacity,
        originalIndex: index
      };
    });

    const adjustedPositions = [...positions];

    for (let i = 0; i < adjustedPositions.length; i++) {
      const pos = adjustedPositions[i];
      if (!pos.isVisible) continue;

      let adjustedScale = pos.scale;
      const imageSize = baseImageSize * adjustedScale;

      for (let j = 0; j < adjustedPositions.length; j++) {
        if (i === j) continue;

        const other = adjustedPositions[j];
        if (!other.isVisible) continue;

        const otherSize = baseImageSize * other.scale;

        const dx = pos.x - other.x;
        const dy = pos.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const minDistance = (imageSize + otherSize) / 2 + 25;

        if (distance < minDistance && distance > 0) {
          const overlap = minDistance - distance;
          const reductionFactor = Math.max(0.4, 1 - (overlap / minDistance) * 0.6);
          adjustedScale = Math.min(adjustedScale, adjustedScale * reductionFactor);
        }
      }

      adjustedPositions[i] = {
        ...pos,
        scale: Math.max(0.25, adjustedScale)
      };
    }

    return adjustedPositions;
  }, [imagePositions, rotation, actualSphereRadius, baseImageSize]);

  const clampRotationSpeed = useCallback((speed: number): number => {
    return Math.max(-maxRotationSpeed, Math.min(maxRotationSpeed, speed));
  }, [maxRotationSpeed]);

  const updateMomentum = useCallback(() => {
    if (isDragging) return;

    setVelocity(prev => {
      const newVelocity = {
        x: prev.x * momentumDecay,
        y: prev.y * momentumDecay
      };

      if (!autoRotate && Math.abs(newVelocity.x) < 0.01 && Math.abs(newVelocity.y) < 0.01) {
        return { x: 0, y: 0 };
      }

      return newVelocity;
    });

    setRotation(prev => {
      let newY = prev.y;

      if (autoRotate) {
        newY += autoRotateSpeed;
      }

      newY += clampRotationSpeed(velocity.y);

      return {
        x: SPHERE_MATH.normalizeAngle(prev.x + clampRotationSpeed(velocity.x)),
        y: SPHERE_MATH.normalizeAngle(newY),
        z: prev.z
      };
    });
  }, [isDragging, momentumDecay, velocity, clampRotationSpeed, autoRotate, autoRotateSpeed]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setVelocity({ x: 0, y: 0 });
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - lastMousePos.current.x;
    const deltaY = e.clientY - lastMousePos.current.y;

    const rotationDelta = {
      x: -deltaY * dragSensitivity,
      y: deltaX * dragSensitivity
    };

    setRotation(prev => ({
      x: SPHERE_MATH.normalizeAngle(prev.x + clampRotationSpeed(rotationDelta.x)),
      y: SPHERE_MATH.normalizeAngle(prev.y + clampRotationSpeed(rotationDelta.y)),
      z: prev.z
    }));

    setVelocity({
      x: clampRotationSpeed(rotationDelta.x),
      y: clampRotationSpeed(rotationDelta.y)
    });

    lastMousePos.current = { x: e.clientX, y: e.clientY };
  }, [isDragging, dragSensitivity, clampRotationSpeed]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    setIsDragging(true);
    setVelocity({ x: 0, y: 0 });
    lastMousePos.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();

    const touch = e.touches[0];
    const deltaX = touch.clientX - lastMousePos.current.x;
    const deltaY = touch.clientY - lastMousePos.current.y;

    const rotationDelta = {
      x: -deltaY * dragSensitivity,
      y: deltaX * dragSensitivity
    };

    setRotation(prev => ({
      x: SPHERE_MATH.normalizeAngle(prev.x + clampRotationSpeed(rotationDelta.x)),
      y: SPHERE_MATH.normalizeAngle(prev.y + clampRotationSpeed(rotationDelta.y)),
      z: prev.z
    }));

    setVelocity({
      x: clampRotationSpeed(rotationDelta.x),
      y: clampRotationSpeed(rotationDelta.y)
    });

    lastMousePos.current = { x: touch.clientX, y: touch.clientY };
  }, [isDragging, dragSensitivity, clampRotationSpeed]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setImagePositions(generateSpherePositions());
  }, [generateSpherePositions]);

  useEffect(() => {
    const animate = () => {
      updateMomentum();
      animationFrame.current = requestAnimationFrame(animate);
    };

    if (isMounted) {
      animationFrame.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [isMounted, updateMomentum]);

  useEffect(() => {
    if (!isMounted) return;

    const container = containerRef.current;
    if (!container) return;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMounted, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  const worldPositions = calculateWorldPositions();

  const renderImageNode = useCallback((image: ImageData, index: number) => {
    const position = worldPositions[index];

    if (!position || !position.isVisible) return null;

    const imageSize = baseImageSize * position.scale;
    const isHovered = hoveredIndex === index;
    const finalScale = isHovered ? Math.min(1.2, 1.2 / position.scale) : 1;

    return (
      <div
        key={image.id}
        className="absolute cursor-pointer select-none transition-transform duration-200 ease-out"
        style={{
          width: `${imageSize}px`,
          height: `${imageSize}px`,
          left: `${containerSize/2 + position.x}px`,
          top: `${containerSize/2 + position.y}px`,
          opacity: position.fadeOpacity,
          transform: `translate(-50%, -50%) scale(${finalScale})`,
          zIndex: position.zIndex
        }}
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
        onClick={() => setSelectedImage(image)}
      >
        <div className="relative w-full h-full rounded-full overflow-hidden shadow-lg border-2 border-white/20">
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover"
            draggable={false}
            loading={index < 3 ? 'eager' : 'lazy'}
          />
        </div>
      </div>
    );
  }, [worldPositions, baseImageSize, containerSize, hoveredIndex]);

  const renderSpotlightModal = () => {
    if (!selectedImage) return null;

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30"
        onClick={() => setSelectedImage(null)}
        style={{
          animation: 'fadeIn 0.3s ease-out'
        }}
      >
        <div
          className="bg-white rounded-xl max-w-md w-full overflow-hidden"
          onClick={(e) => e.stopPropagation()}
          style={{
            animation: 'scaleIn 0.3s ease-out'
          }}
        >
          <div className="relative aspect-square">
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 w-8 h-8 bg-black bg-opacity-50 rounded-full text-white flex items-center justify-center hover:bg-opacity-70 transition-all cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {(selectedImage.title || selectedImage.description) && (
            <div className="p-6">
              {selectedImage.title && (
                <h3 className="text-xl font-bold mb-2">{selectedImage.title}</h3>
              )}
              {selectedImage.description && (
                <p className="text-gray-600">{selectedImage.description}</p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  if (!isMounted) {
    return (
      <div
        className="bg-gray-100 rounded-lg animate-pulse flex items-center justify-center"
        style={{ width: containerSize, height: containerSize }}
      >
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!images.length) {
    return (
      <div
        className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center"
        style={{ width: containerSize, height: containerSize }}
      >
        <div className="text-gray-400 text-center">
          <p>No images provided</p>
          <p className="text-sm">Add images to the images prop</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>

      <div
        ref={containerRef}
        className={`relative select-none cursor-grab active:cursor-grabbing ${className}`}
        style={{
          width: containerSize,
          height: containerSize,
          perspective: `${perspective}px`
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="relative w-full h-full" style={{ zIndex: 10 }}>
          {images.map((image, index) => renderImageNode(image, index))}
        </div>
      </div>

      {renderSpotlightModal()}
    </>
  );
};

export default SphereImageGrid;
```

**Step 2: Verify component loads without errors**

Test by running:
```bash
cd "d:/konduti Traders - Demo - VGS/konduti-traders"
npm run build
```

Expected: Component compiles without TypeScript errors related to SphereImageGrid.

---

## Task 2: Create SphereImageGallery Home Section

**Files:**
- Create: `konduti-traders/src/components/home/SphereImageGallery.tsx`

**Step 1: Create the wrapper component**

```tsx
'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import SphereImageGrid, { ImageData } from '@/components/ui/image-sphere'

export default function SphereImageGallery() {
  // Generate gallery images from public folder
  const galleryImages: ImageData[] = useMemo(() => {
    const baseImages = [
      { src: '/gallery images/gallery/WhatsApp Image 2026-02-24 at 17.18.09.jpeg', alt: 'Gallery image 1' },
      { src: '/gallery images/gallery/WhatsApp Image 2026-02-24 at 17.18.09 (1).jpeg', alt: 'Gallery image 2' },
      { src: '/gallery images/gallery/WhatsApp Image 2026-02-24 at 17.18.06.jpeg', alt: 'Gallery image 3' },
      { src: '/gallery images/gallery/WhatsApp Image 2026-02-24 at 17.18.06 (1).jpeg', alt: 'Gallery image 4' },
      { src: '/gallery images/gallery/WhatsApp Image 2026-02-24 at 17.18.07.jpeg', alt: 'Gallery image 5' },
      { src: '/gallery images/gallery/WhatsApp Image 2026-02-24 at 17.18.07 (1).jpeg', alt: 'Gallery image 6' },
      { src: '/gallery images/gallery/WhatsApp Image 2026-02-24 at 17.18.07 (2).jpeg', alt: 'Gallery image 7' },
      { src: '/gallery images/gallery/WhatsApp Image 2026-02-24 at 17.18.08.jpeg', alt: 'Gallery image 8' },
      { src: '/gallery images/gallery/WhatsApp Image 2026-02-24 at 17.18.08 (1).jpeg', alt: 'Gallery image 9' },
      { src: '/gallery images/gallery/WhatsApp Image 2026-02-24 at 17.18.08 (2).jpeg', alt: 'Gallery image 10' },
      { src: '/gallery images/gallery/WhatsApp Image 2026-02-24 at 17.18.09 (2).jpeg', alt: 'Gallery image 11' },
    ]

    return baseImages.map((img, i) => ({
      id: `gallery-${i + 1}`,
      ...img,
      title: `Konduti Gallery ${i + 1}`,
      description: 'Fresh produce from our sourcing network'
    }))
  }, [])

  return (
    <section className="py-20 lg:py-28 bg-mint overflow-hidden" aria-labelledby="gallery-heading">
      <div className="max-w-[1360px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-16"
        >
          <span className="eyebrow block mb-4 text-green">Our Sourcing in Action</span>
          <h2
            id="gallery-heading"
            className="font-display font-light text-dark"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', letterSpacing: '-0.03em', lineHeight: '1.05' }}
          >
            Explore our network
          </h2>
          <p className="font-body text-gray-text mt-4 max-w-2xl mx-auto" style={{ fontSize: '0.95rem', lineHeight: '1.75' }}>
            Drag to rotate. Click any image to view in detail. Witness the quality and diversity of produce from across India's finest sourcing regions.
          </p>
        </motion.div>

        {/* 3D Sphere Gallery */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true, margin: '-80px' }}
          className="flex justify-center"
        >
          <SphereImageGrid
            images={galleryImages}
            containerSize={500}
            sphereRadius={200}
            dragSensitivity={0.8}
            momentumDecay={0.96}
            maxRotationSpeed={6}
            baseImageScale={0.15}
            hoverScale={1.3}
            perspective={1000}
            autoRotate={true}
            autoRotateSpeed={0.2}
            className="drop-shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  )
}
```

**Step 2: Verify component compiles**

Test:
```bash
npm run build
```

Expected: SphereImageGallery compiles without errors.

---

## Task 3: Integrate Gallery Section into Homepage

**Files:**
- Modify: `konduti-traders/src/app/page.tsx:1-37`

**Step 1: Add import and component to page**

Update `src/app/page.tsx`:

```tsx
import type { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import TrustTicker from '@/components/home/TrustTicker'
import AboutSnippet from '@/components/home/AboutSnippet'
import ProductCategories from '@/components/home/ProductCategories'
import FeaturedCarousel from '@/components/home/FeaturedCarousel'
import SphereImageGallery from '@/components/home/SphereImageGallery'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import HowItWorksSnippet from '@/components/home/HowItWorksSnippet'
import WhoWeServe from '@/components/home/WhoWeServe'
import Testimonials from '@/components/home/Testimonials'
import CtaBanner from '@/components/home/CtaBanner'

export const metadata: Metadata = {
  title: 'Konduti Traders — B2B Fresh Produce Procurement India',
  description:
    "India's trusted B2B partner for fresh fruits and vegetables. Direct farm sourcing, quality grading, cold chain logistics, and pan-India supply to supermarkets, HoReCa, wholesalers, and food processors.",
  alternates: {
    canonical: '/',
  },
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustTicker />
      <AboutSnippet />
      <ProductCategories />
      <FeaturedCarousel />
      <SphereImageGallery />
      <WhyChooseUs />
      <HowItWorksSnippet />
      <WhoWeServe />
      <Testimonials />
      <CtaBanner />
    </>
  )
}
```

**Step 2: Test homepage builds and renders**

```bash
npm run build
npm run dev
# Navigate to http://localhost:3004 and verify gallery appears between carousel and why choose us
```

Expected: Gallery section displays with 3D sphere, auto-rotates, can drag to interact.

**Step 3: Commit changes**

```bash
git add -A
git commit -m "feat: add 3D sphere gallery section to homepage"
```

---

## Task 4: Prepare Logo Image

**Files:**
- Copy: `public/gallery images/logo/WhatsApp Image 2026-02-24 at 17.17.36.jpeg` → `public/logo.jpeg`

**Step 1: Copy and rename logo**

```bash
cd "d:/konduti Traders - Demo - VGS/konduti-traders"
cp "public/gallery images/logo/WhatsApp Image 2026-02-24 at 17.17.36.jpeg" public/logo.jpeg
```

**Step 2: Verify file exists**

```bash
ls -la public/logo.jpeg
```

Expected: File exists at `public/logo.jpeg` with size > 0.

---

## Task 5: Update Navbar with Logo Image

**Files:**
- Modify: `konduti-traders/src/components/layout/Navbar.tsx` (replace LogoMark with Image logo)

**Step 1: Read current Navbar to understand structure**

Read `src/components/layout/Navbar.tsx` completely (you'll need multiple reads if large).

**Step 2: Replace LogoMark with logo image**

Find the LogoMark component usage in Navbar and replace it with:

```tsx
import Image from 'next/image'

// In the navbar JSX, replace the LogoMark component with:
<Link href="/" className="inline-flex items-center gap-2 group" aria-label="Konduti Traders">
  <Image
    src="/logo.jpeg"
    alt="Konduti Traders Logo"
    width={48}
    height={48}
    className="w-12 h-12 object-contain group-hover:opacity-80 transition-opacity"
    priority
  />
</Link>
```

**Step 3: Build and test navbar**

```bash
npm run build
npm run dev
# Navigate to http://localhost:3004 and verify logo appears in navbar
```

Expected: Logo displays in navbar, clickable, links to homepage.

**Step 4: Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "feat: replace navbar logo with custom brand image"
```

---

## Task 6: Update Footer with Logo Image

**Files:**
- Modify: `konduti-traders/src/components/layout/Footer.tsx` (add logo above existing footer content)

**Step 1: Update footer to include logo**

In Footer.tsx, update the Brand Column (around line 46-60) to add the logo image:

```tsx
import Image from 'next/image'

// In the Brand Column section, after the Link opening tag, add:
<div>
  <Image
    src="/logo.jpeg"
    alt="Konduti Traders Logo"
    width={120}
    height={120}
    className="w-24 h-24 object-contain mb-6"
  />
</div>
```

**Step 2: Build and test footer**

```bash
npm run build
npm run dev
# Scroll to footer and verify logo appears above text
```

Expected: Logo visible in footer, properly sized, above the "Konduti" text.

**Step 3: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat: add brand logo to footer"
```

---

## Task 7: Update About Page - Add Founder Section

**Files:**
- Modify: `konduti-traders/src/app/about/page.tsx` (add founder section and update team)

**Step 1: Update team array to include founder**

In the `team` array (around line 50-55), add founder:

```tsx
const team = [
  {
    name: 'Sridhar',
    role: 'Founder & Managing Director',
    bio: '18+ years in fresh produce trade across India. Former APMC board member and FPO advisory committee lead. Visionary in direct farm-to-business supply chains.',
    image: '/gallery images/founder images/sridhar.jpg.jpeg'
  },
  { name: 'Vikram Konduti', role: 'Founder & Managing Director', bio: '18 years in fresh produce trade across India. Former APMC board member and FPO advisory committee lead.' },
  { name: 'Preethi Shankar', role: 'Head of Quality Assurance', bio: 'Post-graduate in Food Technology from CFTRI Mysore. 12 years in produce QA for export and domestic markets.' },
  { name: 'Arjun Mehta', role: 'Head of Logistics', bio: 'Supply chain specialist with experience building cold chain networks for two major Indian food companies.' },
  { name: 'Divya Nair', role: 'Key Accounts Manager', bio: 'B2B relationship management specialist. Primary contact for supermarket and HoReCa accounts.' },
]
```

**Step 2: Add "Meet the Founder" section before Leadership**

Add this new JSX section before the Leadership section (after Quality section):

```tsx
{/* ── Meet the Founder ── */}
<section className="py-20 lg:py-28 bg-white" aria-labelledby="founder-heading">
  <div className="max-w-[1360px] mx-auto px-6 lg:px-12">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
      {/* Founder Image */}
      <motion.div
        initial={{ opacity: 0, x: -32 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-80px' }}
        className="order-2 lg:order-1"
      >
        <Image
          src="/gallery images/founder images/sridhar.jpg.jpeg"
          alt="Sridhar, Founder & Managing Director"
          width={400}
          height={500}
          className="rounded-xl shadow-premium-lg w-full h-auto object-cover"
        />
      </motion.div>

      {/* Founder Text */}
      <motion.div
        initial={{ opacity: 0, x: 32 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-80px' }}
        className="order-1 lg:order-2"
      >
        <span className="eyebrow text-green block mb-5">Meet the Founder</span>
        <h2
          id="founder-heading"
          className="font-display font-light text-dark mb-6"
          style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', lineHeight: '1.08', letterSpacing: '-0.03em' }}
        >
          Sridhar
        </h2>
        <p className="font-body text-gray-text leading-relaxed mb-6">
          With over 18 years of hands-on experience in India's fresh produce trade, Sridhar has been instrumental in reshaping how B2B buyers and farmers connect.
        </p>
        <p className="font-body text-gray-text leading-relaxed mb-6">
          As a former APMC board member and lead advisor to farmer producer organizations (FPOs), he understands both sides of the supply chain—the pressures on farms and the exacting demands of commercial buyers.
        </p>
        <p className="font-body text-gray-text leading-relaxed mb-8">
          Konduti Traders was founded on his conviction that transparency, quality-first sourcing, and long-term partnerships can unlock growth for both small farmers and ambitious businesses.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 bg-green text-white rounded-lg hover:bg-green/90 transition-colors font-body font-medium"
        >
          Schedule a Meeting
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 12l4-4-4-4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </motion.div>
    </div>
  </div>
</section>
```

Don't forget to add imports at the top:
```tsx
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
```

**Step 3: Update Leadership section to display founder with image**

Update the Leadership section JSX to render images if available:

```tsx
{/* ── Team Cards ── */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
  {team.map((member, i) => (
    <motion.div
      key={member.name}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: i * 0.1 }}
      viewport={{ once: true, margin: '-80px' }}
      className="bg-gray-light rounded-xl p-6 border border-gray-light/40"
    >
      {member.image && (
        <Image
          src={member.image}
          alt={member.name}
          width={300}
          height={300}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}
      <h3 className="font-display font-semibold text-dark text-lg mb-1">{member.name}</h3>
      <p className="font-body text-green text-sm font-medium mb-3">{member.role}</p>
      <p className="font-body text-gray-text text-sm leading-relaxed">{member.bio}</p>
    </motion.div>
  ))}
</div>
```

**Step 4: Build and test about page**

```bash
npm run build
npm run dev
# Navigate to /about and verify:
# 1. Founder section appears with image and text
# 2. Leadership team cards display with founder's image
```

Expected: Founder section rendered with proper layout and images visible.

**Step 5: Commit**

```bash
git add src/app/about/page.tsx
git commit -m "feat: add founder section and founder image to about page"
```

---

## Task 8: Add Logo to About Page Branding

**Files:**
- Modify: `konduti-traders/src/app/about/page.tsx` (add logo below hero)

**Step 1: Add logo element after hero section**

After the hero section (around line 86), add:

```tsx
{/* ── Logo Divider ── */}
<div className="py-12 bg-white border-b border-gray-light/40">
  <div className="max-w-[1360px] mx-auto px-6 lg:px-12">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: '-80px' }}
      className="flex justify-center"
    >
      <Image
        src="/logo.jpeg"
        alt="Konduti Traders"
        width={100}
        height={100}
        className="w-20 h-20 object-contain"
      />
    </motion.div>
  </div>
</div>
```

**Step 2: Build and test**

```bash
npm run build
npm run dev
# Navigate to /about and verify logo appears below hero
```

Expected: Logo displays below hero section, centered.

**Step 3: Commit**

```bash
git add src/app/about/page.tsx
git commit -m "feat: add brand logo divider to about page hero"
```

---

## Task 9: Test Responsive Design

**Files:**
- Test all modified pages

**Step 1: Test homepage on mobile (375px)**

```bash
npm run dev
# Open DevTools, set viewport to 375px
# Verify gallery sphere scales down appropriately
# Check that all sections display correctly
```

Expected: Gallery sphere is responsive, text scales properly, no overflow.

**Step 2: Test about page on mobile**

```bash
# Still in dev mode, navigate to /about
# Verify founder section stacks vertically on mobile
# Check footer and navbar logos display correctly
```

Expected: All elements responsive, no layout breaking.

**Step 3: Test on desktop (1920px)**

```bash
# Resize to 1920px
# Verify spacing and sizing is balanced
# Check all animations work smoothly
```

Expected: Gallery looks premium, founder section properly balanced, no awkward spacing.

**Step 4: No commit needed** (testing only)

---

## Task 10: Push to GitHub

**Files:**
- All modified files staged and committed

**Step 1: Verify all changes are committed**

```bash
git status
```

Expected: "nothing to commit, working tree clean"

**Step 2: Push to main branch**

```bash
git push origin main
```

Expected: All commits pushed successfully to GitHub.

**Step 3: Verify on GitHub**

Visit your repository on GitHub and confirm:
- All commits appear in history
- New files (image-sphere.tsx, SphereImageGallery.tsx) are present
- Modified files show in recent changes

---

## Summary

✅ Task 1: Copy SphereImageGrid component
✅ Task 2: Create SphereImageGallery wrapper
✅ Task 3: Integrate gallery into homepage
✅ Task 4: Prepare logo image
✅ Task 5: Update navbar with logo
✅ Task 6: Update footer with logo
✅ Task 7: Add founder section to about page
✅ Task 8: Add logo to about page
✅ Task 9: Test responsive design
✅ Task 10: Push to GitHub

**Total estimated time:** ~45-60 minutes with careful testing

