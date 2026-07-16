"use client";

import { useState } from "react";
import { addFolderUI, useVocabulary } from "@/app/vocabulary/context.ts/VocabularyContext";
import { DndContext } from "@dnd-kit/core";
import { createVocabularyFolder } from "../clients/vocabularyFolderClient";
import VocabularyAllFolder from "./VocabularyAllFolder";
import VocabularyFolderItem from "./VocabularyFolderItem";
import NewFolderButton from "./NewFolderButton";
import FolderReorderSwitch from "./FolderReorderSwitch";
import { FolderItem } from "@/app/vocabulary/lib/types/vocabularyFolder";

export default function VocabFolders() {
  const { vocabularyData, setVocabularyData } = useVocabulary();

  const [selectedFolderId, setSelectedFolderId] =
    useState("all");

  function onSelectFolder(folderId: string) {
    setSelectedFolderId(folderId);
  }


  const rootFolders = Object.values(
  vocabularyData.folders
).filter((folder) => folder.parent_id === null);
const [collapsed, setCollapsed] = useState<
  Record<string, boolean>
>({});
function handleFolderClick(folder: FolderItem) {
  onSelectFolder(folder.id);

  const hasChildren = Object.values(
    vocabularyData.folders
  ).some((f) => f.parent_id === folder.id);

  if (!hasChildren) return;

  setCollapsed((prev) => ({
    ...prev,
    [folder.id]: !prev[folder.id],
  }));
}
function renderFolders(
  parentId: string | null,
  level = 0
): React.ReactNode {
  return Object.values(vocabularyData.folders)
    .filter((folder) => folder.parent_id === parentId)
    .sort((a, b) => a.position - b.position)
    .map((folder, index) => {
      const hasChildren = Object.values(
        vocabularyData.folders
      ).some((f) => f.parent_id === folder.id);

      const isCollapsed =
        collapsed[folder.id] ?? false;

      return (
        <div key={folder.id}>
          <div
            className="flex items-center relative"
            style={{
              marginLeft: level * 10,
            }}
          >
            <button
              onClick={() =>
                hasChildren &&
                setCollapsed((prev) => ({
                  ...prev,
                  [folder.id]:
                    !prev[folder.id],
                }))
              }
              className={`
                mr-1 flex h-4 w-4 shrink-0 items-center justify-center
                text-xs text-[#888]
                absolute    left-0
  top-1/2
  translate-x-[calc(-50%-10px)]
  -translate-y-1/2
                ${
                  hasChildren
                    ? "hover:text-black"
                    : "pointer-events-none opacity-0"
                }
              `}
            >
              {hasChildren &&
                (isCollapsed ? "▶" : "▼")}
            </button>

            <div className="flex-1 min-w-0">
              <VocabularyFolderItem
  folder={folder}
  active={selectedFolderId === folder.id}
  index={index}
  onClick={() => handleFolderClick(folder)}
/>
            </div>
          </div>

          {!isCollapsed &&
            renderFolders(
              folder.id,
              level + 1
            )}
        </div>
      );
    });
}
  async function onCreateFolder() {

   const newFolder = await createVocabularyFolder({
      name: "New Folder",
      color: "#F7FF1D",
      parent_id: null
    });

    addFolderUI(setVocabularyData, newFolder);

    

  
  }

  return (
  <section className="">
    <div className="flex flex-col items-start  gap-6">
      <div className="flex flex-col flex-1 flex-wrap gap-2">
        
        {renderFolders(null)}
      </div>

      <div className="">
        <NewFolderButton
          onClick={onCreateFolder}
        />
        <FolderReorderSwitch />
      </div>
    </div>
  </section>
);
  
}