'use client';

import { useDraggable } from '@dnd-kit/react';
import { Kanji } from '@/types/kanji';
import { useSortable } from '@dnd-kit/react/sortable';

interface KanjiItemProps {
  kanji: Kanji;
  index: number;
}


export default function UnClassifiedKanjiItem({
  index, kanji
}: KanjiItemProps) {
 
  const { isDragging, ref } = useSortable({
    id: kanji.id,
    index: index,
    type: 'item',
    accept: 'item',
    group: 'unclassified',
  });

  return (
    <article
      ref={ref}
      className={`h-min cursor-pointer flex flex-col items-start justify-center p-2 shadow-sm ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      <div className="m-auto text-[1.5rem]">
        {kanji.character}
      </div>

      <div className="m-auto text-[0.8rem]">
        {kanji.han_viet}
      </div>
    </article>
  );
}