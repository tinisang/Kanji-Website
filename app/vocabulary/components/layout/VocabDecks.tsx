'use client';

import { useVocabulary } from "../../context.ts/VocabularyContext";

import VocabDeckItem from "../../features/vocabulary_deck/components/VocabDeckItem";
import VocabularyFolders from "../../features/vocab_folders/components/VocabFolders";
import { Usage } from "../../lib/types/Usage";
import { VocabularyItem } from "../../lib/types/vocabularyData";
import AddVocabularyDeck from "../../features/vocabulary_deck/components/AddVocabularyDeck";

interface Props {
  items: VocabularyItem[];
}

export default function VocabDecks({
  items,
}: Props) {

  

  
  const {
    vocabularyData,
    activeFolderId,
  } = useVocabulary();

  const visibleItems =
    activeFolderId === "all"
      ? Object.values(vocabularyData.items)
      : Object.values(
          vocabularyData.folder_items[
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
      <VocabularyFolders />

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