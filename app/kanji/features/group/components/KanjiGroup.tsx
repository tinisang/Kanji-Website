'use client';

import {
  ArrowUp,
  Trash2,
} from "lucide-react";

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

import { useState } from "react";
import { useSortable } from "@dnd-kit/react/sortable";
import { CollisionPriority } from "@dnd-kit/abstract";

import {
  moveGroupToTopUI,
  removeGroupUI,
  useKanji,
} from "@/contexts/Context";

import KanjiItem from "../../kanji/components/KanjiItem";
import AddKanjiModal from "../../kanji/components/AddKanjiModal";

import {
  deleteGroupAPI,
  moveGroupToTopAPI,
} from "../api/group.client";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

interface KanjiGroupProps {
  id: string;
  index: number;
  children: React.ReactNode;
  data: string[];
}

export default function KanjiGroup({
  data,
  id,
  index,
}: KanjiGroupProps) {
  const [openDelete, setOpenDelete] =
    useState(false);

  const {
    data: globalData,
    setData,
    dragEnabled,
  } = useKanji();

  const itemArray = data
    ?.map((item) => globalData.kanjis[item])
    .filter(Boolean);

  function setItemArray() {}

  const {
    isDragSource,
    ref: sortableRef,
  } = useSortable({
    id,
    index,
    type: "group",
    accept: ["item", "group"],
    group: "classified",
    collisionPriority:
      CollisionPriority.Low,
    disabled: !dragEnabled,
  });

  const handleMoveToTop = async () => {
  try {
    await moveGroupToTopAPI(id);

    moveGroupToTopUI(
      setData,
      id
    );
  } catch (error) {
    console.error(
      "Failed to move group to top:",
      error
    );
  }
};

  return (
    <div
      ref={(node) => {
        sortableRef(node);
      }}
      className="w-full h-full border-b border-b-gray-200"
    >
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <section
            id={`kanji-group-${id}`}
            className={`
              w-full
              h-full
              border-l-4 border-l-kanji-primary
              bg-white
              p-1 sm:p-1
              transition-all
              data-[state=open]:bg-lime-50
              data-[state=open]:ring-1
              data-[state=open]:ring-lime-300
              ${
                isDragSource
                  ? "z-10 scale-[1.02] shadow-xl sm:scale-110"
                  : "shadow-sm hover:shadow-md"
              }
            `}
          >
            <div className="flex min-w-0 flex-wrap gap-2">
              {itemArray?.map(
                (item, itemIndex) => (
                  <KanjiItem
                    setItemArray={setItemArray}
                    isClassified={true}
                    key={item.id}
                    index={itemIndex}
                    kanji={item}
                    groupId={id}
                  />
                )
              )}

              <AddKanjiModal
                setItemArray={setItemArray}
                groupId={id}
              />
            </div>
          </section>
        </ContextMenuTrigger>

        <ContextMenuContent>
          <ContextMenuItem
            onSelect={handleMoveToTop}
          >
            <ArrowUp className="mr-2 h-4 w-4" />
            Move to top
          </ContextMenuItem>

          <ContextMenuItem
            onSelect={() => setOpenDelete(true)}
            className="
              text-red-600
              focus:bg-red-50
              focus:text-red-700
            "
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Group
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <AlertDialog
        open={openDelete}
        onOpenChange={setOpenDelete}
      >
        <AlertDialogContent className="w-[calc(100%-2rem)] rounded-xl sm:max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete Group?
            </AlertDialogTitle>

            <AlertDialogDescription>
              This action cannot be undone.
              All kanji inside this group
              will be removed.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="flex-col-reverse gap-2 sm:flex-row">
            <AlertDialogCancel className="mt-0 w-full sm:w-auto">
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              className="
                w-full
                bg-red-600
                hover:bg-red-700
                sm:w-auto
              "
              onClick={async () => {
                await deleteGroupAPI(id);

                removeGroupUI(setData, id);

                setOpenDelete(false);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}