import { createGrammarFolder, deleteGrammarFolderById, getAllGrammarFolderByUserId, updateGrammarFolderById } from "@/app/grammar/lib/repositories/grammarFolderRepositoriy";
import { FolderItem } from "@/app/vocabulary/lib/types/vocabularyFolder";



import { getCurrentUserId } from "@/lib/auth/auth-user";

export async function getAllGrammarFolder() {
  const userId =
    await getCurrentUserId();

  return getAllGrammarFolderByUserId(
    userId
  );
}

export async function createGrammarFolderService(
  folder: Omit<
    FolderItem,
    | "id"
    | "user_id"
    | "position"
    | "created_at"
    | "updated_at"
    | "type"
  >
) {
  const userId =
    await getCurrentUserId();

  return createGrammarFolder(
    userId,
    folder
  );
}

export async function updateGrammarFolderService(
  folder: FolderItem
) {
  const userId =
    await getCurrentUserId();

  return updateGrammarFolderById(
    userId,
    folder
  );
}

export async function deleteGrammarFolderService(
  folderId: string
) {
  const userId =
    await getCurrentUserId();

  return deleteGrammarFolderById(
    userId,
    folderId
  );
}