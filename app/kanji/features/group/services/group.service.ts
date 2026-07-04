import { auth } from "@/auth";

import {
  createGroup,
  deleteGroupById,
  getAllGroupsByUserId,
  getGroupById,
  getUnclassifiedGroup,
  moveAllItemsToGroup,
  updateGroupName,
  updateGroupPositions,
} from "@/app/kanji/lib/repositories/group.repository";


async function getCurrentUserId() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return session.user.id;
}





export async function getAllGroups() {
  const userId =
    await getCurrentUserId();

  return getAllGroupsByUserId(
    userId
  );
}

export async function createNewGroup() {
  const userId =
    await getCurrentUserId();

  return createGroup(
    userId
  );
}

export async function renameGroup(
  groupId: string,
  name: string
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

  return updateGroupName(
    groupId,
    name
  );
}

export async function reorderGroups(
  updates: {
    groupId: string;
    position: number;
  }[]
) {
  await getCurrentUserId();

  return updateGroupPositions(
    updates
  );
}

export async function deleteGroup(
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

  const unclassifiedGroup =
    await getUnclassifiedGroup(
      userId
    );

  if (!unclassifiedGroup) {
    throw new Error(
      "Unclassified group not found"
    );
  }

  if (
    group.id ===
    unclassifiedGroup.id
  ) {
    throw new Error(
      "Cannot delete Unclassified group"
    );
  }

  await moveAllItemsToGroup(
    groupId,
    unclassifiedGroup.id
  );

  await deleteGroupById(
    groupId
  );
}