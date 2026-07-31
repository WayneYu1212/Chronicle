export const REDUCED_MOTION_KEY = "chronicle-reduced-motion";

type StorageLike = Pick<Storage, "getItem" | "setItem">;

export type PreferenceReadResult =
  | { ok: true; value: boolean }
  | { ok: false; value: false; message: string };

export type PreferenceWriteResult =
  | { ok: true }
  | { ok: false; message: string };

export function readReducedMotion(storage?: StorageLike): PreferenceReadResult {
  try {
    const target = storage ?? localStorage;
    return { ok: true, value: target.getItem(REDUCED_MOTION_KEY) === "true" };
  } catch {
    return { ok: false, value: false, message: "浏览器拒绝读取动态设置；本页仍可用于导出或清除书签。" };
  }
}

export function writeReducedMotion(value: boolean, storage?: StorageLike): PreferenceWriteResult {
  try {
    const target = storage ?? localStorage;
    target.setItem(REDUCED_MOTION_KEY, String(value));
    return { ok: true };
  } catch {
    return { ok: false, message: "浏览器拒绝保存动态设置；本次选择只在当前页面生效。" };
  }
}
