import { splitSentenceLines, splitSentenceTokens } from "@/lib/text";

interface SentenceTextProps {
  text: string;
  className?: string;
}

export default function SentenceText({ text, className }: SentenceTextProps) {
  return (
    <span className={`sentence-text ${className ?? ""}`.trim()}>
      {splitSentenceLines(text).map((line, index) => (
        <span className="sentence-line" key={`${index}-${line}`}>
          {line ? splitSentenceTokens(line).map((token, tokenIndex) => (
            <span className="sentence-token" key={`${tokenIndex}-${token}`}>{token}</span>
          )) : "\u00a0"}
        </span>
      ))}
    </span>
  );
}
