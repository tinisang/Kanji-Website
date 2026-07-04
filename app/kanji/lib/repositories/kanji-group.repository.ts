import { sql } from "@/lib/db";

export interface GroupItemUpdate {
  kanjiId: string;
  groupId: string;
  position: number;
}

export async function getItemsByGroupId(
  groupId: string
) {
  const rows = await sql`
    SELECT *
    FROM kanji_group_item
    WHERE group_id = ${groupId}
    ORDER BY position;
  `;

  return rows;
}

export async function getAllGroupItemsByUserId(
  userId: string
) {
  const rows = await sql`
    SELECT
      kgi.*
    FROM kanji_group_item kgi
    INNER JOIN kanji_group kg
      ON kg.id = kgi.group_id
    WHERE kg.user_id = ${userId}
    ORDER BY
      kgi.group_id,
      kgi.position;
  `;

  return rows;
}

export async function getGroupItemByKanjiId(
  kanjiId: string
) {
  const rows = await sql`
    SELECT *
    FROM kanji_group_item
    WHERE kanji_id = ${kanjiId}
    LIMIT 1;
  `;

  return rows[0];
}

export async function getMaxPosition(
  groupId: string
) {
  const [result] = await sql`
    SELECT
      COALESCE(MAX(position), -1)
      AS max_position
    FROM kanji_group_item
    WHERE group_id = ${groupId};
  `;

  return Number(
    result?.max_position ?? -1
  );
}

export async function createGroupItem(
  kanjiId: string,
  groupId: string,
  position: number
) {
  const [item] = await sql`
    INSERT INTO kanji_group_item (
      kanji_id,
      group_id,
      position
    )
    VALUES (
      ${kanjiId},
      ${groupId},
      ${position}
    )
    RETURNING *;
  `;

  return item;
}

export async function updateGroupItem(
  kanjiId: string,
  groupId: string,
  position: number
) {
  const [item] = await sql`
    UPDATE kanji_group_item
    SET
      group_id = ${groupId},
      position = ${position}
    WHERE kanji_id = ${kanjiId}
    RETURNING *;
  `;

  return item;
}

export async function updateGroupItems(
  updates: GroupItemUpdate[]
) {
  for (const item of updates) {
    await sql`
      UPDATE kanji_group_item
      SET
        group_id = ${item.groupId},
        position = ${item.position}
      WHERE kanji_id = ${item.kanjiId};
    `;
  }
}

export async function deleteGroupItem(
  kanjiId: string
) {
  await sql`
    DELETE FROM kanji_group_item
    WHERE kanji_id = ${kanjiId};
  `;
}

export async function deleteGroupItemsByKanjiId(
  kanjiId: string
) {
  await sql`
    DELETE FROM kanji_group_item
    WHERE kanji_id = ${kanjiId};
  `;
}

export async function deleteGroupItemsByGroupId(
  groupId: string
) {
  await sql`
    DELETE FROM kanji_group_item
    WHERE group_id = ${groupId};
  `;
}

export async function moveGroupItems(
  fromGroupId: string,
  toGroupId: string
) {
  await sql`
    UPDATE kanji_group_item
    SET group_id = ${toGroupId}
    WHERE group_id = ${fromGroupId};
  `;
}