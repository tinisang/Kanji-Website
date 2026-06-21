'use client';

import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import { useEffect, useState } from "react";

import ClassifiedKanjis from "./ClassifiedKanjis";
import UnClassifiedKanjis from "./UnClassifiedKanjis";
import { useKanji } from "@/contexts/Context";

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
    await Promise.all([
      fetch("/api/kanji-group/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          groups.map((groupId, position) => ({
            groupId,
            position,
          }))
        ),
      }),

      fetch("/api/kanji-group-item/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(items),
      }),
    ]);
  };
console.log(
  data.kanji_group_items
);
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