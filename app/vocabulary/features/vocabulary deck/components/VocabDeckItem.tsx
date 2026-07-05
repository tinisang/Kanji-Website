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

export default function VocabularyDeckItem() {
  const [openDelete, setOpenDelete] = useState(false);
  return (
    <Accordion
      type="single"
      collapsible
      className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
    >
      <AccordionItem value="deck" className="border-none">
        <AccordionTrigger
          className="
            px-6 py-4
            transition-all duration-200
            hover:no-underline
            [&>svg]:hidden

            data-[state=closed]:bg-white
            data-[state=open]:bg-[#1DFFB0]
          "
        >
          <VocabularyDeckHeader
            word="人生"
            hanViet="NHÂN SINH"
            meaning="Cuộc đời"
            onDelete={() => {
              setOpenDelete(true);
            }}
          />

<AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
        <AlertDialogContent onClick={(e) => e.stopPropagation()}>
          <AlertDialogHeader>
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
              <Trash2 className="h-7 w-7 text-red-600" />
            </div>

            <AlertDialogTitle className="mt-2 text-center text-xl">
              Delete Vocabulary
            </AlertDialogTitle>

            <AlertDialogDescription className="text-center">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">
                「人生」
              </span>
              ?
              <br />
              This action is permanent and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="sm:justify-center">
            <AlertDialogCancel>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => {
                setOpenDelete(false);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

        </AccordionTrigger>

        <AccordionContent className="space-y-8 p-6">
          <VocabularyDescription
            description="Chỉ toàn bộ quá trình sống của một con người từ khi sinh ra đến khi mất đi. Thường dùng để nói về cuộc đời, trải nghiệm sống hoặc quan điểm sống."
          />

          <div className="grid gap-5 lg:grid-cols-2">
            {usages.map((usage) => (
              <VocabularyUsageItem
                key={usage.id}
                mainWord="人生"
                {...usage}
              />
            ))}
          </div>

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
  );
}