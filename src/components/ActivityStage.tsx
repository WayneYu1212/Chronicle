"use client";

import { useMemo, useState } from "react";
import type { StoryBeat } from "@/types/game";
import SentenceText from "./SentenceText";

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
      <p className="activity-copy"><SentenceText text={beat.text} /></p>
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
            <SentenceText text={document.excerpt} />
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
      <p className="work-feedback" aria-live="polite"><SentenceText text={message} /></p>
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
      <p className="activity-copy"><SentenceText text={beat.text} /></p>
      <div className="inspection-sheet">
        <span className="folio-number">十三</span>
        <p><SentenceText text={config.document.excerpt} /></p>
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
      <p className="work-feedback" aria-live="polite"><SentenceText text={detail} /></p>
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
      <p className="activity-copy"><SentenceText text={config.question} /></p>
      <div className="comparison-spread">
        {config.documents.map((document) => (
          <article key={document.id} className="comparison-document">
            <small>{document.title}</small><p><SentenceText text={document.excerpt} /></p>
            <dl><div><dt>纸</dt><dd>{document.paper}</dd></div><div><dt>墨</dt><dd>{document.ink}</dd></div><div><dt>字</dt><dd>{document.handwriting}</dd></div></dl>
          </article>
        ))}
      </div>
      <div className="comparison-options">
        {config.options.map((option) => (
          <button type="button" key={option.id} onClick={() => { setFeedback(option.feedback); setSolved(Boolean(option.correct)); }}>{option.text}</button>
        ))}
      </div>
      <p className="work-feedback"><SentenceText text={feedback} /></p>
      {solved && <button className="seal-action" type="button" onClick={() => onComplete({ clues: ["残页同源"] })}><span>合</span> 收下判断</button>}
    </section>
  );
}

function AssemblyActivity({ beat, onComplete }: ActivityStageProps) {
  const config = beat.assembly!;
  const [order, setOrder] = useState<string[]>([]);
  const [side, setSide] = useState<"front" | "back">("front");
  const [joined, setJoined] = useState(false);
  const [solved, setSolved] = useState(false);
  const [message, setMessage] = useState("先看正面文字，也要翻看纸背。撕口、折痕和旧墨比句意更可靠。");
  const available = config.fragments.filter((fragment) => !order.includes(fragment.id));
  const correct = useMemo(() => order.length === config.fragments.length && order.every((id, index) => config.fragments.find((fragment) => fragment.id === id)?.order === index), [config.fragments, order]);
  const add = (id: string) => {
    setJoined(false);
    setSolved(false);
    setOrder((current) => current.includes(id) ? current : [...current, id]);
  };
  const remove = (id: string) => {
    setJoined(false);
    setSolved(false);
    setOrder((current) => current.filter((item) => item !== id));
  };
  const check = () => {
    if (correct) {
      setJoined(true);
      setMessage("三道撕口和两条横折同时接上。纸背的西字也连成了同一行。");
    } else {
      setMessage("正面的句意勉强能读，纸背的旧墨却接不上。翻到纸背，再按折痕重排。");
    }
  };
  return (
    <section className="activity assembly-activity" aria-label="残页校勘">
      <div className="activity-heading"><span>缀合与辨源</span><strong>{joined ? "辨" : `${order.length}/${config.fragments.length}`}</strong></div>
      <p className="activity-copy"><SentenceText text={joined ? config.question : beat.text} /></p>
      <div className="folio-side-toggle" aria-label="查看纸面">
        <button type="button" className={side === "front" ? "is-active" : ""} onClick={() => setSide("front")}>汉文正面</button>
        <button type="button" className={side === "back" ? "is-active" : ""} onClick={() => setSide("back")}>西字纸背</button>
      </div>
      <div className="assembly-line">
        {order.map((id) => {
          const fragment = config.fragments.find((item) => item.id === id)!;
          return (
            <button type="button" key={id} className={`manuscript-fragment fragment-${fragment.order + 1}`} onClick={() => remove(id)}>
              <small>{fragment.edge}</small>
              <SentenceText text={side === "front" ? fragment.text : fragment.back} />
            </button>
          );
        })}
        {order.length === 0 && <span>将残片放到这里</span>}
      </div>
      <div className="fragment-tray">
        {available.map((fragment) => (
          <button type="button" draggable key={fragment.id} className="manuscript-fragment" onClick={() => add(fragment.id)}>
            <small>{fragment.edge}</small>
            <SentenceText text={side === "front" ? fragment.text : fragment.back} />
          </button>
        ))}
      </div>
      {joined && (
        <div className="source-options">
          {config.options.map((option) => (
            <button type="button" key={option.id} onClick={() => { setMessage(option.feedback); setSolved(Boolean(option.correct)); }}>
              {option.text}
            </button>
          ))}
        </div>
      )}
      <p className="work-feedback" aria-live="polite"><SentenceText text={message} /></p>
      {!joined && order.length === config.fragments.length && <button className="ink-action" type="button" onClick={check}>以纸背核对</button>}
      {solved && <button className="seal-action" type="button" onClick={() => onComplete({ clues: [config.completionClue], archive: beat.unlockArchive })}><span>录</span> 著录来源</button>}
    </section>
  );
}
