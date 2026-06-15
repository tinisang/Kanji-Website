import { getUnclassifiedKanji } from "@/lib/kanji";
import {Kanji} from "@/types/kanji";
import UnClassifiedKanjiItem from "../ui/UnClassifiedKanjiItem";
import { useDroppable } from "@dnd-kit/react";

export default function UnClassifiedKanjis({data}: {data: Kanji[]}) {
  const {ref} = useDroppable({
    id: "unclassified",
    type: 'board',
    accept: 'item',
   
  });

    return (
        <div ref={ref} className="bg-white h-min  bg-white/80 p-4 shadow-sm grid gap-0 sm:grid-cols-3 xl:grid-cols-5 grid-rows-auto">
        
                  {data.map((kanji, index) => (
                    <UnClassifiedKanjiItem
                      key={kanji.id}
                      index={index}
                      kanji={kanji}
                      
                    />
                  ))}
        
                </div>
    );
}