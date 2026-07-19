"use client";

interface ChoiceButtonProps {
  text: string;
  index: number;
  onSelect: () => void;
}

export default function ChoiceButton({ text, index, onSelect }: ChoiceButtonProps) {
  const labels = ["一", "二", "三", "四"];

  return (
    <button
      type="button"
      onClick={onSelect}
      className="group w-full rounded-sm border border-paper-edge/70 bg-paper-dark/40 px-5 py-4 text-left transition-all duration-300 hover:border-cinnabar/40 hover:bg-paper-dark/70"
    >
      <span className="mr-3 font-title text-sm text-cinnabar">{labels[index] ?? index + 1}</span>
      <span className="leading-relaxed tracking-wide text-ink group-hover:text-cinnabar">{text}</span>
    </button>
  );
}
