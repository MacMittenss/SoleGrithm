import React from "react";
// Utility to split text into spans for animation (like GSAP SplitText)
export function splitTextToSpans(text: string): JSX.Element[] {
  return text.split("").map((char, i) => (
    <span key={i} aria-hidden="true">{char === " " ? "\u00A0" : char}</span>
  ));
}
