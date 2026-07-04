'use client';

import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import { useEffect, useState } from "react";

import ClassifiedKanjis from "./ClassifiedKanjis";
import UnClassifiedKanjis from "./UnClassifiedKanjis";
import { useKanji } from "@/contexts/Context";
import { updateGroupsAPI } from "@/app/kanji/features/group/api/group.client";
import { updateGroupItemsAPI } from "@/app/kanji/features/collection/api/kanji-group-item.client";

export default function HomeClient() {
  const { data } = useKanji();
  const [items, setItems] = useState(data.kanji_group_items);

useEffect(() => {
  setItems(data.kanji_group_items);
}, [data.kanji_group_items]);


  const [groups, setGroups] = useState(
    Object.values(data.groups)
      .filter(group => group.name !== "Unclassified")
      .map(group => group.id)
  );



  const saveChanges = async () => {


    const groupUpdates = groups.map(
  (groupId, position) => ({
    groupId,
    position,
  })
);

await updateGroupsAPI(groupUpdates);

  const itemUpdates = Object.entries(items)
  .flatMap(
    ([groupId, groupItems]) =>
      groupItems.map((kanjiId, position) => ({
        kanjiId,
        groupId,
        position,
      }))
  );

await updateGroupItemsAPI(
  itemUpdates
);
  };


  return (
    <DragDropProvider
   
      onDragEnd={saveChanges}
      onDragOver={(event) => {
        const { source } = event.operation;

        if (source?.type === "group") {
          setGroups(prev => move(prev, event));
          return;
        }

        setItems(prev => move(prev, event));
      }}
    >
      <UnClassifiedKanjis data={items} />
      <ClassifiedKanjis data={items} />
    </DragDropProvider>
  );
}