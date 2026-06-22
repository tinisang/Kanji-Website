
import { useContext } from "react";
import AddGroup from "../../app/features/group/components/AddGroup";

import { KanjiGroup as KanjiGroupType } from "@/types/group";
import { useKanji } from "@/contexts/Context";
import KanjiGroup from "../../app/features/group/components/KanjiGroup";
import AddPlaceHolder from "../../app/features/group/components/AddPlaceHolder";
import AddKanjiModal from "../../app/features/kanji/components/AddKanjiModal";



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