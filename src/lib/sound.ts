let pageTurnAudio: HTMLAudioElement | null = null;

/** 预加载翻页音效，后续接入音频时调用 preloadPageTurnSound('/assets/sfx/page-turn.mp3') */
export function preloadPageTurnSound(src?: string): void {
  if (typeof window === "undefined" || !src) return;
  pageTurnAudio = new Audio(src);
  pageTurnAudio.preload = "auto";
}

/** 翻页音效接口（预留，暂无音频文件） */
export function playPageTurnSound(): void {
  if (!pageTurnAudio) return;
  pageTurnAudio.currentTime = 0;
  void pageTurnAudio.play().catch(() => {});
}
