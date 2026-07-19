export interface Vocabulary {
  id: string;

  word: string;
  reading: string;

  user_id: string;
  meaning: string;
  note: string | null;

  need_revision: boolean;

  created_at: string;
  updated_at: string;
}