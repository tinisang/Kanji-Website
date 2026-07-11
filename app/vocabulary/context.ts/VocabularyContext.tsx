"use client";

import { Dispatch, SetStateAction } from "react";

import {
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";

import { VocabularyData } from "../lib/types/vocabularyData";
import { VocabularyExpression } from "../lib/types/vocabularyExpression";
import { ExpressionExample } from "../lib/types/expressionExample";

interface VocabularyContextType {
  vocabularyData: VocabularyData;
  setVocabularyData: React.Dispatch<
    React.SetStateAction<VocabularyData>
  >;
}

const VocabularyContext = createContext<
  VocabularyContextType | undefined
>(undefined);

interface Props {
  children: ReactNode;
  initialData: VocabularyData;
}

export function VocabularyProvider({
  children,
  initialData,
}: Props) {
  const [vocabularyData, setVocabularyData] =
    useState<VocabularyData>(initialData);

  return (
    <VocabularyContext.Provider
      value={{
        vocabularyData,
        setVocabularyData,
      }}
    >
      {children}
    </VocabularyContext.Provider>
  );
}

export function useVocabulary() {
  const context = useContext(VocabularyContext);

  if (!context) {
    throw new Error(
      "useVocabulary must be used within VocabularyProvider"
    );
  }

  return context;
}
export function addExpressionUI(
  setVocabularyData: Dispatch<
    SetStateAction<VocabularyData>
  >,
  vocabularyId: string,
  expressionId: string
) {
  setVocabularyData((prev) => {
    const item = prev.items[vocabularyId];

    if (!item) return prev;

    

    return {
      ...prev,
      items: {
        ...prev.items,
        [vocabularyId]: {
          ...item,
          expressions: {
            ...item.expressions,
            [expressionId]: {
              expression: {
                id: expressionId,
                vocabulary_id: vocabularyId,
                word: "",
                reading: "",
                meaning: "",
                position: Object.keys(item.expressions)
                  .length,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              },
              examples: {},
            },
          },
        },
      },
    };
  });
}

export function updateExpressionUI(
  setVocabularyData: Dispatch<
    SetStateAction<VocabularyData>
  >,
  expression: VocabularyExpression
) {
  setVocabularyData((prev) => {
    const item =
      prev.items[expression.vocabulary_id];

    if (!item) return prev;

    const expressionItem =
      item.expressions[expression.id];

    if (!expressionItem) return prev;

    return {
      ...prev,
      items: {
        ...prev.items,
        [expression.vocabulary_id]: {
          ...item,
          expressions: {
            ...item.expressions,
            [expression.id]: {
              ...expressionItem,
              expression,
            },
          },
        },
      },
    };
  });
}
export function updateExpressionFieldUI(
  setVocabularyData: Dispatch<
    SetStateAction<VocabularyData>
  >,
  vocabularyId: string,
  expressionId: string,
  field: keyof Omit<
    VocabularyExpression,
    "id" | "vocabulary_id" | "created_at"
  >,
  value: string | number
) {
  setVocabularyData((prev) => {
    const item = prev.items[vocabularyId];
    if (!item) return prev;

    const expressionItem =
      item.expressions[expressionId];
    if (!expressionItem) return prev;

    return {
      ...prev,
      items: {
        ...prev.items,
        [vocabularyId]: {
          ...item,
          expressions: {
            ...item.expressions,
            [expressionId]: {
              ...expressionItem,
              expression: {
                ...expressionItem.expression,
                [field]: value,
                updated_at: new Date().toISOString(),
              },
            },
          },
        },
      },
    };
  });
}

export function addExampleUI(
  setVocabularyData: Dispatch<
    SetStateAction<VocabularyData>
  >,
  expressionId: string,
  exampleId: string
) {
  setVocabularyData((prev) => {
    for (const vocabularyId in prev.items) {
      const item = prev.items[vocabularyId];

      const expressionItem =
        item.expressions[expressionId];

      if (!expressionItem) continue;

      const examples =
        expressionItem.examples ?? {};

      return {
        ...prev,
        items: {
          ...prev.items,
          [vocabularyId]: {
            ...item,
            expressions: {
              ...item.expressions,
              [expressionId]: {
                ...expressionItem,
                examples: {
                  ...examples,
                  [exampleId]: {
                    id: exampleId,
                    expression_id: expressionId,
                    example: "",
                    meaning: "",
                     note: "",
                    position: Object.keys(examples)
                      .length,
                    created_at:
                      new Date().toISOString(),
                    updated_at:
                      new Date().toISOString(),
                  },
                },
              },
            },
          },
        },
      };
    }

    return prev;
  });
}

export function updateExampleUI(
  setVocabularyData: Dispatch<
    SetStateAction<VocabularyData>
  >,
  example: ExpressionExample
) {
  setVocabularyData((prev) => {
    for (const vocabularyId in prev.items) {
      const item = prev.items[vocabularyId];

      for (const expressionId in item.expressions) {
        const expressionItem =
          item.expressions[expressionId];

        if (!(example.id in expressionItem.examples)) {
          continue;
        }

        return {
          ...prev,
          items: {
            ...prev.items,
            [vocabularyId]: {
              ...item,
              expressions: {
                ...item.expressions,
                [expressionId]: {
                  ...expressionItem,
                  examples: {
                    ...expressionItem.examples,
                    [example.id]: example,
                  },
                },
              },
            },
          },
        };
      }
    }

    return prev;
  });
}

export function deleteExampleUI(
  setVocabularyData: Dispatch<
    SetStateAction<VocabularyData>
  >,
  exampleId: string
) {
  setVocabularyData((prev) => {
    for (const vocabularyId in prev.items) {
      const item = prev.items[vocabularyId];

      for (const expressionId in item.expressions) {
        const expressionItem =
          item.expressions[expressionId];

        if (!(exampleId in expressionItem.examples)) {
          continue;
        }

        const newExamples = {
          ...expressionItem.examples,
        };

        delete newExamples[exampleId];

        return {
          ...prev,
          items: {
            ...prev.items,
            [vocabularyId]: {
              ...item,
              expressions: {
                ...item.expressions,
                [expressionId]: {
                  ...expressionItem,
                  examples: newExamples,
                },
              },
            },
          },
        };
      }
    }

    return prev;
  });
}