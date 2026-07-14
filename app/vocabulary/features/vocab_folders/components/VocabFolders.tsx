"use client";

import { useState } from "react";
import { addFolderUI, useVocabulary } from "@/app/vocabulary/context.ts/VocabularyContext";
import { DndContext } from "@dnd-kit/core";
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


  const rootFolders = Object.values(
  vocabularyData.folders
).filter((folder) => folder.parent_id === null);
const [collapsed, setCollapsed] = useState<
  Record<string, boolean>
>({});

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
        <div
          key={folder.id}
          className="relative"
          style={{ paddingLeft: level * 18 }}
        >
          {level > 0 && (
            <>
              <div className="absolute left-[9px] top-0 bottom-0 w-px bg-[#EAECC2]" />
              <div className="absolute left-[9px] top-5 h-px w-3 bg-[#EAECC2]" />
            </>
          )}

          <div className="group relative flex items-center">
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
                mr-1 flex h-5 w-5 shrink-0 items-center justify-center
                rounded-md text-[11px] font-bold transition
                ${
                  hasChildren
                    ? "text-[#8A9000] hover:bg-[#F5F7C7]"
                    : "pointer-events-none text-transparent"
                }
              `}
            >
              {hasChildren &&
                (isCollapsed ? "+" : "−")}
            </button>

            <div className="min-w-0 flex-1">
              <VocabularyFolderItem
                folder={folder}
                active={
                  selectedFolderId ===
                  folder.id
                }
                index={index}
                onClick={() =>
                  onSelectFolder(folder.id)
                }
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