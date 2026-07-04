import { sql } from "@/lib/db";
import { KanjiVocabulary } from "../../types/kanji-vocabulary";


export async function getKanjiVocabularyByKanjiId(
  kanjiId: string
) {
  const rows = await sql`
    SELECT *
    FROM kanji_vocabulary
    WHERE kanji_id = ${kanjiId};
  `;

  return rows as KanjiVocabulary[];
}

export async function getKanjiVocabularyByVocabularyId(
  vocabularyId: string
) {
  const rows = await sql`
    SELECT *
    FROM kanji_vocabulary
    WHERE vocabulary_id = ${vocabularyId};
  `;

  return rows as KanjiVocabulary[];
}

export async function createKanjiVocabulary(
  relation: Omit<KanjiVocabulary, "position">
) {
  const rows = await sql`
    INSERT INTO kanji_vocabulary (
      kanji_id,
      vocabulary_id,
      position
    )
    VALUES (
      ${relation.kanji_id},
      ${relation.vocabulary_id},
      (
        SELECT COUNT(*)
        FROM kanji_vocabulary
        WHERE kanji_id = ${relation.kanji_id}
      )
    )
    RETURNING *;
  `;

  return rows[0] as KanjiVocabulary;
}

export async function deleteKanjiVocabulary(
  kanjiId: string,
  vocabularyId: string
) {
  await sql`
    DELETE FROM kanji_vocabulary
    WHERE
      kanji_id = ${kanjiId}
      AND vocabulary_id = ${vocabularyId};
  `;
}

export async function getAllKanjiVocabulary() {
  const rows = await sql`
    SELECT *
    FROM kanji_vocabulary;
  `;

  return rows as KanjiVocabulary[];
}

export async function updateKanjiVocabularyPositions(
  relations: KanjiVocabulary[]
) {
  for (const relation of relations) {
    await sql`
      UPDATE kanji_vocabulary
      SET position = ${relation.position}
      WHERE
        kanji_id = ${relation.kanji_id}
        AND vocabulary_id = ${relation.vocabulary_id};
    `;
  }
}