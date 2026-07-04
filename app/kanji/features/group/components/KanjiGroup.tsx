'use client';
import { Trash2 } from "lucide-react";

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



import { DragDropProvider, useDroppable } from "@dnd-kit/react";
import { useEffect, useState } from "react";
import AddPlaceHolder from "./AddPlaceHolder";
import { useSortable } from "@dnd-kit/react/sortable";
import { CollisionPriority } from '@dnd-kit/abstract';
import { group } from "console";
import { removeGroupUI, useKanji } from "@/contexts/Context";
import KanjiItem from "../../kanji/components/KanjiItem";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import AddKanjiModal from "../../kanji/components/AddKanjiModal";
import { deleteGroupAPI } from "../api/group.client";


interface KanjiGroupProps {

  id: string;
  index: number;
  children: React.ReactNode;
  data: string[]

}

export default function KanjiGroup({ data, id, index, children }: KanjiGroupProps) {


  const [openDelete, setOpenDelete] = useState(false);
  const { data: globalData, setData, dragEnabled } = useKanji();

  const itemIdList = data;




  const itemArray = itemIdList
    ?.map(item => globalData.kanjis[item])
    .filter(Boolean);


  function setItemArray() { };

  const { isDragSource, ref: sortableRef } = useSortable({
    id: id,
    index: index,
    type: 'group',
    accept: ['item', 'group'],
    group: "classified",
    collisionPriority: CollisionPriority.Low,
    disabled: !dragEnabled

  });




  return (
    <div ref={(node) => {

      sortableRef(node);

    }}  >


      <ContextMenu>
        <ContextMenuTrigger asChild>
          <section className={`
  border-l-4 border-l-kanji-primary
  p-4
  bg-white
data-[state=open]:bg-lime-50
      data-[state=open]:ring-1
      data-[state=open]:ring-lime-300
  
  ${isDragSource
              ? ' scale-110 shadow-xl  z-50'
              : 'shadow-sm hover:shadow-md'
            }
`}>



            <div className="flex gap-2">

              {
                itemArray?.map((item, index) => (
                  <KanjiItem setItemArray={setItemArray} isClassified={true} key={item.id} index={index} kanji={item} groupId={id}>

                  </KanjiItem>
                ))
              }

              <AddKanjiModal setItemArray={setItemArray} groupId={id} />
            </div>
          </section>
        </ContextMenuTrigger>
        <ContextMenuContent>
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
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete Group?
            </AlertDialogTitle>

            <AlertDialogDescription>
              This action cannot be undone.
              All kanji inside this group will be removed.
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
