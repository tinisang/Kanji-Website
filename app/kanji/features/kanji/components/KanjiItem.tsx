'use client';



import { useSortable } from '@dnd-kit/react/sortable';
import { GripHorizontal } from "lucide-react";
import { useState } from 'react';
import KanjiDetailModal from './KanjiModalItem';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";


import { Trash2 } from "lucide-react";

import { removeKanjiUI, useKanji } from '@/contexts/Context';
import { Kanji } from '@/app/kanji/types/kanji';

import { deleteKanji } from '../services/kanji.service';
import { deleteKanjiAPI } from '../api/kanji.client';
import KanjiCard from './KanjiCard';

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
  setItemArray, kanji, groupId, index, isClassified
}: KanjiItemProps) {


  const { data, setData, dragEnabled } = useKanji();
  const { learnedFilter, setLearnedFilter } = useKanji();


  const { ref, handleRef } = useSortable({
    id: kanji.id,
    index,
    type: "item",
    accept: "item",
    group: groupId,
    disabled: !dragEnabled

  });

  const referenceItems =
    data.kanji_reference_items[kanji.id] ?? [];
  const kanjiData =
    data.kanjis[kanji.id] ?? kanji;
  const [openDelete, setOpenDelete] = useState(false);
  const firstVocabulary =
    kanjiData.vocabularies?.[0];



    const shouldDisplay =
  learnedFilter === "all" ||
  (learnedFilter === "learned" && kanjiData.learned) ||
  (learnedFilter === "unlearned" && !kanjiData.learned);


  if (!shouldDisplay) {
  return null;
}

const hasNeedRevision =
  (data.kanji_vocabulary_items[kanji.id] ?? [])
    .some(
      (vocabularyId) =>
        data.vocabularies[vocabularyId]
          ?.need_revision
    );
  return (
    <div ref={ref}>
      <ContextMenu

      >
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
            referenceItems={referenceItems}
            isClassified={isClassified}
            dragEnabled={dragEnabled}
            handleRef={handleRef}
          />
          </div>
          
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem

            onSelect={() =>
              setOpenDelete(true)
            }
            className="text-red-600 focus:bg-red-50 focus:text-red-700"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Kanji
          </ContextMenuItem>

        </ContextMenuContent>
      </ContextMenu>

      <AlertDialog
        open={openDelete}
        onOpenChange={setOpenDelete}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete Kanji?
            </AlertDialogTitle>

            <AlertDialogDescription>
              This action cannot be undone.
              The kanji "{kanji.character}"
              will be permanently deleted.
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
              onClick={async () => {
                await deleteKanjiAPI(
                  kanji.id
                );

                removeKanjiUI(
                  setData,
                  kanji.id
                )

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