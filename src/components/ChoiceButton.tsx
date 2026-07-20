"use client";

interface ChoiceButtonProps { text: string; index: number; onSelect: () => void; }

export default function ChoiceButton({ text, index, onSelect }: ChoiceButtonProps) {
  const labels = ["甲", "乙", "丙", "丁"];
  return <button type="button" onClick={onSelect} className="ink-choice"><span>{labels[index] ?? index + 1}</span>{text}</button>;
}
