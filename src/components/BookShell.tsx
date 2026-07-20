"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";

interface BookShellProps {
  left: ReactNode;
  right: ReactNode;
  chapter?: string;
  progress?: string;
  attributes?: ReactNode;
  controls?: ReactNode;
  pageTurn?: "forward" | "backward" | null;
}

export default function BookShell({ left, right, chapter, progress, attributes, controls, pageTurn }: BookShellProps) {
  const [showAttributes, setShowAttributes] = useState(false);

  return (
    <main className="reading-desk">
      <nav className="book-ribbons" aria-label="书内导航">
        {attributes && (
          <button type="button" className={showAttributes ? "is-active" : ""} aria-expanded={showAttributes} onClick={() => setShowAttributes((current) => !current)} title="查看书课与账目">
            课簿
          </button>
        )}
        <Link href="/" title="合卷">卷首</Link>
        <Link href="/archive" title="查看史料">笺记</Link>
        <Link href="/settings" title="设置">杂项</Link>
      </nav>
      <section className="open-book" aria-label="摊开的线装书">
        <div className="book-page book-page-left">
          <div className="book-rule" aria-hidden />
          <div className="book-page-scroll">{left}</div>
          <span className="page-folio">{chapter ?? "佣书"}</span>
        </div>
        <div className="book-gutter" aria-hidden><i /><i /><i /><i /></div>
        <div className="book-page book-page-right">
          <div className="book-rule" aria-hidden />
          <div className="book-page-scroll">{right}</div>
          {attributes && (
            <aside className={`attribute-leaf ${showAttributes ? "is-open" : ""}`} aria-hidden={!showAttributes}>
              <button type="button" className="attribute-close" onClick={() => setShowAttributes(false)} aria-label="合上课簿" title="合上课簿">×</button>
              {attributes}
            </aside>
          )}
          <span className="page-folio">{progress ?? "听雨书坊"}</span>
        </div>
        {pageTurn && (
          <div className={`page-turn-leaf page-turn-leaf--${pageTurn}`} aria-hidden>
            <div className="page-turn-face page-turn-face--front"><i /><span /></div>
            <div className="page-turn-face page-turn-face--back"><i /><span /></div>
          </div>
        )}
        {controls}
      </section>
    </main>
  );
}
