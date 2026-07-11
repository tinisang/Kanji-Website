import * as vocabularyExpressionRepository from "@/app/vocabulary/lib/repositories/vocabularyExpressionRepository";
import { VocabularyExpression } from "@/app/vocabulary/lib/types/vocabularyExpression";


export async function getAllVocabularyExpression() {
  return await vocabularyExpressionRepository.getAllVocabularyExpression();
}

export async function getAllVocabularyExpressionByVocabularyId(
  vocabularyId: string
) {
  return await vocabularyExpressionRepository.getAllVocabularyExpressionByVocabularyId(
    vocabularyId
  );
}

export async function getVocabularyExpressionById(
  expressionId: string
) {
  return await vocabularyExpressionRepository.getVocabularyExpressionById(
    expressionId
  );
}

export async function createVocabularyExpression(
  expression: Omit<
    VocabularyExpression,
    "id" | "created_at" | "updated_at"
  >
) {
  return await vocabularyExpressionRepository.createVocabularyExpression(
    expression
  );
}

export async function updateVocabularyExpressionById(
  expression: VocabularyExpression
) {
  return await vocabularyExpressionRepository.updateVocabularyExpressionById(
    expression
  );
}

export async function deleteVocabularyExpressionById(
  expressionId: string
) {
  return await vocabularyExpressionRepository.deleteVocabularyExpressionById(
    expressionId
  );
}