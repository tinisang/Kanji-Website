import { sql } from "@/lib/db";
import { KanjiReferenceItem } from "../../types/reference-item";


export async function getKanjiReferenceItemsByUserId(
  userId: string
): Promise<KanjiReferenceItem[]> {
  const result = await sql`
    SELECT kri.*
    FROM kanji_reference_sets kri
    JOIN reference_sets rs
      ON rs.id = kri.reference_set_id
    WHERE rs.user_id = ${userId}
    ORDER BY rs.position;
  `;

  return result as KanjiReferenceItem[];
}

export async function getKanjiReferenceItemById(
  id: string
): Promise<KanjiReferenceItem | null> {
  const result = await sql`
    SELECT *
    FROM kanji_reference_sets
    WHERE id = ${id};
  `;

  return (result as KanjiReferenceItem[])[0] ?? null;
}

export async function createKanjiReferenceItem(
  item: Omit<KanjiReferenceItem, "id" | "created_at">
): Promise<KanjiReferenceItem> {
  const result = await sql`
    INSERT INTO kanji_reference_sets (
      kanji_id,
      reference_set_id,
      note
    )
    VALUES (
      ${item.kanji_id},
      ${item.reference_set_id},
      ${item.note}
    )
    RETURNING *;
  `;

  return (result as KanjiReferenceItem[])[0];
}

export async function updateKanjiReferenceItem(
  item: KanjiReferenceItem
): Promise<KanjiReferenceItem> {
  const result = await sql`
    UPDATE kanji_reference_sets
    SET
      kanji_id = ${item.kanji_id},
      reference_set_id = ${item.reference_set_id},
      note = ${item.note}
    WHERE id = ${item.id}
    RETURNING *;
  `;

  return (result as KanjiReferenceItem[])[0];
}

export async function deleteKanjiReferenceItemById(
  id: string
): Promise<void> {
  await sql`
    DELETE FROM kanji_reference_sets
    WHERE id = ${id};
  `;
}

export async function deleteKanjiReferenceItem(
  kanjiId: string,
  referenceSetId: string
): Promise<void> {
  await sql`
    DELETE FROM kanji_reference_sets
    WHERE kanji_id = ${kanjiId}
      AND reference_set_id = ${referenceSetId};
  `;
}