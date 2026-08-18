"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

import { Vocabulary } from "@/app/kanji/types/vocabulary";
import VocabularyItem from "./VocabularyItem";

import {
  createVocabulary,
  deleteVocabulary,
} from "../api/vocabulary.client";

import { useKanji } from "@/contexts/Context";

import {
  createKanjiVocabulary,
  deleteKanjiVocabulary,
  updateKanjiVocabularyPositions,
} from "../../kanji-vocabulary/api/kanji-vocabulary.client";

import { deleteReviewItemByTarget } from "@/app/review/clients/review.client";

interface Props {
  kanjiId: string;
}

export default function KanjiVocabularySection({
  kanjiId,
}: Props) {
  const { data, setData } = useKanji();

  const vocabularies =
    data.kanji_vocabulary_items[kanjiId]
      ?.map(
        (vocabularyId) =>
          data.vocabularies[vocabularyId]
      )
      .filter(Boolean) ?? [];

  async function moveVocabulary(
    from: number,
    to: number
  ) {
    const ids = [
      ...(data.kanji_vocabulary_items[kanjiId] ?? []),
    ];

    [ids[from], ids[to]] = [
      ids[to],
      ids[from],
    ];

    setData((prev) => ({
      ...prev,
      kanji_vocabulary_items: {
        ...prev.kanji_vocabulary_items,
        [kanjiId]: ids,
      },
    }));

    await updateKanjiVocabularyPositions(
      ids.map((vocabularyId, index) => ({
        kanji_id: kanjiId,
        vocabulary_id: vocabularyId,
        position: index,
      }))
    );
  }

  function moveVocabularyUp(index: number) {
    if (index === 0) return;
    moveVocabulary(index, index - 1);
  }

  function moveVocabularyDown(index: number) {
    if (index === vocabularies.length - 1) return;
    moveVocabulary(index, index + 1);
  }

  async function handleDelete(
    vocabulary: Vocabulary
  ) {
    setData((prev) => {
      const nextVocabularies = {
        ...prev.vocabularies,
      };

      delete nextVocabularies[vocabulary.id];

      return {
        ...prev,
        vocabularies: nextVocabularies,
        kanji_vocabulary_items: {
          ...prev.kanji_vocabulary_items,
          [kanjiId]: (
            prev.kanji_vocabulary_items[
              kanjiId
            ] ?? []
          ).filter(
            (id) => id !== vocabulary.id
          ),
        },
      };
    });

    await deleteKanjiVocabulary(
      kanjiId,
      vocabulary.id
    );

    await deleteVocabulary(vocabulary.id);

    await deleteReviewItemByTarget(
      "kanji",
      vocabulary.id
    );
  }

  async function handleAdd() {
    const position =
      data.kanji_vocabulary_items[kanjiId]
        ?.length ?? 0;

    const newVocab = await createVocabulary({
      word: "",
      reading: "",
      meaning: "",
      note: "",
      need_revision: false,
    });

    await createKanjiVocabulary({
      kanji_id: kanjiId,
      vocabulary_id: newVocab.id,
      position,
    });

    setData((prev) => ({
      ...prev,
      vocabularies: {
        ...prev.vocabularies,
        [newVocab.id]: newVocab,
      },
      kanji_vocabulary_items: {
        ...prev.kanji_vocabulary_items,
        [kanjiId]: [
          ...(prev.kanji_vocabulary_items[
            kanjiId
          ] ?? []),
          newVocab.id,
        ],
      },
    }));
  }

  return (
    <div className="w-full">
      <div className="space-y-3 sm:space-y-4">
        {vocabularies.map(
          (vocabulary, index) => (
            <div
              key={vocabulary.id}
              className="w-full overflow-hidden"
            >
              <VocabularyItem
                vocabulary={vocabulary}
                index={index}
                total={vocabularies.length}
                onMoveUp={() =>
                  moveVocabularyUp(index)
                }
                onMoveDown={() =>
                  moveVocabularyDown(index)
                }
                onDelete={() =>
                  handleDelete(vocabulary)
                }
              />
            </div>
          )
        )}
      </div>

      <Button
        variant="outline"
        onClick={handleAdd}
        className="
          mt-4
          h-9
          w-full
          rounded-lg
          border-dashed
          text-muted-foreground
          hover:text-foreground
          sm:w-auto
        "
      >
        + Add Vocabulary
      </Button>
    </div>
  );
}