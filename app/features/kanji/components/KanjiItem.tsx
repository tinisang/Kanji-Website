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
import { Kanji } from '@/types/kanji';

import { deleteKanji } from '../services/kanji.service';
import { deleteKanjiAPI } from '../api/kanji.client';

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


  const { data, setData } = useKanji();


  const { ref, handleRef } = useSortable({
    id: kanji.id,
    index,
    type: "item",
    accept: "item",
    group: groupId,
  });

  const referenceItems =
    data.kanji_reference_items[kanji.id] ?? [];
  const kanjiData =
    data.kanjis[kanji.id] ?? kanji;
  const [openDelete, setOpenDelete] = useState(false);
  const firstVocabulary =
    kanjiData.vocabularies?.[0];
  return (
    <div ref={ref}>
      <ContextMenu>
        <ContextMenuTrigger asChild>

          <article

            className="
    group relative
    cursor-pointer
    rounded-md p-2
    transition-all duration-200
    hover:bg-neutral-100
    data-[state=open]:bg-lime-50
      data-[state=open]:ring-1
      data-[state=open]:ring-lime-300
  "
          >
            <div
              ref={handleRef}
              className="
    absolute top-0 left-0
    -translate-y-1

    opacity-0 transition-opacity
    group-hover:opacity-100

    cursor-grab active:cursor-grabbing
    bg-[#AEE509]
    w-full
  "
            >
              <GripHorizontal className="h-4 w-4 text-[#51670F]" />
            </div>

            <KanjiDetailModal
              kanji={kanjiData}

            >
              <div className="w-full text-center">
                <div className="mt-2 flex flex-wrap justify-center gap-1 mb-2">
                  {referenceItems.map((item) => {
                    const reference =
                      data.reference_sets[item.reference_set_id];

                    if (!reference) return null;

                    return (
                      <span
                        key={item.id}
                        className="rounded-full border px-1 py-0 text-[8px] font-semibold text-neutral-700"
                        style={{
                          backgroundColor: `${reference.color}20`,
                          borderColor: `${reference.color}55`,
                          color: `${reference.color}`
                        }}
                      >
                        {item.note? item.note : "-"}
                      </span>
                    );
                  })}
                </div>
                <div className="text-[2.8rem] leading-none">
                  {kanjiData.character}
                </div>



                <div className="mt-1 text-xs font-semibold text-lime-600">
                  {kanjiData.han_viet}
                </div>

                {isClassified && firstVocabulary && (
                  <>
                    <div className="mx-auto mt-3 inline-flex items-center gap-2 rounded-full bg-neutral-100 px-3 py-1 text-xs">
                      <span className="font-semibold">
                        {firstVocabulary.word}
                      </span>

                      <span className="text-neutral-400">•</span>

                      <span className="text-neutral-500">
                        {firstVocabulary.reading}
                      </span>
                    </div>

                    <div className="mt-2 text-[11px] text-neutral-500">
                      {firstVocabulary.meaning}
                    </div>
                  </>
                )}
              </div>
            </KanjiDetailModal>

          </article>
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