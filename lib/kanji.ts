import { sql } from './db';

export async function getUnclassifiedKanji() {
  const rows = await sql`
    SELECT
      id,
      character,
      han_viet,
      example,
      short_description
    FROM kanji
    WHERE status = FALSE
    ORDER BY character
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