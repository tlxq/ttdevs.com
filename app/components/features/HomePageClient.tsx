"use client";

import { useEffect, useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { ProfileView } from "./ProfileView";
import { PROFILES } from "../../lib/data/profiles";
import LoadingScreen from "../ui/LoadingScreen";

export default function HomePageClient() {
  const [isLoading, setIsLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    // Check if user has already seen the loader in this session
    const hasSeenLoader = sessionStorage.getItem("hasSeenLoader");
    
    if (!hasSeenLoader) {
      setShowLoader(true);
      // We'll set the session storage when the loader completes
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleLoadingComplete = useCallback(() => {
    sessionStorage.setItem("hasSeenLoader", "true");
    setIsLoading(false);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {showLoader && isLoading && (
          <LoadingScreen key="loader" onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      <main className="bg-zinc-950 min-h-screen">
        {!isLoading && (
          <ProfileView profile={PROFILES.joint} />
        )}
      </main>
    </>
  );
}
