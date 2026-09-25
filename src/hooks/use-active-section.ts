"use client";

import { useEffect, useState } from "react";

/** Id of the section under a line a quarter of the way down the viewport. Pass a stable array. */
export function useActiveSection(ids: string[]) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          setActiveId((current) => {
            if (entry.isIntersecting) return id;
            return current === id ? null : current;
          });
        }
      },
      { rootMargin: "-25% 0px -74% 0px" },
    );

    for (const id of ids) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }

    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}
