import { ExpressionExample } from "./expressionExample";
import { VocabularyExpression } from "./vocabularyExpression";

export interface Usage {
  expression: VocabularyExpression;
  examples: Record<string, ExpressionExample>;
}