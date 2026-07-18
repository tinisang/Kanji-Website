import { GrammarExpression } from "@/app/grammar/lib/types/GrammarExpression";

export async function getGrammarExpressions(
  grammarId: string
) {
  const res = await fetch(
    `/grammar/api/grammar/${grammarId}/expression`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch grammar expressions");
  }

  return (await res.json()) as GrammarExpression[];
}

export async function getGrammarExpressionById(
  id: string
) {
  const res = await fetch(
    `/grammar/api/expression/${id}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch grammar expression");
  }

  return (await res.json()) as GrammarExpression;
}

export async function createGrammarExpression(
  expression: Omit<
    GrammarExpression,
    "id" | "created_at" | "updated_at" | "position"
  >
) {
  const res = await fetch(
    "/grammar/api/expression",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expression),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to create grammar expression");
  }

  return (await res.json()) as GrammarExpression;
}

export async function updateGrammarExpression(
  expression: GrammarExpression
) {
  const res = await fetch(
    `/grammar/api/expression/${expression.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expression),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to update grammar expression");
  }

  return (await res.json()) as GrammarExpression;
}

export async function deleteGrammarExpression(
  id: string
) {
  const res = await fetch(
    `/grammar/api/expression/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to delete grammar expression");
  }
}