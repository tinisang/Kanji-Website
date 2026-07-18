import { CreateGrammarExpressionExample, GrammarExpressionExample } from "@/app/grammar/lib/types/GrammarExpressionExample ";


export async function getAllGrammarExpressionExampleAPI() {
  const res = await fetch(
    "/grammar/api/grammar-expression-example"
  );

  if (!res.ok) {
    throw new Error(
      "Failed to fetch grammar expression examples."
    );
  }

  return res.json() as Promise<
    GrammarExpressionExample[]
  >;
}

export async function getGrammarExpressionExamplesByExpressionIdAPI(
  expressionId: string
) {
  const res = await fetch(
    `/grammar/api/expression/${expressionId}/example`
  );

  if (!res.ok) {
    throw new Error(
      "Failed to fetch grammar expression examples."
    );
  }

  return res.json() as Promise<
    GrammarExpressionExample[]
  >;
}

export async function getGrammarExpressionExampleByIdAPI(
  id: string
) {
  const res = await fetch(
    `/grammar/api/grammar-expression-example/${id}`
  );

  if (!res.ok) {
    throw new Error(
      "Failed to fetch grammar expression example."
    );
  }

  return res.json() as Promise<GrammarExpressionExample>;
}

export async function createGrammarExpressionExampleAPI(
  example: CreateGrammarExpressionExample
) {
  const res = await fetch(
    "/grammar/api/grammar-expression-example",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(example),
    }
  );

  if (!res.ok) {
    throw new Error(
      "Failed to create grammar expression example."
    );
  }

  return res.json() as Promise<GrammarExpressionExample>;
}

export async function updateGrammarExpressionExampleAPI(
  example: GrammarExpressionExample
) {
  const res = await fetch(
    `/grammar/api/grammar-expression-example/${example.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(example),
    }
  );

  if (!res.ok) {
    throw new Error(
      "Failed to update grammar expression example."
    );
  }

  return res.json() as Promise<GrammarExpressionExample>;
}

export async function deleteGrammarExpressionExampleAPI(
  id: string
) {
  const res = await fetch(
    `/grammar/api/grammar-expression-example/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) {
    throw new Error(
      "Failed to delete grammar expression example."
    );
  }
}