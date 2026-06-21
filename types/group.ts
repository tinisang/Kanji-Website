export interface KanjiGroup {
  id: string;
  name: string;
  description: string | null;
  position: number;
}

export async function createGroup() {
  const response = await fetch(
    "/api/kanji-group/create",
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to create group"
    );
  }

  return response.json();
}