"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BookShell from "@/components/BookShell";
import { clearSave, getRawSave, hasSave, loadSaveResult } from "@/lib/save";
import { readReducedMotion, writeReducedMotion } from "@/lib/preferences";

export default function SettingsPage() {
  const [saveExists, setSaveExists] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [saveStatus, setSaveStatus] = useState("目前还没有留下书签。");
  const [motionStatus, setMotionStatus] = useState<string | null>(null);
  useEffect(() => {
    const exists = hasSave();
    const result = loadSaveResult();
    setSaveExists(exists);
    setSaveStatus(result.status === "ok" ? "书签可以正常续读。" : result.status === "missing" ? "目前还没有留下书签。" : result.status === "future-version" ? `书签来自更新版本（版本 ${result.version}），当前版本不会覆盖它。` : result.status === "corrupt" ? `书签需要恢复：${result.reason}` : `无法读取书签：${result.reason}`);
    const motion = readReducedMotion();
    setReducedMotion(motion.value);
    setMotionStatus(motion.ok ? null : motion.message);
  }, []);
  const toggleMotion = () => {
    const next = !reducedMotion;
    const result = writeReducedMotion(next);
    setReducedMotion(next);
    setMotionStatus(result.ok ? null : result.message);
    document.documentElement.classList.toggle("reduce-motion", next);
  };
  const exportSave = () => {
    const raw = getRawSave();
    if (!raw) return;
    const url = URL.createObjectURL(new Blob([raw], { type: "application/json" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `chronicle-save-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };
  const left = <div className="archive-index"><div className="vertical-title"><span>展卷杂项</span><small>阅读设置</small></div><h1>灯下读法</h1><p>游戏会自动记录进度。所有数据仅保存在当前浏览器。</p></div>;
  const right = <div className="settings-list"><section><h2>动态效果</h2><p>减少开卷和墨迹过渡，适合容易晕动的玩家。</p><button type="button" className="ink-action" onClick={toggleMotion}>{reducedMotion ? "已减少" : "保持完整"}</button>{motionStatus && <p aria-live="polite">{motionStatus}</p>}</section><section><h2>存档</h2><p aria-live="polite">{saveStatus}</p><button type="button" className="ink-action" disabled={!saveExists} onClick={exportSave}>导出原始书签</button><button type="button" className="ink-action danger" disabled={!saveExists} onClick={() => { if (window.confirm("确定清除本机存档吗？此操作无法撤销，建议先导出备份。")) { const result = clearSave(); if (result.ok) { setSaveExists(false); setSaveStatus("书签已清除。"); } else setSaveStatus(result.message); } }}>清除书签</button></section><Link className="seal-action" href="/"><span>归</span> 合卷返回</Link></div>;
  return <BookShell left={left} right={right} chapter="杂项" progress="设置" />;
}
