"use client";

import { useState } from "react";

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

import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { useSortable } from "@dnd-kit/react/sortable";

import { Grammar } from "@/app/grammar/lib/types/Grammar";
import { GrammarExpression } from "@/app/grammar/lib/types/GrammarExpression";
import { GrammarExpressionExample } from "@/app/grammar/lib/types/GrammarExpressionExample ";

import GrammmarExpressions from "./GrammarExpressions";
import GrammarDeckHeader from "./GrammarDeckHeader";

import {
  deleteGrammarUI,
  useGrammar,
} from "@/app/grammar/contexts/GrammarContext";

import { deleteGrammar } from "../clients/grammarClient";

interface Props {
  grammar: Grammar;

  expressions: Record<
    string,
    {
      expression: GrammarExpression;
      examples: Record<string, GrammarExpressionExample>;
    }
  >;

  index: number;
}

export default function GrammarDeckItem({
  grammar,
  expressions,
  index,
}: Props) {
  const {
    activeFolderId,
    setGrammarData,
  } = useGrammar();

  const [openDelete, setOpenDelete] = useState(false);

  const {
    ref,
    handleRef,
    isDragging,
  } = useSortable({
    id: grammar.id,
    index,
    type: "item",
    accept: "item",
    group: activeFolderId,
  });

  const handleDelete = async () => {
    deleteGrammarUI(
      setGrammarData,
      grammar.id
    );

    await deleteGrammar(grammar.id);
  };

  return (
    <>
      <Accordion
        ref={ref}
        type="single"
        collapsible
        className={cn(
          "overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm",
          isDragging && "opacity-50"
        )}
      >
        <AccordionItem
          value={grammar.id}
          className="border-none"
        >
          <AccordionTrigger
            className="group px-6 py-5 hover:no-underline"
          >
            <GrammarDeckHeader
              grammar={grammar}
              expressionCount={
                Object.keys(expressions).length
              }
              handleRef={handleRef}
              onDelete={() => setOpenDelete(true)}
            />
          </AccordionTrigger>

          <AccordionContent className="space-y-3 border-t p-4">
            <GrammmarExpressions
              grammar={grammar}
              expressions={expressions}
            />
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
              Xóa ngữ pháp?
            </AlertDialogTitle>

            <AlertDialogDescription>
              Bạn có chắc muốn xóa{" "}
              <span className="font-semibold">
                {grammar.title}
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
    </>
  );
}