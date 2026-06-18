import { getUnclassifiedKanji } from "@/lib/kanji";
import {Kanji} from "@/types/kanji";
import UnClassifiedKanjiItem from "../ui/UnClassifiedKanjiItem";
import { useDroppable } from "@dnd-kit/react";
import { KanjiGroupProps } from "@/lib/group";
import KanjiItem from "../ui/KanjiItem";

export default function UnClassifiedKanjis({data}: {data: KanjiGroupProps}) {
 
  const {ref} = useDroppable({
    id: data.id,
    type: 'board',
    accept: 'item',
   
  });

    return (
        <div ref={ref} className="bg-white h-min  bg-white/80 p-4 shadow-sm grid gap-0 sm:grid-cols-3 xl:grid-cols-5 grid-rows-auto">
        
                  {data.kanjis?.map((kanji, index) => (
                    <KanjiItem
                      key={kanji.id}
                      index={index}
                      groupId={data.id}
                      kanji={kanji}
                      
                    />
                  ))}
        
                </div>
    );
}