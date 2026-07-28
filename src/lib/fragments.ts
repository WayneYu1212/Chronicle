import fragmentData from "../story/fragments.json";
import type { SourceFragment } from "../types/game";

const fragments = fragmentData as SourceFragment[];
const byId = new Map(fragments.map((fragment) => [fragment.id, fragment]));

export function getFragments(ids: string[]): SourceFragment[] {
  return ids.flatMap((id) => {
    const fragment = byId.get(id);
    return fragment ? [fragment] : [];
  });
}

export function listFragments(): SourceFragment[] {
  return fragments;
}
