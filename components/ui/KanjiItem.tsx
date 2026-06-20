'use client';


import { Kanji } from '@/types/kanji';
import { useSortable } from '@dnd-kit/react/sortable';
import KanjiDetailModal from "./KanjiModalItem";

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

  return (
    <article
      ref={ref}
      className="cursor-pointer flex flex-col items-start justify-center"
    >
      <KanjiDetailModal></KanjiDetailModal>
      <div className="m-auto text-[2rem]">
        {kanji.character}
      </div>

      <div className="m-auto text-[0.8rem]">
        {kanji.han_viet}
      </div>

{
  isClassified &&  <div className="m-auto text-[0.6em]">
        {kanji.example}
      </div>
}
     {
      isClassified && <p className="m-auto text-[0.6em]">
        ({kanji.short_description})
      </p>
     }

      
    </article>
  );
}