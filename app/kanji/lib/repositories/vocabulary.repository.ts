import { sql } from "@/lib/db";
import { Vocabulary } from "../../types/vocabulary";



export async function getAllVocabularyByUserId(
  userId: string
) {
  const rows = await sql`
    SELECT *
    FROM vocabulary
    WHERE user_id = ${userId}
    ORDER BY word;
  `;

  return rows as Vocabulary[];
}

export async function getVocabularyById(
  userId: string,
  vocabularyId: string
) {
  const rows = await sql`
    SELECT *
    FROM vocabulary
    WHERE
      id = ${vocabularyId}
      AND user_id = ${userId};
  `;

  return rows[0] as Vocabulary | undefined;
}

export async function createVocabulary(
  userId: string,
  vocabulary: Omit<
    Vocabulary,
    "id" | "user_id" | "created_at" | "updated_at"
  >
) {
  const rows = await sql`
    INSERT INTO vocabulary (
      user_id,
      word,
      reading,
      meaning,
      note,
      need_revision
    )
    VALUES (
      ${userId},
      ${vocabulary.word},
      ${vocabulary.reading},
      ${vocabulary.meaning},
      ${vocabulary.note},
      ${vocabulary.need_revision}
    )
    RETURNING *;
  `;

  return rows[0] as Vocabulary;
}

export async function updateVocabularyById(
  userId: string,
  vocabulary: Vocabulary
) {
  const rows = await sql`
    UPDATE vocabulary
    SET
      word = ${vocabulary.word},
      reading = ${vocabulary.reading},
      meaning = ${vocabulary.meaning},
      note = ${vocabulary.note},
      need_revision = ${vocabulary.need_revision},
      updated_at = NOW()
    WHERE
      id = ${vocabulary.id}
      AND user_id = ${userId}
    RETURNING *;
  `;

  return rows[0] as Vocabulary;
}

export async function deleteVocabularyById(
  userId: string,
  vocabularyId: string
) {
  await sql`
    DELETE FROM vocabulary
    WHERE
      id = ${vocabularyId}
      AND user_id = ${userId};
  `;
}