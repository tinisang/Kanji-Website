"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Vocabulary } from "@/types/vocabulary";
import VocabularyItem from "./VocabularyItem";
import VocabularyEditor from "./VocabularyEditor";
import {
  createVocabulary,
  deleteVocabulary,
  getVocabularyByKanji,
  updateVocabulary,
} from "../api/vocabulary.client";
import { useKanji } from "@/contexts/Context";
import { createKanjiVocabulary, deleteKanjiVocabulary, updateKanjiVocabularyPositions } from "../../kanji-vocabulary/api/kanji-vocabulary.client";

interface Props {
  kanjiId: string;
}

export default function KanjiVocabularySection({
  kanjiId,
}: Props) {
    const {data, setData} = useKanji();
  const vocabularies = data.kanji_vocabulary_items[kanjiId]?.map(
    (vocabularyId) => data.vocabularies[vocabularyId]
  ) ?? [];

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

  


}
async function handleAdd() {
  const position =
    data.kanji_vocabulary_items[kanjiId]
      ?.length ?? 0;

  const newVocab =
    await createVocabulary({
      word: "",
      reading: "",
      meaning: "",
      note: "",
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
    <>
      <div className="space-y-4">
        {vocabularies.map((vocabulary, index) => (
  <VocabularyItem
  key={vocabulary.id}
  vocabulary={vocabulary}
  index={index}
  total={vocabularies.length}
  
  onMoveUp={() => moveVocabularyUp(index)}
  onMoveDown={() => moveVocabularyDown(index)}
  onDelete={() => handleDelete(vocabulary)}
/>
))}
      </div>

     <Button
  variant="outline"
  onClick={handleAdd}
  className="
    mt-4
    h-9
    rounded-lg
    border-dashed
    text-muted-foreground
    hover:text-foreground
  "
>
  + Add Vocabulary
</Button>

      
    </>
  );
}