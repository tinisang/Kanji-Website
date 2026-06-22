
import { addGroupUI, useKanji } from "@/contexts/Context";

import { createGroupAPI } from "../api/group.client";





export default function AddGroup() {

  const { setData } = useKanji();

  async function handleCreateGroup() {
   createGroupAPI().then(newGroup => {
  addGroupUI(
    setData,
    newGroup
  );
});
  }

  return (
    <div onClick={handleCreateGroup} className=" flex h-12 cursor-pointer items-center justify-center rounded border border-dashed border-gray-400 text-sm text-gray-500">
      + グループを追加
    </div>
  );
}