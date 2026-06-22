
import { auth } from "@/auth";
import Header from "@/components/layout/Header";
import HomeClient from "@/components/layout/HomeClient";


import StatusTitle from "@/components/layout/StatusTitle";
import ToolBar from "@/components/layout/ToolBar";
import { KanjiProvider } from "@/contexts/Context";
import { getAllGroups } from "@/app/features/group/services/group.service";


import { redirect } from "next/navigation";

import { getAllKanji } from "./features/kanji/services/kanji.service";
import { getAllGroupItems } from "./features/collection/services/kanji-group.service";


export default async function Home() {
 const session = await auth();

  if (!session) {
    redirect("/login");
  }
  const groups = await getAllGroups();
  const kanjis = await getAllKanji();
  const kanjiGroupItems = await getAllGroupItems();


 const data = {
  groups: Object.fromEntries(
    groups.map(group => [group.id, group])
  ),

  kanjis: Object.fromEntries(
    kanjis.map(kanji => [kanji.id, kanji])
  ),

  kanji_group_items: (() => {
    const result: Record<string, string[]> =
      Object.fromEntries(
        groups.map(group => [group.id, []])
      );

    kanjiGroupItems.forEach(
      ({ group_id, kanji_id }) => {
        result[group_id] ??= [];
        result[group_id].push(kanji_id);
      }
    );

    return result;
  })(),
};



  

  return (
    <div>
      <Header />
      <ToolBar />
      <div className="grid grid-cols-[1fr_3fr] gap-8">
        <StatusTitle>未分類</StatusTitle>
        <StatusTitle>分類済み</StatusTitle>
      </div>



      <div className="mt-8 grid grid-cols-[1fr_3fr] gap-4">
        

        <KanjiProvider initialData={data}>
          <HomeClient />
        </KanjiProvider>


      
      </div>

    </div>
  );
}


