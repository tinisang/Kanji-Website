import { sql } from "./db";

export async function getUnclassifiedKanji() {
  const rows = await sql`
    SELECT DISTINCT
      k.id,
      k.character,
      k.han_viet,
      k.example,
      k.short_description
    FROM kanji k
    LEFT JOIN kanji_group_item kgi
      ON k.id = kgi.kanji_id
    WHERE kgi.kanji_id IS NULL
    ORDER BY k.character;
  `;

  return rows as Kanji[];
}

export interface Kanji {
  id: string;
  character: string;
  han_viet: string;
  example: string;
  short_description: string;
}