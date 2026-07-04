import { KanjiVocabulary } from "@/app/kanji/types/kanji-vocabulary";

export async function getKanjiVocabularyByKanji(
  kanjiId: string
) {
  const res = await fetch(
    `/kanji/api/kanji-vocabulary/kanji/${kanjiId}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch kanji vocabulary");
  }

  return (await res.json()) as KanjiVocabulary[];
}

export async function getKanjiVocabularyByVocabulary(
  vocabularyId: string
) {
  const res = await fetch(
    `/kanji/api/kanji-vocabulary/vocabulary/${vocabularyId}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch kanji vocabulary");
  }

  return (await res.json()) as KanjiVocabulary[];
}

export async function createKanjiVocabulary(
  relation: KanjiVocabulary
) {
  const res = await fetch("/kanji/api/kanji-vocabulary", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(relation),
  });

  if (!res.ok) {
    throw new Error("Failed to create relation");
  }

  return (await res.json()) as KanjiVocabulary;
}

export async function deleteKanjiVocabulary(
  kanjiId: string,
  vocabularyId: string
) {
  const res = await fetch(
    `/kanji/api/kanji-vocabulary?kanjiId=${kanjiId}&vocabularyId=${vocabularyId}`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to delete relation");
  }
}

export async function updateKanjiVocabularyPositions(
  relations: KanjiVocabulary[]
) {
  const res = await fetch(
    "/kanji/api/kanji-vocabulary/position",
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(relations),
    }
  );

  if (!res.ok) {
    throw new Error(
      "Failed to update positions"
    );
  }
}