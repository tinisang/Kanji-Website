import { sql } from "@/lib/db";
import { ExpressionExample } from "@/app/vocabulary/lib/types/expressionExample";

export async function getAllExpressionExample() {
  const rows = await sql`
    SELECT *
    FROM expression_example
    ORDER BY expression_id, position;
  `;

  return rows as ExpressionExample[];
}
export async function getAllExpressionExampleByExpressionId(
  expressionId: string
) {
  const rows = await sql`
    SELECT *
    FROM expression_example
    WHERE expression_id = ${expressionId}
    ORDER BY position;
  `;

  return rows as ExpressionExample[];
}

export async function getExpressionExampleById(
  exampleId: string
) {
  const rows = await sql`
    SELECT *
    FROM expression_example
    WHERE id = ${exampleId};
  `;

  return rows[0] as ExpressionExample | undefined;
}

export async function createExpressionExample(
  example: Omit<
    ExpressionExample,
    "id" | "created_at" | "updated_at" | "position"
  >
) {
  const rows = await sql`
    INSERT INTO expression_example (
      expression_id,
      example,
      meaning,
      note,
      position
    )
    VALUES (
      ${example.expression_id},
      ${example.example},
      ${example.meaning},
      ${example.note},
      (
        SELECT COALESCE(MAX(position), -1) + 1
        FROM expression_example
        WHERE expression_id = ${example.expression_id}
      )
    )
    RETURNING *;
  `;

  return rows[0] as ExpressionExample;
}

export async function updateExpressionExampleById(
  example: ExpressionExample
) {
  const rows = await sql`
    UPDATE expression_example
    SET
      example = ${example.example},
      meaning = ${example.meaning},
      note = ${example.note},
      position = ${example.position},
      updated_at = NOW()
    WHERE id = ${example.id}
    RETURNING *;
  `;

  return rows[0] as ExpressionExample;
}

export async function deleteExpressionExampleById(
  exampleId: string
) {
  await sql`
    DELETE FROM expression_example
    WHERE id = ${exampleId};
  `;
}