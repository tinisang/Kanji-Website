

import {
  createGrammarExpressionExample,
  deleteGrammarExpressionExampleById,
  getAllGrammarExpressionExample,
  getGrammarExpressionExampleById,
  getGrammarExpressionExamplesByExpressionId,
  updateGrammarExpressionExampleById,
} from "@/app/grammar/lib/repositories/grammarExpressionExampleRepository";
import { CreateGrammarExpressionExample, GrammarExpressionExample } from "@/app/grammar/lib/types/GrammarExpressionExample ";

export async function getAllGrammarExpressionExampleService() {
  return await getAllGrammarExpressionExample();
}

export async function getGrammarExpressionExamplesByExpressionIdService(
  expressionId: string
) {
  return await getGrammarExpressionExamplesByExpressionId(
    expressionId
  );
}

export async function getGrammarExpressionExampleByIdService(
  id: string
) {
  return await getGrammarExpressionExampleById(id);
}

export async function createGrammarExpressionExampleService(
  example: CreateGrammarExpressionExample
) {
  return await createGrammarExpressionExample(
    example
  );
}

export async function updateGrammarExpressionExampleService(
  example: GrammarExpressionExample
) {
  return await updateGrammarExpressionExampleById(
    example
  );
}

export async function deleteGrammarExpressionExampleService(
  id: string
) {
  return await deleteGrammarExpressionExampleById(
    id
  );
}