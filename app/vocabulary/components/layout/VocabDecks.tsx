'use client';

import { useVocabulary } from "../../context.ts/VocabularyContext";

import VocabDeckItem from "../../features/vocabulary_deck/components/VocabDeckItem";
import VocabFolders from "../../features/vocab_folders/components/VocabFolders";
import { Usage } from "../../lib/types/Usage";
import { VocabularyItem } from "../../lib/types/vocabularyData";
import AddVocabularyDeck from "../../features/vocabulary_deck/components/AddVocabularyDeck";


export default function VocabDecks() {

  

  
  const {
    vocabularyData,
    activeFolderId,
  } = useVocabulary();

  const visibleItems =
    activeFolderId === "all"
      ? []
      : Object.values(
          vocabularyData.vocab_folder_items[
            activeFolderId
          ] ?? {}
        )
          .map(
            (vocabularyId) =>{
             
              return vocabularyData.items[
                vocabularyId.vocabulary_id
              ]
            }
          )
          .filter(Boolean);

  return (
    <div>
      

      <section className="space-y-2">
        {visibleItems.map((item, index) => (
          <VocabDeckItem
            key={item.vocabulary.id}
            vocabulary={item.vocabulary}
            index={index}
            expressions={
              item.expressions as Record<
                string,
                Usage
              >
            }
          />
        ))}

        <AddVocabularyDeck />
      </section>
    </div>
  );
}