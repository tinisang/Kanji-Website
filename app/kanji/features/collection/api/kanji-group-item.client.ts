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


export async function removeKanjiFromGroupAPI(
  kanjiId: string,
  groupId: string
) {
  const response = await fetch(
    "/kanji/api/kanji-group-item/remove",
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        kanjiId,
        groupId,
      }),
    }
  );

  if (!response.ok) {
    const data = await response.json();

    throw new Error(
      data.error ||
        "Failed to remove kanji from group"
    );
  }

  return response.json();
}