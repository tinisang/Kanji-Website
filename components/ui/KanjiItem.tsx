'use client';


import { Kanji } from '@/types/kanji';
import { useSortable } from '@dnd-kit/react/sortable';

import { useState } from 'react';
import KanjiDetailModal from './KanjiModalItem';

interface KanjiItemProps {
  kanji: Kanji;
  groupId: string;
  index: number;
  isClassified: boolean
}

export default function KanjiItem({
  kanji, groupId, index, isClassified
}: KanjiItemProps) {
  const { ref } = useSortable({
     id: kanji.id,
    index: index,
    type: 'item',
    accept: 'item',
    group: groupId,
  });

  const [data, setData] = useState(kanji);

  return (
    <article
      ref={ref}
      className="cursor-pointer flex flex-col items-start justify-center"
    >
      <KanjiDetailModal  kanji={data}
      setKanji={setData}></KanjiDetailModal>
      <div className="m-auto text-[2rem]">
        {data.character}
      </div>

      <div className="m-auto text-[0.8rem]">
        {data.han_viet}
      </div>

{
  isClassified &&  <div className="m-auto text-[0.6em]">
        {data.example}
      </div>
}
     {
      isClassified && <p className="m-auto text-[0.6em]">
        ({data.short_description})
      </p>
     }

      
    </article>
  );
}