import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

type GroupUpdate = {
  groupId: string;
  position: number;
};

export async function updateKanjiGroups(
  updates: GroupUpdate[]
) {
  for (const group of updates) {
    await sql`
      UPDATE kanji_group
      SET position = ${group.position + 1}
      WHERE id = ${group.groupId}
    `;
  }
}