"use client";

import type Lenis from "lenis";
import { useEffect } from "react";

/**
 * Listens to Lenis scroll velocity and, when the user has nearly stopped
 * scrolling near a `[data-snap]` section boundary, smoothly snaps to it.
 *
 * Snap threshold: within 25 % of the viewport height.
 * Snap only fires when |velocity| drops below 0.04 (essentially stopped).
 * A 220 ms cooldown prevents multiple snap triggers in quick succession.
 */
export function useScrollSnap(lenis: Lenis | null) {
  useEffect(() => {
    if (!lenis) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let snapping = false;
    let cooldown: ReturnType<typeof setTimeout> | null = null;

    const onScroll = ({ velocity }: Lenis) => {
      if (snapping) return;
      if (Math.abs(velocity) > 0.04) {
        if (cooldown) { clearTimeout(cooldown); cooldown = null; }
        return;
      }
      if (cooldown) return;

      cooldown = setTimeout(() => {
        cooldown = null;
        const snapEls = Array.from(document.querySelectorAll<HTMLElement>("[data-snap]"));
        if (!snapEls.length) return;

        const scrollY = window.scrollY;
        const threshold = window.innerHeight * 0.25;
        let closest: HTMLElement | null = null;
        let minDist = Infinity;

        for (const el of snapEls) {
          const top = el.getBoundingClientRect().top + scrollY;
          const dist = Math.abs(top - scrollY);
          if (dist < minDist) { minDist = dist; closest = el; }
        }

        if (closest && minDist > 10 && minDist < threshold) {
          snapping = true;
          lenis.scrollTo(closest as HTMLElement, {
            duration: 0.9,
            onComplete: () => { snapping = false; },
          });
        }
      }, 220);
    };

    lenis.on("scroll", onScroll);
    return () => {
      lenis.off("scroll", onScroll);
      if (cooldown) clearTimeout(cooldown);
    };
  }, [lenis]);
}
