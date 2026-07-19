"use client";

import ChoiceButton from "./ChoiceButton";

interface ManuscriptChoicesProps {
  text: string;
  choices: { id: string; text: string }[];
  onSelect: (index: number) => void;
}

export default function ManuscriptChoices({ text, choices, onSelect }: ManuscriptChoicesProps) {
  return (
    <div className="manuscript-stage mx-auto w-full max-w-2xl">
      <article className="manuscript-page manuscript-page--enter">
        <div className="manuscript-sheet manuscript-sheet--choices">
          <div className="manuscript-corner-curl" aria-hidden />
          <div className="manuscript-body-text">
            <p>{text}</p>
          </div>
          <div className="manuscript-choices">
            {choices.map((choice, index) => (
              <ChoiceButton
                key={choice.id}
                index={index}
                text={choice.text}
                onSelect={() => onSelect(index)}
              />
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
