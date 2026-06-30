import type { ReactNode } from "react";

import Disk from "@/components/effects/Disk";
import ScreenEffects from "@/components/effects/ScreenEffects";

interface CRTScreenProps {
  children: ReactNode;
}

/**
 * The CRT face of the OSIRIS archive — a curved green-phosphor tube.
 *
 * Layering:
 *   .crt-hsync     occasional horizontal-sync tearing (the signal)
 *   .crt-content   faint domed perspective + shimmer + flicker (the image)
 *   ScreenEffects  viewport-fixed bloom · scanlines · curve · vignette
 *
 * Content flows and scrolls normally; the effect layers stay locked to the
 * viewport so the glass never moves.
 */
export default function CRTScreen({ children }: CRTScreenProps) {
  return (
    // No bg here: the body is black (globals), so a portaled GhostLayer at z-0
    // can sit behind this shell (z-10) and still show. z-10 makes this a
    // stacking context above the ghost layer.
    <div className="relative z-10 min-h-screen w-full">
      <Disk />

      <div className="crt-hsync">
        <div className="crt-content crt-shimmer crt-flicker relative z-10">
          {children}
        </div>
      </div>

      <ScreenEffects />
    </div>
  );
}
