"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { hasSave } from "@/lib/save";

export default function HomePage() {
  const router = useRouter();
  const [opening, setOpening] = useState(false);
  const [saveExists, setSaveExists] = useState(false);
  const modeRef = useRef<"new" | "continue">("new");
  const navigatedRef = useRef(false);

  useEffect(() => {
    setSaveExists(hasSave());
    router.prefetch("/game?mode=new");
    router.prefetch("/game?mode=continue");
  }, [router]);

  const enterGame = useCallback(() => {
    if (navigatedRef.current) return;
    navigatedRef.current = true;
    router.push(`/game?mode=${modeRef.current}`);
  }, [router]);

  const open = (mode: "new" | "continue") => {
    if (opening) return;
    modeRef.current = mode;
    setOpening(true);
  };

  useEffect(() => {
    if (!opening) return;
    const fallback = window.setTimeout(enterGame, 1850);
    return () => window.clearTimeout(fallback);
  }, [enterGame, opening]);

  return (
    <main className={`cover-scene ${opening ? "is-opening" : ""}`}>
      <div className="rain-shadow" aria-hidden />
      <button
        type="button"
        className="opening-book"
        onClick={() => open(saveExists ? "continue" : "new")}
        onAnimationEnd={(event) => {
          if (event.target === event.currentTarget && event.animationName.startsWith("open-book-body")) enterGame();
        }}
        aria-label={saveExists ? "继续游戏" : "开始游戏"}
      >
        <span className="opening-back-cover" aria-hidden />
        <span className="opening-page-block" aria-hidden>
          <span className="opening-leaf opening-leaf-left">
            <i className="opening-rule" />
            <b>康熙九年</b>
            <small>广州 · 雨</small>
          </span>
          <span className="opening-gutter" />
          <span className="opening-leaf opening-leaf-right">
            <i className="opening-rule" />
            <b>第一章</b>
            <small>第十三页</small>
          </span>
        </span>
        <span className="opening-front-cover" aria-hidden />
      </button>
      <div className="cover-instruction">
        <p>{saveExists ? "轻触续卷" : "轻触开卷"}</p>
        {saveExists && <button type="button" onClick={(event) => { event.stopPropagation(); open("new"); }}>从头读起</button>}
      </div>
      <p className="cover-credit">一六七〇 · 广州</p>
    </main>
  );
}
