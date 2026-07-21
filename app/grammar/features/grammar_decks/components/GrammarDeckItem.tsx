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

import {
  GripVertical,
  Pencil,
  Trash2,
} from "lucide-react";

import { useSortable } from "@dnd-kit/react/sortable";

import { Grammar } from "@/app/grammar/lib/types/Grammar";
import { GrammarExpression } from "@/app/grammar/lib/types/GrammarExpression";
import { GrammarExpressionExample } from "@/app/grammar/lib/types/GrammarExpressionExample ";

import GrammmarExpressions from "./GrammarExpressions";
import { EditableText } from "@/app/kanji/features/kanji/components/EditableText";
import {
  updateGrammarUI,
  deleteGrammarUI,
  useGrammar,
} from "@/app/grammar/contexts/GrammarContext";
import {
  updateGrammar,
  deleteGrammar,
} from "../clients/grammarClient";

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
  const {
    activeFolderId,
    setGrammarData,
  } = useGrammar();

  const [editingTitle, setEditingTitle] =
    useState(false);

  const [openDelete, setOpenDelete] =
    useState(false);

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
          <AccordionTrigger className="group px-6 py-5 hover:no-underline">
            <div className="flex w-full items-center gap-3">
              <div
                ref={handleRef}
                onClick={(e) =>
                  e.stopPropagation()
                }
                className="cursor-grab text-gray-400 active:cursor-grabbing"
              >
                <GripVertical className="h-5 w-5" />
              </div>

              <div
                className={cn(
                  "flex items-center gap-2 rounded-md px-2 py-1 transition-colors",
                  editingTitle && "bg-muted"
                )}
              >
                {editingTitle ? (
                  <div
                    onClick={(e) =>
                      e.stopPropagation()
                    }
                  >
                    <EditableText
                      autoFocus
                      defaultValue={
                        grammar.title
                      }
                      className="text-2xl font-bold"
                      onBlur={() =>
                        setEditingTitle(false)
                      }
                      onSave={async (
                        title
                      ) => {
                        setEditingTitle(
                          false
                        );

                        if (
                          !title.trim() ||
                          title ===
                            grammar.title
                        )
                          return;

                        updateGrammarUI(
                          setGrammarData,
                          {
                            ...grammar,
                            title,
                          }
                        );

                        await updateGrammar({
                          ...grammar,
                          title,
                        });
                      }}
                    />
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold">
                      {grammar.title}
                    </h2>

                    <div
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setEditingTitle(
                          true
                        );
                      }}
                      className="rounded p-1 text-gray-400 opacity-0 transition hover:bg-gray-100 hover:text-black group-hover:opacity-100"
                    >
                      <Pencil className="h-4 w-4" />
                    </div>
                  </>
                )}
              </div>

              <div className="ml-auto flex items-center gap-2">
                <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-yellow-400 px-2 text-sm font-bold">
                  {
                    Object.keys(
                      expressions
                    ).length
                  }
                </span>

                <div
                  role="button"
                  tabIndex={0}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setOpenDelete(true);
                  }}
                  className="rounded p-1 text-gray-400 opacity-0 transition hover:bg-red-100 hover:text-red-600 group-hover:opacity-100"
                >
                  <Trash2 className="h-4 w-4" />
                </div>
              </div>
            </div>
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
              onClick={async () => {
                deleteGrammarUI(
                  setGrammarData,
                  grammar.id
                );

                await deleteGrammar(
                  grammar.id
                );
              }}
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