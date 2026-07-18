import { ExpressionExample } from "@/app/vocabulary/lib/types/expressionExample";
import { Grammar } from "./Grammar";
import { GrammarExpression } from "./GrammarExpression";
import { FolderItem } from "@/app/vocabulary/lib/types/vocabularyFolder";
import { GrammarFolderItem } from "./GrammarFolderItem";
import { GrammarExpressionExample } from "./GrammarExpressionExample ";


export interface GrammarData {
  items: Record<
    string,
    {
      grammar: Grammar;

      expressions: Record<
        string,
        {
          expression: GrammarExpression;

          examples: Record<
            string,
            GrammarExpressionExample
          >;
        }
      >;
    }
  >;

  folders: Record<
    string,
    FolderItem
  >;

  grammar_folder_items: Record<
    string,
    Record<
      string,
      GrammarFolderItem
    >
  >;
}