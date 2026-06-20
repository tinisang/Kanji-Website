import { sql } from "./db";

export async function getAllKanjiGroupItems() {
  const rows = await sql`
    SELECT
      group_id,
      kanji_id,
      position
    FROM kanji_group_item
    ORDER BY group_id, position;
  `;

  return rows as KanjiGroupItem[];
}

export interface KanjiGroupItem {
  group_id: string;
  kanji_id: string;
  position: number;
}