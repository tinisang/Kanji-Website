import { VocabularyFolderItem } from "@/app/vocabulary/lib/types/vocabularyFolderItem";

export async function getAllVocabularyFolderItem() {
  const response = await fetch(
    "/vocabulary/api/folder-item"
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch vocabulary folder items"
    );
  }

  return (await response.json()) as VocabularyFolderItem[];
}

export async function createVocabularyFolderItem(
  item: Omit<
    VocabularyFolderItem,
    "position" | "created_at"
  >
) {
  const response = await fetch(
    "/vocabulary/api/folder-item",
    {
      method: "POST",
      body: JSON.stringify(item),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to create vocabulary folder item"
    );
  }

  return (await response.json()) as VocabularyFolderItem;
}

export async function updateVocabularyFolderItemPosition(
  items: {
    vocabulary_id: string;
    folder_id: string;
    position: number;
  }[]
) {
  const response = await fetch(
    "/vocabulary/api/folder-item/position",
    {
      method: "PATCH",
      body: JSON.stringify(items),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to update vocabulary folder item positions"
    );
  }
}

export async function deleteVocabularyFolderItem(
  vocabularyId: string,
  folderId: string
) {
  const response = await fetch(
    `/vocabulary/api/folder-item/${folderId}/${vocabularyId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to delete vocabulary folder item"
    );
  }
}