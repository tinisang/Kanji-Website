import { Kanji } from "@/lib/repositories/kanji.repository";
import { SetStateAction } from "react";
import AddKanjiModal from "../../kanji/components/AddKanjiModal";


export default function AddPlaceHolder({ groupId, index }: { groupId: string; index: number }) {

 

  return (
<AddKanjiModal groupId={groupId} setItemArray={function (value: SetStateAction<Kanji[]>): void {
      throw new Error("Function not implemented.");
    } }></AddKanjiModal>
  );
}