"use client";

import { useMemo, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import type { StoryBeat } from "@/types/game";
import LingnanMap from "./LingnanMap";
import SentenceText from "./SentenceText";

export interface ActivityResult {
  clues?: string[];
  archive?: string[];
  wage?: number;
  paper?: number;
  location?: string;
}

interface ActivityStageProps {
  beat: StoryBeat;
  onComplete: (result: ActivityResult) => void;
  showSkip?: boolean;
  unlockedLocations?: string[];
  investigatedLocations?: string[];
}

export default function ActivityStage({ beat, onComplete, showSkip = false, unlockedLocations = [], investigatedLocations = [] }: ActivityStageProps) {
  let stage = null;
  if (beat.type === "sorting" && beat.sorting) {
    stage = <SortingActivity beat={beat} onComplete={onComplete} />;
  }
  else if (beat.type === "inspection" && beat.inspection) {
    stage = <InspectionActivity beat={beat} onComplete={onComplete} />;
  }
  else if (beat.type === "comparison" && beat.comparison) {
    stage = <ComparisonActivity beat={beat} onComplete={onComplete} />;
  }
  else if (beat.type === "assembly" && beat.assembly) {
    stage = <AssemblyActivity beat={beat} onComplete={onComplete} />;
  }
  else if (beat.type === "map" && beat.map) {
    stage = (
      <LingnanMap
        config={beat.map}
        unlockedLocations={unlockedLocations}
        investigatedLocations={investigatedLocations}
        onComplete={(location) => onComplete({ location })}
      />
    );
  }

  const skip = () => {
    if (beat.type === "sorting") onComplete({ wage: 2 });
    else if (beat.type === "inspection") onComplete({ clues: beat.inspection?.hotspots.slice(0, beat.inspection.required).map((spot) => spot.label), archive: beat.unlockArchive, paper: 1 });
    else if (beat.type === "comparison") onComplete({ clues: ["残页同源"] });
    else if (beat.type === "assembly") onComplete({ clues: beat.assembly ? [beat.assembly.completionClue] : [], archive: beat.unlockArchive });
    else if (beat.type === "map" && beat.map?.destination) onComplete({ location: beat.map.destination });
  };

  return (
    <div className="activity-stage-frame">
      {stage}
      {showSkip && <button type="button" className="activity-skip" onClick={skip}>略过此课</button>}
    </div>
  );
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
        <button className="seal-action" type="button" onClick={() => onComplete({ wage: 2 })}>
          <span>记</span> 普通文稿已清
        </button>
      )}
    </section>
  );
}

