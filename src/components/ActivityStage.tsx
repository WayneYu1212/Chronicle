"use client";

import { useMemo, useState } from "react";
import type { StoryBeat } from "@/types/game";

interface ActivityStageProps {
  beat: StoryBeat;
  onComplete: (result: { clues?: string[]; archive?: string[]; wage?: number; paper?: number }) => void;
}

export default function ActivityStage({ beat, onComplete }: ActivityStageProps) {
  if (beat.type === "sorting" && beat.sorting) {
    return <SortingActivity beat={beat} onComplete={onComplete} />;
  }
  if (beat.type === "inspection" && beat.inspection) {
    return <InspectionActivity beat={beat} onComplete={onComplete} />;
  }
  if (beat.type === "comparison" && beat.comparison) {
    return <ComparisonActivity beat={beat} onComplete={onComplete} />;
  }
  if (beat.type === "assembly" && beat.assembly) {
    return <AssemblyActivity beat={beat} onComplete={onComplete} />;
  }
  return null;
}

function SortingActivity({ beat, onComplete }: ActivityStageProps) {
  const config = beat.sorting!;
  const [selected, setSelected] = useState<string | null>(null);
  const [sorted, setSorted] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("先选一张纸，再放入合适的书匣。也可以直接拖动。");
  const remaining = config.documents.filter((document) => !sorted[document.id]);
  const normalDone = Object.keys(sorted).length >= config.required;

  const place = (documentId: string, category: string) => {
    const document = config.documents.find((item) => item.id === documentId);
    if (!document) return;
    if (document.anomalous) {
      setMessage("这页没有题名，也不属于任何一卷。先把它留在案上。");
      setSelected(documentId);
      return;
    }
    if (document.category !== category) {
      setMessage(`纸上的格式不像${category}，再看一眼落款和行款。`);
      return;
    }
    setSorted((current) => ({ ...current, [documentId]: category }));
    setSelected(null);
    setMessage(`${document.title}已经收入${category}匣。`);
  };

  return (
    <section className="activity" aria-label="文稿分类">
      <div className="activity-heading">
        <span>今日书课</span>
        <strong>{Object.keys(sorted).length}/{config.required}</strong>
      </div>
      <p className="activity-copy">{beat.text}</p>
      <div className="document-tray">
        {remaining.map((document) => (
          <button
            type="button"
            draggable
            key={document.id}
            onDragStart={(event) => event.dataTransfer.setData("text/plain", document.id)}
            onClick={() => setSelected(document.id)}
            className={`document-slip ${selected === document.id ? "is-selected" : ""} ${document.anomalous ? "is-anomalous" : ""}`}
          >
            <small>{document.mark ?? "无记"}</small>
            <b>{document.title}</b>
            <span>{document.excerpt}</span>
          </button>
        ))}
      </div>
      <div className="category-grid">
        {config.categories.map((category) => (
          <button
            type="button"
            key={category}
            className="category-slot"
            onClick={() => selected && place(selected, category)}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => place(event.dataTransfer.getData("text/plain"), category)}
          >
            <span>{category}</span>
            <small>{Object.values(sorted).filter((value) => value === category).length} 件</small>
          </button>
        ))}
      </div>
      <p className="work-feedback" aria-live="polite">{message}</p>
      {normalDone && (
        <button className="seal-action" type="button" onClick={() => onComplete({ wage: 18 })}>
          <span>记</span> 普通文稿已清
        </button>
      )}
    </section>
  );
}

