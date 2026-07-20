"use client";

import { useEffect, useState } from "react";
import BookShell from "@/components/BookShell";
import { loadSave } from "@/lib/save";
import archive from "@/story/archive.json";

export default function ArchivePage() {
  const [unlocked, setUnlocked] = useState<string[]>([]);
  useEffect(() => setUnlocked(loadSave()?.unlockedArchive ?? []), []);
  const visible = archive.filter((item) => unlocked.includes(item.id));
  const left = <div className="archive-index"><div className="vertical-title"><span>案头笺记</span><small>所得诸纸</small></div><h1>史料目录</h1><p>这里只记录亲手查验过的东西。来源未明之处，宁缺勿补。</p><ol>{archive.map((item, index) => <li key={item.id} className={unlocked.includes(item.id) ? "" : "is-locked"}><span>{String(index + 1).padStart(2, "0")}</span>{unlocked.includes(item.id) ? item.title : "尚未获得"}</li>)}</ol></div>;
  const right = <div className="archive-list">{visible.length ? visible.map((item) => <article key={item.id}><header><small>{item.acquired}</small><h2>{item.title}</h2></header><dl><div><dt>来源</dt><dd>{item.source}</dd></div><div><dt>作者</dt><dd>{item.author}</dd></div></dl><blockquote>{item.preview}</blockquote>{item.notes.map((note) => <p key={note}>· {note}</p>)}</article>) : <div className="empty-archive"><span>空</span><p>尚未查验任何残页。</p><a href="/game?mode=continue">回到书坊</a></div>}</div>;
  return <BookShell left={left} right={right} chapter="笺记" progress={`${visible.length} 件`} />;
}
