import { FolderItem } from "@/app/vocabulary/lib/types/vocabularyFolder";

export async function getAllGrammarFolder() {
  const response = await fetch(
    "/grammar/api/folder"
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch grammar folders"
    );
  }

  return (await response.json()) as FolderItem[];
}

export async function createGrammarFolder(
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
  const response = await fetch(
    "/grammar/api/folder",
    {
      method: "POST",
      body: JSON.stringify(folder),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to create grammar folder"
    );
  }

  return (await response.json()) as FolderItem;
}

export async function updateGrammarFolder(
  folder: FolderItem
) {
  const response = await fetch(
    `/grammar/api/folder/${folder.id}`,
    {
      method: "PATCH",
      body: JSON.stringify(folder),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to update grammar folder"
    );
  }

  return (await response.json()) as FolderItem;
}

export async function deleteGrammarFolder(
  folderId: string
) {
  const response = await fetch(
    `/grammar/api/folder/${folderId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to delete grammar folder"
    );
  }
}