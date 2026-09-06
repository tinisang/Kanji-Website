export async function createGroupAPI() {
  const response = await fetch(
    "/kanji/api/kanji-group/create",
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

import { GroupUpdate } from "@/app/kanji/types/group";

export async function updateGroupsAPI(
  updates: GroupUpdate[]
) {
  const response = await fetch(
    "/kanji/api/kanji-group/update",
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

// group.client.ts

export async function deleteGroupAPI(
  groupId: string
) {
  await fetch(
  "/kanji/api/kanji-group/delete",
  {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      groupId,
    }),
  }
);
}

export async function moveGroupToTopAPI(
  groupId: string
) {
  const response = await fetch(
    "/kanji/api/kanji-group/move-to-top",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        groupId,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to move group to top"
    );
  }

  return response.json();
}

export async function getGroupByKanjiIdAPI(
  kanjiId: string
) {
  const response = await fetch(
    `/kanji/api/kanji-group/kanji/${kanjiId}`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch group by kanji"
    );
  }

  return response.json();
}

export async function getKanjisByGroupIdAPI(
  groupId: string
) {
  const response = await fetch(
    `/kanji/api/kanji-group/group/${groupId}`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch kanjis by group"
    );
  }

  return response.json();
}