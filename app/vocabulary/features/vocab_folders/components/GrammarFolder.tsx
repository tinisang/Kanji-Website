"use client";

import { useState } from "react";

import {
  addFolderUI,
  deleteFolderUI,
  updateFolderUI,
  useGrammar,
} from "@/app/grammar/contexts/GrammarContext";



import FolderTree from "./FolderTree";
import FolderItem from "./FolderItem";
import { createGrammarFolder } from "../clients/vocabularyFolderClient";
import { deleteGrammarFolder, updateGrammarFolder } from "@/app/grammar/features/grammar_decks/clients/grammarFolderClient";

export default function GrammarFolders() {
  const {
    grammarData,
    setGrammarData,
    setActiveFolderId,
  } = useGrammar();

  const [
    selectedFolderId,
    setSelectedFolderId,
  ] = useState("all");

  return (
    <FolderTree
      folders={grammarData.folders}
      selectedFolderId={
        selectedFolderId
      }
      setSelectedFolderId={
        setSelectedFolderId
      }
      setData={setGrammarData}
      createFolder={
        createGrammarFolder
      }
      addFolderUI={addFolderUI}
      FolderItemComponent={({
        folder,
        active,
      }) => (
        <FolderItem
          folder={folder}
          active={active}
          itemCount={
            Object.keys(
              grammarData
                .grammar_folder_items[
                folder.id
              ] ?? {}
            ).length
          }
          onSelect={() => {
            setSelectedFolderId(
              folder.id
            );
            setActiveFolderId(
              folder.id
            );
          }}
          onRename={async (
            name
          ) => {
            const updated = {
              ...folder,
              name,
            };

            updateFolderUI(
              setGrammarData,
              updated
            );

            await updateGrammarFolder(
              updated
            );
          }}
          onDelete={async () => {
            deleteFolderUI(
              setGrammarData,
              folder.id
            );

            await deleteGrammarFolder(
              folder.id
            );
          }}
        />
      )}
    />
  );
}