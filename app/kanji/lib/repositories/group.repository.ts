import { sql } from "@/lib/db";
import { GroupUpdate, KanjiGroup } from "../../types/group";

export async function getAllGroupsByUserId(
  userId: string
) {
  const rows = await sql`
    SELECT
      id,
      name,
      position
    FROM kanji_group
    WHERE user_id = ${userId}
    ORDER BY position;
  `;

  return rows as KanjiGroup[];
}

export async function getGroupById(
  userId: string,
  groupId: string
) {
  const rows = await sql`
    SELECT *
    FROM kanji_group
    WHERE
      id = ${groupId}
      AND user_id = ${userId}
  `;

  return rows[0] as KanjiGroup | undefined;
}

export async function getMaxGroupPosition(
  userId: string
) {
  const rows = await sql`
    SELECT
      COALESCE(MAX(position), -1)
      AS max_position
    FROM kanji_group
    WHERE
      user_id = ${userId}
      AND name <> 'Unclassified'
  `;

  return Number(
    rows[0]?.max_position ?? -1
  );
}

export async function createGroup(
  userId: string,
  name = "New Group"
) {
  const maxPosition =
    await getMaxGroupPosition(userId);

  const rows = await sql`
    INSERT INTO kanji_group (
      user_id,
      name,
      position
    )
    VALUES (
      ${userId},
      ${name},
      ${maxPosition + 1}
    )
    RETURNING *
  `;

  return rows[0] as KanjiGroup;
}

export async function updateGroupName(
  groupId: string,
  name: string
) {
  const rows = await sql`
    UPDATE kanji_group
    SET name = ${name}
    WHERE id = ${groupId}
    RETURNING *
  `;

  return rows[0] as KanjiGroup;
}

export async function updateGroupPositions(
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

export async function deleteGroupById(
  groupId: string
) {
  await sql`
    DELETE FROM kanji_group
    WHERE id = ${groupId}
  `;
}

export async function getUnclassifiedGroup(
  userId: string
) {
  const rows = await sql`
    SELECT *
    FROM kanji_group
    WHERE
      user_id = ${userId}
      AND name = 'Unclassified'
    LIMIT 1
  `;

  return rows[0];
}

export async function moveAllItemsToGroup(
  sourceGroupId: string,
  targetGroupId: string
) {
  await sql`
    UPDATE kanji_group_item
    SET group_id = ${targetGroupId}
    WHERE group_id = ${sourceGroupId}
  `;
}