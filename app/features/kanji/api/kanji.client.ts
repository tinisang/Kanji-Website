import { CreateKanjiInput } from "@/types/kanji";

export async function createKanjiAndAssignGroupAPI(
  kanji: CreateKanjiInput,
  groupId: string
) {
  const response = await fetch(
    "/api/kanji/create",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        kanji,
        groupId,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to create kanji"
    );
  }

  return response.json();
}

export async function deleteKanjiAPI(
  kanjiId: string
) {
  const response = await fetch(
    "/api/kanji/delete",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        kanjiId,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to delete kanji"
    );
  }

  return response.json();
}