import { sql } from './db';
import { Kanji } from './kanji';

export async function getGroupsWithKanjis() {
  const rows = await sql`
    SELECT
      kg.id,
      kg.position,

      json_agg(
        json_build_object(
          'id', k.id,
          'character', k.character,
          'han_viet', k.han_viet,
          'example', k.example,
          'short_description', k.short_description
        )
        ORDER BY kgi.position
      ) FILTER (WHERE k.id IS NOT NULL)
      AS kanjis

    FROM kanji_group kg

    LEFT JOIN kanji_group_item kgi
      ON kgi.group_id = kg.id

    LEFT JOIN kanji k
      ON k.id = kgi.kanji_id

    GROUP BY
      kg.id,
      kg.position

    ORDER BY
      kg.position
  `;

  return rows as KanjiGroupProps[];
}

export interface KanjiGroupProps {
  id: string;
  position: number;

  kanjis: Kanji[];
}