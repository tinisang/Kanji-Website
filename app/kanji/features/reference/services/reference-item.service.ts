import { auth } from "@/auth";
import { getCurrentUserId } from "@/lib/auth/auth-user";
import {
  createKanjiReferenceItem,
  deleteKanjiReferenceItem,
  deleteKanjiReferenceItemById,
  getKanjiReferenceItemById,
  getKanjiReferenceItemsByUserId,
  updateKanjiReferenceItem,
} from "@/app/kanji/lib/repositories/reference-item.repository";
import { KanjiReferenceItem } from "@/app/kanji/types/reference-item";


export async function getAllKanjiReferenceItems() {
  const userId = await getCurrentUserId();
  return getKanjiReferenceItemsByUserId(userId);
}

export async function getKanjiReferenceItem(id: string) {
  return getKanjiReferenceItemById(id);
}

export async function addKanjiReferenceItem(
  item: Omit<KanjiReferenceItem, "id" | "created_at">
) {
  return createKanjiReferenceItem(item);
}

export async function editKanjiReferenceItem(
  item: KanjiReferenceItem
) {
  return updateKanjiReferenceItem(item);
}

export async function removeKanjiReferenceItem(id: string) {
  return deleteKanjiReferenceItemById(id);
}

export async function removeKanjiReference(
  kanjiId: string,
  referenceSetId: string
) {
  return deleteKanjiReferenceItem(
    kanjiId,
    referenceSetId
  );
}