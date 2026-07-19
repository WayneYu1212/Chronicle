"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PaperFlakes from "@/components/PaperFlakes";
import WoodButton from "@/components/WoodButton";
import { hasSave } from "@/lib/save";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [saveExists, setSaveExists] = useState(false);

  useEffect(() => {
    setMounted(true);
    setSaveExists(hasSave());
    const timer = window.setTimeout(() => setShowMenu(true), 1800);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <PaperFlakes count={10} />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center text-center">
        <div className="paper-frame w-full px-8 py-14 sm:px-12 sm:py-16">
          <h1
            className={`page-title mb-3 transition-opacity duration-[2000ms] ${mounted ? "opacity-100" : "opacity-0"}`}
          >
            佣书
          </h1>

          <p
            className={`mb-2 font-body text-sm tracking-[0.5em] text-ink-faint transition-opacity duration-[2000ms] delay-300 ${mounted ? "opacity-100" : "opacity-0"}`}
          >
            Chronicle
          </p>

          <p
            className={`mt-8 font-body text-base tracking-[0.15em] text-ink-light transition-opacity duration-[2000ms] delay-700 ${mounted ? "opacity-100" : "opacity-0"}`}
          >
            历史不会说话。
          </p>

          <div
            className={`mt-12 flex flex-col items-center gap-4 transition-opacity duration-[1500ms] ${showMenu ? "opacity-100" : "opacity-0"}`}
          >
            <WoodButton href="/game?mode=new">开始</WoodButton>
            <WoodButton href={saveExists ? "/game?mode=continue" : "#"} disabled={!saveExists}>
              继续
            </WoodButton>
            <WoodButton href="/archive">史料</WoodButton>
            <WoodButton href="/settings">设置</WoodButton>
          </div>
        </div>

        <Link
          href="/game?mode=new"
          className="mt-8 text-xs tracking-[0.3em] text-ink-faint transition-colors hover:text-cinnabar"
        >
          点击进入第一章试玩
        </Link>
      </div>
    </main>
  );
}
