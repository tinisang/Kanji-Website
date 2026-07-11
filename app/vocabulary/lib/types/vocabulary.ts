export interface Vocabulary {
  id: string;

  word: string;
  reading: string;

  meaning: string;
  description: string;
  note: string;

  need_revision: boolean;

  created_at: string;
  updated_at: string;
}