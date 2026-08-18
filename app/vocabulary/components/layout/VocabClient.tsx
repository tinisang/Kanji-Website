'use client'
import { DragDropProvider } from "@dnd-kit/react";
import RevisionDecks from "./RevisionDecks";
import VocabDecks from "./VocabDecks";
import { VocabularyData } from "../../lib/types/vocabularyData";
import { move } from "@dnd-kit/helpers";
import { useEffect, useState } from "react";
import { updateFolderItemsUI, updateFolderUI, useVocabulary } from "../../context.ts/VocabularyContext";
import { updateVocabularyFolderItemPosition } from "../../features/vocab_folders/clients/vocabularyFolderItemClient";
import VocabFolders from "../../features/vocab_folders/components/VocabFolders";
import { updateVocabularyFolder } from "../../features/vocab_folders/clients/vocabularyFolderClient";


interface Props {
  initialData: VocabularyData;
}

export default function VocabClient({
  initialData,
}: Props) {

  const {vocabularyData, setVocabularyData, setActiveFolderId}= useVocabulary()
    

  const { activeFolderId } = useVocabulary();

const [items, setItems] = useState<
  Record<string, string[]>
>({});

useEffect(() => {
 
// if (activeFolderId !== "all") return;

  
 const folderItemsByFolder = Object.fromEntries(
  Object.entries(vocabularyData.vocab_folder_items).map(
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
    
async function saveChanges(event:any) {
     if (
              event.operation.source?.type === "folder" &&
              event.operation.target?.type==="folder"
            ) {

              if (event.operation.source?.id == event.operation.target?.id){return}
              
             const source =
  vocabularyData.folders[event.operation.source!.id];

const target =
  vocabularyData.folders[event.operation.target!.id];

let current = target;

while (current.parent_id) {
  if (current.parent_id === source.id) {
    return;
  }

  current =
    vocabularyData.folders[current.parent_id];
}
            

              const updatedFolder = {
              ...source,
              parent_id: event.operation.target?.id ,
            };

            updateFolderUI(
                  setVocabularyData,
                  updatedFolder
                );
            
                await updateVocabularyFolder(
                  updatedFolder
                );
            }    

  

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
    
    await updateVocabularyFolderItemPosition(newFolderItemData);
  }
}
    return (
       <div className="w-full">
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
    <div className="mt-8 flex w-full flex-col gap-4 md:flex-row">
      {/* Folder */}
      <div className="w-full shrink-0 md:w-64 lg:w-72">
        <VocabFolders />
      </div>

      {/* Decks */}
      <div className="min-w-0 flex-1">
        <VocabDecks />
      </div>
    </div>
  </DragDropProvider>
</div>
    )
}
