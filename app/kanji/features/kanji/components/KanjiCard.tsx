"use client";

import { GripHorizontal } from "lucide-react";
import KanjiDetailModal from "./KanjiModalItem";
import { Kanji } from "@/app/kanji/types/kanji";
import { updateKanjiUI, useKanji } from "@/contexts/Context";
import { handleSaveKanji } from "../api/kanji.client";

interface KanjiCardProps {
  kanji: Kanji;
  referenceItems: any[];
  isClassified: boolean;
  dragEnabled: boolean;
  handleRef: (node: HTMLElement | null) => void;
}

export default function KanjiCard({
  kanji,
  referenceItems,
  isClassified,
  dragEnabled,
  handleRef,
}: KanjiCardProps) {
  const { data, setData } = useKanji();

  const vocabulary = data.vocabularies[
    data.kanji_vocabulary_items[kanji.id]?.[0]
  ];

  const toggleLearned = async () => {
    const updated = { ...kanji, learned: !kanji.learned };

    updateKanjiUI(setData, updated);

    try {
      await handleSaveKanji(updated);
    } catch (error) {
      updateKanjiUI(setData, kanji);
      console.error(error);
    }
  };

  const content = (
  <div className="w-full text-center">
    {/* References */}
    {referenceItems.length > 0 && (
      <div className="mb-1 flex flex-wrap justify-center gap-0.5">
        {referenceItems.map((item) => {
          const ref = data.reference_sets[item.reference_set_id];
          if (!ref) return null;

          return (
            <span
              key={item.id}
              className="rounded-full border px-1 text-[7px] font-semibold leading-3"
              style={{
                backgroundColor: `${ref.color}20`,
                borderColor: `${ref.color}55`,
                color: ref.color,
              }}
            >
              {item.note || "-"}
            </span>
          );
        })}
      </div>
    )}

    {/* Kanji */}
    <div className="text-[2rem] leading-none">
      {kanji.character}
    </div>

    {/* Han Viet */}
    <div className="mt-0.5 text-[10px] font-semibold uppercase text-lime-600">
      {kanji.han_viet}
    </div>

    {/* Vocabulary */}
    {isClassified && vocabulary && (
      <div className="mt-1">
        <div className="mx-auto flex max-w-full items-center justify-center gap-1 truncate rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] leading-4">
          <span className="truncate font-semibold">
            {vocabulary.word}
          </span>

          <span className="shrink-0 text-neutral-300">•</span>

          <span className="truncate text-neutral-500">
            {vocabulary.reading}
          </span>
        </div>

        <div className="mt-0.5 truncate text-[9px] leading-3 text-neutral-500">
          {vocabulary.meaning}
        </div>
      </div>
    )}
  </div>
);

  return (
    <article
  className={`
    group relative rounded-md p-1.5
    transition-all duration-150
    ${kanji.learned ? "opacity-10" : ""}
    ${
      !dragEnabled
        ? "bg-neutral-50 ring-1 ring-neutral-300"
        : "cursor-pointer"
    }
    data-[state=open]:bg-lime-50
    data-[state=open]:ring-1
    data-[state=open]:ring-lime-300
  `}
>
  <div
    ref={handleRef}
    className="
      absolute left-0 top-0
      w-full -translate-y-1
      bg-[#AEE509]
      opacity-0 transition-opacity
      group-hover:opacity-100
      cursor-grab active:cursor-grabbing
    "
  >
    {dragEnabled && (
      <GripHorizontal className="h-3 w-3 text-[#51670F]" />
    )}
  </div>

  {!dragEnabled ? (
    <div onClick={toggleLearned}>{content}</div>
  ) : (
    <KanjiDetailModal kanji={kanji}>
      {content}
    </KanjiDetailModal>
  )}
</article>
  );
}