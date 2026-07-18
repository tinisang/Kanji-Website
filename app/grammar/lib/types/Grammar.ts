export interface Grammar {
  id: string;

  title: string;

  short_description: string | null;
  content: string | null;

  learned: boolean;

  position: number,
  created_at: string;
  updated_at: string;
}