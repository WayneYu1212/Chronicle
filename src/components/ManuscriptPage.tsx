'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { playPageTurnSound } from '@/lib/sound';

type AnimPhase = 'idle' | 'exit' | 'enter';

const EXIT_MS = 220;
const ENTER_MS = 220;

interface ManuscriptPageProps {
  pageKey: string;
  speaker?: string;
  text: string;
  isTitle?: boolean;
  canTurn?: boolean;
  onTurn?: () => void;
  footer?: React.ReactNode;
}

export default function ManuscriptPage({
  pageKey,
  speaker,
  text,
  isTitle = false,
  canTurn = false,
  onTurn,
  footer,
}: ManuscriptPageProps) {
  const [phase, setPhase] = useState<AnimPhase>('idle');
  const turningRef = useRef(false);
  const onTurnRef = useRef(onTurn);
  const prevKeyRef = useRef(pageKey);
  const timerRef = useRef<number | null>(null);

  onTurnRef.current = onTurn;

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Handle pageKey changes (internal turn or external navigation)
  useEffect(() => {
    if (prevKeyRef.current === pageKey) return;

    const wasInternal = turningRef.current;
    prevKeyRef.current = pageKey;

    if (wasInternal) return;

    // External navigation: animate new page in
    clearTimer();
    setPhase('enter');
    timerRef.current = window.setTimeout(() => {
      setPhase('idle');
      timerRef.current = null;
    }, ENTER_MS);
  }, [pageKey, clearTimer]);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  const requestTurn = useCallback(() => {
    if (!canTurn || turningRef.current || phase !== 'idle') return;

    turningRef.current = true;
    clearTimer();
    playPageTurnSound();

    // Exit phase — old page fades out
    setPhase('exit');

    timerRef.current = window.setTimeout(() => {
      // Advance to next beat (parent state update)
      onTurnRef.current?.();

      clearTimer();

      // Enter phase — new page fades in (text + phase batched by React)
      setPhase('enter');

      timerRef.current = window.setTimeout(() => {
        setPhase('idle');
        turningRef.current = false;
        timerRef.current = null;
      }, ENTER_MS);
    }, EXIT_MS);
  }, [canTurn, phase, clearTimer]);

  const handleClick = (event: React.MouseEvent) => {
    if ((event.target as HTMLElement).closest('[data-no-turn]')) return;
    requestTurn();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      requestTurn();
    }
  };

  const phaseClass =
    phase === 'exit'
      ? 'manuscript-page--exit'
      : phase === 'enter'
        ? 'manuscript-page--enter'
        : '';

  return (
    <div className="manuscript-stage mx-auto w-full max-w-2xl">
      <article
        className={`manuscript-page ${phaseClass} ${canTurn ? 'manuscript-page--interactive' : ''}`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role={canTurn ? 'button' : undefined}
        tabIndex={canTurn ? 0 : undefined}
        aria-label={canTurn ? '点击翻页' : undefined}
      >
        <div className="manuscript-sheet">
          <div className="manuscript-corner-curl" aria-hidden />

          {!isTitle && speaker && speaker !== '旁白' && (
            <header className="manuscript-speaker">{speaker}</header>
          )}

          {/* key={pageKey} ensures React cleanly unmounts old text DOM,
              preventing any text-ghosting / duplication between pages */}
          <div key={pageKey} className={isTitle ? 'manuscript-title-text' : 'manuscript-body-text'}>
            <p>{text}</p>
          </div>

          {canTurn && phase === 'idle' && (
            <p className="manuscript-turn-hint" aria-hidden>
              ﹀
            </p>
          )}

          {footer && <div className="manuscript-footer" data-no-turn>{footer}</div>}
        </div>
      </article>
    </div>
  );
}
