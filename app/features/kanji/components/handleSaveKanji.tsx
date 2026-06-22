import { Kanji } from "@/lib/repositories/kanji.repository";

export async function handleSaveKanji(kanji: Kanji) {
  const response = await fetch(
    "/api/kanji/update",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(kanji),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Update failed"
    );
  }

  return response.json();
}