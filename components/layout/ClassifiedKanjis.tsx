
import { useContext } from "react";
import AddGroup from "../ui/AddGroup";

import { KanjiGroup as KanjiGroupType } from "@/types/group";
import { useKanji } from "@/contexts/Context";
import KanjiGroup from "../ui/KanjiGroup";
import AddPlaceHolder from "../ui/AddPlaceHolder";



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
          <KanjiGroup key={group} id={group} index={index} data={data[group]}><AddPlaceHolder groupId={group.id} index={group.kanjis?.length || 0} /></KanjiGroup>
        ))
      }

      <AddGroup />
    </div>
  );

}