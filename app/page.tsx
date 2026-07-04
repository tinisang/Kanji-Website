
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
import ReferenceSection from "@/app/features/reference/components/ReferenceSection";
import { getAllReferenceSets } from "./features/reference/services/reference.service";
import { getAllKanjiReferenceItems } from "./features/reference/services/reference-item.service";
import { KanjiReferenceItem } from "@/types/reference-item";
import DragToggle from "@/components/ui/DragToggle";
import FloatingToolbar from "@/components/layout/FloatingToolBar";
import { getAllVocabulary } from "./features/vocabulary/services/vocabulary.service";
import { getAllKanjiVocabulary } from "./features/kanji-vocabulary/services/kanji-vocabulary.service";

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }
  const groups = await getAllGroups();
  const kanjis = await getAllKanji();
  const kanjiGroupItems = await getAllGroupItems();

  const referenceSets = await getAllReferenceSets();
  const kanjiReferenceItems = await getAllKanjiReferenceItems();
const vocabularies = await getAllVocabulary();
const kanjiVocabularies =
  await getAllKanjiVocabulary();
  
  const data = {
    groups: Object.fromEntries(
      groups.map((group) => [group.id, group])
    ),

    kanjis: Object.fromEntries(
      kanjis.map((kanji) => [kanji.id, kanji])
    ),

    reference_sets: Object.fromEntries(
      referenceSets.map((referenceSet) => [
        referenceSet.id,
        referenceSet,
      ])
    ),

    kanji_group_items: (() => {
      const result: Record<string, string[]> =
        Object.fromEntries(
          groups.map((group) => [group.id, []])
        );

      kanjiGroupItems.forEach(
        ({ group_id, kanji_id }) => {
          result[group_id] ??= [];
          result[group_id].push(kanji_id);
        }
      );

      return result;
    })(),

    kanji_reference_items: (() => {
      const result: Record<
        string,
        KanjiReferenceItem[]
      > = Object.fromEntries(
        kanjis.map((kanji) => [kanji.id, []])
      );

      kanjiReferenceItems.forEach((item) => {
        result[item.kanji_id] ??= [];
        result[item.kanji_id].push(item);
      });

      return result;
    })(),

    vocabularies: Object.fromEntries(
  vocabularies.map((vocabulary) => [
    vocabulary.id,
    vocabulary,
  ])
),

kanji_vocabulary_items: (() => {
  const result: Record<string, string[]> =
    Object.fromEntries(
      kanjis.map((kanji) => [
        kanji.id,
        [],
      ])
    );

  kanjiVocabularies.forEach(
    ({ kanji_id, vocabulary_id }) => {
      result[kanji_id] ??= [];
      result[kanji_id].push(
        vocabulary_id
      );
    }
  );

  return result;
})(),
  };

  console.log(data)



  function handleToggle() {

  }



  return (
    <div>
      <KanjiProvider initialData={data}>
        <Header />
        <ToolBar />
        <ReferenceSection />
        <FloatingToolbar
/>
        <div className="grid grid-cols-[1fr_3fr] gap-8">
          <StatusTitle>未分類</StatusTitle>
          <StatusTitle>分類済み</StatusTitle>
        </div>



        <div className="mt-8 grid grid-cols-[1fr_3fr] gap-4">



          <HomeClient />




        </div>
      </KanjiProvider>

    </div>
  );
}


