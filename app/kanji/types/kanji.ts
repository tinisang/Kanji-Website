
export interface Vocabulary {
  word: string;
  reading: string;
  meaning: string;
}
export interface Kanji {
  id: string;

  character: string;
  han_viet: string;

  onyomi: string | null;
  kunyomi: string | null;

  example: string | null;

  vocabularies: Vocabulary[] | null;

  short_description: string | null;
  content: string | null;

  learned: boolean;
 

  created_at: string;
  updated_at: string;
}

export type CreateKanjiInput = Omit<
  Kanji,
  "id" | "created_at" | "updated_at"
>;