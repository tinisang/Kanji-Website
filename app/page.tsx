
import Header from "@/components/layout/Header";
import HomeClient from "@/components/layout/HomeClient";


import StatusTitle from "@/components/ui/StatusTitle";
import ToolBar from "@/components/ui/ToolBar";
import { DragProvider } from "@/contexts/DragContext";
import { getGroupsWithKanjis } from "@/lib/group";
import { getUnclassifiedKanji } from "@/lib/kanji";


export default async function Home() {

   const unClassifiedKanjis = await getUnclassifiedKanji();
  const classifiedKanjis = await getGroupsWithKanjis();

  return (
    <div>
      <Header />
      <ToolBar />
      <div className="grid grid-cols-[1fr_3fr] gap-8">
        <StatusTitle>未分類</StatusTitle>
        <StatusTitle>分類済み</StatusTitle>
      </div>



      <div className="mt-8 grid grid-cols-[1fr_3fr] gap-4">
        
 <DragProvider>
          <HomeClient unClassifiedKanjis={unClassifiedKanjis} classifiedKanjis={classifiedKanjis} />
</DragProvider>
      
      </div>

    </div>
  );
}


