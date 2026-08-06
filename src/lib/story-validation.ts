import type { MapLocation, SourceFragment, StoryBeat, StoryChapter } from "../types/game";
import { CONTEMPORARY_FRAGMENT_IDS, GAME_TIMELINE } from "./timeline";

export interface StoryValidationIssue {
  code: string;
  location: string;
  message: string;
}

type ChapterMap = Readonly<Record<string, StoryChapter>>;

function key(chapterId: string, beatId: string): string {
  return `${chapterId}:${beatId}`;
}

export function validateStoryData(
  chapters: ChapterMap,
  fragments: readonly SourceFragment[],
  archive: readonly { id: string }[],
  locations: readonly MapLocation[],
  entranceIds: readonly string[],
  firstChapterId: string,
): StoryValidationIssue[] {
  const issues: StoryValidationIssue[] = [];
  const fragmentIds = new Set<string>();
  const archiveIds = new Set<string>();
  const locationIds = new Set(locations.map((location) => location.id));
  const knownEntrances = new Set(entranceIds);
  const beatMaps = new Map<string, Map<string, StoryBeat>>();
  const edges = new Map<string, string[]>();

  for (const fragment of fragments) {
    if (!fragment.id) issues.push({ code: "fragment-id", location: "fragments", message: "史料缺少 ID" });
    else if (fragmentIds.has(fragment.id)) issues.push({ code: "duplicate-fragment", location: fragment.id, message: `史料 ID 重复：${fragment.id}` });
    fragmentIds.add(fragment.id);
    if (!(["original", "copy", "translated-copy", "oral", "oral-copy"] as const).includes(fragment.transmission)) {
      issues.push({ code: "fragment-transmission", location: fragment.id, message: `史料传播类型无效：${fragment.transmission}` });
    }
    if (!Array.isArray(fragment.marks) || !Array.isArray(fragment.relatedPeople) || !Array.isArray(fragment.relatedEvents)) {
      issues.push({ code: "fragment-shape", location: fragment.id, message: "史料数组字段无效" });
    }
    if (!Number.isFinite(fragment.value) || !Number.isFinite(fragment.politicalRisk)) {
      issues.push({ code: "fragment-number", location: fragment.id, message: "史料价值或风险不是有效数字" });
    }
    if (!fragment.suggestedInterpretation?.trim() || !fragment.suggestedMissingEvidence?.trim()) {
      issues.push({ code: "fragment-suggestion", location: fragment.id, message: "史料缺少可选代拟内容" });
    }
    if (CONTEMPORARY_FRAGMENT_IDS.has(fragment.id) && fragment.estimatedDate !== GAME_TIMELINE.reignLabel) {
      issues.push({
        code: "fragment-timeline",
        location: fragment.id,
        message: `当年形成的史料年代必须为${GAME_TIMELINE.reignLabel}：${fragment.estimatedDate}`,
      });
    }
  }

  for (const item of archive) {
    if (!item.id) issues.push({ code: "archive-id", location: "archive", message: "档案缺少 ID" });
    else if (archiveIds.has(item.id)) issues.push({ code: "duplicate-archive", location: item.id, message: `档案 ID 重复：${item.id}` });
    archiveIds.add(item.id);
  }

  for (const [registeredId, chapter] of Object.entries(chapters)) {
    if (registeredId !== chapter.id) issues.push({ code: "chapter-registration", location: registeredId, message: `注册键与章节 ID 不一致：${chapter.id}` });
    if (!chapter.date?.startsWith(GAME_TIMELINE.reignLabel)) {
      issues.push({ code: "chapter-timeline", location: chapter.id, message: `章节日期必须使用${GAME_TIMELINE.reignLabel}：${chapter.date ?? "缺失"}` });
    }
    const beats = new Map<string, StoryBeat>();
    for (const beat of chapter.beats) {
      if (beats.has(beat.id)) issues.push({ code: "duplicate-beat", location: key(chapter.id, beat.id), message: `节点 ID 重复：${beat.id}` });
      beats.set(beat.id, beat);
    }
    beatMaps.set(chapter.id, beats);
  }

  const addTarget = (from: string, targetChapterId: string, targetBeatId: string) => {
    const targetChapter = beatMaps.get(targetChapterId);
    if (!targetChapter) {
      issues.push({ code: "unknown-chapter", location: from, message: `目标章节未注册：${targetChapterId}` });
      return;
    }
    if (!targetChapter.has(targetBeatId)) {
      issues.push({ code: "unknown-beat", location: from, message: `目标节点不存在：${targetChapterId}:${targetBeatId}` });
      return;
    }
    edges.get(from)?.push(key(targetChapterId, targetBeatId));
  };

  const checkLocation = (from: string, id: string) => {
    if (!locationIds.has(id)) issues.push({ code: "unknown-location", location: from, message: `地点不存在：${id}` });
  };

  for (const chapter of Object.values(chapters)) {
    chapter.beats.forEach((beat, index) => {
      const from = key(chapter.id, beat.id);
      edges.set(from, []);

      for (const id of beat.grantFragments ?? []) {
        if (!fragmentIds.has(id)) issues.push({ code: "unknown-fragment", location: from, message: `授予未知史料：${id}` });
      }
      if (beat.fragmentAction && !fragmentIds.has(beat.fragmentAction.fragmentId)) {
        issues.push({ code: "unknown-fragment", location: from, message: `处置引用未知史料：${beat.fragmentAction.fragmentId}` });
      }
      for (const id of beat.unlockArchive ?? []) {
        if (!archiveIds.has(id)) issues.push({ code: "unknown-archive", location: from, message: `解锁未知档案：${id}` });
      }
      for (const id of beat.locationUpdates?.unlock ?? []) checkLocation(from, id);
      for (const id of beat.locationUpdates?.investigate ?? []) checkLocation(from, id);
      for (const id of beat.locationUpdates?.unlockEntrances ?? []) {
        if (!knownEntrances.has(id)) issues.push({ code: "unknown-entrance", location: from, message: `路线入口不存在：${id}` });
      }
      for (const id of beat.map?.available ?? []) checkLocation(from, id);
      for (const id of beat.map?.selectable ?? []) checkLocation(from, id);
      if (beat.map?.destination) checkLocation(from, beat.map.destination);

      if (beat.compilation) {
        if (!fragmentIds.has(beat.compilation.fragmentId)) {
          issues.push({ code: "unknown-fragment", location: from, message: `编纂引用未知史料：${beat.compilation.fragmentId}` });
        }
        const routeTargets = new Set(Object.values(beat.compilation.routes));
        for (const target of routeTargets) addTarget(from, chapter.id, target);
        for (const target of Object.keys(beat.compilation.routeEffects ?? {})) {
          if (!routeTargets.has(target)) issues.push({ code: "orphan-route-effect", location: from, message: `路线效果没有对应路线：${target}` });
        }
      } else if (beat.choices?.length) {
        for (const choice of beat.choices) {
          if (choice.fragmentAction && !fragmentIds.has(choice.fragmentAction.fragmentId)) {
            issues.push({ code: "unknown-fragment", location: `${from}:${choice.id}`, message: `选择引用未知史料：${choice.fragmentAction.fragmentId}` });
          }
          for (const id of choice.unlockLocations ?? []) checkLocation(`${from}:${choice.id}`, id);
          for (const id of choice.locationUpdates?.unlock ?? []) checkLocation(`${from}:${choice.id}`, id);
          for (const id of choice.locationUpdates?.investigate ?? []) checkLocation(`${from}:${choice.id}`, id);
          for (const id of choice.locationUpdates?.unlockEntrances ?? []) {
            if (!knownEntrances.has(id)) issues.push({ code: "unknown-entrance", location: `${from}:${choice.id}`, message: `路线入口不存在：${id}` });
          }
          if (choice.chapter && !choice.goto) {
            issues.push({ code: "chapter-without-goto", location: `${from}:${choice.id}`, message: "跨章选择必须给出目标节点" });
          } else if (choice.goto && !(beat.terminal && choice.goto.endsWith("-locked"))) addTarget(from, choice.chapter ?? chapter.id, choice.goto);
          else if (index + 1 < chapter.beats.length) addTarget(from, chapter.id, chapter.beats[index + 1].id);
        }
      } else if (beat.next) {
        addTarget(from, chapter.id, beat.next);
      } else if (!beat.terminal && index + 1 < chapter.beats.length) {
        addTarget(from, chapter.id, chapter.beats[index + 1].id);
      }

      if (!beat.terminal && edges.get(from)?.length === 0) {
        issues.push({ code: "dead-end", location: from, message: "非终止节点没有有效后继" });
      }
    });
  }

  const firstChapter = chapters[firstChapterId];
  if (!firstChapter?.beats.length) {
    issues.push({ code: "missing-entry", location: firstChapterId, message: "首章或首节点不存在" });
    return issues;
  }

  const visited = new Set<string>();
  const queue = [key(firstChapterId, firstChapter.beats[0].id)];
  while (queue.length) {
    const current = queue.shift()!;
    if (visited.has(current)) continue;
    visited.add(current);
    queue.push(...(edges.get(current) ?? []));
  }
  for (const chapter of Object.values(chapters)) {
    for (const beat of chapter.beats) {
      const current = key(chapter.id, beat.id);
      if (!visited.has(current)) issues.push({ code: "unreachable", location: current, message: "节点无法从第一章入口抵达" });
    }
  }
  const hasTerminal = Object.values(chapters).some((chapter) => chapter.beats.some((beat) => beat.terminal && visited.has(key(chapter.id, beat.id))));
  if (!hasTerminal) issues.push({ code: "no-terminal", location: firstChapterId, message: "故事图没有可达终点" });

  return issues;
}
