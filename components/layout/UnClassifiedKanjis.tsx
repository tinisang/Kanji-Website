
import { useKanji } from "@/contexts/Context";
import KanjiItem from "../ui/KanjiItem";
import { useDraggable, useDroppable } from "@dnd-kit/react";
import AddPlaceHolder from "../ui/AddPlaceHolder";
import AddKanjiModal from "../ui/AddKanjiModal";
import { useState } from "react";

export default function UnClassifiedKanjis({
  data,
}: {
  data: Record<string, string[]>;
}) {
 const {data: globalData} = useKanji();
console.log('un')
const groupId = Object.values(globalData.groups)?.find(group => group.name == "Unclassified")?.id;
if (!groupId) return null;

const itemArray: any[] = data[groupId]?.map((item: string) => globalData.kanjis[item]).filter(Boolean) ?? [];
  function setItemArray() { };
 
  const {ref} = useDroppable({
  id: groupId,
    type: 'board',
    accept: 'item',
 })
   

 


    return (
        <div ref={ref} className="bg-white h-min  bg-white/80 p-4 shadow-sm grid gap-0 sm:grid-cols-3 xl:grid-cols-5 grid-rows-auto">
        {
          itemArray.map((item: any, index: number) => (
            <KanjiItem isClassified={false} key={item?.id} kanji={item} groupId={groupId} index={index} />
          ))
        }

        <AddKanjiModal setItemArray={setItemArray}   groupId={groupId}/>
        
                </div>
    );
}