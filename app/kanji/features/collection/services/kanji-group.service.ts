import { auth } from "@/auth";

import {
  createGroupItem,
  deleteGroupItem,
  getAllGroupItemsByUserId,
  getGroupItemByKanjiId,
  getMaxPosition,
  updateGroupItems,
} from "@/app/kanji/lib/repositories/kanji-group.repository";

import {
  getGroupById,
} from "@/app/kanji/lib/repositories/group.repository";

import { GroupItemUpdate } from "@/app/kanji/lib/repositories/kanji-group.repository";

async function getCurrentUserId() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return session.user.id;
}

export async function getAllGroupItems() {
  const userId =
    await getCurrentUserId();

  return getAllGroupItemsByUserId(
    userId
  );
}

export async function addKanjiToGroup(
  kanjiId: string,
  groupId: string
) {
  const userId =
    await getCurrentUserId();

  const group =
    await getGroupById(
      userId,
      groupId
    );

  if (!group) {
    throw new Error(
      "Group not found"
    );
  }

  const maxPosition =
    await getMaxPosition(
      groupId
    );

  return createGroupItem(
    kanjiId,
    groupId,
    maxPosition + 1
  );
}

export async function reorderGroupItems(
  updates: GroupItemUpdate[]
) {
  const userId =
    await getCurrentUserId();

  const groupIds = [
    ...new Set(
      updates.map(
        (item) => item.groupId
      )
    ),
  ];

  
  for (const groupId of groupIds) {
    const group =
      await getGroupById(
        userId,
        groupId
      );

    if (!group) {
      throw new Error(
        "Group not found"
      );
    }
  }

  await updateGroupItems(
    updates
  );
}

export async function moveKanjiToGroup(
  kanjiId: string,
  targetGroupId: string
) {
  const userId =
    await getCurrentUserId();

  const group =
    await getGroupById(
      userId,
      targetGroupId
    );

  if (!group) {
    throw new Error(
      "Group not found"
    );
  }

  const item =
    await getGroupItemByKanjiId(
      kanjiId
    );

  if (!item) {
    throw new Error(
      "Group item not found"
    );
  }

  const maxPosition =
    await getMaxPosition(
      targetGroupId
    );

  await updateGroupItems([
    {
      kanjiId,
      groupId: targetGroupId,
      position: maxPosition + 1,
    },
  ]);
}

export async function removeKanjiFromGroup(
  kanjiId: string
) {
  const item =
    await getGroupItemByKanjiId(
      kanjiId
    );

  if (!item) {
    throw new Error(
      "Group item not found"
    );
  }

  await deleteGroupItem(
    kanjiId
  );
}