import { sql } from "@/lib/db";
import { getCurrentUserId } from "@/lib/auth/auth-user";

import { GrammarFolderItem, UpdateGrammarFolderItem } from "../../lib/types/GrammarFolderItem";

export async function getAllGrammarFolderItem(): Promise<
  GrammarFolderItem[]
> {
  const userId =
    await getCurrentUserId();

  const rows = await sql`
    SELECT
      gfi.*
    FROM grammar_folder_item gfi
    INNER JOIN grammar g
      ON g.id = gfi.grammar_id
    WHERE g.user_id = ${userId}
    ORDER BY gfi.position;
  `;

  return rows as GrammarFolderItem[];
}
export async function createGrammarFolderItem(
  item: Pick<
    GrammarFolderItem,
    "grammar_id" | "folder_id"
  >
): Promise<GrammarFolderItem> {
  const rows = await sql`
    INSERT INTO grammar_folder_item (
      grammar_id,
      folder_id,
      position
    )
    VALUES (
      ${item.grammar_id},
      ${item.folder_id},
      (
        SELECT COALESCE(MAX(position), -1) + 1
        FROM grammar_folder_item
        WHERE folder_id = ${item.folder_id}
      )
    )
    RETURNING *;
  `;

  return rows[0] as GrammarFolderItem;
}
export async function updateGrammarFolderItem(
  item: UpdateGrammarFolderItem
): Promise<GrammarFolderItem> {
  const rows = await sql`
    UPDATE grammar_folder_item
    SET
      folder_id = ${item.folder_id},
      position = ${item.position}
    WHERE grammar_id = ${item.grammar_id}
    RETURNING *;
  `;

  return rows[0] as GrammarFolderItem;
}

export async function updateGrammarFolderItems(
  items: UpdateGrammarFolderItem[]
): Promise<void> {
  for (const item of items) {
    await updateGrammarFolderItem(item);
  }
}
export async function deleteGrammarFolderItem(
  grammarId: string
): Promise<void> {
  await sql`
    DELETE FROM grammar_folder_item
    WHERE grammar_id = ${grammarId};
  `;
}