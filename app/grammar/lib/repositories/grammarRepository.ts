import { sql } from "@/lib/db";

import { Grammar } from "../types/Grammar";
import { getCurrentUserId } from "@/lib/auth/auth-user";


export async function getAllGrammar() {
  const userId = await getCurrentUserId();

  const rows = await sql`
    SELECT *
    FROM grammar
    WHERE user_id = ${userId}
    ORDER BY position, title;
  `;

  return rows as Grammar[];
}

export async function getGrammarById(
  grammarId: string
) {
  const userId = await getCurrentUserId();

  const rows = await sql`
    SELECT *
    FROM grammar
    WHERE
      id = ${grammarId}
      AND user_id = ${userId};
  `;

  return rows[0] as Grammar | undefined;
}

export async function createGrammar(
  grammar: Omit<
    Grammar,
    "id" | "created_at" | "updated_at"
  >
) {
  const userId = await getCurrentUserId();

  const rows = await sql`
    INSERT INTO grammar (
      user_id,
      title,
      short_description,
      content,
      learned,
      position
    )
    VALUES (
      ${userId},
      ${grammar.title},
      ${grammar.short_description},
      ${grammar.content},
      ${grammar.learned},
      ${grammar.position}
    )
    RETURNING *;
  `;

  return rows[0] as Grammar;
}

export async function updateGrammarById(
  grammar: Grammar
) {
  const userId = await getCurrentUserId();

  const rows = await sql`
    UPDATE grammar
    SET
      title = ${grammar.title},
      short_description = ${grammar.short_description},
      content = ${grammar.content},
      learned = ${grammar.learned},
      position = ${grammar.position},
      updated_at = NOW()
    WHERE
      id = ${grammar.id}
      AND user_id = ${userId}
    RETURNING *;
  `;

  return rows[0] as Grammar;
}

export async function deleteGrammarById(
  grammarId: string
) {
  const userId = await getCurrentUserId();

  await sql`
    DELETE FROM grammar
    WHERE
      id = ${grammarId}
      AND user_id = ${userId};
  `;
}