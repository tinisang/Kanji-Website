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


  const {data, setData} = useKanji();


  const { ref, handleRef } = useSortable({
    id: kanji.id,
    index,
    type: "item",
    accept: "item",
    group: groupId,
  });
  const [kanjiData, setKanjiData] = useState(kanji);
  const [openDelete, setOpenDelete] = useState(false);

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
              setKanji={setKanjiData}
            >
              <div className='w-full text-center'>
                <div className="m-auto text-[2rem]">
                  {kanjiData.character}
                </div>

                <div className="m-auto text-[0.8rem]">
                  {kanjiData.han_viet}
                </div>
                {isClassified && (
                  <>
                    <div className="m-auto text-[0.6em]">
                      {kanjiData.example}
                    </div>

                    <p className="m-auto text-[0.6em]">
                      ({kanjiData.short_description})
                    </p>
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