"use client";

import React from "react";
import { motion, useAnimationControls } from "framer-motion";

/**
 * ScreenLoader
 * Full-screen overlay with two panels rotated together by 15deg.
 * When the page has fully loaded, both panels slide out simultaneously
 * (top goes up, bottom goes down) with a smooth animation, then unmounts.
 */
export default function ScreenLoader() {
  const [mounted, setMounted] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const topControls = useAnimationControls();
  const bottomControls = useAnimationControls();

  React.useEffect(() => {
    setMounted(true);

    const triggerExit = () => {
      const transition = {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      } as const;

      // Run both animations in parallel
      Promise.all([
        topControls.start({ y: "-110vh", transition }),
        bottomControls.start({ y: "110vh", transition }),
      ]).finally(() => {
        // After animation, hide the overlay
        setHidden(true);
      });
    };

    // If the page is already fully loaded (including assets), exit immediately
    if (typeof document !== "undefined" && document.readyState === "complete") {
      // Slight delay to ensure initial paint before exit for a smoother feel
      const id = window.setTimeout(triggerExit, 50);
      return () => window.clearTimeout(id);
    }

    // Otherwise wait for window load event
    const onLoad = () => triggerExit();
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, [topControls, bottomControls]);

  if (!mounted || hidden) return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[9999] pointer-events-none"
      style={{ background: "transparent" }}
    >
      {/* Oversized, rotated container to ensure full coverage at corners */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: "130vw", height: "130vh" }}
        initial={{ rotate: 15 }}
        animate={{ rotate: 15 }}
        transition={{ type: "tween", duration: 0 }}
      >
        {/* Two stacked panels fill the rotated container */}
        <div className="relative w-full h-full">
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-background"
            initial={{ y: 0 }}
            animate={topControls}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-background"
            initial={{ y: 0 }}
            animate={bottomControls}
          />
        </div>
      </motion.div>
    </div>
  );
}