function InspectionActivity({ beat, onComplete }: ActivityStageProps) {
  const config = beat.inspection!;
  const [found, setFound] = useState<string[]>([]);
  const [detail, setDetail] = useState("从纸、墨、字和藏印开始查验。");
  const done = found.length >= config.required;
  const inspect = (id: string, nextDetail: string) => {
    setFound((current) => current.includes(id) ? current : [...current, id]);
    setDetail(nextDetail);
  };
  return (
    <section className="activity inspection" aria-label="残页查验">
      <div className="activity-heading"><span>查验残页</span><strong>{found.length}/{config.required}</strong></div>
      <p className="activity-copy">{beat.text}</p>
      <div className="inspection-sheet">
        <span className="folio-number">十三</span>
        <p>{config.document.excerpt}</p>
        {config.hotspots.map((spot, index) => (
          <button
            type="button"
            key={spot.id}
            className={`inspection-mark mark-${index + 1} ${found.includes(spot.id) ? "is-found" : ""}`}
            onClick={() => inspect(spot.id, spot.detail)}
            aria-label={`查验${spot.label}`}
          >{index + 1}</button>
        ))}
      </div>
      <p className="work-feedback" aria-live="polite">{detail}</p>
      {done && <button className="seal-action" type="button" onClick={() => onComplete({ clues: config.hotspots.map((spot) => spot.label), archive: beat.unlockArchive, paper: 1 })}><span>录</span> 写入笺记</button>}
    </section>
  );
}

function ComparisonActivity({ beat, onComplete }: ActivityStageProps) {
  const config = beat.comparison!;
  const [feedback, setFeedback] = useState("把两页并在一处，先看纸筋，再看运笔。");
  const [solved, setSolved] = useState(false);
  return (
    <section className="activity" aria-label="文稿比对">
      <div className="activity-heading"><span>两纸互校</span><strong>比</strong></div>
      <p className="activity-copy">{config.question}</p>
      <div className="comparison-spread">
        {config.documents.map((document) => (
          <article key={document.id} className="comparison-document">
            <small>{document.title}</small><p>{document.excerpt}</p>
            <dl><div><dt>纸</dt><dd>{document.paper}</dd></div><div><dt>墨</dt><dd>{document.ink}</dd></div><div><dt>字</dt><dd>{document.handwriting}</dd></div></dl>
          </article>
        ))}
      </div>
      <div className="comparison-options">
        {config.options.map((option) => (
          <button type="button" key={option.id} onClick={() => { setFeedback(option.feedback); setSolved(Boolean(option.correct)); }}>{option.text}</button>
        ))}
      </div>
      <p className="work-feedback">{feedback}</p>
      {solved && <button className="seal-action" type="button" onClick={() => onComplete({ clues: ["残页同源"] })}><span>合</span> 收下判断</button>}
    </section>
  );
}

function AssemblyActivity({ beat, onComplete }: ActivityStageProps) {
  const config = beat.assembly!;
  const [order, setOrder] = useState<string[]>([]);
  const [message, setMessage] = useState("依照撕口与文意，把三片残纸接回原序。");
  const available = config.fragments.filter((fragment) => !order.includes(fragment.id));
  const correct = useMemo(() => order.length === config.fragments.length && order.every((id, index) => config.fragments.find((fragment) => fragment.id === id)?.order === index), [config.fragments, order]);
  const add = (id: string) => setOrder((current) => current.includes(id) ? current : [...current, id]);
  const check = () => {
    if (correct) setMessage("纸口相合。残句终于连成了一段话。");
    else { setMessage("文气在中间断了。再按撕口重排。 "); setOrder([]); }
  };
  return (
    <section className="activity" aria-label="残页拼接">
      <div className="activity-heading"><span>缀合残纸</span><strong>{order.length}/{config.fragments.length}</strong></div>
      <p className="activity-copy">{beat.text}</p>
      <div className="assembly-line">
        {order.map((id) => { const fragment = config.fragments.find((item) => item.id === id)!; return <button type="button" key={id} onClick={() => setOrder((current) => current.filter((item) => item !== id))}>{fragment.text}</button>; })}
        {order.length === 0 && <span>将残片放到这里</span>}
      </div>
      <div className="fragment-tray">
        {available.map((fragment) => <button type="button" draggable key={fragment.id} onClick={() => add(fragment.id)}>{fragment.text}</button>)}
      </div>
      <p className="work-feedback">{message}</p>
      {!correct && order.length === config.fragments.length && <button className="ink-action" type="button" onClick={check}>核对次序</button>}
      {correct && <button className="seal-action" type="button" onClick={() => onComplete({ clues: ["西门残句"], archive: beat.unlockArchive })}><span>缀</span> 收入残卷</button>}
    </section>
  );
}
