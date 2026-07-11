import { ExpressionExample } from "@/app/vocabulary/lib/types/expressionExample";

export async function getAllExpressionExample(
  expressionId: string
) {
  const response = await fetch(
    `/vocabulary/api/expression/${expressionId}/example`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch examples");
  }

  return (await response.json()) as ExpressionExample[];
}

export async function createExpressionExample(

  example: Omit<
    ExpressionExample,
    "id" | "created_at" | "updated_at" | "position" 
  >
) {
  const response = await fetch(
    `/vocabulary/api/expression/${example.expression_id}/example`,
    {
      method: "POST",
      body: JSON.stringify(example),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create example");
  }

  return (await response.json()) as ExpressionExample;
}

export async function updateExpressionExample(
  expressionId: string,
  example: ExpressionExample
) {
  const response = await fetch(
    `/vocabulary/api/expression/${expressionId}/example/${example.id}`,
    {
      method: "PATCH",
      body: JSON.stringify(example),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update example");
  }

  return (await response.json()) as ExpressionExample;
}

export async function deleteExpressionExample(
  expressionId: string,
  exampleId: string
) {
  const response = await fetch(
    `/vocabulary/api/expression/${expressionId}/example/${exampleId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete example");
  }
}