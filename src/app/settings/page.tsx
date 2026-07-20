"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BookShell from "@/components/BookShell";
import { clearSave, hasSave } from "@/lib/save";

export default function SettingsPage() {
  const [saveExists, setSaveExists] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => { setSaveExists(hasSave()); setReducedMotion(localStorage.getItem("chronicle-reduced-motion") === "true"); }, []);
  const toggleMotion = () => { const next = !reducedMotion; setReducedMotion(next); localStorage.setItem("chronicle-reduced-motion", String(next)); document.documentElement.classList.toggle("reduce-motion", next); };
  const left = <div className="archive-index"><div className="vertical-title"><span>展卷杂项</span><small>阅读设置</small></div><h1>灯下读法</h1><p>游戏会自动记录进度。所有数据仅保存在当前浏览器。</p></div>;
  const right = <div className="settings-list"><section><h2>动态效果</h2><p>减少开卷和墨迹过渡，适合容易晕动的玩家。</p><button type="button" className="ink-action" onClick={toggleMotion}>{reducedMotion ? "已减少" : "保持完整"}</button></section><section><h2>存档</h2><p>{saveExists ? "书签已经夹在上次读到的位置。" : "目前还没有留下书签。"}</p><button type="button" className="ink-action danger" disabled={!saveExists} onClick={() => { if (window.confirm("确定清除本机存档吗？")) { clearSave(); setSaveExists(false); } }}>清除书签</button></section><Link className="seal-action" href="/"><span>归</span> 合卷返回</Link></div>;
  return <BookShell left={left} right={right} chapter="杂项" progress="设置" />;
}
