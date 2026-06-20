'use client';

import { DragDropProvider, useDroppable } from "@dnd-kit/react";
import { useEffect } from "react";
import AddPlaceHolder from "./AddPlaceHolder";
import { useSortable } from "@dnd-kit/react/sortable";
import { CollisionPriority } from '@dnd-kit/abstract';
import { group } from "console";
import { useKanji } from "@/contexts/Context";
import KanjiItem from "./KanjiItem";


interface KanjiGroupProps {
 
  id: string;
  index: number;
  children: React.ReactNode;
  data: String[]
 
}

export default function KanjiGroup({data, id, index, children }: KanjiGroupProps) {

  

  const {data: globalData}=useKanji();

  const itemIdList = data;
  const itemArray = itemIdList?.map(item => globalData.kanjis[item]);

  const { isDragSource, ref: sortableRef } = useSortable({
    id: id,
    index: index,
    type: 'group',
    accept: ['item','group'],
    group:"classified",
    collisionPriority: CollisionPriority.Low
    
  });
  



  return (


    <section ref={(node)=>{
       
    sortableRef(node);
    
    }} className={`
  border-l-4 border-l-kanji-primary
  p-4
  bg-white

  
  ${isDragSource
    ? ' scale-110 shadow-xl  z-50'
    : 'shadow-sm hover:shadow-md'
  }
`}>
    
        <div className="grid gap-4 sm:grid-cols-6 xl:grid-cols-10">
          
          {
            itemArray?.map((item,index)=>(
              <KanjiItem key={item.id} index={index} kanji={globalData.kanjis[item.id]} groupId={id}>

              </KanjiItem>
            ))
          }
          
          {children}
        </div>
    </section>


  );
}
