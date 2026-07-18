import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getAllGrammarService } from "./features/grammar_decks/services/grammarService";
import { getAllGrammarExpressionService } from "./features/grammar_decks/services/grammarExpressionService";
import { getAllExpressionExample } from "../vocabulary/features/vocabulary_deck/services/expressionExampleService";
import { getAllGrammarFolder, getAllVocabularyFolder } from "../vocabulary/features/vocab_folders/services/vocabularyFolderService";
import { getAllGrammarFolderItem } from "./features/grammar_decks/services/grammarFolderItemService";
import { GrammarData } from "./lib/types/GrammarData";
import { GrammarProvider } from "./contexts/GrammarContext";
import GrammarClient from "./components/GrammarClient";
import { getAllGrammarExpressionExampleService } from "./features/grammar_decks/services/grammarExpressionExampleService";


export default async function GrammarPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const [
    grammars,
    expressions,
    examples,
    folders,
    folderItems,
  ] = await Promise.all([
    getAllGrammarService(),
    getAllGrammarExpressionService(),
    getAllGrammarExpressionExampleService(),
    getAllGrammarFolder(),
    getAllGrammarFolderItem(),
  ]);

  const initialData: GrammarData = {
    items: Object.fromEntries(
      grammars.map((grammar) => [
        grammar.id,
        {
          grammar,
          expressions: Object.fromEntries(
            expressions
              .filter(
                (e) =>
                  e.grammar_id === grammar.id
              )
              .map((expression) => [
                expression.id,
                {
                  expression,
                  examples: Object.fromEntries(
                    examples
                      .filter(
                        (example) =>
                          example.expression_id ===
                          expression.id
                      )
                      .map((example) => [
                        example.id,
                        example,
                      ])
                  ),
                },
              ])
          ),
        },
      ])
    ),

    folders: Object.fromEntries(
      folders.map((folder) => [
        folder.id,
        folder,
      ])
    ),

    grammar_folder_items:
      Object.fromEntries(
        folders.map((folder) => [
          folder.id,
          Object.fromEntries(
            folderItems
              .filter(
                (item) =>
                  item.folder_id ===
                  folder.id
              )
              .map((item) => [
                item.grammar_id,
                item,
              ])
          ),
        ])
      ),
  };

  
  return (
    <GrammarProvider
      initialData={initialData}
    >
      <GrammarClient
        initialData={initialData}
      />
    </GrammarProvider>
  );
}