export function splitSentenceLines(text: string): string[] {
  return text.split("\n").flatMap((paragraph) => {
    if (!paragraph) return [""];
    return paragraph.match(/[^。！？!?；;]+(?:[。！？!?；;]+[”’」』】）》]*|$)/g) ?? [paragraph];
  });
}
