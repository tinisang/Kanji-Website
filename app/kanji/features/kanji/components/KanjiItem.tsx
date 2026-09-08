"use client";

import { useSortable } from "@dnd-kit/react/sortable";
import {
  Trash2,
  Unlink,
} from "lucide-react";
import { useState } from "react";

import KanjiCard from "./KanjiCard";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  removeKanjiUI,
  useKanji,
} from "@/contexts/Context";

import { Kanji } from "@/app/kanji/types/kanji";

import { deleteKanjiAPI } from "../api/kanji.client";
import { removeKanjiFromGroupAPI } from "../../collection/api/kanji-group-item.client";


interface KanjiItemProps {
  kanji: Kanji;
  groupId: string;
  index: number;
  isClassified: boolean;
  setItemArray?: React.Dispatch<
    React.SetStateAction<Kanji>
  >;
}

export default function KanjiItem({
  kanji,
  groupId,
  index,
  isClassified,
}: KanjiItemProps) {
  const {
    data,
    setData,
    dragEnabled,
    learnedFilter,
  } = useKanji();

  const {
    ref,
    handleRef,
  } = useSortable({
    id: `${groupId}::${kanji.id}`,
    index,
    type: "item",
    accept: "item",
    group: groupId,
    disabled: !dragEnabled,
  });

  const [openDelete, setOpenDelete] =
    useState(false);

  const [openRemove, setOpenRemove] =
    useState(false);

  const referenceItems =
    data.kanji_reference_items[
      kanji.id
    ] ?? [];

  const kanjiData =
    data.kanjis[kanji.id] ?? kanji;

  const shouldDisplay =
    learnedFilter === "all" ||
    (learnedFilter === "learned" &&
      kanjiData.learned) ||
    (learnedFilter === "unlearned" &&
      !kanjiData.learned);

  if (!shouldDisplay) {
    return null;
  }

  const hasNeedRevision = false;

  const handleRemoveFromGroup =
    async () => {
      try {
        await removeKanjiFromGroupAPI(
          kanji.id,
          groupId
        );

        setData(prev => ({
          ...prev,
          kanji_group_items: {
            ...prev.kanji_group_items,
            [groupId]: (
              prev.kanji_group_items[
                groupId
              ] ?? []
            ).filter(
              id => id !== kanji.id
            ),
          },
        }));

        setOpenRemove(false);
      } catch (error) {
        console.error(
          "Failed to remove kanji from group:",
          error
        );
      }
    };

  const handleDeleteKanji =
    async () => {
      try {
        await deleteKanjiAPI(
          kanji.id
        );

        removeKanjiUI(
          setData,
          kanji.id
        );

        setOpenDelete(false);
      } catch (error) {
        console.error(
          "Failed to delete kanji:",
          error
        );
      }
    };

  return (
    <div ref={ref}>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <div
            className={`
              rounded-md
              transition-all
              ${
                hasNeedRevision
                  ? "bg-amber-50 ring-1 ring-amber-300 border border-amber-200"
                  : ""
              }
              data-[state=open]:bg-lime-50
              data-[state=open]:ring-2
              data-[state=open]:ring-lime-300
            `}
          >
            <KanjiCard
              kanji={kanjiData}
              referenceItems={
                referenceItems
              }
              isClassified={
                isClassified
              }
              dragEnabled={
                dragEnabled
              }
              handleRef={handleRef}
            />
          </div>
        </ContextMenuTrigger>

        <ContextMenuContent>
          {/* Remove link from this group */}
          <ContextMenuItem
            onSelect={() =>
              setOpenRemove(true)
            }
          >
            <Unlink className="mr-2 h-4 w-4" />
            Remove from group
          </ContextMenuItem>

          {/* Delete actual Kanji */}
          <ContextMenuItem
            onSelect={() =>
              setOpenDelete(true)
            }
            className="
              text-red-600
              focus:bg-red-50
              focus:text-red-700
            "
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Kanji
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      {/* Remove from group confirmation */}
      <AlertDialog
        open={openRemove}
        onOpenChange={
          setOpenRemove
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Remove from group?
            </AlertDialogTitle>

            <AlertDialogDescription>
              The kanji "
              {kanji.character}"
              will be removed from
              this group but will not
              be deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={
                handleRemoveFromGroup
              }
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Kanji confirmation */}
      <AlertDialog
        open={openDelete}
        onOpenChange={
          setOpenDelete
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete Kanji?
            </AlertDialogTitle>

            <AlertDialogDescription>
              This action cannot be
              undone. The kanji "
              {kanji.character}" will be
              permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              className="
                bg-red-600
                hover:bg-red-700
              "
              onClick={
                handleDeleteKanji
              }
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}