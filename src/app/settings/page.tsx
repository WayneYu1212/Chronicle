"use client";

import { useEffect, useState } from "react";
import WoodButton from "@/components/WoodButton";
import { clearSave, hasSave } from "@/lib/save";

export default function SettingsPage() {
  const [saveExists, setSaveExists] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setSaveExists(hasSave());
  }, []);

  const handleClearSave = () => {
    if (window.confirm("确定要清除存档吗？此操作不可恢复。")) {
      clearSave();
      setSaveExists(false);
      setMessage("存档已清除。");
    }
  };

  return (
    <main className="min-h-screen px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-md">
        <header className="mb-10 text-center">
          <p className="chapter-label">设置</p>
          <h1 className="mt-3 font-title text-3xl tracking-[0.3em]">展卷</h1>
        </header>

        <div className="dialogue-box space-y-6">
          <div>
            <p className="text-sm tracking-wide text-ink-light">文字速度</p>
            <p className="mt-1 text-xs text-ink-faint">默认 · 后续版本可调整</p>
          </div>

          <div>
            <p className="text-sm tracking-wide text-ink-light">背景音乐</p>
            <p className="mt-1 text-xs text-ink-faint">暂未接入 · 预留接口</p>
          </div>

          <div className="border-t border-paper-edge/40 pt-6">
            <p className="mb-3 text-sm tracking-wide text-ink-light">存档管理</p>
            <WoodButton onClick={handleClearSave} disabled={!saveExists} className="w-full text-sm">
              清除存档
            </WoodButton>
            {message && <p className="mt-3 text-center text-xs text-cinnabar">{message}</p>}
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <WoodButton href="/">返回首页</WoodButton>
        </div>
      </div>
    </main>
  );
}
