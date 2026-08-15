"use client";

import { useKanji } from "@/contexts/Context";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export default function ContentMarker() {
  const { data } = useKanji();

  const markers = Object.entries(data.kanji_group_items)
    .filter(([groupId]) => groupId !== "unclassified")
    .map(([groupId, group]) => ({
      groupId,
      character: data.kanjis[group[0]]?.character,
      count: group.length,
    }))
    .filter((marker) => marker.character);

 const handleClick = (groupId: string) => {
  const target = document.getElementById(`kanji-group-${groupId}`);

  if (!target) return;

  gsap.to(window, {
    duration: 0.6,
    ease: "power2.out",
    scrollTo: {
      y: target,
      offsetY: 20,
    },
    onComplete: () => {
      gsap.fromTo(
        target,
        { opacity: 0.4 },
        {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        }
      );
    },
  });
};

  return (
    <div className="sticky top-5 h-fit rounded-xl border border-border bg-white p-2 shadow-sm">
      <div className="mb-2 flex items-center justify-between px-1">
        <span className="text-xs font-medium text-muted-foreground">
          Markers
        </span>

        <span className="rounded-md bg-muted px-1.5 py-0.5 text-[11px] text-muted-foreground">
          {markers.length}
        </span>
      </div>

      <div className="grid max-h-[400px] grid-cols-5 gap-1 overflow-y-auto pr-1">
        {markers.map(({ groupId, character, count }) => (
          <button
            key={groupId}
            type="button"
            onClick={() => handleClick(groupId)}
            className="group relative aspect-square rounded-md border border-border bg-background transition-all hover:border-foreground/20 hover:bg-muted active:scale-95"
          >
            <span className="absolute left-1 top-0.5 text-[9px] text-muted-foreground/50">
              {count}
            </span>

            <span className="text-lg font-medium text-foreground/80 group-hover:text-foreground">
              {character}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}