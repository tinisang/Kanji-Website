import { sql } from "@/lib/db";
import { VocabularyFolderItem } from "@/app/vocabulary/lib/types/vocabularyFolderItem";

export async function getAllVocabularyFolderItem() {
  const rows = await sql`
    SELECT *
    FROM vocabulary_folder_item
    ORDER BY position;
  `;

  return rows as VocabularyFolderItem[];
}

export async function createVocabularyFolderItem(
  item: Omit<
    VocabularyFolderItem,
    "position" | "created_at"
  >
) {
  const rows = await sql`
    INSERT INTO vocabulary_folder_item (
      vocabulary_id,
      folder_id,
      position
    )
    VALUES (
      ${item.vocabulary_id},
      ${item.folder_id},
      (
        SELECT COALESCE(MAX(position), -1) + 1
        FROM vocabulary_folder_item
        WHERE folder_id = ${item.folder_id}
      )
    )
    RETURNING *;
  `;

  return rows[0] as VocabularyFolderItem;
}

export async function updateVocabularyFolderItemPosition(
  items: {
    vocabulary_id: string;
    folder_id: string;
    position: number;
  }[]
) {
  await Promise.all(
    items.map((item) =>
      sql`
        UPDATE vocabulary_folder_item
        SET position = ${item.position}
        WHERE
          vocabulary_id = ${item.vocabulary_id}
          AND folder_id = ${item.folder_id};
      `
    )
  );
}

export async function deleteVocabularyFolderItem(
  vocabularyId: string,
  folderId: string
) {
  await sql`
    DELETE FROM vocabulary_folder_item
    WHERE
      vocabulary_id = ${vocabularyId}
      AND folder_id = ${folderId};
  `;
}