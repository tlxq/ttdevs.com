"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Initializing systems...");

  useEffect(() => {
    const statuses = [
      "Initializing systems...",
      "Loading kernel modules...",
      "Establishing neural links...",
      "Fetching developer profiles...",
      "Optimizing interface...",
      "Ready."
    ];

    // Fixed-length progress (~0.8 s) so the intro never delays the page for long.
    const STEP_MS = 80;
    const STEPS = 10;
    let step = 0;
    let doneTimer: ReturnType<typeof setTimeout> | undefined;
    const interval = setInterval(() => {
      step += 1;
      const next = Math.min(100, (step / STEPS) * 100);
      setProgress(next);
      setStatus(statuses[Math.min(statuses.length - 1, Math.floor((next / 100) * (statuses.length - 1)))]);
      if (step >= STEPS) {
        clearInterval(interval);
        doneTimer = setTimeout(onComplete, 100);
      }
    }, STEP_MS);

    return () => {
      clearInterval(interval);
      if (doneTimer) clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-zinc-950 font-mono"
    >
      <div className="w-64 space-y-4">
        <div className="flex justify-between text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          <span>{status}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        
        <div className="h-[1px] w-full bg-zinc-900 overflow-hidden">
          <motion.div 
            className="h-full bg-nebula-cyan shadow-[0_0_10px_rgba(6,182,212,0.5)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>

        <div className="flex justify-center">
          <span className="text-[9px] uppercase tracking-[0.4em] text-zinc-700 animate-pulse motion-reduce:animate-none">
            TTDEVS // EST. 2024
          </span>
        </div>
      </div>
    </motion.div>
  );
}
