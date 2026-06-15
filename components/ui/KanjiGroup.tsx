'use client';

import { DragDropProvider, useDroppable } from "@dnd-kit/react";
import { useEffect } from "react";
import AddPlaceHolder from "./AddPlaceHolder";
import { useSortable } from "@dnd-kit/react/sortable";


interface KanjiGroupProps {
  index: number;
  id: string;
  children: React.ReactNode;
  description?: string;
}

export default function KanjiGroup({ index, id, description, children }: KanjiGroupProps) {

  const { isDropTarget, ref } = useDroppable({
    id: id,
    type: 'column',
    accept: 'item',
  });

  const {ref: sortableRef} = useSortable({
    id: id,
    index: index,
    type: 'item',
    accept: 'item',
  });

  useEffect(() => {

}, [id, isDropTarget]);


  return (


    <section ref={sortableRef} className={`border-l-4 border-l-kanji-primary  p-4 shadow-sm ${isDropTarget ? 'bg-blue-100' : '  bg-white/80'}  `}>

      <div className="grid gap-4 sm:grid-cols-6 xl:grid-cols-10">{children}
      

      </div>
    </section>


  );
}
