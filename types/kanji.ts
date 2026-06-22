
export interface Vocabulary {
  word: string;
  reading: string;
  meaning: string;
}

export interface Kanji {
  example: string| null;
  id: string;

  character: string;
  han_viet: string;

  onyomi: string | null;
  kunyomi: string | null;

  vocabularies: Vocabulary[] | null;

  short_description: string | null;
  content: string | null;

  created_at: string;
  updated_at: string;
}

export type CreateKanjiInput = Omit<
  Kanji,
  "id" | "created_at" | "updated_at"
>;