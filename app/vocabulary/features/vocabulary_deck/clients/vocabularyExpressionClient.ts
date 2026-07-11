import { VocabularyExpression } from "@/app/vocabulary/lib/types/vocabularyExpression";

export async function getAllVocabularyExpression(
  vocabularyId: string
) {
  const response = await fetch(
    `/vocabulary/api/expression/vocabulary/${vocabularyId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch expressions");
  }

  return (await response.json()) as VocabularyExpression[];
}

export async function getVocabularyExpression(
  expressionId: string
) {
  const response = await fetch(
    `/vocabulary/api/expression/${expressionId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch expression");
  }

  return (await response.json()) as VocabularyExpression;
}

export async function createVocabularyExpression(
  vocabularyId: string,
  expression: Omit<
    VocabularyExpression,
    "id" | "created_at" | "updated_at" | "position"
  >
) {
  const response = await fetch(
    `/vocabulary/api/expression/vocabulary/${vocabularyId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expression),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create expression");
  }

  return (await response.json()) as VocabularyExpression;
}

export async function updateVocabularyExpression(
  expression: VocabularyExpression
) {
  const response = await fetch(
    `/vocabulary/api/expression/${expression.id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expression),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update expression");
  }

  return (await response.json()) as VocabularyExpression;
}

export async function deleteVocabularyExpression(
  expressionId: string
) {
  const response = await fetch(
    `/vocabulary/api/expression/${expressionId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete expression");
  }
}