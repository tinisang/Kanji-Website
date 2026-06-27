import { KanjiReferenceItem } from "@/types/reference-item";

export async function getAllKanjiReferenceItemsAPI() {
  const response = await fetch("/api/reference-item");

  if (!response.ok) {
    throw new Error(
      "Failed to fetch kanji reference items."
    );
  }

  return response.json();
}

export async function addKanjiReferenceItemAPI(
  item: Omit<
    KanjiReferenceItem,
    "id" | "created_at"
  >
) {
  const response = await fetch(
    "/api/reference-item",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(item),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to create kanji reference."
    );
  }

  return response.json();
}

export async function removeKanjiReferenceAPI(
  kanjiId: string,
  referenceSetId: string
) {
  const response = await fetch(
    "/api/reference-item",
    {
      method: "DELETE",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        kanjiId,
        referenceSetId,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to remove kanji reference."
    );
  }

  return response.json();
}

export async function editKanjiReferenceItemAPI(
  item: KanjiReferenceItem
) {
  const response = await fetch(
    "/api/reference-item",
    {
      method: "PUT",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(item),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to update kanji reference item."
    );
  }

  return response.json();
}