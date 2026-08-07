"use client";

import React, { useEffect, useRef, useState } from "react";
import { TUTORIAL_STEPS } from "@/lib/tutorial";

interface TutorialOverlayProps {
  open: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export default function TutorialOverlay({ open, onClose, onComplete }: TutorialOverlayProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = "tutorial-title";
  const descriptionId = "tutorial-description";
  const currentStep = TUTORIAL_STEPS[stepIndex] ?? TUTORIAL_STEPS[0];
  const isLastStep = stepIndex === TUTORIAL_STEPS.length - 1;

  useEffect(() => {
    if (!open) return;
    setStepIndex(0);
    closeButtonRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose, open]);

  if (!open) return null;

  const goNext = () => {
    if (isLastStep) {
      onComplete();
      return;
    }
    setStepIndex((current) => current + 1);
  };

  return (
    <div className="tutorial-overlay">
      <div className="tutorial-backdrop" aria-hidden />
      <section
        className="tutorial-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        aria-live="polite"
      >
        <button ref={closeButtonRef} type="button" className="tutorial-close" onClick={onClose} aria-label="稍后再看" title="稍后再看">×</button>
        <div className="tutorial-seal" aria-hidden>{stepIndex + 1}</div>
        <p className="tutorial-kicker">新手指引</p>
        <p className="tutorial-progress">{stepIndex + 1} / {TUTORIAL_STEPS.length}</p>
        <h2 id={titleId}>{currentStep.title}</h2>
        <p id={descriptionId} className="tutorial-description">{currentStep.body}</p>
        <div className="tutorial-actions">
          <button type="button" className="tutorial-secondary" onClick={() => setStepIndex((current) => Math.max(0, current - 1))} disabled={stepIndex === 0}>上一步</button>
          <button type="button" className="tutorial-primary" onClick={goNext}>{isLastStep ? "知道了" : "下一步"}</button>
        </div>
      </section>
    </div>
  );
}
