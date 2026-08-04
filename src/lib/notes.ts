import type { PlayerNote } from "@/types/game";

export function notesNewestFirst(notes: PlayerNote[]): PlayerNote[] {
  return [...notes].reverse();
}
