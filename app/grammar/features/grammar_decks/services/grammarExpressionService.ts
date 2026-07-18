import { GrammarExpression } from "@/app/grammar/lib/types/GrammarExpression";

import {
  createGrammarExpression,
  deleteGrammarExpressionById,
  getAllGrammarExpression,
  getGrammarExpressionById,
  getGrammarExpressionsByGrammarId,
  updateGrammarExpressionById,
} from "@/app/grammar/lib/repositories/grammarExpressionRepository";

export async function getAllGrammarExpressionService() {
  return await getAllGrammarExpression();
}

export async function getGrammarExpressionsByGrammarIdService(
  grammarId: string
) {
  return await getGrammarExpressionsByGrammarId(
    grammarId
  );
}

export async function getGrammarExpressionByIdService(
  id: string
) {
  return await getGrammarExpressionById(id);
}

export async function createGrammarExpressionService(
  expression: Omit<
    GrammarExpression,
    "id" | "created_at" | "updated_at" | "position"
  >
) {
  return await createGrammarExpression(
    expression
  );
}

export async function updateGrammarExpressionService(
  expression: GrammarExpression
) {
  return await updateGrammarExpressionById(
    expression
  );
}

export async function deleteGrammarExpressionService(
  id: string
) {
  return await deleteGrammarExpressionById(id);
}