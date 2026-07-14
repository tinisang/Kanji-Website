import { FolderItem } from "@/app/vocabulary/lib/types/vocabularyFolder";

export async function getAllVocabularyFolder() {
  const response = await fetch("/vocabulary/api/folder");

  if (!response.ok) {
    throw new Error("Failed to fetch vocabulary folders");
  }

  return (await response.json()) as FolderItem[];
}

export async function createVocabularyFolder(
  folder: Omit<
    FolderItem,
    "id" | "user_id" | "position" | "created_at" | "updated_at"
  >
) {
  const response = await fetch(
    "/vocabulary/api/folder",
    {
      method: "POST",
      body: JSON.stringify(folder),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create vocabulary folder");
  }

  return (await response.json()) as FolderItem;
}

export async function updateVocabularyFolder(
  folder: FolderItem
) {
  const response = await fetch(
    `/vocabulary/api/folder/${folder.id}`,
    {
      method: "PATCH",
      body: JSON.stringify(folder),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update vocabulary folder");
  }

  return (await response.json()) as FolderItem;
}

export async function updateVocabularyFolderPositions(
  positions: {
    id: string;
    position: number;
  }[]
) {
  const response = await fetch(
    "/vocabulary/api/folder/position",
    {
      method: "PATCH",
      body: JSON.stringify(positions),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to update vocabulary folder positions"
    );
  }
}

export async function deleteVocabularyFolder(
  folderId: string
) {
  const response = await fetch(
    `/vocabulary/api/folder/${folderId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete vocabulary folder");
  }
}