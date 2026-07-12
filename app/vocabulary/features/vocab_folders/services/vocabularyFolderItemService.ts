import * as vocabularyFolderItemRepository from "@/app/vocabulary/lib/repositories/vocabularyFolderItemRepository";
import { VocabularyFolderItem } from "@/app/vocabulary/lib/types/vocabularyFolderItem";

export async function getAllVocabularyFolderItem() {
  return vocabularyFolderItemRepository.getAllVocabularyFolderItem();
}

export async function createVocabularyFolderItem(
  item: Omit<
    VocabularyFolderItem,
    "position" | "created_at"
  >
) {
  return vocabularyFolderItemRepository.createVocabularyFolderItem(
    item
  );
}

export async function updateVocabularyFolderItemPosition(
  items: {
    vocabulary_id: string;
    folder_id: string;
    position: number;
  }[]
) {
  return vocabularyFolderItemRepository.updateVocabularyFolderItemPosition(
    items
  );
}

export async function deleteVocabularyFolderItem(
  vocabularyId: string,
  folderId: string
) {
  return vocabularyFolderItemRepository.deleteVocabularyFolderItem(
    vocabularyId,
    folderId
  );
}