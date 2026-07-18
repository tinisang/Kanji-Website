"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

import { Grammar } from "../lib/types/Grammar";

import { GrammarData } from "../lib/types/GrammarData";
import { GrammarExpression } from "../lib/types/GrammarExpression";
import { ExpressionExample } from "@/app/vocabulary/lib/types/expressionExample";
import { FolderItem } from "@/app/vocabulary/lib/types/vocabularyFolder";

interface GrammarContextType {
  grammarData: GrammarData;
  setGrammarData: Dispatch<
    SetStateAction<GrammarData>
  >;

  reorderFolders: boolean;
  setReorderFolders: Dispatch<
    SetStateAction<boolean>
  >;

  activeFolderId: string;
  setActiveFolderId: Dispatch<
    SetStateAction<string>
  >;
}

const GrammarContext = createContext<
  GrammarContextType | undefined
>(undefined);

interface Props {
  children: ReactNode;
  initialData: GrammarData;
}

export function GrammarProvider({
  children,
  initialData,
}: Props) {
  const [grammarData, setGrammarData] =
    useState<GrammarData>(initialData);

  const [
    reorderFolders,
    setReorderFolders,
  ] = useState(false);

  const [
    activeFolderId,
    setActiveFolderId,
  ] = useState("all");

  return (
    <GrammarContext.Provider
      value={{
        grammarData,
        setGrammarData,
        reorderFolders,
        setReorderFolders,
        activeFolderId,
        setActiveFolderId,
      }}
    >
      {children}
    </GrammarContext.Provider>
  );
}

export function useGrammar() {
  const context =
    useContext(GrammarContext);

  if (!context) {
    throw new Error(
      "useGrammar must be used within GrammarProvider"
    );
  }

  return context;
}

