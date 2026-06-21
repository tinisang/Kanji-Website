'use server';

import { deleteKanji } from "@/lib/kanji";

export async function handleDeleteKanji(
  kanjiId: string
) {
  await deleteKanji(kanjiId);
}