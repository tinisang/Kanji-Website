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
  kanjiGroups: KanjiGroupProps[];
}

export default function HomeClient({ kanjiGroups }: HomeClientProps) {


  const [groups, setGroups] = useState(kanjiGroups);


  const unclassifiedGroup = groups.find(
    group => group.name === "Unclassified"
  );



  const classifiedGroups = groups.filter(
    group => group.name !== "Unclassified"
  );

  const dragRef = useRef({
    kanjiId: null,
    sourceGroupId: null,
    sourceIndex: null,
  });
  const { setHoverGroupId, hoverGroupId } = useDragContext();

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
function moveKanji(
  sourceGroupId: string,
  sourceIndex: number,
  targetGroupId: string,
  targetIndex: number | null
) {
  setGroups(prev => {
    const next = structuredClone(prev);

    const sourceGroup = next.find(
      group => group.id === sourceGroupId
    );

    const targetGroup = next.find(
      group => group.id === targetGroupId
    );

    if (!sourceGroup || !targetGroup) {
      return prev;
    }

    const [kanji] = sourceGroup.kanjis.splice(
      sourceIndex,
      1
    );

    if (!kanji) {
      return prev;
    }

    const insertIndex =
      targetIndex ?? targetGroup.kanjis.length;

    targetGroup.kanjis.splice(
      insertIndex,
      0,
      kanji
    );

    return next;
  });
}
  function handleDragEnd(event: any) {
  const target = event.operation.target;

  const source = {
    id: dragRef.current.kanjiId,
    group: dragRef.current.sourceGroupId,
    index: dragRef.current.sourceIndex,
  };

  if (!target) return;

  const targetGroupId =
    (target.group ?? target.id)
      .split("::")[0];

  moveKanji(
    source.group!,
    source.index!,
    targetGroupId,
    target.index ?? null
  );

  setHoverGroupId(null);
}

useEffect(() => {
  console.log("Groups changed:");
  console.log(groups);
}, [groups]);

  return (
    <DragDropProvider

      modifiers={[
        RestrictToWindow,
      ]}

      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}


    >
      {unclassifiedGroup && (
        <UnClassifiedKanjis data={unclassifiedGroup} />
      )}
      <ClassifiedKanjis data={classifiedGroups} />
    </DragDropProvider>
  );
}