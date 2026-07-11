import { Vocabulary } from "@/app/vocabulary/lib/types/vocabulary";

export async function getAllVocabulary() {
  const response = await fetch("/vocabulary/api");

  if (!response.ok) {
    throw new Error("Failed to fetch vocabulary");
  }

  return (await response.json()) as Vocabulary[];
}

export async function getVocabulary(
  vocabularyId: string
) {
  const response = await fetch(
    `/vocabulary/api/${vocabularyId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch vocabulary");
  }

  return (await response.json()) as Vocabulary;
}

export async function createVocabulary(
  vocabulary: Omit<
    Vocabulary,
    "id" | "user_id" | "created_at" | "updated_at"
  >
) {
  const response = await fetch("/vocabulary/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vocabulary),
  });

  if (!response.ok) {
    throw new Error("Failed to create vocabulary");
  }

  return (await response.json()) as Vocabulary;
}

export async function updateVocabulary(
  vocabulary: Vocabulary
) {
  const response = await fetch(
    `/vocabulary/api/${vocabulary.id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vocabulary),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update vocabulary");
  }

  return (await response.json()) as Vocabulary;
}

export async function deleteVocabulary(
  vocabularyId: string
) {
  const response = await fetch(
    `/vocabulary/api/${vocabularyId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete vocabulary");
  }
}