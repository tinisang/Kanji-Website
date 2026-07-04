export interface GroupItemUpdate {
  kanjiId: string;
  groupId: string;
  position: number;
}

export async function updateGroupItemsAPI(
  updates: GroupItemUpdate[]
) {
  const response = await fetch(
    "/kanji/api/kanji-group-item/update",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(
        updates
      ),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to update group items"
    );
  }

  return response.json();
}