export function addExpressionUI(
  setGrammarData: Dispatch<
    SetStateAction<GrammarData>
  >,
  grammarId: string,
  expressionId: string
) {
  setGrammarData((prev) => {
    const item = prev.items[grammarId];

    if (!item) return prev;

    return {
      ...prev,
      items: {
        ...prev.items,
        [grammarId]: {
          ...item,
          expressions: {
            ...item.expressions,
            [expressionId]: {
              expression: {
                id: expressionId,
                grammar_id: grammarId,
                label: "",
                pattern: "",
                meaning: "",
                note: "",
                position: Object.keys(
                  item.expressions
                ).length,
                created_at:
                  new Date().toISOString(),
                updated_at:
                  new Date().toISOString(),
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
  setGrammarData: Dispatch<
    SetStateAction<GrammarData>
  >,
  expression: GrammarExpression
) {
  setGrammarData((prev) => {
    const item =
      prev.items[expression.grammar_id];

    if (!item) return prev;

    const expressionItem =
      item.expressions[expression.id];

    if (!expressionItem) return prev;

    return {
      ...prev,
      items: {
        ...prev.items,
        [expression.grammar_id]: {
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
  setGrammarData: Dispatch<
    SetStateAction<GrammarData>
  >,
  grammarId: string,
  expressionId: string,
  field: keyof Omit<
    GrammarExpression,
    | "id"
    | "grammar_id"
    | "created_at"
  >,
  value: string | number
) {
  setGrammarData((prev) => {
    const item =
      prev.items[grammarId];

    if (!item) return prev;

    const expressionItem =
      item.expressions[expressionId];

    if (!expressionItem)
      return prev;

    return {
      ...prev,
      items: {
        ...prev.items,
        [grammarId]: {
          ...item,
          expressions: {
            ...item.expressions,
            [expressionId]: {
              ...expressionItem,
              expression: {
                ...expressionItem.expression,
                [field]: value,
                updated_at:
                  new Date().toISOString(),
              },
            },
          },
        },
      },
    };
  });
}

export function addExampleUI(
  setGrammarData: Dispatch<
    SetStateAction<GrammarData>
  >,
  expressionId: string,
  exampleId: string
) {
  setGrammarData((prev) => {
    for (const grammarId in prev.items) {
      const item = prev.items[grammarId];

      const expressionItem =
        item.expressions[expressionId];

      if (!expressionItem) continue;

      const examples =
        expressionItem.examples ?? {};

      return {
        ...prev,
        items: {
          ...prev.items,
          [grammarId]: {
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
                    position: Object.keys(
                      examples
                    ).length,
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
  setGrammarData: Dispatch<
    SetStateAction<GrammarData>
  >,
  example: ExpressionExample
) {
  setGrammarData((prev) => {
    for (const grammarId in prev.items) {
      const item = prev.items[grammarId];

      for (const expressionId in item.expressions) {
        const expressionItem =
          item.expressions[expressionId];

        if (
          !(example.id in expressionItem.examples)
        ) {
          continue;
        }

        return {
          ...prev,
          items: {
            ...prev.items,
            [grammarId]: {
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
  setGrammarData: Dispatch<
    SetStateAction<GrammarData>
  >,
  exampleId: string
) {
  setGrammarData((prev) => {
    for (const grammarId in prev.items) {
      const item = prev.items[grammarId];

      for (const expressionId in item.expressions) {
        const expressionItem =
          item.expressions[expressionId];

        if (
          !(exampleId in expressionItem.examples)
        ) {
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
            [grammarId]: {
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
  setGrammarData: Dispatch<
    SetStateAction<GrammarData>
  >,
  folder: FolderItem
) {
  setGrammarData((prev) => ({
    ...prev,
    folders: {
      ...prev.folders,
      [folder.id]: folder,
    },
    grammar_folder_items: {
      ...prev.grammar_folder_items,
      [folder.id]: {},
    },
  }));
}

export function updateFolderUI(
  setGrammarData: Dispatch<
    SetStateAction<GrammarData>
  >,
  folder: FolderItem
) {
  setGrammarData((prev) => {
    const oldFolder =
      prev.folders[folder.id];

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
  setGrammarData: Dispatch<
    SetStateAction<GrammarData>
  >,
  folderId: string
) {
  setGrammarData((prev) => {
    if (!(folderId in prev.folders)) {
      return prev;
    }

    const folders = {
      ...prev.folders,
    };

    delete folders[folderId];

    const grammar_folder_items = {
      ...prev.grammar_folder_items,
    };

    delete grammar_folder_items[
      folderId
    ];

    return {
      ...prev,
      folders,
      grammar_folder_items,
    };
  });
}

export function addGrammarUI(
  setGrammarData: Dispatch<
    SetStateAction<GrammarData>
  >,
  grammar: Grammar,
  activeFolderId: string
) {
  setGrammarData((prev) => ({
    ...prev,
    items: {
      ...prev.items,
      [grammar.id]: {
        grammar,
        expressions: {},
      },
    },

    grammar_folder_items:
      activeFolderId === "all"
        ? prev.grammar_folder_items
        : {
            ...prev.grammar_folder_items,
            [activeFolderId]: {
              ...(prev
                .grammar_folder_items[
                activeFolderId
              ] ?? {}),

              [grammar.id]: {
                grammar_id: grammar.id,
                folder_id:
                  activeFolderId,
                position:
                  Object.keys(
                    prev
                      .grammar_folder_items[
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

export function updateGrammarUI(
  setGrammarData: Dispatch<
    SetStateAction<GrammarData>
  >,
  grammar: Grammar
) {
  setGrammarData((prev) => {
    const item =
      prev.items[grammar.id];

    if (!item) return prev;

    return {
      ...prev,
      items: {
        ...prev.items,
        [grammar.id]: {
          ...item,
          grammar,
        },
      },
    };
  });
}

export function deleteGrammarUI(
  setGrammarData: Dispatch<
    SetStateAction<GrammarData>
  >,
  grammarId: string
) {
  setGrammarData((prev) => {
    const items = {
      ...prev.items,
    };

    delete items[grammarId];

    const grammar_folder_items =
      Object.fromEntries(
        Object.entries(
          prev.grammar_folder_items
        ).map(
          ([folderId, items]) => {
            const newItems = {
              ...items,
            };

            delete newItems[
              grammarId
            ];

            return [
              folderId,
              newItems,
            ];
          }
        )
      );

    return {
      ...prev,
      items,
      grammar_folder_items,
    };
  });
}

export function updateFolderItemsUI(
  setGrammarData: Dispatch<
    SetStateAction<GrammarData>
  >,
  items: Record<string, string[]>
) {
  setGrammarData((prev) => {
    const grammar_folder_items: GrammarData["grammar_folder_items"] =
      {};

    for (const [
      folderId,
      grammarIds,
    ] of Object.entries(items)) {
      grammar_folder_items[
        folderId
      ] = {};

      grammarIds.forEach(
        (grammarId, index) => {
          grammar_folder_items[
            folderId
          ][grammarId] = {
            grammar_id: grammarId,
            folder_id: folderId,
            position: index,
            created_at:
              prev
                .grammar_folder_items[
                folderId
              ]?.[grammarId]
                ?.created_at ??
              new Date().toISOString(),
          };
        }
      );
    }

    return {
      ...prev,
      grammar_folder_items,
    };
  });
}

