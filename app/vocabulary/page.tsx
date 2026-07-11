import Header from "@/components/layout/Header";
import RevisionDecks from "./components/layout/RevisionDecks";
import VocabDecks from "./components/layout/VocabDecks";
import { VocabularyProvider } from "./context.ts/VocabularyContext";
import { getAllVocabulary } from "./features/vocabulary_deck/services/vocabularyService";
import { getAllVocabularyExpression } from "./features/vocabulary_deck/services/vocabularyExpressionService";
import { getAllExpressionExample } from "./features/vocabulary_deck/services/expressionExampleService";
import { VocabularyData } from "./lib/types/vocabularyData";



export default async function VocabPage() {
const [vocabularies, expressions, examples] =
  await Promise.all([
    getAllVocabulary(),
    getAllVocabularyExpression(),
    getAllExpressionExample(),
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
              (e) =>
                e.vocabulary_id === vocabulary.id
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
};
console.log("initialData", initialData);
  return (

    <VocabularyProvider  initialData={initialData} >
      
    <div>
      <div className="grid grid-cols-[1fr_2fr] gap-4 mt-8">
        <RevisionDecks></RevisionDecks>
        <VocabDecks></VocabDecks>

      </div>
       
    </div>
    </VocabularyProvider>
  );
}