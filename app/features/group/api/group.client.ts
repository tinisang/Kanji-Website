export async function createGroupAPI() {
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

import { GroupUpdate } from "@/types/group";

export async function updateGroupsAPI(
  updates: GroupUpdate[]
) {
  const response = await fetch(
    "/api/kanji-group/update",
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
      "Failed to update groups"
    );
  }

  return response.json();
}