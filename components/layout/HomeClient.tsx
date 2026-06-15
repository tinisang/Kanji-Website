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

  function handleDragEnd(event: any) {
    const target = event.operation.target;

    if (!target) return;

    const {
      kanjiId,
      sourceGroupId,
      sourceIndex,
    } = dragRef.current;

    if (!kanjiId || !sourceGroupId) return;

    const targetGroupId =
      target.group ?? target.id;

    const targetIndex =
      target.type === "item"
        ? target.index
        : groups.find(
          (g) => g.id === targetGroupId
        )?.kanjis.length ?? 0;

    console.log({
      kanjiId,
      sourceGroupId,
      sourceIndex,
      targetGroupId,
      targetIndex,
    });

    if (
      kanjiId === null ||
      sourceGroupId === null ||
      sourceIndex === null
    ) {
      return;
    }

    const kanji = unclassified[sourceIndex];
   
    

    const targetGroup = groups.find(
  group => group.id === targetGroupId
);

console.log("Target group found:", targetGroup);



  }

  function handleDragStart(event: any) {
    const source = event.operation.source;

    dragRef.current = {
      kanjiId: source.id,
      sourceGroupId: source.group,
      sourceIndex: source.index,
    };


  }
 
  return (
    <DragDropProvider

      modifiers={[
        RestrictToWindow,
      ]}

      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}


    >
      <UnClassifiedKanjis data={unclassified} />
      <ClassifiedKanjis data={groups} />
    </DragDropProvider>
  );
}