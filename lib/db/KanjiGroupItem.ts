import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

type GroupItems = Record<string, string[]>;

export async function updateKanjiGroupItems(items: GroupItems) {
  for (const [groupId, kanjiIds] of Object.entries(items)) {
    for (const [position, kanjiId] of kanjiIds.entries()) {
      await sql`
        UPDATE kanji_group_item
        SET
          group_id = ${groupId},
          position = ${position}
        WHERE kanji_id = ${kanjiId}
      `;
    }
  }
}