import * as vocabularyExpressionRepository from "@/app/vocabulary/lib/repositories/vocabularyExpressionRepository";


import * as expressionExampleRepository from "@/app/vocabulary/lib/repositories/expressionExampleRepository";

import { Usage } from "@/app/vocabulary/lib/types/Usage";
import { VocabularyExpression } from "@/app/vocabulary/lib/types/vocabularyExpression";


export async function getUsagesByVocabularyId(
  vocabularyId: string
): Promise<Record<string, Usage>> {
  const expressions =
    await getAllVocabularyExpressionByVocabularyId(
      vocabularyId
    );

  const usages: Record<string, Usage> = {};

  for (const expression of expressions) {
    const examples =
      await expressionExampleRepository.getAllExpressionExampleByExpressionId(
        expression.id
      );

    usages[expression.id] = {
      expression,
      examples: Object.fromEntries(
        examples.map((example) => [
          example.id,
          example,
        ])
      ),
    };
  }

  return usages;
}

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