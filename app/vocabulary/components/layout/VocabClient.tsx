'use client'
import { DragDropProvider } from "@dnd-kit/react";
import RevisionDecks from "./RevisionDecks";
import VocabDecks from "./VocabDecks";
import { VocabularyData } from "../../lib/types/vocabularyData";
import { move } from "@dnd-kit/helpers";
import { useEffect, useState } from "react";
import { useVocabulary } from "../../context.ts/VocabularyContext";
import { updateVocabularyFolderItemPosition } from "../../features/vocab_folders/clients/vocabularyFolderItemClient";


interface Props {
  initialData: VocabularyData;
}

export default function VocabClient({
  initialData,
}: Props) {

  const {vocabularyData}= useVocabulary()
    

  const { activeFolderId } = useVocabulary();

const [items, setItems] = useState<string[]>([]);

useEffect(() => {
  if (activeFolderId === "all") {
    setItems(
      Object.values(initialData.items).map(
        (item) => item.vocabulary.id
      )
    );
    return;
  }

  setItems(
    Object.values(
      initialData.folder_items[activeFolderId] ?? {}
    )
      .sort((a, b) => a.position - b.position)
      .map((item) => item.vocabulary_id)
  );
}, [activeFolderId, initialData]);
    
async function saveChanges() {
  console.log(items);

  if (activeFolderId!='all'){
    
    await updateVocabularyFolderItemPosition(
      items.map((item, index) => ({
        vocabulary_id: item,
        folder_id: activeFolderId,
        position: index,
      }))
    );
  }
}
    return (
        <div>
              <DragDropProvider
              onDragEnd={saveChanges}
              onDragOver={(event) => {


                      const { source } = event.operation;
                      setItems(prev => move(prev, event));
                    }}
              >
              <div className="grid grid-cols-[1fr_2fr] gap-4 mt-8">
                <RevisionDecks></RevisionDecks>
                <VocabDecks
  items={items.map((id) => initialData.items[id])}
/>
        
              </div>
             </DragDropProvider>
            </div>
    )
}