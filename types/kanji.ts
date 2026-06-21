import  {  Kanji } from "@/lib/kanji";


export async function createKanji(
  kanji: Partial<Kanji>,
  groupId: string
) {
  console.log("yo")
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