export interface GrammarExpressionExample {
  id: string;
  expression_id: string;

  example: string;
  meaning: string | null;
  note: string | null;

  position: number;

  created_at: string;
  updated_at: string;
}

export type CreateGrammarExpressionExample = Omit<
  GrammarExpressionExample,
  "id" | "position" | "created_at" | "updated_at"
>;

export type UpdateGrammarExpressionExample =
  GrammarExpressionExample;