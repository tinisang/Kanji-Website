import { sql } from "@/lib/db";
import { VocabularyFolder } from "@/app/vocabulary/lib/types/vocabularyFolder";

export async function getAllVocabularyFolderByUserId(
  userId: string
) {
  const rows = await sql`
    SELECT *
    FROM vocabulary_folder
    WHERE user_id = ${userId}
    ORDER BY position;
  `;

  return rows as VocabularyFolder[];
}

export async function getVocabularyFolderById(
  userId: string,
  folderId: string
) {
  const rows = await sql`
    SELECT *
    FROM vocabulary_folder
    WHERE
      id = ${folderId}
      AND user_id = ${userId};
  `;

  return rows[0] as VocabularyFolder | undefined;
}

export async function createVocabularyFolder(
  userId: string,
  folder: Omit<
    VocabularyFolder,
    "id" | "user_id" | "position" | "created_at" | "updated_at"
  >
) {
  const rows = await sql`
    INSERT INTO vocabulary_folder (
      user_id,
      name,
      color,
      position
    )
    VALUES (
      ${userId},
      ${folder.name},
      ${folder.color},
      (
        SELECT COALESCE(MAX(position), -1) + 1
        FROM vocabulary_folder
        WHERE user_id = ${userId}
      )
    )
    RETURNING *;
  `;

  return rows[0] as VocabularyFolder;
}

export async function updateVocabularyFolderById(
  userId: string,
  folder: VocabularyFolder
) {
  const rows = await sql`
    UPDATE vocabulary_folder
    SET
      name = ${folder.name},
      color = ${folder.color},
      updated_at = NOW()
    WHERE
      id = ${folder.id}
      AND user_id = ${userId}
    RETURNING *;
  `;

  return rows[0] as VocabularyFolder;
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
      UPDATE vocabulary_folder
      SET
        position = ${item.position},
        updated_at = NOW()
      WHERE
        id = ${item.id}
        AND user_id = ${userId};
    `;
  }
}

export async function deleteVocabularyFolderById(
  userId: string,
  folderId: string
) {
  await sql`
    DELETE FROM vocabulary_folder
    WHERE
      id = ${folderId}
      AND user_id = ${userId};
  `;
}