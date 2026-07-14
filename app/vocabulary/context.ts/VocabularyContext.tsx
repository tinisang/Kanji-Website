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
import { FolderItem } from "../lib/types/vocabularyFolder";
import { Vocabulary } from "../lib/types/vocabulary";
import { VocabularyFolderItem } from "../lib/types/vocabularyFolderItem";
interface VocabularyContextType {
  vocabularyData: VocabularyData;
  setVocabularyData: React.Dispatch<
    React.SetStateAction<VocabularyData>
  >;

  reorderFolders: boolean;
  setReorderFolders: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  activeFolderId: string;
setActiveFolderId: React.Dispatch<
  React.SetStateAction<string>
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
const [reorderFolders, setReorderFolders] =
  useState(false);
  const [activeFolderId, setActiveFolderId] =
  useState("all");
  return (
    <VocabularyContext.Provider
      value={{
        vocabularyData,
        setVocabularyData,
        reorderFolders,
        setReorderFolders,
        activeFolderId,
        setActiveFolderId

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


export function addFolderUI(
  setVocabularyData: Dispatch<
    SetStateAction<VocabularyData>
  >,
  folder: FolderItem
) {
  setVocabularyData((prev) => ({
    ...prev,
    folders: {
      ...prev.folders,
      [folder.id]: folder,
    },
    vocab_folder_items: {
      ...prev.vocab_folder_items,
      [folder.id]: {},
    },
  }));
}

export function updateFolderUI(
  setVocabularyData: Dispatch<
    SetStateAction<VocabularyData>
  >,
  folder: FolderItem
) {
  setVocabularyData((prev) => {
    const oldFolder = prev.folders[folder.id];

    if (!oldFolder) {
      return prev;
    }

    return {
      ...prev,
      folders: {
        ...prev.folders,
        [folder.id]: {
          ...oldFolder,
          ...folder,
        },
      },
    };
  });
}

export function deleteFolderUI(
  setVocabularyData: Dispatch<
    SetStateAction<VocabularyData>
  >,
  folderId: string
) {
  setVocabularyData((prev) => {
    if (!(folderId in prev.folders)) {
      return prev;
    }

    const folders = {
      ...prev.folders,
    };

    delete folders[folderId];

    const vocab_folder_items = {
      ...prev.vocab_folder_items,
    };

    delete vocab_folder_items[folderId];

    return {
      ...prev,
      folders,
      vocab_folder_items,
    };
  });
}
export function addVocabularyUI(
  setVocabularyData: Dispatch<
    SetStateAction<VocabularyData>
  >,
  vocabulary: Vocabulary,
  activeFolderId: string
) {
  setVocabularyData((prev) => ({
    ...prev,
    items: {
      ...prev.items,
      [vocabulary.id]: {
        vocabulary,
        expressions: {},
      },
    },
    vocab_folder_items:
      activeFolderId === "all"
        ? prev.vocab_folder_items
        : {
            ...prev.vocab_folder_items,
            [activeFolderId]: {
              ...(prev.vocab_folder_items[activeFolderId] ??
                {}),
              [vocabulary.id]: {
                vocabulary_id: vocabulary.id,
                folder_id: activeFolderId,
                position: Object.keys(
                  prev.vocab_folder_items[
                    activeFolderId
                  ] ?? {}
                ).length,
                created_at:
                  new Date().toISOString(),
              },
            },
          },
  }));
}

export function updateFolderItemsUI(
  setVocabularyData: Dispatch<
    SetStateAction<VocabularyData>
  >,
  items: Record<string, string[]>
) {
  setVocabularyData((prev) => {
    const vocab_folder_items: VocabularyData["vocab_folder_items"] =
      {};

    for (const [
      folderId,
      vocabularyIds,
    ] of Object.entries(items)) {
      vocab_folder_items[folderId] = {};

      vocabularyIds.forEach(
        (vocabularyId, index) => {
          vocab_folder_items[folderId][
            vocabularyId
          ] = {
            vocabulary_id: vocabularyId,
            folder_id: folderId,
            position: index,
            created_at:
              prev.vocab_folder_items[
                folderId
              ]?.[vocabularyId]
                ?.created_at ??
              new Date().toISOString(),
          };
        }
      );
    }

    return {
      ...prev,
      vocab_folder_items,
    };
  });
}