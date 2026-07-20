"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import ChoiceButton from "./ChoiceButton";
import SentenceText from "./SentenceText";

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

export default function ManuscriptPage({ speaker, text, isTitle, canTurn, onTurn, choices, onChoice, footer }: ManuscriptPageProps) {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const busy = useRef(false);
  useEffect(() => { const timer = window.setTimeout(() => setVisible(true), 40); return () => window.clearTimeout(timer); }, []);

  const transition = useCallback((done?: () => void) => {
    if (busy.current) return;
    busy.current = true;
    setLeaving(true);
    window.setTimeout(() => done?.(), 230);
  }, []);

  const handleClick = (event: React.MouseEvent) => {
    if ((event.target as HTMLElement).closest("button, a") || !canTurn || choices) return;
    transition(onTurn);
  };

  const speakerKind = speaker === "我" ? "self" : speaker === "旁白" ? "narrator" : speaker ? "other" : "plain";
  const speakerLabel = speaker === "旁白" ? "记" : speaker;
  const paragraphs = <SentenceText text={text} />;

  return (
    <article
      className={`narrative-page ${visible ? "is-visible" : ""} ${leaving ? "is-leaving" : ""} ${canTurn ? "is-clickable" : ""}`}
      onClick={handleClick}
      onKeyDown={(event) => { if ((event.key === "Enter" || event.key === " ") && canTurn && !choices) { event.preventDefault(); transition(onTurn); } }}
      tabIndex={canTurn ? 0 : undefined}
      role={canTurn ? "button" : undefined}
      aria-label={canTurn ? "继续阅读" : undefined}
    >
      {isTitle ? (
        <div className="chapter-leaf">{paragraphs}</div>
      ) : (
        <div className={`dialogue-block dialogue-block--${speakerKind}`}>
          {speakerLabel && (
            <aside className="speaker-rail" aria-label={`说话者：${speaker}`}>
              <span className="speaker-label">{speakerLabel}</span>
              <i className="speaker-line" aria-hidden />
            </aside>
          )}
          <div className="narrative-copy">{paragraphs}</div>
          {speakerKind === "narrator" && <i className="narrator-ink-drop" aria-hidden />}
        </div>
      )}
      {choices && <div className="choice-list">{choices.map((choice, index) => <ChoiceButton key={choice.id} text={choice.text} index={index} onSelect={() => transition(() => onChoice?.(index))} />)}</div>}
      {canTurn && !choices && <div className="continue-mark" aria-hidden><i />续页</div>}
      {footer && <div className="narrative-footer">{footer}</div>}
    </article>
  );
}
