"use client";

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
import VocabUsages from "./VocabUsages";

import { useEffect, useState } from "react";
import { GripVertical, Trash2 } from "lucide-react";

import { Vocabulary } from "@/app/vocabulary/lib/types/vocabulary";
import { Usage } from "@/app/vocabulary/lib/types/Usage";

import { useSortable } from "@dnd-kit/react/sortable";

import {
  deleteVocabularyUI,
  useVocabulary,
} from "@/app/vocabulary/context.ts/VocabularyContext";

import { deleteVocabulary } from "../clients/vocabularyClient";

import {
  getReviewItemByTarget,
  getReviewProgressByItemId,
} from "@/app/review/clients/review.client";
import ReviewKanji from "@/app/review/components/vocab/ReviewKanji";

export default function VocabularyDeckItem({
  vocabulary,
  expressions,
  index,
}: {
  vocabulary: Vocabulary;
  expressions: Record<string, Usage>;
  index: number;
}) {
  const [openDelete, setOpenDelete] = useState(false);
  const [reviewItem, setReviewItem] = useState<any>(null);
  const [reviewProgress, setReviewProgress] = useState<any>(null);

  const { activeFolderId, setVocabularyData } = useVocabulary();

  const { ref, handleRef } = useSortable({
    id: vocabulary.id,
    index,
    type: "item",
    accept: "item",
    group: activeFolderId,
  });

  useEffect(() => {
    let cancelled = false;

    async function loadReview() {
      try {
        const item = await getReviewItemByTarget(
          "vocabulary",
          vocabulary.id
        );

        if (cancelled) return;

        setReviewItem(item);

        if (!item?.id) {
          setReviewProgress(null);
          return;
        }

        const progress = await getReviewProgressByItemId(item.id);

        if (!cancelled) {
          setReviewProgress(progress);
        }
      } catch (error) {
        console.error("Failed to load review data:", error);
      }
    }

    loadReview();

    return () => {
      cancelled = true;
    };
  }, [vocabulary.id]);

  const handleDelete = async () => {
    deleteVocabularyUI(
      setVocabularyData,
      vocabulary.id
    );

    await deleteVocabulary(vocabulary.id);

    setOpenDelete(false);
  };

const isActiveReview =
  reviewItem !== null &&
  reviewProgress?.state !== "review";
const needRevision = isActiveReview;
  return (
    <div ref={ref}>
      <Accordion
        type="single"
        collapsible
        className="overflow-hidden border border-gray-200 bg-white shadow-sm"
      >
        <AccordionItem
          value="deck"
          className="border-none"
        >
          <AccordionTrigger
            className={`
              px-2 py-2
              transition-all duration-200
              hover:no-underline
              [&>svg]:hidden
              data-[state=closed]:bg-white data-[state=open]:bg-[#1dffb0]
          
            `}
          >
            <div
              ref={handleRef}
              onClick={(e) => e.stopPropagation()}
              className="
                mr-3 cursor-grab rounded p-1
                text-gray-400
                hover:bg-black/5
                hover:text-gray-700
                active:cursor-grabbing
              "
            >
              <GripVertical className="h-5 w-5" />
            </div>

            <div className="flex-1">
              <VocabularyDeckHeader
                vocabulary={vocabulary}
                index={index}
                word={vocabulary.word}
                hanViet={vocabulary.reading}
                meaning={vocabulary.meaning}
                onDelete={() => setOpenDelete(true)}
                needRevision={needRevision}
              />
            </div>
          </AccordionTrigger>

          <AccordionContent>
            <div className="grid grid-cols-[6fr_1fr]">
              <div>
                <VocabularyDescription
                  vocabulary={vocabulary}
                />
 <VocabUsages
              vocabulary={vocabulary}
              usages={Object.values(expressions)}
            />
              </div>

              <ReviewKanji vocabulary={vocabulary} />

            </div>

           

            {reviewItem && (
              <div className="mt-4">
                {/* Review */}
                {/* reviewItem */}
                {/* reviewProgress */}
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <AlertDialog
        open={openDelete}
        onOpenChange={setOpenDelete}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Xóa từ vựng?
            </AlertDialogTitle>

            <AlertDialogDescription>
              Bạn có chắc muốn xóa từ vựng{" "}
              <span className="font-semibold">
                {vocabulary.word}
              </span>
              ? Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>
              Hủy
            </AlertDialogCancel>

            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDelete}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}