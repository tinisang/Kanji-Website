import Header from "@/components/layout/Header";
import RevisionDecks from "./components/layout/RevisionDecks";
import VocabDecks from "./components/layout/VocabDecks";
import { VocabularyProvider } from "./context.ts/VocabularyContext";
import { getAllVocabulary } from "./features/vocabulary_deck/services/vocabularyService";
import { getAllVocabularyExpression } from "./features/vocabulary_deck/services/vocabularyExpressionService";
import { getAllExpressionExample } from "./features/vocabulary_deck/services/expressionExampleService";
import { VocabularyData } from "./lib/types/vocabularyData";
import { DragDropProvider } from "@dnd-kit/react";
import VocabClient from "./components/layout/VocabClient";
import { getAllVocabularyFolder } from "./features/vocab_folders/services/vocabularyFolderService";
import { getAllVocabularyFolderItem } from "./features/vocab_folders/services/vocabularyFolderItemService";



export default async function VocabPage() {
const [vocabularies, expressions, examples, folders, folderItems] =
  await Promise.all([
    getAllVocabulary(),
    getAllVocabularyExpression(),
    getAllExpressionExample(),
    getAllVocabularyFolder(),
    getAllVocabularyFolderItem()
    
  ]);



const initialData: VocabularyData = {
  items: Object.fromEntries(
    vocabularies.map((vocabulary) => [
      vocabulary.id,
      {
        vocabulary,
        expressions: Object.fromEntries(
          expressions
            .filter(
              (e) => e.vocabulary_id === vocabulary.id
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

  folder_items: Object.fromEntries(
    folders.map((folder) => [
      folder.id,
      Object.fromEntries(
        folderItems
          .filter(
            (item) => item.folder_id === folder.id
          )
          .map((item) => [
            item.vocabulary_id,
            item,
          ])
      ),
    ])
  ),
};


  return (
    <VocabularyProvider  initialData={initialData} >
    <VocabClient initialData={initialData} ></VocabClient>
    </VocabularyProvider>
  );
}