"use client";

import { useMemo } from "react";

interface PaperFlakesProps {
  count?: number;
}

export default function PaperFlakes({ count = 12 }: PaperFlakesProps) {
  const flakes = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 8}s`,
        duration: `${10 + Math.random() * 10}s`,
        size: 4 + Math.random() * 4,
      })),
    [count]
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      {flakes.map((flake) => (
        <span
          key={flake.id}
          className="paper-flake"
          style={{
            left: flake.left,
            animationDelay: flake.delay,
            animationDuration: flake.duration,
            width: flake.size,
            height: flake.size * 1.3,
          }}
        />
      ))}
    </div>
  );
}
