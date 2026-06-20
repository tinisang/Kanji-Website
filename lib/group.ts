import { sql } from "./db";

export async function getAllGroups() {
  const rows = await sql`
    SELECT
      id,
      name,
      position
    FROM kanji_group
    ORDER BY position;
  `;

  return rows as KanjiGroup[];
}

export interface KanjiGroup {
  id: string;
  name: string;
  position: number;
}