import { useDroppable } from "@dnd-kit/react";
import { useSortable } from "@dnd-kit/react/sortable";

export default function EmptyDropZone({ groupId }: { groupId: string }) {
  const { ref, isDropTarget } = useSortable({
       id: "placeholder-" + groupId,
    index: 0,
    type: 'placeholder',
    accept: 'item',
    group: groupId,
  });

  return (
    <div
      ref={ref}
      className={`
        h-32
        
        rounded-lg
        border-2
        border-dashed
        ${isDropTarget ? "bg-blue-100" : ""}
      `}
    >
      Drop kanji here

    </div>
  );
}