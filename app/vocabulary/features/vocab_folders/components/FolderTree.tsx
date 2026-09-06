"use client";

import { useState } from "react";
import { FolderItem } from "@/app/vocabulary/lib/types/vocabularyFolder";
import NewFolderButton from "./NewFolderButton";
import FolderReorderSwitch from "./FolderReorderSwitch";

interface Props {
  folders: Record<string, FolderItem>;
  selectedFolderId: string;
  setSelectedFolderId: (id: string) => void;

  setData: React.Dispatch<React.SetStateAction<any>>;

  createFolder: (folder: {
    name: string;
    color: string;
    parent_id: string | null;
  }) => Promise<FolderItem>;

  addFolderUI: (
    setData: React.Dispatch<React.SetStateAction<any>>,
    folder: FolderItem
  ) => void;

  FolderItemComponent: React.ComponentType<{
    folder: FolderItem;
    active: boolean;
    index: number;
    onClick: () => void;
  }>;
}

export default function FolderTree({
  folders,
  selectedFolderId,
  setSelectedFolderId,
  setData,
  createFolder,
  addFolderUI,
  FolderItemComponent,
}: Props) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  function handleFolderClick(folder: FolderItem) {
    setSelectedFolderId(folder.id);

    const hasChildren = Object.values(folders).some(
      (f) => f.parent_id === folder.id
    );

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
    return Object.values(folders)
      .filter((folder) => folder.parent_id === parentId)
      .sort((a, b) => a.position - b.position)
      .map((folder, index) => {
        const hasChildren = Object.values(folders).some(
          (f) => f.parent_id === folder.id
        );

        const isCollapsed = collapsed[folder.id] ?? false;

        return (
          <div key={folder.id} className="min-w-0">
            <div
              className="relative flex min-w-0 items-center"
              style={{
                marginLeft: level * 10,
              }}
            >
              <button
                type="button"
                onClick={() => {
                  if (!hasChildren) return;

                  setCollapsed((prev) => ({
                    ...prev,
                    [folder.id]: !prev[folder.id],
                  }));
                }}
                className={`
                  absolute
                  left-0
                  top-1/2
                  z-10
                  flex
                  h-4
                  w-4
                  -translate-x-[calc(50%+10px)]
                  -translate-y-1/2
                  items-center
                  justify-center
                  text-[9px]
                  text-[#888]
                  transition
                  ${hasChildren
                    ? "cursor-pointer hover:text-black"
                    : "pointer-events-none opacity-0"}
                `}
              >
                {hasChildren && (isCollapsed ? "▶" : "▼")}
              </button>

              <div className="min-w-0 flex-1">
                <FolderItemComponent
                  folder={folder}
                  active={selectedFolderId === folder.id}
                  index={index}
                  onClick={() => handleFolderClick(folder)}
                />
              </div>
            </div>

            {!isCollapsed &&
              renderFolders(folder.id, level + 1)}
          </div>
        );
      });
  }

  async function onCreateFolder() {
    const folder = await createFolder({
      name: "New Folder",
      color: "#F7FF1D",
      parent_id: null,
    });

    addFolderUI(setData, folder);
  }

  return (
    <section className="w-full min-w-0 sticky top-8 z-10">
      <div className="flex w-full min-w-0 flex-col gap-4 sm:gap-6">
        {/* Folder tree */}
        <div
          className="
            min-w-0
            w-full
            overflow-x-auto
            overflow-y-auto
            pr-1
            sm:max-h-[calc(100vh-180px)]
          "
        >
          <div className="flex min-w-0 flex-col gap-1">
            {renderFolders(null)}
          </div>
        </div>

        {/* Actions */}
        <div className="flex w-full min-w-0">
          <NewFolderButton onClick={onCreateFolder} />
          {/* <FolderReorderSwitch /> */}
        </div>
      </div>
    </section>
  );
}