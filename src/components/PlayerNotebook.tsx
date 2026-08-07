"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { applyFragmentAction, toggleFocus } from "@/lib/compilation";
import { getFragment } from "@/lib/fragments";
import { GAME_TIMELINE } from "@/lib/timeline";
import { notesNewestFirst } from "@/lib/notes";
import type {
  CompilationSection,
  CompilationState,
  FragmentDisposition,
  PlayerNote,
  PlayerNoteType,
  ReliabilityLevel,
  SourceClarity,
} from "@/types/game";

const NOTE_LABELS: Record<PlayerNoteType, string> = {
  observation: "所见",
  judgement: "判断",
  question: "疑问",
  to_check: "待查",
  clue: "线索",
};

type ShelfDisposition = FragmentDisposition | "custody";

const SHELVES: { disposition: ShelfDisposition; label: string; hint: string }[] = [
  { disposition: "unfiled", label: "待理", hint: "尚未判断" },
  { disposition: "recorded", label: "已录", hint: "正文或附录" },
  { disposition: "doubtful", label: "存疑", hint: "等待旁证" },
  { disposition: "custody", label: "保管", hint: "访问条件已立" },
  { disposition: "sold", label: "已失", hint: "售、毁、交还" },
];

interface PlayerNotebookProps {
  notes: PlayerNote[];
  compilation: CompilationState;
  onCompilationChange: (next: CompilationState, effects?: { wage?: number; risk?: number }) => void;
  date?: string;
  place?: string;
  weather?: string;
}

function shelfFor(disposition: FragmentDisposition): ShelfDisposition {
  if (["retained-illicit", "retained-mei", "transferred-bookshop", "transferred-sealed", "joint-custody"].includes(disposition)) return "custody";
  return disposition === "destroyed" || disposition === "transferred" ? "sold" : disposition;
}

function isLockedDisposition(disposition: FragmentDisposition): boolean {
  return ["sold", "destroyed", "transferred", "retained-mei", "transferred-bookshop", "transferred-sealed", "joint-custody"].includes(disposition);
}

