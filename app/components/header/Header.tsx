"use client";

import { useState, memo } from "react";
import Link from "next/link";
import { Button } from "../ui/Button";
import { TerminalModal } from "../terminal/TerminalModal";

interface HeaderProps {
  backHref?: string;
  scrollToSection?: (id: string) => void;
}

function HeaderComponent({ backHref, scrollToSection }: HeaderProps) {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-zinc-950/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-4 md:gap-8">
            <Link href="/" className="text-xl font-bold tracking-tighter text-white hover:text-zinc-400 transition-colors">
              TTDEVS
            </Link>

            {/* Terminal Trigger - Desktop only next to logo */}
            <button 
              onClick={() => setIsTerminalOpen(true)}
              className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full border border-nebula-accent/20 bg-nebula-accent/5 hover:bg-nebula-accent/10 transition-colors group"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-nebula-accent animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-nebula-accent/70 group-hover:text-nebula-accent">Terminal</span>
            </button>
          </div>

          <nav className="flex items-center gap-4 md:gap-8">
            {/* Mobile Terminal Trigger */}
            <button 
              onClick={() => setIsTerminalOpen(true)}
              className="lg:hidden p-2 text-nebula-accent/70 hover:text-nebula-accent transition-colors"
              aria-label="Open Terminal"
            >
              <span className="font-mono text-sm font-bold">$_</span>
            </button>

            <div className="hidden md:flex items-center gap-8">
              {scrollToSection ? (
                <>
                  <button onClick={() => scrollToSection("about")} className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">About</button>
                  <button onClick={() => scrollToSection("projects")} className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Projects</button>
                  <button onClick={() => scrollToSection("skills")} className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Skills</button>
                  <Button size="sm" onClick={() => scrollToSection("contact")}>Contact</Button>
                </>
              ) : (
                backHref && (
                  <Link href={backHref}>
                    <Button variant="ghost" size="sm">← Back</Button>
                  </Link>
                )
              )}
            </div>
          </nav>
        </div>
      </header>

      <TerminalModal 
        isOpen={isTerminalOpen} 
        onClose={() => setIsTerminalOpen(false)} 
      />
    </>
  );
}

export default memo(HeaderComponent);
