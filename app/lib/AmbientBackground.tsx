"use client";

import { motion, useReducedMotion } from "framer-motion";
import React from "react";

function AmbientBackgroundComponent() {
  // Fixed glow intensity (0 to 1) for the background animation
  const intensity = 0.3;
  // With prefers-reduced-motion the glows stay still (no infinite animation).
  const reduceMotion = useReducedMotion();

  return (
    <div className="fixed inset-0 -z-10 nebula-gradient overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Dynamic Nebula Glows - Optimized with will-change and simpler transitions */}
      <motion.div
        className="absolute -top-[10%] -left-[5%] w-[60%] h-[60%] rounded-full bg-nebula-accent/15 blur-[100px] will-change-transform"
        animate={reduceMotion ? undefined : {
          scale: [1, 1 + intensity * 0.2, 1],
          opacity: [0.2, 0.2 + intensity * 0.3, 0.2],
          x: [0, 20, 0],
          y: [0, 30, 0],
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      />
      
      <motion.div
        className="absolute bottom-[-5%] -right-[5%] w-[50%] h-[50%] rounded-full bg-nebula-secondary/10 blur-[80px] will-change-transform"
        animate={reduceMotion ? undefined : {
          scale: [1, 1 + intensity * 0.15, 1],
          opacity: [0.15, 0.15 + intensity * 0.2, 0.15],
          x: [0, -20, 0],
          y: [0, -15, 0],
        }}
        transition={{ 
          duration: 25, 
          repeat: Infinity, 
          ease: "linear", 
          delay: 2 
        }}
      />

      <motion.div
        className="absolute top-[40%] right-[15%] w-[30%] h-[30%] rounded-full bg-nebula-cyan/5 blur-[90px] will-change-transform"
        animate={reduceMotion ? undefined : {
          opacity: [0.05, 0.1 + intensity * 0.2, 0.05],
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          ease: "linear"
        }}
      />

      {/* Subtle Star Noise (Static Overlay) */}
      <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay" 
           style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
             backgroundRepeat: 'repeat'
           }} 
      />
    </div>
  );
}

// Wrap in React.memo to prevent re-renders when the parent re-renders
export default React.memo(AmbientBackgroundComponent);
