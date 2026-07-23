"use client";

import type { PlayerNote, PlayerNoteType } from "@/types/game";

const NOTE_LABELS: Record<PlayerNoteType, string> = {
  observation: "所见",
  judgement: "判断",
  question: "疑问",
  to_check: "待查",
  clue: "线索",
};

interface PlayerNotebookProps {
  notes: PlayerNote[];
  date?: string;
  place?: string;
  weather?: string;
}

export default function PlayerNotebook({ notes, date = "康熙九年 · 九月廿三", place = "广州城西", weather = "秋雨未歇" }: PlayerNotebookProps) {
  return (
    <aside className="player-notebook" aria-label="佣书手札" aria-live="polite">
      <header className="notebook-heading">
        <div className="vertical-title"><span>佣书手札</span><small>听雨书坊</small></div>
        <div>
          <p className="ledger-date">{date}</p>
          <h2>案头校记</h2>
          <p>亲眼所见与心中所疑，分笔记下。</p>
        </div>
      </header>

      <div className="notebook-entries">
        {notes.length === 0 && (
          <section className="notebook-atmosphere" aria-label="时地与天气">
            <span>{place}</span>
            <strong>{weather}</strong>
            <blockquote>
              秋阴不散霜飞晚<br />
              留得枯荷听雨声
            </blockquote>
            <cite>李商隐《宿骆氏亭寄怀崔雍崔衮》</cite>
          </section>
        )}
        {notes.map((note, index) => (
          <article
            key={note.id}
            className={`notebook-entry notebook-entry--${note.type} ${note.status === "resolved" ? "is-resolved" : ""} ${index === notes.length - 1 ? "is-latest" : ""}`}
          >
            <span className="notebook-kind">{NOTE_LABELS[note.type]}</span>
            <div>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              {note.type === "judgement" && note.confidence && (
                <small className="note-confidence" aria-label={`可信度 ${note.confidence} 星`}>
                  可信度　{"●".repeat(note.confidence)}{"○".repeat(5 - note.confidence)}
                </small>
              )}
            </div>
          </article>
        ))}
      </div>

      <footer className="notebook-colophon">
        <span aria-hidden>记</span>
        <p>所见可录，所疑暂存。未有旁证，不作定论。</p>
      </footer>
    </aside>
  );
}
