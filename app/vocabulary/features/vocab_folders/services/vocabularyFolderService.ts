import * as vocabularyFolderRepository from "@/app/vocabulary/lib/repositories/vocabularyFolderRepository";
import { FolderItem } from "@/app/vocabulary/lib/types/vocabularyFolder";
import { getCurrentUserId } from "@/lib/auth/auth-user";

export async function getAllVocabularyFolder(
 
) {
    const userId = await getCurrentUserId();
  return vocabularyFolderRepository.getAllFolderByType(
    userId,
    "vocabulary"
  );
}

export async function getAllGrammarFolder(
 
) {
    const userId = await getCurrentUserId();
  return vocabularyFolderRepository.getAllFolderByType(
    userId,
    "grammar"
  );
}

export async function getVocabularyFolderById(

  folderId: string
) {
    const userId = await getCurrentUserId();
  return vocabularyFolderRepository.getVocabularyFolderById(
    userId,
    folderId
  );
}

export async function createVocabularyFolder(

  folder: Omit<
    FolderItem,
    "id" | "user_id" | "position" | "created_at" | "updated_at" | "type"
  >
) {
    const userId = await getCurrentUserId();
  return vocabularyFolderRepository.createFolder(
    userId,
    "vocabulary",
    folder
  );
}

export async function createGrammarFolder(

  folder: Omit<
    FolderItem,
    "id" | "user_id" | "position" | "created_at" | "updated_at" | "type"
  >
) {
    const userId = await getCurrentUserId();
  return vocabularyFolderRepository.createFolder(
    userId,
    "grammar",
    folder
  );
}

export async function updateVocabularyFolderById(

  folder: FolderItem
) {
    const userId = await getCurrentUserId();
  return vocabularyFolderRepository.updateFolderById(
    userId,
    folder
  );
}

export async function updateVocabularyFolderPositions(

  positions: {
    id: string;
    position: number;
  }[]
) {
    const userId = await getCurrentUserId();
  return vocabularyFolderRepository.updateVocabularyFolderPositions(
    userId,
    positions
  );
}

export async function deleteVocabularyFolderById(

  folderId: string
) {
    const userId = await getCurrentUserId();
  return vocabularyFolderRepository.deleteFolderById(
    userId,
    folderId
  );
}