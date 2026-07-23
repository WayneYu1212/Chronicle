"use client";

import { useEffect, useState } from "react";
import BookShell from "@/components/BookShell";
import LingnanMap from "@/components/LingnanMap";
import { loadSave } from "@/lib/save";
import type { SaveData } from "@/types/game";

const ALL_LOCATIONS = ["guangzhou", "nanhai", "panyu", "zhaoqing", "xiqiao", "chaozhou"];

export default function MapPage() {
  const [save, setSave] = useState<SaveData | null>(null);

  useEffect(() => setSave(loadSave()), []);

  const unlocked = save?.unlockedLocations ?? ["guangzhou"];
  const investigated = save?.investigatedLocations ?? [];

  const index = (
    <aside className="map-index-page">
      <div className="vertical-title"><span>舆图题记</span><small>岭南</small></div>
      <h1>行迹与旧闻</h1>
      <p>底图只记山川形势。地点名称、发现状态与校勘批注均取自玩家存档，由佣书逐笔补入。</p>
      <dl>
        <div><dt><i className="map-legend-dot is-known" />已发现</dt><dd>{unlocked.length} 处</dd></div>
        <div><dt><i className="map-legend-dot is-read" />已查验</dt><dd>{investigated.length} 处</dd></div>
      </dl>
      <blockquote>图可指路，不能替纸上文字作证。</blockquote>
    </aside>
  );

  const map = (
    <LingnanMap
      config={{ available: ALL_LOCATIONS, selectable: unlocked }}
      unlockedLocations={unlocked}
      investigatedLocations={investigated}
    />
  );

  return <BookShell left={index} right={map} chapter="岭南舆图" progress="行迹" binding="right" />;
}
