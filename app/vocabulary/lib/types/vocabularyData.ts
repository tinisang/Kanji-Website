import { ExpressionExample } from "./expressionExample";
import { VocabularyExpression } from "./vocabularyExpression";
import { Vocabulary } from "./vocabulary";
import { VocabularyFolder } from "./vocabularyFolder";
import { VocabularyFolderItem } from "./vocabularyFolderItem";
export interface VocabularyData {
  items: Record<string, VocabularyItem>;
  folders: Record<string, VocabularyFolder>;
  folder_items: Record<
    string,
    Record<string, VocabularyFolderItem>
  >;
}

export interface VocabularyItem {
  vocabulary: Vocabulary;
  expressions: Record<string, ExpressionItem>;
}

export interface ExpressionItem {
  expression: VocabularyExpression;
  examples: Record<string, ExpressionExample>;
}