"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Vocabulary } from "@/app/vocabulary/lib/types/vocabulary";
import { Kanji } from "@/app/kanji/types/kanji";

import {
  getKanjiVocabularyByVocabulary,
} from "@/app/kanji/features/kanji-vocabulary/api/kanji-vocabulary.client";

import {
  getKanjiById,
} from "@/app/kanji/features/kanji/api/kanji.client";

import ViewGroupButton from "./view/ViewGroupButton";
import AddKanjiButton from "./AddKanjiButton";

interface Props {
  vocabulary: Vocabulary;
}

export default function ReviewKanji({
  vocabulary,
}: Props) {
  const [attachedKanjis, setAttachedKanjis] =
    useState<Kanji[]>([]);

  useEffect(() => {
    const id = vocabulary.id;

    async function loadKanjis() {
      try {
        const relations =
          await getKanjiVocabularyByVocabulary(id);

        const kanjis = await Promise.all(
          relations.map((relation) =>
            getKanjiById(relation.kanji_id)
          )
        );

        setAttachedKanjis(kanjis);
      } catch (error) {
        console.error(
          "Failed to load attached kanjis:",
          error
        );

        setAttachedKanjis([]);
      }
    }

    loadKanjis();
  }, [vocabulary.id]);

  return (
    <div className="p-5 sm:p-7">
      <h3 className="text-sm font-semibold">
        Hán tự
      </h3>

      <div className="mt-3 space-y-3">
        {attachedKanjis.map((kanji) => (
          <div
            key={kanji.id}
            className="
              flex
              min-h-[110px]
              flex-col
              items-center
              justify-center
              rounded-2xl
              bg-emerald-50/70
              px-4
              py-3
              text-center
              sm:min-h-[120px]
            "
          >
            <div className="text-4xl font-bold sm:text-3xl">
              {kanji.character}
            </div>

            <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-emerald-600">
              {kanji.han_viet}
            </div>

            <ViewGroupButton
              kanjiId={kanji.id}
            />
          </div>
        ))}

        <AddKanjiButton
          vocabularyId={vocabulary.id}
          attachedKanjiIds={attachedKanjis.map(
            (kanji) => kanji.id
          )}
          onAdded={(kanji) => {
            setAttachedKanjis((prev) => [
              ...prev,
              kanji,
            ]);
          }}
        />
      </div>
    </div>
  );
}