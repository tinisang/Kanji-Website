export interface Vocabulary {
  id: string;

  word: string;
  reading: string | null;
  meaning: string | null;

  note: string | null;
need_revision: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateVocabulary {
  word: string;
  reading?: string | null;
  meaning?: string | null;
  note?: string | null;
}

export interface UpdateVocabulary
  extends Partial<CreateVocabulary> {}