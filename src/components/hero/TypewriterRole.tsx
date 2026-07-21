import { useEffect, useState } from "react";

interface TypewriterRoleProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  holdMs?: number;
}

/**
 * Cycles through a list of role descriptors with a classic type / hold /
 * delete rhythm. Pauses entirely if the user prefers reduced motion,
 * showing only the first word.
 */
export function TypewriterRole({
  words,
  typingSpeed = 65,
  deletingSpeed = 35,
  holdMs = 1600,
}: TypewriterRoleProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">("typing");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(words[0]);
      return;
    }

    const current = words[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (text.length < current.length) {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), typingSpeed);
      } else {
        timeout = setTimeout(() => setPhase("holding"), holdMs);
      }
    } else if (phase === "holding") {
      timeout = setTimeout(() => setPhase("deleting"), 200);
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), deletingSpeed);
      } else {
        setWordIndex((i) => (i + 1) % words.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timeout);
  }, [text, phase, wordIndex, words, typingSpeed, deletingSpeed, holdMs]);

  return (
    <span className="font-mono-tight">
      {text}
      <span className="animate-pulse-slow ml-0.5 inline-block w-[2px] translate-y-[1px] bg-signal-cyan" style={{ height: "1em" }}>
        &nbsp;
      </span>
    </span>
  );
}
