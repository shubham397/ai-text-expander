import React, { useState, useRef } from "react";
import "./textExpander.css";

const expansions: Record<string, string> = {
  "/ty": "Thank you!",
  "/brb": "Be right back",
  "/omw": "On my way",
  "/idk": "I don’t know",
  "/gm": "Good morning",
  "/gn": "Good night",
};

export const TextExpander: React.FC = () => {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === " " || e.key === "Enter") {
      const words = text.split(/\s/);
      const lastWord = words[words.length - 1];

      if (expansions[lastWord]) {
        words[words.length - 1] = expansions[lastWord];
        const newText = words.join(" ") + (e.key === " " ? " " : "\n");
        setText(newText);

        // Prevent double space or line break
        e.preventDefault();

        // Move cursor to end
        setTimeout(() => {
          if (textareaRef.current) {
            textareaRef.current.selectionStart =
              textareaRef.current.value.length;
            textareaRef.current.selectionEnd = textareaRef.current.value.length;
          }
        }, 0);
      }
    }
  };

  return (
    <div className="text-expander-wrapper">
      <h2>AI Text Expander</h2>
      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Type something like '/ty' or '/brb' and press space..."
      />
    </div>
  );
};
