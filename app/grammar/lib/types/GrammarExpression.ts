export interface GrammarExpression {
  id: string;

  grammar_id: string;

  label: string | null;

  pattern: string;

  meaning: string | null;

  note: string | null;

  position: number;

  created_at: string;
  updated_at: string;
}