import * as vocabularyFolderRepository from "@/app/vocabulary/lib/repositories/vocabularyFolderRepository";
import { VocabularyFolder } from "@/app/vocabulary/lib/types/vocabularyFolder";
import { getCurrentUserId } from "@/lib/auth/auth-user";

export async function getAllVocabularyFolder(
 
) {
    const userId = await getCurrentUserId();
  return vocabularyFolderRepository.getAllVocabularyFolderByUserId(
    userId
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
    VocabularyFolder,
    "id" | "user_id" | "position" | "created_at" | "updated_at"
  >
) {
    const userId = await getCurrentUserId();
  return vocabularyFolderRepository.createVocabularyFolder(
    userId,
    folder
  );
}

export async function updateVocabularyFolderById(

  folder: VocabularyFolder
) {
    const userId = await getCurrentUserId();
  return vocabularyFolderRepository.updateVocabularyFolderById(
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
  return vocabularyFolderRepository.deleteVocabularyFolderById(
    userId,
    folderId
  );
}