"use client";

import { useEffect, useRef, useState } from "react";
import {
  Folder,
  FolderOpen,
  Trash2,
} from "lucide-react";

import { EditableText } from "@/app/kanji/features/kanji/components/EditableText";
import { VocabularyFolder } from "@/app/vocabulary/lib/types/vocabularyFolder";
import { deleteVocabularyFolder, updateVocabularyFolder } from "../clients/vocabularyFolderClient";
import {
    deleteFolderUI,
  updateFolderUI,
  useVocabulary,
} from "@/app/vocabulary/context.ts/VocabularyContext";
import { useSortable } from "@dnd-kit/react/sortable";

interface Props {
  folder: VocabularyFolder;
  active: boolean;
  index: number;
  onClick: () => void;
  
}

export default function VocabularyFolderItem({
  folder,
  active,
  index,
  onClick,

}: Props) {
  const [editing, setEditing] =
    useState(false);

  const containerRef =
    useRef<HTMLDivElement>(null);

  const { setVocabularyData, setActiveFolderId } =
    useVocabulary();

    async function onDelete(){
        deleteFolderUI(setVocabularyData, folder.id)

        await deleteVocabularyFolder(folder.id)

    }
  const { ref } = useSortable({
    id: folder.id,
    index,
    type: "folder",
    accept: "folder",
    group: "folders",
  });

  useEffect(() => {
    if (!editing) return;

    function handleClickOutside(
      e: MouseEvent
    ) {
      if (
        containerRef.current &&
        !containerRef.current.contains(
          e.target as Node
        )
      ) {
        setEditing(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, [editing]);

  function handleClick(){
    onClick();
setActiveFolderId(folder.id)
  }
  async function onRename(name: string) {
    if (
      !name.trim() ||
      name === folder.name
    )
      return;

    const updatedFolder = {
      ...folder,
      name,
    };

    updateFolderUI(
      setVocabularyData,
      updatedFolder
    );

    await updateVocabularyFolder(
      updatedFolder
    );
  }

  return (
    <div
      ref={(node) => {
        ref(node);
        containerRef.current = node;
      }}
      className="group relative"
    >
      <div
  role="button"
  tabIndex={0}
  onClick={() => !editing && handleClick()}
  onDoubleClick={() => setEditing(true)}
  className={`
    flex shrink-0 cursor-pointer items-center gap-2 rounded-xl
    border px-4 py-2 pr-10 text-sm font-medium
    transition-all duration-200
    ${
      editing
        ? "scale-[1.02] border-gray-300 bg-white text-black shadow-lg ring-2 ring-[#F7FF1D]/40"
        : active
        ? "border-[#F7FF1D] bg-[#F7FF1D] text-black shadow-lg shadow-[#F7FF1D]/30"
        : "border-[#E7EA8A] bg-[#FAFBC8] text-[#6C7100] hover:border-[#F7FF1D] hover:bg-[#F4F97A] hover:text-black"
    }
  `}
>
  {active ? (
    <FolderOpen className="h-4 w-4 shrink-0" />
  ) : (
    <Folder className="h-4 w-4 shrink-0" />
  )}

  {editing ? (
    <div onClick={(e) => e.stopPropagation()}>
      <EditableText
        autoFocus
        defaultValue={folder.name}
        className="min-w-20"
        onSave={onRename}
      />
    </div>
  ) : (
    <span>{folder.name}</span>
  )}
</div>

      {!editing && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="
            absolute right-2 top-1/2 -translate-y-1/2
            rounded-md p-1
            text-red-500 opacity-0
            transition-all duration-200
            hover:bg-red-100
            group-hover:opacity-100
          "
        >
          <Trash2 className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}