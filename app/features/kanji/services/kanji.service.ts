import {
  createKanji,
  deleteKanjiById,
  getAllKanjiByUserId,
  updateKanjiById,
} from "@/lib/repositories/kanji.repository";

import { getGroupById } from "@/lib/repositories/group.repository";

import {
  createGroupItem,
  deleteGroupItemsByKanjiId,
  getMaxPosition,
} from "@/lib/repositories/kanji-group.repository";

import { Kanji } from "@/types/kanji";
import { getCurrentUserId } from "@/lib/auth/auth-user";

export async function getAllKanji() {
  const userId = await getCurrentUserId();
  return getAllKanjiByUserId(userId);
}

export async function updateKanji(kanji: Kanji) {
  const userId = await getCurrentUserId();
  return updateKanjiById(userId, kanji);
}

export async function createKanjiAndAssignGroup(
  kanji: Omit<Kanji, "id" | "created_at" | "updated_at">,
  groupId: string
) {
  const userId = await getCurrentUserId();

  const group = await getGroupById(userId, groupId);

  if (!group) {
    throw new Error("Group not found");
  }

  const newKanji = await createKanji(userId, kanji);

  const maxPosition = await getMaxPosition(groupId);

  await createGroupItem(
    newKanji.id,
    groupId,
    maxPosition + 1
  );

  return newKanji;
}

export async function deleteKanji(kanjiId: string) {
  const userId = await getCurrentUserId();

  await deleteGroupItemsByKanjiId(kanjiId);

  await deleteKanjiById(userId, kanjiId);
}