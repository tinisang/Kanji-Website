"use client";

import { useState } from "react";
import { FolderItem } from "@/app/vocabulary/lib/types/vocabularyFolder";
import NewFolderButton from "./NewFolderButton";
import FolderReorderSwitch from "./FolderReorderSwitch";

interface Props {
  folders: Record<string, FolderItem>;
  selectedFolderId: string;
  setSelectedFolderId: (
    id: string
  ) => void;

  setData: React.Dispatch<
    React.SetStateAction<any>
  >;

  createFolder: (folder: {
    name: string;
    color: string;
    parent_id: string | null;
  }) => Promise<FolderItem>;

  addFolderUI: (
    setData: React.Dispatch<
      React.SetStateAction<any>
    >,
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
  const [collapsed, setCollapsed] =
    useState<
      Record<string, boolean>
    >({});

  function handleFolderClick(
    folder: FolderItem
  ) {
    setSelectedFolderId(folder.id);

    const hasChildren =
      Object.values(folders).some(
        (f) =>
          f.parent_id === folder.id
      );

    if (!hasChildren) return;

    setCollapsed((prev) => ({
      ...prev,
      [folder.id]:
        !prev[folder.id],
    }));
  }

  function renderFolders(
    parentId: string | null,
    level = 0
  ): React.ReactNode {
    return Object.values(folders)
      .filter(
        (folder) =>
          folder.parent_id === parentId
      )
      .sort(
        (a, b) =>
          a.position - b.position
      )
      .map((folder, index) => {
        const hasChildren =
          Object.values(folders).some(
            (f) =>
              f.parent_id === folder.id
          );

        const isCollapsed =
          collapsed[folder.id] ??
          false;

        return (
          <div key={folder.id}>
            <div
              className="relative flex items-center"
              style={{
                marginLeft:
                  level * 10,
              }}
            >
              <button
                onClick={() =>
                  hasChildren &&
                  setCollapsed(
                    (prev) => ({
                      ...prev,
                      [folder.id]:
                        !prev[
                          folder.id
                        ],
                    })
                  )
                }
                className={`absolute left-0 top-1/2 mr-1 flex h-4 w-4 -translate-y-1/2 translate-x-[calc(-50%-10px)] shrink-0 items-center justify-center text-xs text-[#888] ${
                  hasChildren
                    ? "hover:text-black"
                    : "pointer-events-none opacity-0"
                }`}
              >
                {hasChildren &&
                  (isCollapsed
                    ? "▶"
                    : "▼")}
              </button>

              <div className="min-w-0 flex-1">
                <FolderItemComponent
                  folder={folder}
                  active={
                    selectedFolderId ===
                    folder.id
                  }
                  index={index}
                  onClick={() =>
                    handleFolderClick(
                      folder
                    )
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
    const folder =
      await createFolder({
        name: "New Folder",
        color: "#F7FF1D",
        parent_id: null,
      });

    addFolderUI(
      setData,
      folder
    );
  }

  return (
    <section>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          {renderFolders(null)}
        </div>

        <div>
          <NewFolderButton
            onClick={
              onCreateFolder
            }
          />
          {/* <FolderReorderSwitch /> */}
        </div>
      </div>
    </section>
  );
}