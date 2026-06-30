"use client";

import { useEffect, useRef, useState } from "react";

interface SignalQualityProps {
  /** 0–100. */
  value: number;
  segments?: number;
  className?: string;
  onComplete?: () => void;
}

/**
 * A recovered-signal meter: ████████░░ 87%. The bar fills segment by segment,
 * like a measurement settling, then reveals the percentage. Reusable.
 */
export default function SignalQuality({
  value,
  segments = 10,
  className = "",
  onComplete,
}: SignalQualityProps) {
  const target = Math.min(segments, Math.floor((value / 100) * segments));
  const [filled, setFilled] = useState(0);

  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);
  const doneRef = useRef(false);

  useEffect(() => {
    if (filled >= target) {
      if (doneRef.current) return;
      doneRef.current = true;
      const timer = setTimeout(() => onCompleteRef.current?.(), 250);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => setFilled((prev) => prev + 1), 95);
    return () => clearTimeout(timer);
  }, [filled, target]);

  const bar = "█".repeat(filled) + "░".repeat(Math.max(0, segments - filled));

  return (
    <p className={className}>
      <span className="whitespace-pre">{bar}</span>
      <span className="ml-3">{filled >= target ? `${value}%` : " "}</span>
    </p>
  );
}
