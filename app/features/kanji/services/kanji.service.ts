import { auth } from "@/auth";

import {
  createKanji,
  deleteKanjiById,
  getAllKanjiByUserId,
  updateKanjiById,
} from "@/lib/repositories/kanji.repository";

import {
  getGroupById,
} from "@/lib/repositories/group.repository";

import {
  createGroupItem,
  deleteGroupItemsByKanjiId,
  getMaxPosition,
} from "@/lib/repositories/kanji-group.repository";

import { Kanji } from "@/types/kanji";

export async function getAllKanji() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return getAllKanjiByUserId(
    session.user.id
  );
}

export async function updateKanji(
  kanji: Kanji
) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return updateKanjiById(
    session.user.id,
    kanji
  );
}

export async function createKanjiAndAssignGroup(
  kanji: Omit<
    Kanji,
    "id" | "created_at" | "updated_at"
  >,
  groupId: string
) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;

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

  const newKanji =
    await createKanji(
      userId,
      kanji
    );

  const maxPosition =
    await getMaxPosition(
      groupId
    );

  await createGroupItem(
    newKanji.id,
    groupId,
    maxPosition + 1
  );

  return newKanji;
}

export async function deleteKanji(
  kanjiId: string
) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  await deleteGroupItemsByKanjiId(
    kanjiId
  );

  await deleteKanjiById(
    session.user.id,
    kanjiId
  );
}