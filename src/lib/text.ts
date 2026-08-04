export function splitSentenceLines(text: string): string[] {
  return text.split("\n").flatMap((paragraph) => {
    if (!paragraph) return [""];
    return paragraph.match(/[^。！？!?；;]+(?:[。！？!?；;]+[”’」』】）》]*|$)/g) ?? [paragraph];
  });
}

const WORD_PUNCTUATION = /^[。！？!?；;，,：:、。．.！!？?；;）)】》』”’]+$/u;

function fallbackTokens(text: string): string[] {
  return text.match(/[A-Za-zÀ-ÿ0-9]+|[\u3400-\u9fff]+|[^\s]/gu) ?? [];
}

export function splitSentenceTokens(text: string): string[] {
  const segmenter = typeof Intl !== "undefined" && "Segmenter" in Intl
    ? new Intl.Segmenter("zh", { granularity: "word" })
    : null;
  const raw = segmenter
    ? Array.from(segmenter.segment(text), ({ segment }) => segment)
    : fallbackTokens(text);
  const tokens: string[] = [];
  let singleBuffer = "";

  const flushSingleBuffer = (suffix = "") => {
    if (!singleBuffer) return;
    if (suffix) {
      tokens.push(`${singleBuffer}${suffix}`);
      singleBuffer = "";
      return;
    }
    if (tokens.length && tokens[tokens.length - 1].length + singleBuffer.length <= 8) {
      tokens[tokens.length - 1] += singleBuffer;
    } else {
      tokens.push(singleBuffer);
    }
    singleBuffer = "";
  };

  for (const rawToken of raw) {
    if (/^\s+$/u.test(rawToken)) continue;
    if (WORD_PUNCTUATION.test(rawToken)) {
      flushSingleBuffer();
      if (tokens.length) tokens[tokens.length - 1] += rawToken;
      else tokens.push(rawToken);
      continue;
    }
    if ([...rawToken].length === 1 && /[\u3400-\u9fff]/u.test(rawToken)) {
      singleBuffer += rawToken;
      if ([...singleBuffer].length >= 4) flushSingleBuffer();
      continue;
    }
    if (singleBuffer) {
      tokens.push(`${singleBuffer}${rawToken}`);
      singleBuffer = "";
    } else {
      tokens.push(rawToken);
    }
  }

  flushSingleBuffer();
  return tokens;
}
