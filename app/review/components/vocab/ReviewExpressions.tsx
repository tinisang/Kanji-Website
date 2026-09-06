"use client";

import { useEffect, useState } from "react";
import {
  ChevronDown,
  Loader2,
  Pencil,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";

import { Usage } from "@/app/vocabulary/lib/types/Usage";

import {
  createVocabularyExpression,
  updateVocabularyExpression,
  deleteVocabularyExpression,
  getUsagesByVocabularyId,
} from "@/app/vocabulary/features/vocabulary_deck/clients/vocabularyExpressionClient";

import {
  createExpressionExample,
  updateExpressionExample,
  deleteExpressionExample,
} from "@/app/vocabulary/features/vocabulary_deck/clients/expressionExampleClient";

import { Vocabulary } from "@/app/kanji/types/vocabulary";

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

interface Props {

 
  vocabulary: Vocabulary;
}

type Editing =
  | { type: "expression"; id: string }
  | { type: "example"; id: string }
  | null;

type Deleting =
  | { type: "expression"; id: string }
  | {
      type: "example";
      id: string;
      expressionId: string;
    }
  | null;

export default function ReviewExpressions({

  vocabulary,
}: Props) {
  const [usages, setUsages] = useState<Usage[]>([]);
  const [loading, setLoading] = useState(true);

  const [editing, setEditing] =
    useState<Editing>(null);

  const [deleting, setDeleting] =
    useState<Deleting>(null);

  const [openExampleId, setOpenExampleId] =
    useState<string | null>(null);

  const [saving, setSaving] = useState(false);
  const [deletingLoading, setDeletingLoading] =
    useState(false);

  const [creatingExpression, setCreatingExpression] =
    useState(false);

  const [creatingExampleId, setCreatingExampleId] =
    useState<string | null>(null);

  const [newExpression, setNewExpression] =
    useState({
      word: "",
      reading: "",
      meaning: "",
    });

  const [newExample, setNewExample] =
    useState({
      example: "",
      meaning: "",
    });

  /* =========================
     FETCH USAGES
  ========================= */

  useEffect(() => {
    let cancelled = false;

    async function loadUsages() {
      try {
        setLoading(true);

        const data =
          await getUsagesByVocabularyId(
            vocabulary.id
          );

        if (!cancelled) {
          setUsages(Object.values(data));
        }
      } catch (error) {
        console.error(
          "Failed to load usages:",
          error
        );

        if (!cancelled) {
          setUsages([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadUsages();

    return () => {
      cancelled = true;
    };
  }, [vocabulary.id]);

  /* =========================
     UPDATE EXPRESSION
  ========================= */

  function updateExpression(
    id: string,
    field:
      | "word"
      | "reading"
      | "meaning",
    value: string
  ) {
    setUsages((prev) =>
      prev.map((usage) =>
        usage.expression.id === id
          ? {
              ...usage,
              expression: {
                ...usage.expression,
                [field]: value,
              },
            }
          : usage
      )
    );
  }

  async function saveExpression(
    usage: Usage
  ) {
    try {
      setSaving(true);

      const updated =
        await updateVocabularyExpression(
          usage.expression
        );

      setUsages((prev) =>
        prev.map((item) =>
          item.expression.id === updated.id
            ? {
                ...item,
                expression: updated,
              }
            : item
        )
      );

      setEditing(null);
    } catch (error) {
      console.error(
        "Failed to update expression:",
        error
      );
    } finally {
      setSaving(false);
    }
  }

  /* =========================
     UPDATE EXAMPLE
  ========================= */

  function updateExample(
    expressionId: string,
    exampleId: string,
    field: "example" | "meaning",
    value: string
  ) {
    setUsages((prev) =>
      prev.map((usage) =>
        usage.expression.id === expressionId
          ? {
              ...usage,
              examples: {
                ...usage.examples,
                [exampleId]: {
                  ...usage.examples[exampleId],
                  [field]: value,
                },
              },
            }
          : usage
      )
    );
  }

  async function saveExample(
    expressionId: string,
    exampleId: string
  ) {
    const usage = usages.find(
      (item) =>
        item.expression.id === expressionId
    );

    if (!usage) return;

    const example =
      usage.examples[exampleId];

    if (!example) return;

    try {
      setSaving(true);

      const updated =
        await updateExpressionExample(
          expressionId,
          example
        );

      setUsages((prev) =>
        prev.map((item) =>
          item.expression.id === expressionId
            ? {
                ...item,
                examples: {
                  ...item.examples,
                  [updated.id]: updated,
                },
              }
            : item
        )
      );

      setEditing(null);
    } catch (error) {
      console.error(
        "Failed to update example:",
        error
      );
    } finally {
      setSaving(false);
    }
  }

  /* =========================
     CREATE EXPRESSION
  ========================= */

  async function handleCreateExpression() {
    if (!newExpression.word.trim()) return;

    try {
      setSaving(true);

      const expression =
        await createVocabularyExpression(
          vocabulary.id,
          {
            vocabulary_id: vocabulary.id,
            ...newExpression,
          }
        );

      setUsages((prev) => [
        ...prev,
        {
          expression,
          examples: {},
        },
      ]);

      setCreatingExpression(false);

      setNewExpression({
        word: "",
        reading: "",
        meaning: "",
      });

      setOpenExampleId(expression.id);
    } catch (error) {
      console.error(
        "Failed to create expression:",
        error
      );
    } finally {
      setSaving(false);
    }
  }

  /* =========================
     CREATE EXAMPLE
  ========================= */

  async function handleCreateExample(
    expressionId: string
  ) {
    if (!newExample.example.trim()) return;

    try {
      setSaving(true);

      const example =
        await createExpressionExample({
          expression_id: expressionId,
          example: newExample.example.trim(),
          meaning: newExample.meaning.trim(),
          note: "",
        });

      setUsages((prev) =>
        prev.map((item) =>
          item.expression.id === expressionId
            ? {
                ...item,
                examples: {
                  ...item.examples,
                  [example.id]: example,
                },
              }
            : item
        )
      );

      setNewExample({
        example: "",
        meaning: "",
      });

      setCreatingExampleId(null);
    } catch (error) {
      console.error(
        "Failed to create example:",
        error
      );
    } finally {
      setSaving(false);
    }
  }

  /* =========================
     DELETE
  ========================= */

  async function handleDelete() {
    if (!deleting) return;

    try {
      setDeletingLoading(true);

      if (deleting.type === "expression") {
        await deleteVocabularyExpression(
          deleting.id
        );

        setUsages((prev) =>
          prev.filter(
            (usage) =>
              usage.expression.id !== deleting.id
          )
        );

        if (openExampleId === deleting.id) {
          setOpenExampleId(null);
        }
      } else {
        await deleteExpressionExample(
          deleting.expressionId,
          deleting.id
        );

        setUsages((prev) =>
          prev.map((usage) =>
            usage.expression.id ===
            deleting.expressionId
              ? {
                  ...usage,
                  examples: Object.fromEntries(
                    Object.entries(
                      usage.examples
                    ).filter(
                      ([id]) =>
                        id !== deleting.id
                    )
                  ),
                }
              : usage
          )
        );
      }

      setDeleting(null);
      setEditing(null);
    } catch (error) {
      console.error(
        "Failed to delete:",
        error
      );
    } finally {
      setDeletingLoading(false);
    }
  }

  function cancelEdit() {
    // setUsages();
    setEditing(null);
  }

  if (loading) {
    return (
      <div className="p-5 sm:p-7">
        <div className="flex justify-center py-8">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 sm:p-7">
      <div className="flex items-center justify-between">
    

        <button
          type="button"
          onClick={() =>
            setCreatingExpression(true)
          }
          className="
            inline-flex items-center gap-1
            rounded-md px-2 py-1
            text-xs font-medium
            text-emerald-600
            hover:bg-emerald-50
          "
        >
          <Plus className="h-3.5 w-3.5" />
          Expression
        </button>
      </div>

      <div className="mt-3 space-y-3">
        {creatingExpression && (
          <div
            className="
              rounded-2xl
              border border-emerald-200
              bg-emerald-50/50
              p-4
            "
          >
            <div className="space-y-2">
              <input
                autoFocus
                value={newExpression.word}
                onChange={(e) =>
                  setNewExpression((prev) => ({
                    ...prev,
                    word: e.target.value,
                  }))
                }
                placeholder="Expression"
                className="
                  w-full rounded-lg border
                  bg-background px-3 py-2
                  text-sm font-bold outline-none
                  focus:border-emerald-300
                "
              />

      

              <input
                value={newExpression.meaning}
                onChange={(e) =>
                  setNewExpression((prev) => ({
                    ...prev,
                    meaning: e.target.value,
                  }))
                }
                placeholder="Meaning"
                className="
                  w-full rounded-lg border
                  bg-background px-3 py-2
                  text-sm outline-none
                  focus:border-emerald-300
                "
              />

              <div className="flex justify-end gap-1">
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => {
                    setCreatingExpression(false);
                    setNewExpression({
                      word: "",
                      reading: "",
                      meaning: "",
                    });
                  }}
                  className="
                    rounded-md p-1.5
                    text-muted-foreground
                    hover:bg-background
                  "
                >
                  <X className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  disabled={
                    saving ||
                    !newExpression.word.trim()
                  }
                  onClick={
                    handleCreateExpression
                  }
                  className="
                    rounded-md p-1.5
                    text-emerald-600
                    hover:bg-emerald-100
                    disabled:opacity-50
                  "
                >
                  {saving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {usages.length === 0 &&
        !creatingExpression ? (
          <div
            className="
              rounded-2xl bg-muted/40
              p-5 text-sm
              text-muted-foreground
            "
          >
            No expressions.
          </div>
        ) : (
          usages.map((usage) => {
            const expression =
              usage.expression.word;

            const expressionIndex =
              expression.indexOf(vocabulary.word );

            const examples = Object.values(
              usage.examples
            );

            const hasExamples =
              examples.length > 0;

            const expressionEditing =
              editing?.type === "expression" &&
              editing.id ===
                usage.expression.id;

            const examplesOpen =
              openExampleId ===
              usage.expression.id;

            return (
              <div
                key={usage.expression.id}
                className="
                  rounded-2xl
                  bg-emerald-50/80
                  px-4 py-3
                  sm:px-5 sm:py-4
                "
              >
                {expressionEditing ? (
                  <div className="space-y-2">
                    <input
                      autoFocus
                      value={
                        usage.expression.word
                      }
                      onChange={(e) =>
                        updateExpression(
                          usage.expression.id,
                          "word",
                          e.target.value
                        )
                      }
                      className="
                        w-full rounded-lg border
                        bg-background px-3 py-2
                        text-sm font-bold outline-none
                        focus:border-emerald-300
                      "
                    />

                

                    <input
                      value={
                        usage.expression.meaning ??
                        ""
                      }
                      onChange={(e) =>
                        updateExpression(
                          usage.expression.id,
                          "meaning",
                          e.target.value
                        )
                      }
                      className="
                        w-full rounded-lg border
                        bg-background px-3 py-2
                        text-sm outline-none
                        focus:border-emerald-300
                      "
                    />

                    <div className="flex justify-end gap-1">
                      <button
                        type="button"
                        disabled={saving}
                        onClick={cancelEdit}
                        className="
                          rounded-md p-1.5
                          text-muted-foreground
                          hover:bg-background
                        "
                      >
                        <X className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        disabled={saving}
                        onClick={() =>
                          saveExpression(
                            usage
                          )
                        }
                        className="
                          rounded-md p-1.5
                          text-emerald-600
                          hover:bg-emerald-100
                        "
                      >
                        {saving ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Save className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-2">
                    <button
                      type="button"
                      disabled={!hasExamples}
                      onClick={() =>
                        setOpenExampleId(
                          examplesOpen
                            ? null
                            : usage.expression.id
                        )
                      }
                      className="
                        mt-1 shrink-0
                        text-muted-foreground
                        disabled:opacity-30
                      "
                    >
                      <ChevronDown
                        className={`
                          h-4 w-4
                          transition-transform
                          ${
                            examplesOpen
                              ? "rotate-180"
                              : ""
                          }
                        `}
                      />
                    </button>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <div className="break-words text-base font-bold sm:text-lg">
                          {expressionIndex ===
                          -1 ? (
                            expression
                          ) : (
                            <>
                              {expression.slice(
                                0,
                                expressionIndex
                              )}

                              <span className="text-emerald-600">
                                {expression.slice(
                                  expressionIndex,
                                  expressionIndex +
                                    vocabulary.word.length
                                )}
                              </span>

                              {expression.slice(
                                expressionIndex +
                                  vocabulary.word.length
                              )}
                            </>
                          )}
                        </div>

                        {hasExamples && (
                          <span
                            className="
                              h-2 w-2 shrink-0
                              rounded-full
                              bg-red-500
                            "
                          />
                        )}
                      </div>

                      {usage.expression.meaning && (
                        <div className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
                          {
                            usage.expression
                              .meaning
                          }
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setEditing({
                          type: "expression",
                          id: usage.expression.id,
                        })
                      }
                      className="
                        shrink-0 rounded-md p-1.5
                        text-muted-foreground
                        hover:bg-background
                        hover:text-emerald-600
                      "
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setDeleting({
                          type: "expression",
                          id: usage.expression.id,
                        })
                      }
                      className="
                        shrink-0 rounded-md p-1.5
                        text-muted-foreground
                        hover:bg-rose-50
                        hover:text-rose-600
                      "
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}

                {examplesOpen && (
                  <div
                    className="
                      mt-3 space-y-3
                      border-t border-emerald-100
                      pt-3
                    "
                  >
                    {examples.map((example) => {
                      const exampleEditing =
                        editing?.type ===
                          "example" &&
                        editing.id ===
                          example.id;

                      return (
                        <div
                          key={example.id}
                          className="
                            border-l-2
                            border-emerald-200
                            pl-3
                          "
                        >
                          {exampleEditing ? (
                            <div className="space-y-2">
                              <input
                                autoFocus
                                value={
                                  example.example
                                }
                                onChange={(e) =>
                                  updateExample(
                                    usage.expression.id,
                                    example.id,
                                    "example",
                                    e.target.value
                                  )
                                }
                                className="
                                  w-full rounded-lg
                                  border bg-background
                                  px-3 py-2
                                  text-xs outline-none
                                  focus:border-emerald-300
                                "
                              />

                              <input
                                value={
                                  example.meaning ??
                                  ""
                                }
                                onChange={(e) =>
                                  updateExample(
                                    usage.expression.id,
                                    example.id,
                                    "meaning",
                                    e.target.value
                                  )
                                }
                                className="
                                  w-full rounded-lg
                                  border bg-background
                                  px-3 py-2
                                  text-xs outline-none
                                  focus:border-emerald-300
                                "
                              />

                              <div className="flex justify-end gap-1">
                                <button
                                  type="button"
                                  disabled={saving}
                                  onClick={
                                    cancelEdit
                                  }
                                  className="
                                    rounded-md p-1.5
                                    text-muted-foreground
                                    hover:bg-background
                                  "
                                >
                                  <X className="h-3.5 w-3.5" />
                                </button>

                                <button
                                  type="button"
                                  disabled={saving}
                                  onClick={() =>
                                    saveExample(
                                      usage.expression.id,
                                      example.id
                                    )
                                  }
                                  className="
                                    rounded-md p-1.5
                                    text-emerald-600
                                    hover:bg-emerald-100
                                  "
                                >
                                  {saving ? (
                                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                  ) : (
                                    <Save className="h-3.5 w-3.5" />
                                  )}
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-start gap-1">
                              <div className="min-w-0 flex-1">
                                <div className="text-xs leading-relaxed sm:text-sm">
                                  {
                                    example.example
                                  }
                                </div>

                                {example.meaning && (
                                  <div className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                                    {
                                      example.meaning
                                    }
                                  </div>
                                )}
                              </div>

                              <button
                                type="button"
                                onClick={() =>
                                  setEditing({
                                    type: "example",
                                    id: example.id,
                                  })
                                }
                                className="
                                  shrink-0 rounded-md p-1
                                  text-muted-foreground
                                  hover:bg-background
                                  hover:text-emerald-600
                                "
                              >
                                <Pencil className="h-3 w-3" />
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  setDeleting({
                                    type: "example",
                                    id: example.id,
                                    expressionId:
                                      usage.expression.id,
                                  })
                                }
                                className="
                                  shrink-0 rounded-md p-1
                                  text-muted-foreground
                                  hover:bg-rose-50
                                  hover:text-rose-600
                                "
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {creatingExampleId ===
                    usage.expression.id ? (
                      <div className="border-l-2 border-emerald-200 pl-3">
                        <div className="space-y-2">
                          <input
                            autoFocus
                            value={
                              newExample.example
                            }
                            onChange={(e) =>
                              setNewExample(
                                (prev) => ({
                                  ...prev,
                                  example:
                                    e.target.value,
                                })
                              )
                            }
                            placeholder="Example"
                            className="
                              w-full rounded-lg
                              border bg-background
                              px-3 py-2
                              text-xs outline-none
                              focus:border-emerald-300
                            "
                          />

                          <input
                            value={
                              newExample.meaning
                            }
                            onChange={(e) =>
                              setNewExample(
                                (prev) => ({
                                  ...prev,
                                  meaning:
                                    e.target.value,
                                })
                              )
                            }
                            placeholder="Meaning"
                            className="
                              w-full rounded-lg
                              border bg-background
                              px-3 py-2
                              text-xs outline-none
                              focus:border-emerald-300
                            "
                          />

                          <div className="flex justify-end gap-1">
                            <button
                              type="button"
                              disabled={saving}
                              onClick={() => {
                                setCreatingExampleId(
                                  null
                                );
                                setNewExample({
                                  example: "",
                                  meaning: "",
                                });
                              }}
                              className="
                                rounded-md p-1.5
                                text-muted-foreground
                                hover:bg-background
                              "
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>

                            <button
                              type="button"
                              disabled={
                                saving ||
                                !newExample.example.trim()
                              }
                              onClick={() =>
                                handleCreateExample(
                                  usage.expression.id
                                )
                              }
                              className="
                                rounded-md p-1.5
                                text-emerald-600
                                hover:bg-emerald-100
                                disabled:opacity-50
                              "
                            >
                              {saving ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              ) : (
                                <Save className="h-3.5 w-3.5" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setCreatingExampleId(
                            usage.expression.id
                          );
                          setNewExample({
                            example: "",
                            meaning: "",
                          });
                        }}
                        className="
                          ml-3 inline-flex
                          items-center gap-1
                          rounded-md px-2 py-1
                          text-xs font-medium
                          text-emerald-600
                          hover:bg-emerald-50
                        "
                      >
                        <Plus className="h-3 w-3" />
                        Example
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      <AlertDialog
        open={deleting !== null}
        onOpenChange={(open) => {
          if (!open && !deletingLoading) {
            setDeleting(null);
          }
        }}
      >
        <AlertDialogContent className="sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {deleting?.type === "expression"
                ? "Delete expression?"
                : "Delete example?"}
            </AlertDialogTitle>

            <AlertDialogDescription>
              {deleting?.type === "expression"
                ? "This will permanently delete this expression and its associated examples."
                : "This will permanently delete this example."}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={deletingLoading}
            >
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              disabled={deletingLoading}
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              className="
                bg-rose-600
                hover:bg-rose-700
              "
            >
              {deletingLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}