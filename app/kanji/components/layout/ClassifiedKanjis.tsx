

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
    <div className="flex flex-col gap-4">

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