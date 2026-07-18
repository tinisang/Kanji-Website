import { Grammar } from "@/app/grammar/lib/types/Grammar";


export async function getAllGrammar() {
  const res = await fetch("/api/grammar");

  if (!res.ok) {
    throw new Error("Failed to fetch grammar");
  }

  return (await res.json()) as Grammar[];
}

export async function getGrammarById(
  grammarId: string
) {
  const res = await fetch(
    `/api/grammar/${grammarId}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch grammar");
  }

  return (await res.json()) as Grammar;
}

export async function createGrammar(
  grammar: Omit<
    Grammar,
    "id" | "created_at" | "updated_at"
  >
) {
  const res = await fetch("/grammar/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(grammar),
  });

  if (!res.ok) {
    throw new Error("Failed to create grammar");
  }

  return (await res.json()) as Grammar;
}

export async function updateGrammar(
  grammar: Grammar
) {
  const res = await fetch(
    `/grammar/api/${grammar.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(grammar),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to update grammar");
  }

  return (await res.json()) as Grammar;
}

export async function deleteGrammar(
  grammarId: string
) {
  const res = await fetch(
    `/grammar/api/${grammarId}`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to delete grammar");
  }
}