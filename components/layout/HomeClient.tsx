'use client';
import { DragDropProvider, KeyboardSensor, PointerSensor } from "@dnd-kit/react";
import UnClassifiedKanjiItem from "../ui/UnClassifiedKanjiItem";
import UnClassifiedKanjis from "./UnClassifiedKanjis";
import ClassifiedKanjis from "./ClassifiedKanjis";
import { Kanji } from "@/lib/kanji";
import { KanjiGroupProps } from "@/lib/group";
import { RestrictToWindow } from "@dnd-kit/dom/modifiers";
import { Accessibility, AutoScroller } from "@dnd-kit/dom";
import { useEffect, useRef, useState } from "react";
import { move } from "@dnd-kit/helpers";
import { useDragContext } from "@/contexts/DragContext";

interface HomeClientProps {
  unClassifiedKanjis: Kanji[];
  classifiedKanjis: KanjiGroupProps[];
}

export default function HomeClient({ unClassifiedKanjis, classifiedKanjis }: HomeClientProps) {


  const [groups, setGroups] = useState(classifiedKanjis);

  const [unclassified, setUnclassified] = useState(unClassifiedKanjis);



  const dragRef = useRef({
    kanjiId: null,
    sourceGroupId: null,
    sourceIndex: null,
  });
const {
    setHoverGroupId,
  } = useDragContext();
  function handleDragOver(event: any) {
    const target = event.operation.target;

    if (!target) return;

    const {
      kanjiId,
      sourceGroupId,
      sourceIndex,
    } = dragRef.current;

    if (!kanjiId || !sourceGroupId) return;
 setHoverGroupId(
      target.group ?? target.id
    );





  }

  function handleDragStart(event: any) {
    const source = event.operation.source;

    dragRef.current = {
      kanjiId: source.id,
      sourceGroupId: source.group,
      sourceIndex: source.index,
    };


  }

  function handleDragEnd(event:any){
    setHoverGroupId(null)
  }
 
  return (
    <DragDropProvider

      modifiers={[
        RestrictToWindow,
      ]}

      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}


    >
      <UnClassifiedKanjis data={unclassified} />
      <ClassifiedKanjis data={groups} />
    </DragDropProvider>
  );
}