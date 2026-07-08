/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface ParallaxSectionProps {
  id?: string;
  bgImage: string;
  overlayOpacity?: number; // 0 to 1
  heightClass?: string;    // e.g. "h-screen" or "h-[85vh]"
  children: ReactNode;
}

export default function ParallaxSection({
  id,
  bgImage,
  overlayOpacity = 0.4,
  heightClass = "min-h-[85vh]",
  children,
}: ParallaxSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Tracks scroll progress of the container relative to the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Create background parallax offset
  const yBg = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  // Create slow fade-in and scale-up for background for rich immersive visual
  const scaleBg = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.05, 1.15]);

  return (
    <div
      id={id}
      ref={containerRef}
      className={`relative w-full ${heightClass} flex items-center justify-center overflow-hidden border-b border-white/5`}
    >
      {/* Background Image Layer with Parallax */}
      <motion.div
        style={{
          y: yBg,
          scale: scaleBg,
          backgroundImage: `url(${bgImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
        className="absolute inset-0 w-full h-[125%] -top-[12.5%] -bottom-[12.5%] z-0"
        referrerPolicy="no-referrer"
      />

      {/* Backdrop overlay layer */}
      <div 
        className="absolute inset-0 bg-neutral-950/70 z-1" 
        style={{ opacity: overlayOpacity }}
      />
      
      {/* Visual noise/gradient overlay for high end premium vibe */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/60 z-2 pointer-events-none" />

      {/* Content Layer */}
      <div className="relative w-full h-full max-w-7xl mx-auto px-6 py-20 z-10 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
