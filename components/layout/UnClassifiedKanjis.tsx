
import { useKanji } from "@/contexts/Context";
import KanjiItem from "../ui/KanjiItem";
import { useDraggable, useDroppable } from "@dnd-kit/react";

export default function UnClassifiedKanjis({
  data,
}: {
  data: Record<string, string[]>;
}) {
 const {data: globalData} = useKanji();

const groupId = Object.values(globalData.groups)?.find(group => group.name=="Unclassified")?.id;


 
  const {ref} = useDroppable({
  id: groupId,
    type: 'board',
    accept: 'item',
 })
   


    return (
        <div ref={ref} className="bg-white h-min  bg-white/80 p-4 shadow-sm grid gap-0 sm:grid-cols-3 xl:grid-cols-5 grid-rows-auto">
        {
          data[groupId]?.map((item, index)=>(
            <KanjiItem isClassified={false} key={item} kanji={globalData.kanjis[item]} groupId={groupId} index={index} />
          ))
        }
        
                </div>
    );
}