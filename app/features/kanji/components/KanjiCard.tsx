"use client";

import { GripHorizontal } from "lucide-react";
import KanjiDetailModal from "./KanjiModalItem";
import { Kanji } from "@/types/kanji";
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

    const firstVocabulary = kanji.vocabularies?.[0];


    async function onClick() {
        const updated = {
            ...kanji,
            learned: !kanji.learned,
        };

        updateKanjiUI(setData, updated);

        try {
            await handleSaveKanji(updated);
        } catch (error) {
            // rollback
            updateKanjiUI(setData, kanji);
            console.error(error);
        }
    }



    const content = (
        <div className="w-full text-center">
            <div className="mt-2 mb-2 flex flex-wrap justify-center gap-1">
                {referenceItems.map((item) => {
                    const reference =
                        data.reference_sets[item.reference_set_id];

                    if (!reference) return null;

                    return (
                        <span
                            key={item.id}
                            className="rounded-full border px-1 py-0 text-[8px] font-semibold"
                            style={{
                                backgroundColor: `${reference.color}20`,
                                borderColor: `${reference.color}55`,
                                color: reference.color,
                            }}
                        >
                            {item.note || "-"}
                        </span>
                    );
                })}
            </div>

            <div className="text-[2.8rem] leading-none">
                {kanji.character}
            </div>

            <div className="mt-1 text-xs font-semibold text-lime-600">
                {kanji.han_viet}
            </div>

            {isClassified && firstVocabulary && (
                <>
                    <div className="mx-auto mt-3 inline-flex items-center gap-2 rounded-full bg-neutral-100 px-3 py-1 text-xs">
                        <span className="font-semibold">
                            {firstVocabulary.word}
                        </span>

                        <span className="text-neutral-400">•</span>

                        <span className="text-neutral-500">
                            {firstVocabulary.reading}
                        </span>
                    </div>

                    <div className="mt-2 text-[11px] text-neutral-500">
                        {firstVocabulary.meaning}
                    </div>
                </>
            )}
        </div>
    )

    return (
        <article
            className={`
        group relative rounded-md p-2
        transition-all duration-200
        
     ${
    kanji.learned
      ? "opacity-10"
      : ""
  }

  data-[state=open]:bg-lime-50
  data-[state=open]:ring-1
  data-[state=open]:ring-lime-300

  ${
    !dragEnabled
      ? "bg-neutral-50 ring-1 ring-neutral-300 shadow-sm"
      : "cursor-pointer"
  }
    `}
        >
            <div
                ref={handleRef}
                className="
            absolute top-0 left-0
            -translate-y-1
            opacity-0 transition-opacity
            group-hover:opacity-100
            cursor-grab active:cursor-grabbing
            bg-[#AEE509]
            w-full
            "
            >
                {dragEnabled && (
                    <GripHorizontal className="h-4 w-4 text-[#51670F]" />
                )}
            </div>

            {!dragEnabled ? (
                <div onClick={onClick}>
                    {content}
                </div>
            ) : (
                <KanjiDetailModal kanji={kanji}>
                    {content}
                </KanjiDetailModal>
            )}
        </article>
    );
}

