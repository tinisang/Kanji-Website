'use client';

import { DragDropProvider, useDroppable } from "@dnd-kit/react";
import { useEffect } from "react";
import AddPlaceHolder from "./AddPlaceHolder";
import { useSortable } from "@dnd-kit/react/sortable";
import { CollisionPriority } from '@dnd-kit/abstract';
import { useDragContext } from "@/contexts/DragContext";

interface KanjiGroupProps {
  index: number;
  id: string;
  children: React.ReactNode;
  description?: string;
}

export default function KanjiGroup({ index, id, description, children }: KanjiGroupProps) {
  const {
    hoverGroupId,
  } = useDragContext();

  


  const { isDragSource, ref: sortableRef } = useSortable({
    id: id,
    index: index,
    type: 'group',
    accept: 'group',
  });

  const {ref} = useDroppable({
    id: id+"::droppable",
    type:"group",
    accept:"item"
  })
const hovered =
  hoverGroupId === `${id}::droppable`;



  return (


    <section ref={(node)=>{
       
    sortableRef(node);
     ref(node);
    }} className={`border-l-4 border-l-kanji-primary  p-4 shadow-sm   ${hovered ? 'bg-blue-100' : 'bg-white/80'}
  ${isDragSource ? 'opacity-50' : ''} `}>
    
        <div className="grid gap-4 sm:grid-cols-6 xl:grid-cols-10">{children}
        </div>
    </section>


  );
}
