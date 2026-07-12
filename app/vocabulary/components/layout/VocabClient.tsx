'use client'
import { DragDropProvider } from "@dnd-kit/react";
import RevisionDecks from "./RevisionDecks";
import VocabDecks from "./VocabDecks";
import { VocabularyData } from "../../lib/types/vocabularyData";
import { move } from "@dnd-kit/helpers";
import { useEffect, useState } from "react";
import { updateFolderItemsUI, useVocabulary } from "../../context.ts/VocabularyContext";
import { updateVocabularyFolderItemPosition } from "../../features/vocab_folders/clients/vocabularyFolderItemClient";


interface Props {
  initialData: VocabularyData;
}

export default function VocabClient({
  initialData,
}: Props) {

  const {vocabularyData, setVocabularyData}= useVocabulary()
    

  const { activeFolderId } = useVocabulary();

const [items, setItems] = useState<
  Record<string, string[]>
>({});

useEffect(() => {
  

 const folderItemsByFolder = Object.fromEntries(
  Object.entries(vocabularyData.folder_items).map(
    ([folderId, items]) => [
      folderId,
      Object.values(items)
        .sort((a, b) => a.position - b.position)
        .map((item) => item.vocabulary_id),
    ]
  )
);
 

  setItems(
    folderItemsByFolder
  );


}, [activeFolderId, vocabularyData]);

useEffect(()=>{

},[items])
    
async function saveChanges(event:any) {
  

  

  if (
  event.operation.source?.type === "folder" ||
  !event.operation.target
) {
  return;
}


  updateFolderItemsUI(setVocabularyData, items);
  if (activeFolderId!='all'){

    const newFolderItemData= Object.entries(items).flatMap(
    ([folderId, vocabularyIds]) =>
      vocabularyIds.map(
        (vocabularyId, index) => ({
          vocabulary_id: vocabularyId,
          folder_id: folderId,
          position: index,
        })
      )
  );

  console.log(newFolderItemData)
    
    await updateVocabularyFolderItemPosition(newFolderItemData);
  }
}
    return (
        <div>
              <DragDropProvider
            onDragOver={(event) => {
              
            if (
              event.operation.source?.type === "folder" ||
              !event.operation.target
            ) {
              
              return;
            }

           
              setItems((prev) => move(prev, event));
            }}
            onDragEnd={saveChanges}
          >
              <div className="grid grid-cols-[1fr_2fr] gap-4 mt-8">
                <RevisionDecks></RevisionDecks>
                <VocabDecks
  items={
    activeFolderId === "all"
      ? Object.values(initialData.items)
      : (items[activeFolderId] ?? []).map(
          (id) => initialData.items[id]
        )
  }
/>
        
              </div>
             </DragDropProvider>
            </div>
    )
}
