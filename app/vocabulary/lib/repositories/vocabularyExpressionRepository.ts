import { sql } from "@/lib/db";
import { VocabularyExpression } from "@/app/vocabulary/lib/types/vocabularyExpression";


export async function getAllVocabularyExpression() {
  const rows = await sql`
    SELECT *
    FROM vocabulary_expression
    ORDER BY vocabulary_id, position;
  `;

  return rows as VocabularyExpression[];
}
export async function getAllVocabularyExpressionByVocabularyId(
  vocabularyId: string
) {
  const rows = await sql`
    SELECT *
    FROM vocabulary_expression
    WHERE vocabulary_id = ${vocabularyId}
    ORDER BY position;
  `;

  return rows as VocabularyExpression[];
}

export async function getVocabularyExpressionById(
  expressionId: string
) {
  const rows = await sql`
    SELECT *
    FROM vocabulary_expression
    WHERE id = ${expressionId};
  `;

  return rows[0] as VocabularyExpression | undefined;
}

export async function createVocabularyExpression(
  expression: Omit<
    VocabularyExpression,
    "id" | "created_at" | "updated_at" | "position"
  >
) {
  const rows = await sql`
    INSERT INTO vocabulary_expression (
      vocabulary_id,
      word,
      reading,
      meaning,
      position
    )
    VALUES (
      ${expression.vocabulary_id},
      ${expression.word},
      ${expression.reading},
      ${expression.meaning},
      (
        SELECT COALESCE(MAX(position), -1) + 1
        FROM vocabulary_expression
        WHERE vocabulary_id = ${expression.vocabulary_id}
      )
    )
    RETURNING *;
  `;

  return rows[0] as VocabularyExpression;
}

export async function updateVocabularyExpressionById(
  expression: VocabularyExpression
) {
  const rows = await sql`
    UPDATE vocabulary_expression
    SET
      word = ${expression.word},
      reading = ${expression.reading},
      meaning = ${expression.meaning},
      position = ${expression.position},
      updated_at = NOW()
    WHERE id = ${expression.id}
    RETURNING *;
  `;

  return rows[0] as VocabularyExpression;
}

export async function deleteVocabularyExpressionById(
  expressionId: string
) {
  await sql`
    DELETE FROM vocabulary_expression
    WHERE id = ${expressionId};
  `;
}