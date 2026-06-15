'use client';

import { useDraggable } from '@dnd-kit/react';
import { Kanji } from '@/types/kanji';
import { useSortable } from '@dnd-kit/react/sortable';

interface KanjiItemProps {
  kanji: Kanji;
  groupId: string;
  index: number;
}

export default function KanjiItem({
  kanji, groupId, index
}: KanjiItemProps) {
  const { ref } = useSortable({
     id: kanji.id,
    index: index,
    type: 'item',
    accept: 'item',
    group: groupId,
  });

  return (
    <article
      ref={ref}
      className="cursor-pointer flex flex-col items-start justify-center"
    >
      <div className="m-auto text-[2rem]">
        {kanji.character}
      </div>

      <div className="m-auto text-[0.8rem]">
        {kanji.han_viet}
      </div>

      <div className="m-auto text-[0.6em]">
        {kanji.example}
      </div>

      <p className="m-auto text-[0.6em]">
        ({kanji.short_description})
      </p>
    </article>
  );
}