

import {
  createFolder,
  deleteFolderById,
  getAllFolderByType,

  updateFolderById,

} from "@/app/vocabulary/lib/repositories/vocabularyFolderRepository";
import { FolderItem } from "@/app/vocabulary/lib/types/vocabularyFolder";
import { FolderType } from "@/lib/FolderType";

const TYPE: FolderType = "grammar";

export async function getAllGrammarFolderByUserId(
  userId: string
) {
  return getAllFolderByType(
    userId,
    TYPE
  );
}



export async function createGrammarFolder(
  userId: string,
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
  return createFolder(
    userId,
    TYPE,
       folder,
   
  );
}

export async function updateGrammarFolderById(
  userId: string,
  folder: FolderItem
) {
  return updateFolderById(
    userId,
    {
      ...folder,
      type: TYPE,
    }
  );
}


export async function deleteGrammarFolderById(
  userId: string,
  folderId: string
) {
  return deleteFolderById(
    userId,
    folderId,
  );
}