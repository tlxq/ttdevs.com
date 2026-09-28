"use client";

import { useState, memo } from "react";
import Link from "next/link";
import { Button, ButtonLink } from "../ui/Button";
import { TerminalModal } from "../terminal/TerminalModal";

export interface HeaderSection {
  id: string;
  label: string;
}

interface HeaderProps {
  backHref?: string;
  scrollToSection?: (id: string) => void;
  /** In-page sections to link to. "contact" is shown as a button, the rest as text links. */
  sections?: HeaderSection[];
}

function HeaderComponent({ backHref, scrollToSection, sections = [] }: HeaderProps) {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const showSections = Boolean(scrollToSection) && sections.length > 0;
  const textSections = sections.filter((s) => s.id !== "contact");
  const hasContact = sections.some((s) => s.id === "contact");

  function goTo(id: string) {
    setIsMenuOpen(false);
    scrollToSection?.(id);
  }

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
              <div className="w-1.5 h-1.5 rounded-full bg-nebula-accent animate-pulse motion-reduce:animate-none" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-nebula-accent/70 group-hover:text-nebula-accent">Terminal</span>
            </button>
          </div>

          <nav className="flex items-center gap-4 md:gap-8" aria-label="Main">
            {/* Mobile Terminal Trigger */}
            <button 
              onClick={() => setIsTerminalOpen(true)}
              className="lg:hidden p-2 text-nebula-accent/70 hover:text-nebula-accent transition-colors"
              aria-label="Open Terminal"
            >
              <span className="font-mono text-sm font-bold">$_</span>
            </button>

            <div className="hidden md:flex items-center gap-8">
              {backHref && (
                <ButtonLink href={backHref} variant="ghost" size="sm">← Back</ButtonLink>
              )}
              {showSections && (
                <>
                  {textSections.map((s) => (
                    <button key={s.id} onClick={() => goTo(s.id)} className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                      {s.label}
                    </button>
                  ))}
                  {hasContact && <Button size="sm" onClick={() => goTo("contact")}>Contact</Button>}
                </>
              )}
            </div>

            {/* Mobile menu toggle */}
            {(showSections || backHref) && (
              <button
                onClick={() => setIsMenuOpen((open) => !open)}
                className="md:hidden p-2 font-mono text-xs uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMenuOpen ? "Close" : "Menu"}
              </button>
            )}
          </nav>
        </div>

        {isMenuOpen && (
          <div id="mobile-menu" className="md:hidden border-t border-white/5 bg-zinc-950/95 px-6 py-4">
            <ul className="flex flex-col gap-1">
              {showSections &&
                sections.map((s) => (
                  <li key={s.id}>
                    <button onClick={() => goTo(s.id)} className="w-full py-3 text-left text-sm font-medium text-zinc-300 hover:text-white transition-colors">
                      {s.label}
                    </button>
                  </li>
                ))}
              {backHref && (
                <li>
                  <Link href={backHref} onClick={() => setIsMenuOpen(false)} className="block py-3 text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                    ← Back
                  </Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </header>

      <TerminalModal 
        isOpen={isTerminalOpen} 
        onClose={() => setIsTerminalOpen(false)} 
      />
    </>
  );
}

export default memo(HeaderComponent);
