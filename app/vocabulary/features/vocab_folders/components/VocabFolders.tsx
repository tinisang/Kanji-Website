"use client";

import { useState } from "react";
import { addFolderUI, useVocabulary } from "@/app/vocabulary/context.ts/VocabularyContext";

import { createVocabularyFolder } from "../clients/vocabularyFolderClient";
import VocabularyAllFolder from "./VocabularyAllFolder";
import VocabularyFolderItem from "./VocabularyFolderItem";
import NewFolderButton from "./NewFolderButton";
import FolderReorderSwitch from "./FolderReorderSwitch";

export default function VocabFolders() {
  const { vocabularyData, setVocabularyData } = useVocabulary();

  const [selectedFolderId, setSelectedFolderId] =
    useState("all");

  function onSelectFolder(folderId: string) {
    setSelectedFolderId(folderId);
  }

  async function onCreateFolder() {

   const newFolder = await createVocabularyFolder({
      name: "New Folder",
      color: "#F7FF1D",
    });

    addFolderUI(setVocabularyData, newFolder);

    

  
  }

  return (
  <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
    <div className="flex items-start justify-between gap-6">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <VocabularyAllFolder
          active={selectedFolderId === "all"}
          onClick={() => onSelectFolder("all")}
        />

        {Object.values(vocabularyData.folders).map(
          (folder, index) => (
            <VocabularyFolderItem
              key={folder.id}
              folder={folder}
              active={selectedFolderId === folder.id}
              index={index}
              onClick={() =>
                onSelectFolder(folder.id)
              }
            />
          )
        )}
      </div>

      <div className="flex shrink-0 items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 p-2">
        <NewFolderButton
          onClick={onCreateFolder}
        />
        <FolderReorderSwitch />
      </div>
    </div>
  </section>
);
  
}