export default function PlayerNotebook({
  notes,
  compilation,
  onCompilationChange,
  date = GAME_TIMELINE.firstChapterDate,
  place = "广州城西",
  weather = "秋雨未歇",
}: PlayerNotebookProps) {
  const fragmentIds = Object.keys(compilation.fragments);
  const [view, setView] = useState<"notes" | "compilation">(fragmentIds.length ? "compilation" : "notes");
  const [selectedId, setSelectedId] = useState<string | null>(fragmentIds[0] ?? null);
  const [target, setTarget] = useState<"recorded" | "doubtful">("recorded");
  const selected = selectedId ? getFragment(selectedId) ?? compilation.fragments[selectedId] : undefined;
  const selectedEntry = selectedId ? compilation.entries[selectedId] : undefined;
  const newestFirstNotes = useMemo(() => notesNewestFirst(notes), [notes]);
  const [interpretation, setInterpretation] = useState("");
  const [sourceClarity, setSourceClarity] = useState<SourceClarity>("unknown");
  const [reliability, setReliability] = useState<ReliabilityLevel>("low");
  const [missingEvidence, setMissingEvidence] = useState("");
  const [section, setSection] = useState<CompilationSection>("main");
  const [message, setMessage] = useState("");
  const interpretationId = useId();
  const missingEvidenceId = useId();

  useEffect(() => {
    if (!selectedEntry) return;
    setInterpretation(selectedEntry.interpretation);
    setSourceClarity(selectedEntry.sourceClarity);
    setReliability(selectedEntry.reliability);
    setMissingEvidence(selectedEntry.missingEvidence);
    setSection(selectedEntry.section ?? "main");
    setTarget(selectedEntry.disposition === "doubtful" ? "doubtful" : "recorded");
  }, [selectedEntry]);

  const shelves = useMemo(() => SHELVES.map((shelf) => ({
    ...shelf,
    ids: fragmentIds.filter((id) => shelfFor(compilation.entries[id]?.disposition ?? "unfiled") === shelf.disposition),
  })), [compilation.entries, fragmentIds]);

  const chooseFor = (id: string, disposition: "recorded" | "doubtful") => {
    setSelectedId(id);
    setTarget(disposition);
    setSection(disposition === "doubtful" ? "doubtful" : "main");
    setMessage(disposition === "doubtful" ? "补全判断后收入存疑卷。" : "补全判断后收入长编。");
  };

  const fillSuggested = (field: "interpretation" | "missingEvidence") => {
    if (!selected) return;
    const current = field === "interpretation" ? interpretation : missingEvidence;
    const suggestion = field === "interpretation" ? selected.suggestedInterpretation : selected.suggestedMissingEvidence;
    if (current.trim()) {
      setMessage("此栏已有文字，代拟不会覆盖你的原稿。");
      return;
    }
    if (!suggestion) {
      setMessage("这份材料尚无可用代拟。");
      return;
    }
    if (field === "interpretation") setInterpretation(suggestion);
    else setMissingEvidence(suggestion);
    setMessage("已代拟，可自行改写；尚未落笔保存。");
  };

  const saveJudgement = () => {
    if (!selectedId || !interpretation.trim() || !missingEvidence.trim()) {
      setMessage("请写明这份材料说明了什么，以及目前缺少什么旁证。");
      return;
    }
    const next = applyFragmentAction(compilation, selectedId, {
      disposition: target,
      section: target === "doubtful" ? "doubtful" : section,
      interpretation: interpretation.trim(),
      sourceClarity,
      reliability,
      missingEvidence: missingEvidence.trim(),
    });
    onCompilationChange(next);
    setMessage(target === "doubtful" ? "已收入存疑卷。" : "已收入史料长编。" );
  };

  const changeFocus = () => {
    if (!selectedId) return;
    try {
      onCompilationChange(toggleFocus(compilation, selectedId));
      setMessage(selectedEntry?.focused ? "已撤去朱记。" : "已加朱记。" );
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "朱记未能更新。" );
    }
  };

  const loseFragment = (disposition: "sold" | "destroyed" | "transferred") => {
    if (!selectedId || !selected) return;
    const labels = { sold: "出售", destroyed: "销毁", transferred: "交还" };
    const warning = disposition === "sold"
      ? `出售后原件将永久离手，可得 ${selected.value} 文。确认出售《${selected.title}》？`
      : `${labels[disposition]}后原件将永久离手。确认${labels[disposition]}《${selected.title}》？`;
    if (!window.confirm(warning)) return;
    const next = applyFragmentAction(compilation, selectedId, { disposition });
    onCompilationChange(next, {
      wage: disposition === "sold" ? selected.value : 0,
      risk: disposition === "destroyed" ? -selected.politicalRisk : disposition === "sold" ? 1 : -1,
    });
    setMessage(`已${labels[disposition]}原件，长编只保留当时的摘要。`);
  };

  return (
    <aside className="player-notebook" aria-label="佣书手札与史料长编">
      <header className="notebook-heading">
        <div>
          <p className="ledger-date">{date}</p>
          <h2>{view === "notes" ? "案头校记" : "随得随录"}</h2>
          <p>{view === "notes" ? "亲眼所见与心中所疑，分笔记下。" : "材料与判断分开著录，未有旁证，不作定论。"}</p>
        </div>
      </header>

      <nav className="notebook-view-tabs" aria-label="手札与长编">
        <button type="button" aria-pressed={view === "notes"} className={view === "notes" ? "is-active" : ""} onClick={() => setView("notes")}>手札</button>
        <button type="button" aria-pressed={view === "compilation"} className={view === "compilation" ? "is-active" : ""} onClick={() => setView("compilation")}>长编 {fragmentIds.length}</button>
      </nav>

      {view === "notes" ? (
        <div className="notebook-entries">
          {notes.length === 0 && (
            <section className="notebook-atmosphere" aria-label="时地与天气">
              <span>{place}</span><strong>{weather}</strong>
              <blockquote>秋阴不散霜飞晚<br />留得枯荷听雨声</blockquote>
              <cite>李商隐《宿骆氏亭寄怀崔雍崔衮》</cite>
            </section>
          )}
          {newestFirstNotes.map((note, index) => (
            <article key={note.id} className={`notebook-entry notebook-entry--${note.type} ${note.status === "resolved" ? "is-resolved" : ""} ${index === 0 ? "is-latest" : ""}`}>
              <span className="notebook-kind">{NOTE_LABELS[note.type]}</span>
              <div><h3>{note.title}</h3><p>{note.content}</p>
                {note.type === "judgement" && note.confidence && <small className="note-confidence">可信度　{"●".repeat(note.confidence)}{"○".repeat(5 - note.confidence)}</small>}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="compilation-workspace">
          <div className="compilation-shelves">
            {shelves.map((shelf) => (
              <section
                key={shelf.disposition}
                className={`compilation-shelf compilation-shelf--${shelf.disposition}`}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  const id = event.dataTransfer.getData("text/plain");
                  if (shelf.disposition === "recorded" || shelf.disposition === "doubtful") chooseFor(id, shelf.disposition);
                  else if (shelf.disposition === "unfiled") onCompilationChange(applyFragmentAction(compilation, id, { disposition: "unfiled" }));
                }}
              >
                <header><strong>{shelf.label}</strong><small>{shelf.hint} · {shelf.ids.length}</small></header>
                <div>
                  {shelf.ids.map((id) => {
                    const item = compilation.fragments[id];
                    const entry = compilation.entries[id];
                    return <button type="button" aria-pressed={selectedId === id} draggable={!isLockedDisposition(entry.disposition)} key={id} className={`compilation-slip ${selectedId === id ? "is-selected" : ""} ${entry.focused ? "is-focused" : ""}`} onDragStart={(event) => event.dataTransfer.setData("text/plain", id)} onClick={() => setSelectedId(id)}><span>{entry.focused ? "朱" : "录"}</span><b>{item.title}</b></button>;
                  })}
                </div>
              </section>
            ))}
          </div>

          {selected && selectedEntry && (
            <section className="compilation-editor" aria-label="史料判断">
              <header><small>{selected.medium} · 风险 {selected.politicalRisk}/5</small><h3>{selected.title}</h3></header>
              <p className="fragment-excerpt">{selected.content}</p>
              <dl><div><dt>来处</dt><dd>{selected.foundAt}</dd></div><div><dt>纸墨</dt><dd>{selected.paper}；{selected.ink}</dd></div></dl>
              {!isLockedDisposition(selectedEntry.disposition) ? <>
                <div className="compilation-guided-field">
                  <div className="compilation-field-heading"><label htmlFor={interpretationId}>据此可见</label><button type="button" aria-label="代拟材料解释" disabled={!selected.suggestedInterpretation || Boolean(interpretation.trim())} onClick={() => fillSuggested("interpretation")}>代拟</button></div>
                  <textarea id={interpretationId} placeholder="这份材料说明了什么" value={interpretation} onChange={(event) => setInterpretation(event.target.value)} rows={3} />
                </div>
                <div className="compilation-fields">
                  <label>来源<select value={sourceClarity} onChange={(event) => setSourceClarity(event.target.value as SourceClarity)}><option value="unknown">不明</option><option value="unclear">线索不足</option><option value="identified">已经确认</option></select></label>
                  <label>可信度<select value={reliability} onChange={(event) => setReliability(event.target.value as ReliabilityLevel)}><option value="low">低</option><option value="medium">中</option><option value="high">高</option></select></label>
                  <label>位置<select value={section} onChange={(event) => setSection(event.target.value as CompilationSection)} disabled={target === "doubtful"}><option value="main">正文</option><option value="appendix">附录</option><option value="doubtful">存疑卷</option></select></label>
                </div>
                <div className="compilation-guided-field">
                  <div className="compilation-field-heading"><label htmlFor={missingEvidenceId}>尚待旁证</label><button type="button" aria-label="代拟所缺旁证" disabled={!selected.suggestedMissingEvidence || Boolean(missingEvidence.trim())} onClick={() => fillSuggested("missingEvidence")}>代拟</button></div>
                  <input id={missingEvidenceId} placeholder="还缺什么旁证" value={missingEvidence} onChange={(event) => setMissingEvidence(event.target.value)} />
                </div>
                <div className="compilation-actions"><button type="button" onClick={() => { setTarget("recorded"); setSection(section === "doubtful" ? "main" : section); }}>收入长编</button><button type="button" onClick={() => { setTarget("doubtful"); setSection("doubtful"); }}>列入存疑</button><button type="button" className="seal-action-inline" onClick={saveJudgement}>落笔</button></div>
                <div className="fragment-disposition-actions"><button type="button" onClick={changeFocus}>{selectedEntry.focused ? "撤去朱记" : "加朱记"}</button><button type="button" onClick={() => loseFragment("transferred")}>交还</button><button type="button" onClick={() => loseFragment("sold")}>出售 {selected.value} 文</button><button type="button" onClick={() => loseFragment("destroyed")}>销毁</button></div>
              </> : <p className="lost-fragment-notice">这份材料的保管状态已经固定为“{selectedEntry.disposition}”，这里只保留访问条件、收条和你当时见过的摘要，不能用普通长编操作改回原件。</p>}
            </section>
          )}
          {!fragmentIds.length && <p className="empty-compilation">尚未取得可收入长编的史料。</p>}
          {message && <p className="compilation-message" role="status" aria-live="polite">{message}</p>}
        </div>
      )}

      <footer className="notebook-colophon"><span aria-hidden>记</span><p>所见可录，所疑暂存。原件一旦离手，不复归卷。</p></footer>
    </aside>
  );
}
