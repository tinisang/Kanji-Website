import { sql } from "@/lib/db";
import { getCurrentUserId } from "@/lib/auth/auth-user";
import { CreateGrammarExpressionExample, GrammarExpressionExample } from "../types/GrammarExpressionExample ";



export async function getAllGrammarExpressionExample(): Promise<
  GrammarExpressionExample[]
> {
  const userId =
    await getCurrentUserId();

  const rows = await sql`
    SELECT
      gee.*
    FROM grammar_expression_example gee
    INNER JOIN grammar_expression ge
      ON ge.id = gee.expression_id
    INNER JOIN grammar g
      ON g.id = ge.grammar_id
    WHERE g.user_id = ${userId}
    ORDER BY
      gee.expression_id,
      gee.position;
  `;

  return rows as GrammarExpressionExample[];
}

export async function getGrammarExpressionExamplesByExpressionId(
  expressionId: string
): Promise<GrammarExpressionExample[]> {
  const userId =
    await getCurrentUserId();

  const rows = await sql`
    SELECT
      gee.*
    FROM grammar_expression_example gee
    INNER JOIN grammar_expression ge
      ON ge.id = gee.expression_id
    INNER JOIN grammar g
      ON g.id = ge.grammar_id
    WHERE
      gee.expression_id = ${expressionId}
      AND g.user_id = ${userId}
    ORDER BY gee.position;
  `;

  return rows as GrammarExpressionExample[];
}

export async function getGrammarExpressionExampleById(
  id: string
): Promise<
  GrammarExpressionExample | undefined
> {
  const userId =
    await getCurrentUserId();

  const rows = await sql`
    SELECT
      gee.*
    FROM grammar_expression_example gee
    INNER JOIN grammar_expression ge
      ON ge.id = gee.expression_id
    INNER JOIN grammar g
      ON g.id = ge.grammar_id
    WHERE
      gee.id = ${id}
      AND g.user_id = ${userId};
  `;

  return rows[0] as
    | GrammarExpressionExample
    | undefined;
}
export async function createGrammarExpressionExample(
  example:CreateGrammarExpressionExample
): Promise<GrammarExpressionExample> {
  const userId =
    await getCurrentUserId();

  const expression = await sql`
    SELECT ge.id
    FROM grammar_expression ge
    INNER JOIN grammar g
      ON g.id = ge.grammar_id
    WHERE
      ge.id = ${example.expression_id}
      AND g.user_id = ${userId};
  `;

  if (expression.length === 0) {
    throw new Error(
      "Grammar expression not found."
    );
  }

  const rows = await sql`
    INSERT INTO grammar_expression_example (
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
        FROM grammar_expression_example
        WHERE expression_id = ${example.expression_id}
      )
    )
    RETURNING *;
  `;

  return rows[0] as GrammarExpressionExample;
}
export async function updateGrammarExpressionExampleById(
  example: GrammarExpressionExample
): Promise<GrammarExpressionExample> {
  const userId =
    await getCurrentUserId();

  const rows = await sql`
    UPDATE grammar_expression_example gee
    SET
      example = ${example.example},
      meaning = ${example.meaning},
      note = ${example.note},
      position = ${example.position},
      updated_at = NOW()
    FROM grammar_expression ge
    INNER JOIN grammar g
      ON g.id = ge.grammar_id
    WHERE
      gee.id = ${example.id}
      AND ge.id = gee.expression_id
      AND g.user_id = ${userId}
    RETURNING gee.*;
  `;

  return rows[0] as GrammarExpressionExample;
}

export async function deleteGrammarExpressionExampleById(
  id: string
): Promise<void> {
  const userId =
    await getCurrentUserId();

  await sql`
    DELETE FROM grammar_expression_example gee
    USING grammar_expression ge,
          grammar g
    WHERE
      gee.id = ${id}
      AND ge.id = gee.expression_id
      AND g.id = ge.grammar_id
      AND g.user_id = ${userId};
  `;
}