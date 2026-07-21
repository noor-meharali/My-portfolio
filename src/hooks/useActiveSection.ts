import { useEffect, useState } from "react";

/**
 * Tracks which of the given section ids currently sits in the "active"
 * band near the top of the viewport, via IntersectionObserver. Ids whose
 * element doesn't exist in the DOM yet (a section not built out this
 * session) are simply skipped — the hook picks them up automatically
 * once that section is added, no changes needed elsewhere.
 */
export function useActiveSection(ids: string[]) {
  const [activeId, setActiveId] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (mostVisible) {
          setActiveId(mostVisible.target.id);
        }
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}