function InspectionActivity({ beat, onComplete }: ActivityStageProps) {
  const config = beat.inspection!;
  const [found, setFound] = useState<string[]>([]);
  const [side, setSide] = useState<"front" | "back">("front");
  const [lamp, setLamp] = useState({ x: 18, y: 82 });
  const [dragging, setDragging] = useState(false);
  const [activeEvidence, setActiveEvidence] = useState<string | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const done = found.length >= config.required;
  const visibleHotspots = config.hotspots.filter((spot) => (spot.side ?? "front") === side);
  const activeSpot = config.hotspots.find((spot) => spot.id === activeEvidence);

  const inspect = (id: string) => {
    setFound((current) => current.includes(id) ? current : [...current, id]);
    setActiveEvidence(id);
  };
  const moveLamp = (event: ReactPointerEvent<HTMLDivElement | HTMLButtonElement>) => {
    const board = boardRef.current;
    if (!board) return;
    const rect = board.getBoundingClientRect();
    const x = Math.min(94, Math.max(6, ((event.clientX - rect.left) / rect.width) * 100));
    const y = Math.min(92, Math.max(8, ((event.clientY - rect.top) / rect.height) * 100));
    setLamp({ x, y });
    const nearest = visibleHotspots
      .map((spot) => {
        const marker = board.querySelector<HTMLElement>(`[data-evidence-id="${spot.id}"]`);
        if (!marker) return { spot, distance: Number.POSITIVE_INFINITY };
        const markerRect = marker.getBoundingClientRect();
        const markerX = markerRect.left + markerRect.width / 2;
        const markerY = markerRect.top + markerRect.height / 2;
        return { spot, distance: Math.hypot(event.clientX - markerX, event.clientY - markerY) };
      })
      .sort((a, b) => a.distance - b.distance)[0];
    if (nearest && nearest.distance < 62) inspect(nearest.spot.id);
    else setActiveEvidence(null);
  };

  const lightStyle = {
    "--lamp-x": `${lamp.x}%`,
    "--lamp-y": `${lamp.y}%`,
  } as CSSProperties;

  return (
    <section className="activity inspection" aria-label="残页查验">
      <div className="activity-heading"><span>查验残页</span><strong>{found.length}/{config.required}</strong></div>
      <p className="activity-copy"><SentenceText text={beat.text} /></p>
      <div
        ref={boardRef}
        className={`inspection-workbench ${dragging ? "is-dragging" : ""}`}
        style={lightStyle}
        onPointerMove={(event) => dragging && moveLamp(event)}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
        onPointerLeave={() => { setDragging(false); setActiveEvidence(null); }}
      >
        <div className="inspection-tools" aria-label="查验工具">
          <span>案上器具</span>
          <button
            type="button"
            className="paper-side-tool"
            onClick={() => { setSide((current) => current === "front" ? "back" : "front"); setActiveEvidence(null); }}
          >
            翻看{side === "front" ? "纸背" : "正面"}
          </button>
          <small>按住灯盏，贴近微光处察看。</small>
        </div>
        <div className={`inspection-sheet inspection-sheet--${side}`}>
          <span className="folio-number">{side === "front" ? "十三" : "纸背"}</span>
          <p><SentenceText text={side === "front" ? config.document.excerpt : config.verso ?? "纸背淡墨已经漫漶。"} /></p>
          {visibleHotspots.map((spot, index) => (
            <button
              type="button"
              key={spot.id}
              data-evidence-id={spot.id}
              style={{ left: `${spot.x ?? [20, 72, 46, 82][index] ?? 50}%`, top: `${spot.y ?? [22, 38, 73, 78][index] ?? 50}%` }}
              className={`evidence-glow ${found.includes(spot.id) ? "is-found" : ""} ${activeEvidence === spot.id ? "is-active" : ""}`}
              onPointerEnter={() => dragging && inspect(spot.id)}
              onPointerLeave={() => !dragging && setActiveEvidence(null)}
              onFocus={() => inspect(spot.id)}
              onClick={() => inspect(spot.id)}
              aria-label={`查验${spot.label}`}
            ><span className="sr-only">{spot.label}</span></button>
          ))}
          <i className="damp-tide damp-tide-one" aria-hidden />
          <i className="damp-tide damp-tide-two" aria-hidden />
        </div>
        <button
          type="button"
          className="inspection-lamp"
          style={{ left: `${lamp.x}%`, top: `${lamp.y}%` }}
          onPointerDown={(event) => { setDragging(true); event.currentTarget.setPointerCapture(event.pointerId); moveLamp(event); }}
          onPointerMove={(event) => dragging && moveLamp(event)}
          onPointerUp={(event) => { setDragging(false); event.currentTarget.releasePointerCapture(event.pointerId); }}
          aria-label="拖动灯盏查验纸面"
        >
          <i className="lamp-flame" aria-hidden />
          <i className="lamp-wick" aria-hidden />
          <i className="lamp-bowl" aria-hidden />
        </button>
        <aside className={`inspection-thought ${activeSpot ? "is-visible" : ""}`} aria-live="polite">
          <span>笺记</span>
          <strong>{activeSpot?.label ?? "纸上有几处异样"}</strong>
          <p>{activeSpot?.detail ?? "让灯光从纸面低处掠过，潮痕和旧墨会显出层次。"}</p>
        </aside>
      </div>
      <p className="work-feedback inspection-progress" aria-live="polite">
        {found.length ? `已辨出：${config.hotspots.filter((spot) => found.includes(spot.id)).map((spot) => spot.label).join("、")}` : "先翻看正反两面，再移动灯盏。纸受潮以后，斜光比正看更容易显出痕迹。"}
      </p>
      {done && <button className="seal-action" type="button" onClick={() => onComplete({ clues: config.hotspots.filter((spot) => found.includes(spot.id)).map((spot) => spot.label), archive: beat.unlockArchive, paper: 1 })}><span>录</span> 写入笺记</button>}
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
  const [slots, setSlots] = useState<(string | null)[]>(() => config.fragments.map(() => null));
  const [selected, setSelected] = useState<string | null>(null);
  const [side, setSide] = useState<"front" | "back">("front");
  const [joined, setJoined] = useState(false);
  const [backlit, setBacklit] = useState(false);
  const [solved, setSolved] = useState(false);
  const [message, setMessage] = useState("先逐片翻看，再把残片放到透光架上。纸边、横折和纸背旧墨必须同时接续。");
  const placedIds = slots.filter((id): id is string => Boolean(id));
  const trayOrder = [1, 2, 0];
  const available = config.fragments
    .filter((fragment) => !placedIds.includes(fragment.id))
    .sort((a, b) => trayOrder.indexOf(a.order) - trayOrder.indexOf(b.order));
  const correct = useMemo(() => slots.every((id, index) => id && config.fragments.find((fragment) => fragment.id === id)?.order === index), [config.fragments, slots]);
  const place = (id: string, slotIndex: number) => {
    setJoined(false);
    setBacklit(false);
    setSolved(false);
    setSlots((current) => current.map((item, index) => index === slotIndex ? id : item === id ? null : item));
    setSelected(null);
  };
  const remove = (id: string) => {
    setJoined(false);
    setBacklit(false);
    setSolved(false);
    setSlots((current) => current.map((item) => item === id ? null : item));
  };
  const check = () => {
    setBacklit(true);
    if (correct) {
      setJoined(true);
      setMessage("横折在灯下连成一线，三处纤维断口也严丝合缝。翻到纸背，西字恢复为同一行报告。");
    } else {
      setMessage("透光以后有折痕悬断，纸背墨线也发生错位。换一处接法，再看断口的毛边方向。");
    }
  };
  return (
    <section className="activity assembly-activity" aria-label="残页校勘">
      <div className="activity-heading"><span>透光缀合</span><strong>{joined ? "合" : `${placedIds.length}/${config.fragments.length}`}</strong></div>
      <p className="activity-copy"><SentenceText text={joined ? config.question : beat.text} /></p>
      <div className="folio-side-toggle" aria-label="查看纸面">
        <button type="button" className={side === "front" ? "is-active" : ""} onClick={() => setSide("front")}>汉文正面</button>
        <button type="button" className={side === "back" ? "is-active" : ""} onClick={() => setSide("back")}>西字纸背</button>
      </div>
      <div className={`assembly-light-table ${backlit ? "is-backlit" : ""} ${joined ? "is-joined" : ""}`}>
        <span className="light-table-caption">覆纸透看 · 对折痕与墨线</span>
        <div className="assembly-line">
          {slots.map((id, slotIndex) => {
            const fragment = id ? config.fragments.find((item) => item.id === id) : null;
            if (!fragment) return (
              <button
                type="button"
                key={`slot-${slotIndex}`}
                className={`fragment-slot ${selected ? "can-place" : ""}`}
                onClick={() => selected && place(selected, slotIndex)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => place(event.dataTransfer.getData("text/plain"), slotIndex)}
                aria-label="空的残片位置"
              ><i aria-hidden /></button>
            );
          return (
            <button type="button" key={fragment.id} className={`manuscript-fragment fragment-${fragment.order + 1} is-placed ${side === "back" ? "is-verso" : ""}`} onClick={() => remove(fragment.id)}>
              <small>{fragment.edge}</small><span className="fragment-copy"><SentenceText text={side === "front" ? fragment.text : fragment.back} /></span>
              <i className="fragment-fold" aria-hidden />
            </button>
          );
          })}
        </div>
      </div>
      <div className="fragment-tray">
        {available.map((fragment) => (
          <button type="button" draggable key={fragment.id} className={`manuscript-fragment fragment-${fragment.order + 1} ${selected === fragment.id ? "is-selected" : ""} ${side === "back" ? "is-verso" : ""}`} onDragStart={(event) => event.dataTransfer.setData("text/plain", fragment.id)} onClick={() => setSelected(fragment.id)}>
            <small>{fragment.edge}</small><span className="fragment-copy"><SentenceText text={side === "front" ? fragment.text : fragment.back} /></span>
            <i className="fragment-fold" aria-hidden />
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
      {!joined && placedIds.length === config.fragments.length && <button className="ink-action" type="button" onClick={check}>覆纸透看</button>}
      {solved && <button className="seal-action" type="button" onClick={() => onComplete({ clues: [config.completionClue], archive: beat.unlockArchive })}><span>录</span> 著录来源</button>}
    </section>
  );
}
