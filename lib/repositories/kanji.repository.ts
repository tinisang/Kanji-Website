import { sql } from "@/lib/db";
import { Kanji, Vocabulary } from "@/types/kanji";

export async function getAllKanjiByUserId(
  userId: string
) {
  const rows = await sql`
    SELECT *
    FROM kanji
    WHERE user_id = ${userId}
    ORDER BY character;
  `;

  return rows as Kanji[];
}
export async function getKanjiVocabularies(
  userId: string,
  kanjiId: string
) {
  const rows = await sql`
    SELECT v.*
    FROM vocabulary v
    INNER JOIN kanji_vocabulary kv
      ON kv.vocabulary_id = v.id
    WHERE
      kv.kanji_id = ${kanjiId}
      
    ORDER BY v.word;
  `;

  return rows as Vocabulary[];
}
export async function getKanjiById(
  userId: string,
  kanjiId: string
) {
  const rows = await sql`
    SELECT *
    FROM kanji
    WHERE
      id = ${kanjiId}
      AND user_id = ${userId}
  `;

  return rows[0] as Kanji | undefined;
}

export async function createKanji(
  userId: string,
  kanji: Omit<
    Kanji,
    "id" | "created_at" | "updated_at"
  >
) {
  const rows = await sql`
    INSERT INTO kanji (
      user_id,
      character,
      han_viet,
      onyomi,
      kunyomi,
      vocabularies,
      short_description,
      content
    )
    VALUES (
      ${userId},
      ${kanji.character},
      ${kanji.han_viet},
      ${kanji.onyomi},
      ${kanji.kunyomi},
      ${JSON.stringify(
        kanji.vocabularies ?? []
      )}::jsonb,
      ${kanji.short_description ?? ""},
      ${kanji.content ?? ""}
    )
    RETURNING *
  `;

  return rows[0] as Kanji;
}

export async function updateKanjiById(
  userId: string,
  kanji: Kanji
) {
  const rows = await sql`
    UPDATE kanji
    SET
      character = ${kanji.character},
      han_viet = ${kanji.han_viet},
      onyomi = ${kanji.onyomi},
      kunyomi = ${kanji.kunyomi},
      short_description = ${kanji.short_description},
      content = ${kanji.content},
      vocabularies = ${JSON.stringify(
        kanji.vocabularies
      )}::jsonb,
      learned = ${kanji.learned},
      updated_at = NOW()
    WHERE
      id = ${kanji.id}
      AND user_id = ${userId}
    RETURNING *
  `;

  return rows[0] as Kanji;
}

export async function deleteKanjiById(
  userId: string,
  kanjiId: string
) {
  await sql`
    DELETE FROM kanji
    WHERE
      id = ${kanjiId}
      AND user_id = ${userId}
  `;
}