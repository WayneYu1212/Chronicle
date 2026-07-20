import Link from "next/link";
import type { ReactNode } from "react";

interface BookShellProps {
  left: ReactNode;
  right: ReactNode;
  chapter?: string;
  progress?: string;
}

export default function BookShell({ left, right, chapter, progress }: BookShellProps) {
  return (
    <main className="reading-desk">
      <nav className="book-ribbons" aria-label="书内导航">
        <Link href="/" title="合卷">卷首</Link>
        <Link href="/archive" title="查看史料">笺记</Link>
        <Link href="/settings" title="设置">杂项</Link>
      </nav>
      <section className="open-book" aria-label="摊开的线装书">
        <div className="book-page book-page-left">
          <div className="book-rule" aria-hidden />
          {left}
          <span className="page-folio">{chapter ?? "佣书"}</span>
        </div>
        <div className="book-gutter" aria-hidden><i /><i /><i /><i /></div>
        <div className="book-page book-page-right">
          <div className="book-rule" aria-hidden />
          {right}
          <span className="page-folio">{progress ?? "听雨书坊"}</span>
        </div>
      </section>
    </main>
  );
}
