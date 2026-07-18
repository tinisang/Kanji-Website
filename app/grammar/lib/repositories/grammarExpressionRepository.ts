import { sql } from "@/lib/db";
import { getCurrentUserId } from "@/lib/auth/auth-user";

import { GrammarExpression } from "../types/GrammarExpression";

export async function getAllGrammarExpression(): Promise<
  GrammarExpression[]
> {
  const userId =
    await getCurrentUserId();

  const rows = await sql`
    SELECT
      ge.*
    FROM grammar_expression ge
    INNER JOIN grammar g
      ON g.id = ge.grammar_id
    WHERE g.user_id = ${userId}
    ORDER BY
      ge.grammar_id,
      ge.position;
  `;

  return rows as GrammarExpression[];
}

export async function getGrammarExpressionsByGrammarId(
  grammarId: string
): Promise<GrammarExpression[]> {
  const userId =
    await getCurrentUserId();

  const rows = await sql`
    SELECT
      ge.*
    FROM grammar_expression ge
    INNER JOIN grammar g
      ON g.id = ge.grammar_id
    WHERE
      ge.grammar_id = ${grammarId}
      AND g.user_id = ${userId}
    ORDER BY ge.position;
  `;

  return rows as GrammarExpression[];
}

export async function getGrammarExpressionById(
  id: string
): Promise<
  GrammarExpression | undefined
> {
  const userId =
    await getCurrentUserId();

  const rows = await sql`
    SELECT
      ge.*
    FROM grammar_expression ge
    INNER JOIN grammar g
      ON g.id = ge.grammar_id
    WHERE
      ge.id = ${id}
      AND g.user_id = ${userId};
  `;

  return rows[0] as
    | GrammarExpression
    | undefined;
}
export async function createGrammarExpression(
  expression: Omit<
    GrammarExpression,
    "id" | "created_at" | "updated_at" | "position"
  >
): Promise<GrammarExpression> {
  const userId = await getCurrentUserId();

  const grammar = await sql`
    SELECT id
    FROM grammar
    WHERE
      id = ${expression.grammar_id}
      AND user_id = ${userId};
  `;

  if (grammar.length === 0) {
    throw new Error("Grammar not found.");
  }

  const rows = await sql`
    INSERT INTO grammar_expression (
      grammar_id,
      label,
      pattern,
      meaning,
      note,
      position
    )
    VALUES (
      ${expression.grammar_id},
      ${expression.label},
      ${expression.pattern},
      ${expression.meaning},
      ${expression.note},
      (
        SELECT COALESCE(MAX(position), -1) + 1
        FROM grammar_expression
        WHERE grammar_id = ${expression.grammar_id}
      )
    )
    RETURNING *;
  `;

  return rows[0] as GrammarExpression;
}
export async function updateGrammarExpressionById(
  expression: GrammarExpression
): Promise<GrammarExpression> {
  const userId =
    await getCurrentUserId();

  const rows = await sql`
    UPDATE grammar_expression ge
    SET
      label = ${expression.label},
      pattern = ${expression.pattern},
      meaning = ${expression.meaning},
      note = ${expression.note},
      position = ${expression.position},
      updated_at = NOW()
    FROM grammar g
    WHERE
      ge.id = ${expression.id}
      AND g.id = ge.grammar_id
      AND g.user_id = ${userId}
    RETURNING ge.*;
  `;

  return rows[0] as GrammarExpression;
}

export async function deleteGrammarExpressionById(
  id: string
): Promise<void> {
  const userId =
    await getCurrentUserId();

  await sql`
    DELETE FROM grammar_expression ge
    USING grammar g
    WHERE
      ge.id = ${id}
      AND g.id = ge.grammar_id
      AND g.user_id = ${userId};
  `;
}