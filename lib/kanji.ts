import { sql } from "./db";

export async function getAllKanji() {
  const rows = await sql`
    SELECT
      id,
      character,
      han_viet,
      onyomi,
      kunyomi,
      vocabularies,
      short_description,
      content,
      created_at,
      updated_at
    FROM kanji
    ORDER BY character;
  `;

  return rows as Kanji[];
}

export interface Vocabulary {
  word: string;
  reading: string;
  meaning: string;
}

export interface Kanji {
  example: string| null;
  id: string;

  character: string;
  han_viet: string;

  onyomi: string | null;
  kunyomi: string | null;

  vocabularies: Vocabulary[] | null;

  short_description: string | null;
  content: string | null;

  created_at: string;
  updated_at: string;
}


export async function updateKanji(kanji: Kanji) {
  const rows = await sql`
    UPDATE kanji
    SET
      character = ${kanji.character},
      han_viet = ${kanji.han_viet},
      onyomi = ${kanji.onyomi},
      kunyomi = ${kanji.kunyomi},
      short_description = ${kanji.short_description},
      content = ${kanji.content},
      vocabularies = ${JSON.stringify(kanji.vocabularies)}::jsonb,
      updated_at = NOW()
    WHERE id = ${kanji.id}
    RETURNING *;
  `;

  return rows[0] as Kanji;
}

export async function createKanjiAndAssignGroup(
  kanji: Omit<
    Kanji,
    "id" | "created_at" | "updated_at"
  >,
  groupId: string
) {
  const insertedKanji = await sql`
    INSERT INTO kanji (
      character,
      han_viet,
      onyomi,
      kunyomi,
      vocabularies,
      short_description,
      content
    )
    VALUES (
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

  const newKanji = insertedKanji[0];

  const positionResult = await sql`
    SELECT
      COALESCE(MAX(position), -1) AS max_position
    FROM kanji_group_item
    WHERE group_id = ${groupId}
  `;

  const maxPosition = Number(
    positionResult[0]?.max_position ?? -1
  );

  await sql`
    INSERT INTO kanji_group_item (
      kanji_id,
      group_id,
      position
    )
    VALUES (
      ${newKanji.id},
      ${groupId},
      ${maxPosition + 1}
    )
  `;

  return newKanji;
}

export async function deleteKanji(
  kanjiId: string
) {
  await sql`
    DELETE FROM kanji_group_item
    WHERE kanji_id = ${kanjiId}
  `;

  await sql`
    DELETE FROM kanji
    WHERE id = ${kanjiId}
  `;
}