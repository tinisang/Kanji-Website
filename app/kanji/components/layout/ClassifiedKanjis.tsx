

import AddGroup from "@/app/kanji/features/group/components/AddGroup";

import { useKanji } from "@/contexts/Context";
import KanjiGroup from "@/app/kanji/features/group/components/KanjiGroup";




export default function ClassifiedKanjis({
  data,
}: {
  data: Record<string, string[]>;
}) {

   const {data: globalData} = useKanji();
 const groupIds = Object.values(globalData.groups).filter(group => group.name !="Unclassified")?.map(group => group.id);

  return (
<div className="grid grid-cols-1 sm:grid-cols-2">

      {
        groupIds?.map((group, index)=>(
          <KanjiGroup key={group} id={group} index={index} data={data[group]}>
            {<></>}
            </KanjiGroup>
        ))
      }

      <AddGroup />
    </div>
  );

}