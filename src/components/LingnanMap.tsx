"use client";

import { useMemo, useState, type CSSProperties } from "react";
import mapImage from "../../public/assets/lingnan-map.png";
import locationData from "@/story/locations.json";
import type { MapConfig, MapLocation, LocationStatus } from "@/types/game";

interface LingnanMapProps {
  config: MapConfig;
  unlockedLocations: string[];
  investigatedLocations: string[];
  onComplete?: (locationId: string) => void;
}

function locationStatus(id: string, unlocked: string[], investigated: string[]): LocationStatus {
  if (investigated.includes(id)) return "investigated";
  if (unlocked.includes(id)) return "discovered";
  return "undiscovered";
}

export default function LingnanMap({ config, unlockedLocations, investigatedLocations, onComplete }: LingnanMapProps) {
  const locations = locationData.locations as MapLocation[];
  const visibleLocations = useMemo(
    () => locations.filter((location) => config.available.includes(location.id)),
    [config.available, locations]
  );
  const [selectedId, setSelectedId] = useState(config.destination && unlockedLocations.includes(config.destination) ? config.destination : "");
  const selected = visibleLocations.find((location) => location.id === selectedId);
  const selectedStatus = selected ? locationStatus(selected.id, unlockedLocations, investigatedLocations) : "undiscovered";
  const canSelect = Boolean(selected && config.selectable.includes(selected.id) && selectedStatus !== "undiscovered");
  const mapStyle = { "--lingnan-map-image": `url(${mapImage.src})` } as CSSProperties;

  return (
    <section className="lingnan-map-activity" aria-label="岭南舆图">
      <header className="map-heading">
        <span>岭南舆图</span>
        <small>朱点为已知，双圈为已经查验</small>
      </header>
      <div className="lingnan-map-frame" style={mapStyle}>
        <div className="lingnan-map-crop" aria-label="广东核心地区舆图">
          {visibleLocations.map((location) => {
            const status = locationStatus(location.id, unlockedLocations, investigatedLocations);
            const selectable = config.selectable.includes(location.id) && status !== "undiscovered";
            return (
              <div key={location.id}>
                <button
                  type="button"
                  className={`map-location map-location--${status} ${selectedId === location.id ? "is-selected" : ""}`}
                  style={{ left: `${location.x}%`, top: `${location.y}%` }}
                  disabled={!selectable}
                  onClick={() => setSelectedId(location.id)}
                  aria-label={`${location.name}，${status === "undiscovered" ? "尚未发现" : status === "investigated" ? "已经查验" : "已经发现"}`}
                >
                  <i aria-hidden />
                  <span style={{ transform: `translate(${location.labelX}px, ${location.labelY}px)` }}>{location.name}</span>
                </button>
              </div>
            );
          })}
          <div className="map-scale-note" aria-hidden>山川依旧 · 文字后添</div>
        </div>
        <aside className="map-docket" aria-live="polite">
          {selected ? (
            <>
              <small>{selectedStatus === "investigated" ? "已经查验" : "当前可往"}</small>
              <h3>{selected.name}</h3>
              <p>{selectedStatus === "investigated" ? selected.investigatedRecord : selected.record}</p>
              <dl><dt>当前线索</dt><dd>{selected.clue}</dd></dl>
              {canSelect && onComplete && (
                <button type="button" className="map-travel" onClick={() => onComplete(selected.id)}>
                  <span>往</span>{config.confirmLabel ?? `前往${selected.name}`}
                </button>
              )}
            </>
          ) : (
            <>
              <small>舆图题记</small>
              <h3>请选择地点</h3>
              <p>地点名与批注由佣书后添，底图中的旧字不作为可靠信息。</p>
            </>
          )}
        </aside>
      </div>
    </section>
  );
}
