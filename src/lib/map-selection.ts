export interface MapPoint {
  id: string;
  x: number;
  y: number;
}

export function findNearestSelectableMapLocation(
  locations: readonly MapPoint[],
  selectableIds: readonly string[],
  localX: number,
  localY: number,
  width: number,
  height: number,
  maxDistance = 31,
): string | undefined {
  const selectable = new Set(selectableIds);
  let nearest: { id: string; distance: number } | undefined;

  for (const location of locations) {
    if (!selectable.has(location.id)) continue;
    const x = (location.x / 100) * width;
    const y = (location.y / 100) * height;
    const distance = Math.hypot(localX - x, localY - y);
    if (!nearest || distance < nearest.distance) nearest = { id: location.id, distance };
  }

  return nearest && nearest.distance <= maxDistance ? nearest.id : undefined;
}
