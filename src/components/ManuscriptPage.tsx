"use client";

import type { ReactNode } from "react";
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
  const handleClick = (event: React.MouseEvent) => {
    if ((event.target as HTMLElement).closest("button, a") || !canTurn || choices) return;
    onTurn?.();
  };

  const speakerKind = speaker === "我" ? "self" : speaker === "旁白" ? "narrator" : speaker ? "other" : "plain";
  const speakerLabel = speaker === "旁白" ? "记" : speaker;
  const paragraphs = <SentenceText text={text} />;

  return (
    <article
      className={`narrative-page ${canTurn ? "is-clickable" : ""}`}
      onClick={handleClick}
      onKeyDown={(event) => { if ((event.key === "Enter" || event.key === " ") && canTurn && !choices) { event.preventDefault(); onTurn?.(); } }}
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
      {choices && <div className="choice-list">{choices.map((choice, index) => <ChoiceButton key={choice.id} text={choice.text} index={index} onSelect={() => onChoice?.(index)} />)}</div>}
      {canTurn && !choices && <div className="continue-mark" aria-hidden><i />续页</div>}
      {footer && <div className="narrative-footer">{footer}</div>}
    </article>
  );
}
