'use client';

import { DragDropProvider, useDroppable } from "@dnd-kit/react";
import { useEffect, useState } from "react";
import AddPlaceHolder from "./AddPlaceHolder";
import { useSortable } from "@dnd-kit/react/sortable";
import { CollisionPriority } from '@dnd-kit/abstract';
import { group } from "console";
import { useKanji } from "@/contexts/Context";
import KanjiItem from "./KanjiItem";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import AddKanjiModal from "./AddKanjiModal";
import { Kanji } from "@/lib/kanji";

interface KanjiGroupProps {

  id: string;
  index: number;
  children: React.ReactNode;
  data: String[]

}

export default function KanjiGroup({ data, id, index, children }: KanjiGroupProps) {



  const { data: globalData } = useKanji();

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
    collisionPriority: CollisionPriority.Low

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



            <div className="grid gap-4 sm:grid-cols-6 xl:grid-cols-8">

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
          <ContextMenuItem>Delete Group</ContextMenuItem>

        </ContextMenuContent>
      </ContextMenu>



    </div>
  );
}
