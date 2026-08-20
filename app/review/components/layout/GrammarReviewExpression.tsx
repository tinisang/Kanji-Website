"use client";

import { useState } from "react";
import { Eye, Loader2, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

import { GrammarExpression } from "@/app/grammar/lib/types/GrammarExpression";

import {
  getGrammarExpressionExamplesByExpressionIdAPI,
} from "@/app/grammar/features/grammar_decks/clients/grammarExpressionExampleClient";
import { GrammarExpressionExample } from "@/app/grammar/lib/types/GrammarExpressionExample ";



interface Props {
  expression: GrammarExpression;
  disabled?: boolean;
}

function renderRichText(value: unknown) {
  if (!value || typeof value !== "string") {
    return "";
  }

  try {
    const parsed = JSON.parse(value);

    return typeof parsed === "string"
      ? parsed
      : "";
  } catch {
    return value;
  }
}

export default function GrammarReviewExpression({
  expression,
  disabled = false,
}: Props) {
  const [examples, setExamples] = useState<
    GrammarExpressionExample[]
  >([]);

  const [loadingExamples, setLoadingExamples] =
    useState(false);

  const [loaded, setLoaded] = useState(false);

  async function loadExamples() {
    if (loaded || loadingExamples) return;

    try {
      setLoadingExamples(true);

      const data =
        await getGrammarExpressionExamplesByExpressionIdAPI(
          expression.id
        );

      setExamples(data);
      setLoaded(true);
    } catch (error) {
      console.error(
        "Failed to load grammar expression examples:",
        error
      );
    } finally {
      setLoadingExamples(false);
    }
  }

  return (
    <div className="flex min-w-0 items-center gap-3 px-3 py-3 sm:px-4">
      <div className="min-w-0 flex-1">
        <div className="break-words text-base font-semibold text-zinc-800 sm:text-lg">
          {expression.label}
        </div>
      </div>

      <Dialog
        onOpenChange={(open) => {
          if (open) loadExamples();
        }}
      >
        <DialogTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={disabled}
            className="
              h-8 shrink-0 gap-1.5
              px-2
              text-zinc-400
              hover:bg-zinc-100
              hover:text-zinc-700
              sm:px-2.5
            "
          >
            <Eye className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">
              View
            </span>
          </Button>
        </DialogTrigger>

        <DialogContent
          className="
            w-[calc(100%-1rem)]
            max-h-[90vh]
            !max-w-6xl
            overflow-hidden
            rounded-xl
            border-0
            bg-white
            p-0
            sm:rounded-2xl
          "
        >
          <div className="max-h-[90vh] overflow-y-auto">
            <div
              className="
                grid
                grid-cols-1

                divide-y divide-zinc-200

                sm:grid-cols-2
                sm:divide-y-0

                lg:grid-cols-[0.8fr_1.05fr_1.25fr]
                lg:divide-x
              "
            >
              {/* Expression */}
              <section
                className="
                  bg-[#f3fff0]
                  px-4 py-5
                  sm:px-5 sm:py-6
                  lg:min-h-[500px]
                  lg:px-6
                "
              >
                <div className="mb-4 text-[11px] font-bold uppercase tracking-wide text-emerald-600 sm:mb-6 sm:text-xs">
                  Expression
                </div>

                <h2
                  className="
                    break-words
                    text-2xl
                    font-bold
                    leading-snug
                    text-zinc-900
                    sm:text-3xl
                  "
                >
                  {expression.label}
                </h2>

                {expression.meaning && (
                  <p
                    className="
                      mt-4
                      text-sm
                      leading-6
                      text-zinc-500
                      sm:mt-5
                      sm:text-base
                      sm:leading-7
                    "
                  >
                    {expression.meaning}
                  </p>
                )}

                {expression.note && (
                  <div
                    className="
                      prose prose-zinc
                      mt-5
                      max-w-none
                      text-sm
                      leading-6
                      sm:mt-6
                      sm:leading-7
                    "
                    dangerouslySetInnerHTML={{
                      __html: renderRichText(
                        expression.note
                      ),
                    }}
                  />
                )}
              </section>

              {/* Pattern */}
              <section
                className="
                  px-4 py-5
                  sm:px-5 sm:py-6
                  lg:px-6
                "
              >
                <div className="mb-4 flex items-center justify-between sm:mb-6">
                  <div className="text-[11px] font-bold uppercase tracking-wide text-zinc-400 sm:text-xs">
                    Pattern
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="
                      h-7
                      gap-1
                      px-2
                      text-xs
                      text-zinc-500
                      hover:bg-zinc-100
                      hover:text-zinc-800
                    "
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    <span>Edit</span>
                  </Button>
                </div>

                {expression.pattern ? (
                  <div
                    className="
                      prose prose-zinc
                      max-w-none
                      rounded-lg
                      bg-zinc-50
                      p-3
                      text-sm
                      sm:rounded-xl
                      sm:p-4
                    "
                    dangerouslySetInnerHTML={{
                      __html: renderRichText(
                        expression.pattern
                      ),
                    }}
                  />
                ) : (
                  <div className="text-sm text-zinc-400">
                    No pattern.
                  </div>
                )}
              </section>

              {/* Examples */}
              <section
                className="
                  px-4 py-5
                  sm:col-span-2
                  sm:px-5 sm:py-6
                  lg:col-span-1
                  lg:px-6
                "
              >
                <div className="mb-4 flex items-center justify-between sm:mb-6">
                  <div className="text-[11px] font-bold uppercase tracking-wide text-zinc-400 sm:text-xs">
                    Examples
                  </div>

                  {!loadingExamples &&
                    examples.length > 0 && (
                      <span className="text-xs font-medium text-zinc-400">
                        {examples.length}
                      </span>
                    )}
                </div>

                {loadingExamples ? (
                  <div className="flex items-center justify-center py-8 text-sm text-zinc-400">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </div>
                ) : examples.length > 0 ? (
                  <div
                    className="
                      grid
                      grid-cols-1
                      gap-5

                      sm:grid-cols-2
                      sm:gap-x-6
                      sm:gap-y-5

                      lg:grid-cols-1
                    "
                  >
                    {examples.map((example) => (
                      <div
                        key={example.id}
                        className="min-w-0"
                      >
                        <div
                          className="
                            break-words
                            text-sm
                            font-semibold
                            leading-6
                            text-zinc-900
                            sm:text-base
                            sm:leading-7
                          "
                        >
                          {example.example}
                        </div>

                        {example.meaning && (
                          <div
                            className="
                              mt-1
                              break-words
                              text-sm
                              leading-6
                              text-zinc-400
                            "
                          >
                            {example.meaning}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-6 text-sm text-zinc-400">
                    No examples available.
                  </div>
                )}
              </section>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}