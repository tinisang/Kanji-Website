"use client";

import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import { useEffect, useRef, useState } from "react";

import ClassifiedKanjis from "./ClassifiedKanjis";
import UnClassifiedKanjis from "./UnClassifiedKanjis";

import { useKanji } from "@/contexts/Context";
import { updateGroupsAPI } from "@/app/kanji/features/group/api/group.client";
import { updateGroupItemsAPI } from "@/app/kanji/features/collection/api/kanji-group-item.client";

export default function HomeClient() {
  const { data } = useKanji();

  const [items, setItems] = useState(data.kanji_group_items);

  const [groups, setGroups] = useState(
    Object.values(data.groups)
      .filter(
        (group) => group.name !== "Unclassified"
      )
      .map((group) => group.id)
  );

  const initialItemsRef = useRef(items);

  useEffect(() => {
    setItems(data.kanji_group_items);
    initialItemsRef.current =
      data.kanji_group_items;
  }, [data.kanji_group_items]);

  useEffect(() => {
    setGroups(
      Object.values(data.groups)
        .filter(
          (group) =>
            group.name !== "Unclassified"
        )
        .map((group) => group.id)
    );
  }, [data.groups]);

  const saveChanges = async () => {
    const groupUpdates = groups.map(
      (groupId, position) => ({
        groupId,
        position,
      })
    );

    await updateGroupsAPI(groupUpdates);

    const previous =
      initialItemsRef.current;

    const changedItems = Object.entries(
      items
    ).flatMap(([groupId, groupItems]) =>
      groupItems.flatMap(
        (kanjiId, position) => {
          const oldGroupId = Object.entries(
            previous
          ).find(([, ids]) =>
            ids.includes(kanjiId)
          )?.[0];

          const oldPosition =
            oldGroupId != null
              ? previous[
                  oldGroupId
                ].indexOf(kanjiId)
              : -1;

          if (
            oldGroupId !== groupId ||
            oldPosition !== position
          ) {
            return {
              kanjiId,
              groupId,
              position,
            };
          }

          return [];
        }
      )
    );

    if (changedItems.length > 0) {
      await updateGroupItemsAPI(
        changedItems
      );
    }

    initialItemsRef.current = items;
  };

  return (
    <DragDropProvider
      onDragOver={(event) => {
        const { source } =
          event.operation;

        if (source?.type === "group") {
          setGroups((prev) =>
            move(prev, event)
          );
          return;
        }

        setItems((prev) =>
          move(prev, event)
        );
      }}
      onDragEnd={saveChanges}
    >
      <UnClassifiedKanjis data={items} />
      <ClassifiedKanjis data={items} />
    </DragDropProvider>
  );
}