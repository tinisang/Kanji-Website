import { sql } from "@/lib/db";
import { FolderItem } from "@/app/vocabulary/lib/types/vocabularyFolder";
import { FolderType } from "@/lib/FolderType";

export async function getAllFolderByType(
  userId: string,
  type: FolderType
) {
  const rows = await sql`
    SELECT *
    FROM folders
    WHERE
      user_id = ${userId}
      AND type = ${type}
    ORDER BY position;
  `;

  return rows as FolderItem[];
}
export async function getVocabularyFolderById(
  userId: string,
  folderId: string
) {
  const rows = await sql`
    SELECT *
    FROM folders
    WHERE
      id = ${folderId}
      AND user_id = ${userId};
  `;

  return rows[0] as FolderItem | undefined;
}

export async function createFolder(
  userId: string,
  type: string,
  folder: Omit<
    FolderItem,
    "id" | "user_id" | "position" | "created_at" | "updated_at" | "type"
  >
) {
  const rows = await sql`
    INSERT INTO folders (
      user_id,
      name,
      color,
      position,
      type
    )
    VALUES (
      ${userId},
      ${folder.name},
      ${folder.color},
      (
        SELECT COALESCE(MAX(position), -1) + 1
        FROM folders
        WHERE user_id = ${userId}
          AND type = ${type}
      ),
      ${type}
    )
    RETURNING *;
  `;

  return rows[0] as FolderItem;
}

export async function updateFolderById(
  userId: string,
  folder: FolderItem
) {
  const rows = await sql`
    UPDATE folders
    SET
      name = ${folder.name},
      color = ${folder.color},
      parent_id = ${folder.parent_id},
      updated_at = NOW()
    WHERE
      id = ${folder.id}
      AND user_id = ${userId}
    RETURNING *;
  `;

  return rows[0] as FolderItem;
}

 export async function updateVocabularyFolderPositions(
  userId: string,
  positions: {
    id: string;
    position: number;
  }[]
) {
  for (const item of positions) {
    await sql`
      UPDATE folders
      SET
        position = ${item.position},
        updated_at = NOW()
      WHERE
        id = ${item.id}
        AND user_id = ${userId};
    `;
  }
}

export async function deleteFolderById(
  userId: string,
  folderId: string
) {
  await sql`
    DELETE FROM folders
    WHERE
      id = ${folderId}
      AND user_id = ${userId};
  `;
}