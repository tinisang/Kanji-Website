"use client";

import { useEffect, useState } from "react";
import { Loader2, Plus } from "lucide-react";

import { Usage } from "@/app/vocabulary/lib/types/Usage";
import { Vocabulary } from "@/app/kanji/types/vocabulary";

import {
  createVocabularyExpression,
  deleteVocabularyExpression,
  getUsagesByVocabularyId,
  updateVocabularyExpression,
} from "@/app/vocabulary/features/vocabulary_deck/clients/vocabularyExpressionClient";

import {
  createExpressionExample,
  deleteExpressionExample,
  updateExpressionExample,
} from "@/app/vocabulary/features/vocabulary_deck/clients/expressionExampleClient";



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
import ExpressionForm from "./ExpressionForm";
import ExpressionItem from "./ExpressionItem";

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

type NewExpression = {
  word: string;
  reading: string;
  meaning: string;
};

type NewExample = {
  example: string;
  meaning: string;
};

export default function ReviewExpressions({
  vocabulary,
}: Props) {
  const [usages, setUsages] = useState<Usage[]>([]);
  const [loading, setLoading] = useState(true);

  const [editing, setEditing] =
    useState<Editing>(null);

  const [deleting, setDeleting] =
    useState<Deleting>(null);

  const [openExampleIds, setOpenExampleIds] =
    useState<Set<string>>(new Set());

  const [creatingExampleIds, setCreatingExampleIds] =
    useState<Set<string>>(new Set());

  const [newExamples, setNewExamples] =
    useState<Record<string, NewExample>>({});

  const [creatingExpression, setCreatingExpression] =
    useState(false);

  const [newExpression, setNewExpression] =
    useState<NewExpression>({
      word: "",
      reading: "",
      meaning: "",
    });

  const [saving, setSaving] = useState(false);
  const [deletingLoading, setDeletingLoading] =
    useState(false);

  /* =========================
     FETCH
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
     EXAMPLE TOGGLE
  ========================= */

  function toggleExamples(id: string) {
    setOpenExampleIds((prev) => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  }

  /* =========================
     EXPRESSION
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

      setOpenExampleIds((prev) => {
        const next = new Set(prev);
        next.add(expression.id);
        return next;
      });
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
     EXAMPLE
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

  function getNewExample(
    expressionId: string
  ): NewExample {
    return (
      newExamples[expressionId] ?? {
        example: "",
        meaning: "",
      }
    );
  }

  function updateNewExample(
    expressionId: string,
    field: keyof NewExample,
    value: string
  ) {
    setNewExamples((prev) => ({
      ...prev,
      [expressionId]: {
        ...getNewExample(expressionId),
        [field]: value,
      },
    }));
  }

  function openCreateExample(
    expressionId: string
  ) {
    setCreatingExampleIds((prev) => {
      const next = new Set(prev);
      next.add(expressionId);
      return next;
    });

    setOpenExampleIds((prev) => {
      const next = new Set(prev);
      next.add(expressionId);
      return next;
    });

    setNewExamples((prev) => ({
      ...prev,
      [expressionId]: {
        example: "",
        meaning: "",
      },
    }));
  }

  function closeCreateExample(
    expressionId: string
  ) {
    setCreatingExampleIds((prev) => {
      const next = new Set(prev);
      next.delete(expressionId);
      return next;
    });

    setNewExamples((prev) => {
      const next = { ...prev };
      delete next[expressionId];
      return next;
    });
  }

  async function handleCreateExample(
    expressionId: string
  ) {
    const data =
      getNewExample(expressionId);

    if (!data.example.trim()) return;

    try {
      setSaving(true);

      const example =
        await createExpressionExample({
          expression_id: expressionId,
          example: data.example.trim(),
          meaning: data.meaning.trim(),
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

      closeCreateExample(expressionId);
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

        setOpenExampleIds((prev) => {
          const next = new Set(prev);
          next.delete(deleting.id);
          return next;
        });

        setCreatingExampleIds((prev) => {
          const next = new Set(prev);
          next.delete(deleting.id);
          return next;
        });

        setNewExamples((prev) => {
          const next = { ...prev };
          delete next[deleting.id];
          return next;
        });
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
          <ExpressionForm
            value={newExpression}
            saving={saving}
            onChange={setNewExpression}
            onCancel={() => {
              setCreatingExpression(false);
              setNewExpression({
                word: "",
                reading: "",
                meaning: "",
              });
            }}
            onSave={handleCreateExpression}
          />
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
          usages.map((usage) => (
            <ExpressionItem
              key={usage.expression.id}
              usage={usage}
              vocabulary={vocabulary}
              isOpen={openExampleIds.has(
                usage.expression.id
              )}
              creatingExample={creatingExampleIds.has(
                usage.expression.id
              )}
              newExample={getNewExample(
                usage.expression.id
              )}
              editing={editing}
              saving={saving}
              onToggle={() =>
                toggleExamples(
                  usage.expression.id
                )
              }
              onEdit={setEditing}
              onDelete={setDeleting}
              onUpdateExpression={
                updateExpression
              }
              onSaveExpression={
                saveExpression
              }
              onUpdateExample={updateExample}
              onSaveExample={saveExample}
              onOpenCreateExample={
                openCreateExample
              }
              onCloseCreateExample={
                closeCreateExample
              }
              onUpdateNewExample={
                updateNewExample
              }
              onCreateExample={
                handleCreateExample
              }
            />
          ))
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