import { ExpressionExample } from "./expressionExample";
import { VocabularyExpression } from "./vocabularyExpression";
import { Vocabulary } from "./vocabulary";
export interface VocabularyData {
  items: Record<string, VocabularyItem>;
}

export interface VocabularyItem {
  vocabulary: Vocabulary;
  expressions: Record<string, ExpressionItem>;
}

export interface ExpressionItem {
  expression: VocabularyExpression;
  examples: Record<string, ExpressionExample>;
}