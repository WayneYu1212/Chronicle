import { splitSentenceLines } from "@/lib/text";

interface SentenceTextProps {
  text: string;
  className?: string;
}

export default function SentenceText({ text, className }: SentenceTextProps) {
  return (
    <span className={`sentence-text ${className ?? ""}`.trim()}>
      {splitSentenceLines(text).map((line, index) => (
        <span className="sentence-line" key={`${index}-${line}`}>
          {line || "\u00a0"}
        </span>
      ))}
    </span>
  );
}
