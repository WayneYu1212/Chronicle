"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { hasSave } from "@/lib/save";

export default function HomePage() {
  const router = useRouter();
  const [opening, setOpening] = useState(false);
  const [saveExists, setSaveExists] = useState(false);
  useEffect(() => setSaveExists(hasSave()), []);

  const open = (mode: "new" | "continue") => {
    if (opening) return;
    setOpening(true);
    window.setTimeout(() => router.push(`/game?mode=${mode}`), 1650);
  };

  return (
    <main className={`cover-scene ${opening ? "is-opening" : ""}`}>
      <div className="rain-shadow" aria-hidden />
      <button type="button" className="opening-book" onClick={() => open(saveExists ? "continue" : "new")} aria-label={saveExists ? "继续游戏" : "开始游戏"}>
        <span className="opening-back-cover" aria-hidden />
        <span className="opening-page-block" aria-hidden>
          <span className="opening-leaf opening-leaf-left">
            <i className="opening-rule" />
            <small>听雨书坊</small>
          </span>
          <span className="opening-gutter" />
          <span className="opening-leaf opening-leaf-right">
            <i className="opening-rule" />
            <b>康熙九年</b>
            <small>广州 · 雨</small>
          </span>
        </span>
        <span className="opening-front-cover">
          <span className="cover-wear" aria-hidden />
          <span className="book-threads" aria-hidden><i /><i /><i /><i /><i /></span>
          <span className="cover-label"><b>佣书</b><small>CHRONICLE</small></span>
          <span className="cover-seal" aria-hidden>录</span>
        </span>
      </button>
      <div className="cover-instruction">
        <p>{saveExists ? "轻触续卷" : "轻触开卷"}</p>
        {saveExists && <button type="button" onClick={(event) => { event.stopPropagation(); open("new"); }}>从头读起</button>}
      </div>
      <p className="cover-credit">一六七〇 · 广州</p>
    </main>
  );
}
