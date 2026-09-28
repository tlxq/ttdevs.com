"use client";

import { ReactNode } from "react";
import AmbientBackground from "../../lib/AmbientBackground";
import ScrollProgressBar from "../ui/ScrollProgressBar";
import Header, { type HeaderSection } from "../header/Header";
import Footer from "../footer/Footer";
import { motion, AnimatePresence } from "framer-motion";

interface BaseLayoutProps {
  children: ReactNode;
  backHref?: string;
  scrollToSection?: (id: string) => void;
  sections?: HeaderSection[];
}

export default function BaseLayout({ children, backHref, scrollToSection, sections }: BaseLayoutProps) {
  return (
    <div className="relative min-h-screen bg-zinc-950 selection:bg-nebula-accent selection:text-white">
      <AmbientBackground />
      <ScrollProgressBar />
      
      <div className="relative z-10 w-full flex flex-col min-h-screen">
        <Header backHref={backHref} scrollToSection={scrollToSection} sections={sections} />
        
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}
