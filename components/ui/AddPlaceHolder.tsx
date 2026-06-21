import { Kanji } from "@/lib/kanji";
import { SetStateAction } from "react";
import AddKanjiModal from "./AddKanjiModal";


export default function AddPlaceHolder({ groupId, index }: { groupId: string; index: number }) {

 

  return (
<AddKanjiModal groupId={groupId} setItemArray={function (value: SetStateAction<Kanji[]>): void {
      throw new Error("Function not implemented.");
    } }></AddKanjiModal>
  );
}