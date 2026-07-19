'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { playPageTurnSound } from '@/lib/sound';
import ChoiceButton from './ChoiceButton';

type AnimPhase = 'idle' | 'exiting' | 'entering';

/* 古籍翻页动画时长（ms）— 缓慢克制 */
const EXIT_MS = 250;
const ENTER_MS = 250;

interface ManuscriptPageProps {
  speaker?: string;
  text: string;
  isTitle?: boolean;
  canTurn?: boolean;
  onTurn?: () => void;
  choices?: { id: string; text: string }[];
  onChoice?: (index: number) => void;
  footer?: ReactNode;
}

export default function ManuscriptPage({
  speaker,
  text,
  isTitle = false,
  canTurn = false,
  onTurn,
  choices,
  onChoice,
  footer,
}: ManuscriptPageProps) {
  const [phase, setPhase] = useState<AnimPhase>('entering');
  const mountedRef = useRef(false);
  const turningRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onTurnRef = useRef(onTurn);
  const onChoiceRef = useRef(onChoice);
  onTurnRef.current = onTurn;
  onChoiceRef.current = onChoice;
  /* 首次挂载入场动画 */
  useEffect(() => {
    mountedRef.current = true;
    timerRef.current = setTimeout(() => {
      if (!mountedRef.current) return;
      setPhase('idle');
    }, ENTER_MS);
    return () => {
      mountedRef.current = false;
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);
  /* 翻页：淡出 → 下一内容 → 淡入 */
  const startExit = useCallback(
    (onComplete: () => void) => {
      if (phase !== 'idle' || turningRef.current) return;
      turningRef.current = true;
      setPhase('exiting');
      playPageTurnSound();

      timerRef.current = setTimeout(() => {
        if (!mountedRef.current) return;
        onComplete();
        setPhase('entering');

        timerRef.current = setTimeout(() => {
          if (!mountedRef.current) return;
          setPhase('idle');
          turningRef.current = false;
        }, ENTER_MS);
      }, EXIT_MS);
    },
    [phase],
  );

  const handlePageClick = useCallback(
    (event: React.MouseEvent) => {
      if ((event.target as HTMLElement).closest('[data-no-turn]')) return;
      if (!canTurn || choices) return;
      startExit(() => onTurnRef.current?.());
    },
    [canTurn, choices, startExit],
  );

  const handleChoiceSelect = useCallback(
    (index: number) => {
      startExit(() => onChoiceRef.current?.(index));
    },
    [startExit],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        if (canTurn && !choices) {
          startExit(() => onTurnRef.current?.());
        }
      }
    },
    [canTurn, choices, startExit],
  );

  const phaseClass =
    phase === 'exiting'
      ? 'manuscript-page--exit'
      : phase === 'entering'
        ? 'manuscript-page--enter'
        : '';

  const isInteractive = canTurn && phase === 'idle' && !choices;
  /* 为每段文字绑定独立 key，确保 remount 时彻底销毁旧 DOM */
  const contentKey = text;
  return (
    <div className="manuscript-stage mx-auto w-full max-w-2xl">
      <article
        className={`manuscript-page ${phaseClass}`}
        onClick={handlePageClick}
        onKeyDown={handleKeyDown}
        role={isInteractive ? 'button' : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        aria-label={isInteractive ? '点击翻页' : undefined}
      >
        <div className="manuscript-sheet">
          <div className="manuscript-corner-curl" aria-hidden />
          <div className="manuscript-paper-texture" aria-hidden />

          {!isTitle && speaker && speaker !== '旁白' && (
            <header className="manuscript-speaker">{speaker}</header>
          )}

          <div className={isTitle ? 'manuscript-title-text' : 'manuscript-body-text'}>
            <p key={contentKey}>{text}</p>
          </div>

          {choices && choices.length > 0 && (
            <div className="manuscript-choices">
              {choices.map((choice, index) => (
                <ChoiceButton
                  key={choice.id}
                  index={index}
                  text={choice.text}
                  onSelect={() => handleChoiceSelect(index)}
                />
              ))}
            </div>
          )}

          {canTurn && phase === 'idle' && !choices && (
            <p className="manuscript-turn-hint" aria-hidden>
              ─ 续 ─
            </p>
          )}

          {footer && <div className="manuscript-footer" data-no-turn>{footer}</div>}
        </div>
      </article>
    </div>
  );
}
