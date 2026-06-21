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


export async function createGroup() {
  const [{ max_position }] = await sql`
    SELECT
      COALESCE(MAX(position), -1) AS max_position
    FROM kanji_group
    WHERE name <> 'Unclassified'
  `;

  const [newGroup] = await sql`
    INSERT INTO kanji_group (
      name,
      position
    )
    VALUES (
      'New Group',
      ${Number(max_position) + 1}
    )
    RETURNING *
  `;

  return newGroup as KanjiGroup;
}