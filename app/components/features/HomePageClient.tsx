"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import { AnimatePresence } from "framer-motion";
import { ProfileView } from "./ProfileView";
import { PROFILES } from "../../lib/data/profiles";
import LoadingScreen from "../ui/LoadingScreen";

const LOADER_KEY = "hasSeenLoader";

// Nothing to subscribe to: the value is only read once on the client.
const subscribe = () => () => {};

// Show the intro loader once per session, and never when the user prefers reduced motion.
function getShouldShowLoader() {
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    return !sessionStorage.getItem(LOADER_KEY);
  } catch {
    return false;
  }
}

export default function HomePageClient() {
  const shouldShowLoader = useSyncExternalStore(subscribe, getShouldShowLoader, () => false);
  const [loaderDone, setLoaderDone] = useState(false);

  const handleLoadingComplete = useCallback(() => {
    try {
      sessionStorage.setItem(LOADER_KEY, "true");
    } catch {
      // Storage can be blocked; the loader just shows again next time.
    }
    setLoaderDone(true);
  }, []);

  return (
    <>
      {/* The page is always rendered (also on the server); the loader only overlays it. */}
      <div className="bg-zinc-950 min-h-screen">
        <ProfileView profile={PROFILES.joint} />
      </div>

      <AnimatePresence>
        {shouldShowLoader && !loaderDone && (
          <LoadingScreen key="loader" onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>
    </>
  );
}
