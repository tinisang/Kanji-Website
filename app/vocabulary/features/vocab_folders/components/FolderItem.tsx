"use client";

import { useEffect, useRef, useState } from "react";
import {
  Folder,
  FolderOpen,
  GripVertical,
  Trash2,
} from "lucide-react";

import { EditableText } from "@/app/kanji/features/kanji/components/EditableText";
import {
  useDraggable,
  useDroppable,
} from "@dnd-kit/react";

import { FolderItem as FolderItemType } from "@/app/vocabulary/lib/types/vocabularyFolder";

interface Props {
  folder: FolderItemType;
  active: boolean;
  itemCount: number;

  onSelect: () => void;
  onRename: (
    name: string
  ) => Promise<void>;
  onDelete: () => Promise<void>;
}

export default function FolderItem({
  folder,
  active,
  itemCount,
  onSelect,
  onRename,
  onDelete,
}: Props) {
  const [editing, setEditing] =
    useState(false);

  const containerRef =
    useRef<HTMLDivElement>(null);

  const renameTimer =
    useRef<NodeJS.Timeout | null>(null);

  const {
    ref: dragRef,
    handleRef,
    isDragging,
  } = useDraggable({
    id: folder.id,
    type: "folder",
  });

  const {
    ref: dropRef,
    isDropTarget,
  } = useDroppable({
    id: folder.id,
    type: "folder",
    accept: ["folder", "item"],
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

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, [editing]);

  useEffect(() => {
    return () => {
      if (renameTimer.current) {
        clearTimeout(
          renameTimer.current
        );
      }
    };
  }, []);

  async function handleRename(
    name: string
  ) {
    setEditing(false);

    if (
      !name.trim() ||
      name === folder.name
    )
      return;

    await onRename(name);
  }

  function handleClick() {
    if (editing) return;

    if (!active) {
      onSelect();
      return;
    }

    if (renameTimer.current) {
      clearTimeout(
        renameTimer.current
      );
    }

    renameTimer.current =
      setTimeout(() => {
        setEditing(true);
      }, 350);
  }

  function handleDoubleClick() {
    if (renameTimer.current) {
      clearTimeout(
        renameTimer.current
      );
    }

    onSelect();
  }

  return (
    <div
      ref={(node) => {
        dragRef(node);
        dropRef(node);
        containerRef.current = node;
      }}
      className={`
        group relative
        ${
          isDragging
            ? "opacity-50"
            : ""
        }
        ${
          isDropTarget
            ? "bg-[#FFF8B8]"
            : ""
        }
      `}
    >
      <div
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onDoubleClick={
          handleDoubleClick
        }
        className={`
          flex h-8 items-center gap-1.5
          rounded-md px-2 text-sm
          transition-colors
          ${
            active
              ? "bg-[#EAF2FF] text-black"
              : "text-[#444] hover:bg-[#F5F5F5]"
          }
        `}
      >
        {active ? (
          <FolderOpen
            ref={handleRef}
            className="h-4 w-4 shrink-0 text-[#C69C00]"
          />
        ) : (
          <Folder
            ref={handleRef}
            className="h-4 w-4 shrink-0 text-[#C69C00]"
          />
        )}

        {editing ? (
          <div
            className="flex-1"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <EditableText
              autoFocus
              defaultValue={
                folder.name
              }
              className="w-full"
              onSave={
                handleRename
              }
            />
          </div>
        ) : (
          <div className="flex min-w-0 flex-1 items-center">
            <span className="truncate">
              {folder.name}
            </span>

            {itemCount > 0 && (
              <span className="ml-2 text-[11px] text-gray-400">
                {itemCount}
              </span>
            )}
          </div>
        )}

        <GripVertical
          ref={handleRef}
          className="h-3.5 w-3.5 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100"
        />

        {!editing && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="rounded p-1 text-red-500 opacity-0 transition hover:bg-red-100 group-hover:opacity-100"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}