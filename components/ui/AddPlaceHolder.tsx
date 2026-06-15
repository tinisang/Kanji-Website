import { useSortable } from "@dnd-kit/react/sortable"

export default function AddPlaceHolder({ groupId, index }: { groupId: string; index: number }) {

    const {ref} = useSortable({
        id: groupId + '-placeholder',
        index: index,
        type: 'item',
    accept: 'item',
       
        group: groupId,
         
    });

  return (
    <div  className="cursor-pointer add-place bg-gray-100/80 rounded-md border-2 border-dashed border-gray-400 p-4">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-4xl text-gray-400">+</div>
           
          </div>
      </div>
  );
}