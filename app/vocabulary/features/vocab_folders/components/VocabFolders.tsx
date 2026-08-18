"use client";

import { useState } from "react";

import {
  addFolderUI,
  deleteFolderUI,
  updateFolderUI,
  useVocabulary,
} from "@/app/vocabulary/context.ts/VocabularyContext";

import {
  createVocabularyFolder,
  deleteVocabularyFolder,
  updateVocabularyFolder,
} from "../clients/vocabularyFolderClient";

import FolderTree from "./FolderTree";
import FolderItem from "./FolderItem";

export default function VocabFolders() {
  const {
    vocabularyData,
    setVocabularyData,
    setActiveFolderId,
  } = useVocabulary();

  const [selectedFolderId, setSelectedFolderId] =
    useState("all");

  return (
    <FolderTree
      folders={vocabularyData.folders}
      selectedFolderId={selectedFolderId}
      setSelectedFolderId={setSelectedFolderId}
      setData={setVocabularyData}
      createFolder={createVocabularyFolder}
      addFolderUI={addFolderUI}
      FolderItemComponent={({ folder, active }) => (
        <FolderItem
          folder={folder}
          active={active}
          itemCount={
            Object.keys(
              vocabularyData.vocab_folder_items[folder.id] ?? {}
            ).length
          }
          onSelect={() => {
            setSelectedFolderId(folder.id);
            setActiveFolderId(folder.id);
          }}
          onRename={async (name) => {
            const updated = {
              ...folder,
              name,
            };

            updateFolderUI(
              setVocabularyData,
              updated
            );

            await updateVocabularyFolder(updated);
          }}
          onDelete={async () => {
            deleteFolderUI(
              setVocabularyData,
              folder.id
            );

            await deleteVocabularyFolder(folder.id);
          }}
        />
      )}
    />
  );
}