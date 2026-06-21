import { auth } from "@/auth";
import { sql } from "./db";

export async function getAllGroups() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const rows = await sql`
    SELECT
      id,
      name,
      position
    FROM kanji_group
    WHERE user_id = ${session.user.id}
    ORDER BY position;
  `;

  return rows as KanjiGroup[];
}



export async function createGroup() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const [{ max_position }] = await sql`
    SELECT
      COALESCE(MAX(position), -1) AS max_position
    FROM kanji_group
    WHERE
      user_id = ${session.user.id}
      AND name <> 'Unclassified'
  `;

  const [newGroup] = await sql`
    INSERT INTO kanji_group (
      user_id,
      name,
      position
    )
    VALUES (
      ${session.user.id},
      'New Group',
      ${Number(max_position) + 1}
    )
    RETURNING *
  `;

  return newGroup as KanjiGroup;
}

  export interface KanjiGroup {
  id: string;
  name: string;
  position: number;
  }