'use client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";


import VocabularyDeckHeader from "./VocabularyDeckHeader";
import VocabularyDescription from "./VocabularyDescription";
import VocabularyUsageItem from "./VocabularyUsageItem";
import VocabularyReferenceSection from "./VocabularyReferenceSection";

import { usages, references } from "./mock";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import VocabUsages from "./VocabUsages";
import { Vocabulary } from "@/app/vocabulary/lib/types/vocabulary";
import { VocabularyExpression } from "@/app/vocabulary/lib/types/vocabularyExpression";
import { Usage } from "@/app/vocabulary/lib/types/Usage";
import { useSortable } from "@dnd-kit/react/sortable";
import { GripVertical } from "lucide-react";
import { useVocabulary } from "@/app/vocabulary/context.ts/VocabularyContext";

export default function VocabularyDeckItem({
  vocabulary,
  expressions,
  index
}: {
  vocabulary: Vocabulary;
  expressions: Record<string, Usage>;
  index: number
}) {
  const [openDelete, setOpenDelete] = useState(false);
  const {activeFolderId} = useVocabulary();

   const { ref, handleRef } = useSortable({
    id: vocabulary.id,
    index:index,
    type: "vocab",
    accept: "vocab",
    group: activeFolderId ,
  

  });

  
  return (
    <div ref={ref}>

  
    <Accordion
      type="single"
      collapsible
      className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
    >
      <AccordionItem value="deck" className="border-none">
        <AccordionTrigger
  className="
    px-2 py-4
    transition-all duration-200
    hover:no-underline
    [&>svg]:hidden
    data-[state=closed]:bg-white
    data-[state=open]:bg-[#1DFFB0]
  "
>
  <div
    ref={handleRef}
    onClick={(e) => e.stopPropagation()}
    className="mr-3 cursor-grab rounded p-1 text-gray-400 hover:bg-black/5 hover:text-gray-700 active:cursor-grabbing"
  >
    <GripVertical className="h-5 w-5" />
  </div>

  <div className="flex-1">
    <VocabularyDeckHeader
      word={vocabulary.word}
      hanViet={vocabulary.reading}
      meaning={vocabulary.meaning}
      onDelete={() => setOpenDelete(true)}
    />
  </div>
</AccordionTrigger>

        <AccordionContent className="space-y-8 p-6">
          <VocabularyDescription
            description="Chỉ toàn bộ quá trình sống của một con người từ khi sinh ra đến khi mất đi. Thường dùng để nói về cuộc đời, trải nghiệm sống hoặc quan điểm sống."
          />

         <VocabUsages
  vocabulary={vocabulary}
   usages={expressions}
/>

          <div className="grid gap-8 lg:grid-cols-2">
            <VocabularyReferenceSection
              title="Từ đồng nghĩa"
              color="bg-emerald-400"
              items={references.synonyms}
            />

            <VocabularyReferenceSection
              title="Từ trái nghĩa"
              color="bg-pink-500"
              items={references.antonyms}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
      </div>
  );
}