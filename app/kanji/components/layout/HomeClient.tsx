"use client";

import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import { useEffect, useRef, useState } from "react";

import ClassifiedKanjis from "./ClassifiedKanjis";
import UnClassifiedKanjis from "./UnClassifiedKanjis";

import { useKanji } from "@/contexts/Context";
import { updateGroupsAPI } from "@/app/kanji/features/group/api/group.client";
import { updateGroupItemsAPI } from "@/app/kanji/features/collection/api/kanji-group-item.client";
import ContentMarker from "./ContentMarker";

export default function HomeClient() {
  const { data } = useKanji();

  const getGroups = () =>
    Object.values(data.groups)
      .filter(group => group.name !== "Unclassified")
      .map(group => group.id);

  const [items, setItems] = useState(data.kanji_group_items);
  const [groups, setGroups] = useState(getGroups);

  const initialItemsRef = useRef(data.kanji_group_items);
  const initialGroupsRef = useRef(getGroups());

  useEffect(() => {
    const next = getGroups();

    setGroups(next);
    initialGroupsRef.current = next;
  }, [data.groups]);

  useEffect(() => {
    setItems(data.kanji_group_items);
    initialItemsRef.current = structuredClone(
      data.kanji_group_items
    );
  }, [data.kanji_group_items]);

  const saveChanges = async () => {
    const groupUpdates = groups.flatMap((groupId, position) =>
      initialGroupsRef.current[position] !== groupId
        ? [{ groupId, position }]
        : []
    );

    if (groupUpdates.length) {
      await updateGroupsAPI(groupUpdates);
    }

    const changedItems = Object.entries(items).flatMap(
      ([groupId, ids]) =>
        ids.flatMap((kanjiId, position) =>
          initialItemsRef.current[groupId]?.[position] !== kanjiId
            ? [{ kanjiId, groupId, position }]
            : []
        )
    );

    if (changedItems.length) {
      await updateGroupItemsAPI(changedItems);
    }

    initialGroupsRef.current = [...groups];
    initialItemsRef.current = structuredClone(items);
  };

  return (
    <DragDropProvider
      onDragOver={event => {
        const { source } = event.operation;

        if (source?.type === "group") {
          setGroups(prev => move(prev, event));
          return;
        }

        setItems(prev => move(prev, event));
      }}
      onDragEnd={saveChanges}
    >
      <ContentMarker/>
      {/* <UnClassifiedKanjis data={items} /> */}
      <ClassifiedKanjis data={items} />
    </DragDropProvider>
  );
}