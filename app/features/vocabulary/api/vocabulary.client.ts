import { Vocabulary } from "@/types/vocabulary";

export async function getAllVocabulary() {
  const res = await fetch("/api/vocabulary");

  if (!res.ok) {
    throw new Error("Failed to fetch vocabularies");
  }

  return (await res.json()) as Vocabulary[];
}

// vocabulary.client.ts

export async function getVocabularyByKanji(
  kanjiId: string
) {
  const res = await fetch(
    `/api/kanji/${kanjiId}/vocabulary`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch vocabularies");
  }

  return (await res.json()) as Vocabulary[];
}

export async function createVocabulary(
  vocabulary: Omit<
    Vocabulary,
    "id" | "user_id" | "created_at" | "updated_at"
  >
) {
  const res = await fetch("/api/vocabulary", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vocabulary),
  });

  if (!res.ok) {
    throw new Error("Failed to create vocabulary");
  }

  return (await res.json()) as Vocabulary;
}

export async function updateVocabulary(
  vocabulary: Vocabulary
) {
  const res = await fetch(`/api/vocabulary/${vocabulary.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vocabulary),
  });

  if (!res.ok) {
    throw new Error("Failed to update vocabulary");
  }

  return (await res.json()) as Vocabulary;
}

export async function deleteVocabulary(id: string) {
  const res = await fetch(`/api/vocabulary/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete vocabulary");
  }
}