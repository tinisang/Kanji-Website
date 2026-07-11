'use client';

import { useVocabulary } from "../../context.ts/VocabularyContext";
import AddVocabularyDeck from "../../features/vocabulary_deck/components/AddNewVocabDeckCard";
import VocabDeckItem from "../../features/vocabulary_deck/components/VocabDeckItem";
import { Usage } from "../../lib/types/Usage";
import { VocabularyExpression } from "../../lib/types/vocabularyExpression";

export default function VocabDecks() {
  const { vocabularyData } = useVocabulary();

  return (
    <section className="space-y-2">
      {Object.values(vocabularyData.items).map((item) => {
        
        
        return (
          <VocabDeckItem
            key={item.vocabulary.id}
            vocabulary={item.vocabulary}
            expressions={item.expressions as unknown as Record<string, Usage>}
          />
        );
      })}

      <AddVocabularyDeck />
    </section>
  );
}