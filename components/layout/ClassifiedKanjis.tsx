import { getGroupsWithKanjis, KanjiGroupProps } from "@/lib/group";
import KanjiGroup from "../ui/KanjiGroup";
import KanjiItem from "../ui/KanjiItem";
import { Kanji } from "@/types/kanji";
import AddGroup from "../ui/AddGroup";
import AddPlaceHolder from "../ui/AddPlaceHolder";
import EmptyDropZone from "../ui/EmptyDropZone";


export default function ClassifiedKanjis({ data }: { data: KanjiGroupProps[] }) {

  return (
    <div className="flex flex-col gap-4">

      {data.map((group) => (
        <KanjiGroup id={group.id} key={group.id}>
          {group.kanjis?.map((kanji: Kanji, index) => (
            <KanjiItem
              key={kanji.id}
              index={index}
              groupId={group.id}
              kanji={kanji}
            />
          ))}

          {/* {!group.kanjis && (
            <EmptyDropZone groupId={group.id} />
          )} */}

          <AddPlaceHolder groupId={group.id} index={group.kanjis?.length || 0} />
        </KanjiGroup>
      ))}

      <AddGroup />
    </div>
  );

}