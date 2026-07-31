export const routeEntranceIds = [
  "guangzhou-gazetteer-office",
  "panyu-private-copy",
  "panyu-unknown-collector",
  "xiqiao-copyist",
  "zhaoqing-half-seal",
  "zhaoqing-common-ledger",
] as const;

export type RouteEntranceId = (typeof routeEntranceIds)[number];

export function mergeRouteEntrances(existing: string[], additions: readonly string[]): string[] {
  return Array.from(new Set([...existing, ...additions]));
}
