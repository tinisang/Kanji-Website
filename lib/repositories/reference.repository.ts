import { sql } from "@/lib/db";
import { ReferenceSet } from "@/types/reference";

export async function getAllReferenceSetsByUserId(
  userId: string
) {
  const rows = await sql`
    SELECT *
    FROM reference_sets
    WHERE user_id = ${userId}
    ORDER BY position;
  `;

  return rows as ReferenceSet[];
}

export async function getReferenceSetById(
  userId: string,
  referenceSetId: string
) {
  const rows = await sql`
    SELECT *
    FROM reference_sets
    WHERE
      id = ${referenceSetId}
      AND user_id = ${userId};
  `;

  return rows[0] as ReferenceSet | undefined;
}

export async function getMaxReferenceSetPosition(
  userId: string
) {
  const rows = await sql`
    SELECT COALESCE(MAX(position), -1) AS position
    FROM reference_sets
    WHERE user_id = ${userId};
  `;

  return Number(rows[0].position);
}

export async function createReferenceSet(
  userId: string,
  referenceSet: Omit<
    ReferenceSet,
    "id" | "user_id" | "position" | "created_at" | "updated_at"
  >
) {
  const position =
    (await getMaxReferenceSetPosition(userId)) + 1;

  const rows = await sql`
    INSERT INTO reference_sets (
      user_id,
      name,
      description,
      color,
      position
    )
    VALUES (
      ${userId},
      ${referenceSet.name},
      ${referenceSet.description ?? ""},
      ${referenceSet.color ?? "#A1CE1C"},
      ${position}
    )
    RETURNING *;
  `;

  return rows[0] as ReferenceSet;
}

export async function updateReferenceSetById(
  userId: string,
  referenceSet: ReferenceSet
) {
  const rows = await sql`
    UPDATE reference_sets
    SET
      name = ${referenceSet.name},
      description = ${referenceSet.description},
      color = ${referenceSet.color},
      updated_at = NOW()
    WHERE
      id = ${referenceSet.id}
      AND user_id = ${userId}
    RETURNING *;
  `;

  return rows[0] as ReferenceSet;
}

export async function deleteReferenceSetById(
  userId: string,
  referenceSetId: string
) {
  await sql`
    DELETE FROM reference_sets
    WHERE
      id = ${referenceSetId}
      AND user_id = ${userId};
  `;
}