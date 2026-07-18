"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { cn } from "@/lib/utils";

import { GripVertical } from "lucide-react";
import { useDraggable } from "@dnd-kit/react";

import { Grammar } from "@/app/grammar/lib/types/Grammar";
import { GrammarExpression } from "@/app/grammar/lib/types/GrammarExpression";
import { GrammarExpressionExample } from "@/app/grammar/lib/types/GrammarExpressionExample ";
import GrammmarExpressions from "./GrammarExpressions";
import { useSortable } from "@dnd-kit/react/sortable";
import { useGrammar } from "@/app/grammar/contexts/GrammarContext";


interface Props {
  grammar: Grammar;
  expressions: Record<
    string,
    {
      expression: GrammarExpression;
      examples: Record<
        string,
        GrammarExpressionExample
      >;
    }
  >;
  index: number;
}

export default function GrammarDeckItem({
  index,
  grammar,
  expressions,
}: Props) {
  const {activeFolderId} = useGrammar();
  const {
    ref,
    handleRef,
    isDragging,
  } = useSortable({
    id: grammar.id,
    index:index,
    type: "item",
    accept: "item",
    group: activeFolderId ,
  });

  return (
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
        <AccordionTrigger className="px-6 py-5 hover:no-underline">
  <div className="flex w-full items-center gap-3">
    <div
      ref={handleRef}
      onClick={(e) => e.stopPropagation()}
      className="cursor-grab text-gray-400 active:cursor-grabbing"
    >
      <GripVertical className="h-5 w-5" />
    </div>

    <h2 className="text-2xl font-bold">
      {grammar.title}
    </h2>

    <span className="ml-auto flex h-7 min-w-7 items-center justify-center rounded-full bg-yellow-400 px-2 text-sm font-bold">
      {Object.keys(expressions).length}
    </span>
  </div>
</AccordionTrigger>

        <AccordionContent className="space-y-3 border-t p-4">
          <GrammmarExpressions grammar={grammar} expressions={expressions}></GrammmarExpressions>
          
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}