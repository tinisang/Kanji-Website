"use client";


import { KanjiGroup } from "@/types/group";
import { Kanji } from "@/types/kanji";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type KanjiData = {
  groups: Record<string, KanjiGroup>;
  kanjis: Record<string, Kanji>;
  kanji_group_items: Record<string, string[]>;
};

type KanjiContextType = {
  data: KanjiData;
  setData: React.Dispatch<React.SetStateAction<KanjiData>>;
};

const KanjiContext = createContext<KanjiContextType | null>(null);

interface KanjiProviderProps {
  children: ReactNode;
  initialData: KanjiData;
}

export function KanjiProvider({
  children,
  initialData,
}: KanjiProviderProps) {
  const [data, setData] = useState(initialData);

  return (
    <KanjiContext.Provider value={{ data, setData }}>
      {children}
    </KanjiContext.Provider>
  );
}

export function useKanji() {
  const context = useContext(KanjiContext);

  if (!context) {
    throw new Error("useKanji must be used inside KanjiProvider");
  }

  return context;
}


export function addKanjiUI(
  setData: React.Dispatch<
    React.SetStateAction<KanjiData>
  >,
  kanji: Kanji,
  groupId: string
) {
  setData(prev => ({
    ...prev,

    kanjis: {
      ...prev.kanjis,
      [kanji.id]: kanji,
    },

    kanji_group_items: {
      ...prev.kanji_group_items,

      [groupId]: [
        ...(prev.kanji_group_items[groupId] ??
          []),
        kanji.id,
      ],
    },
  }));
}


export function removeKanjiUI(
  setData: React.Dispatch<
    React.SetStateAction<KanjiData>
  >,
  kanjiId: string
) {
  setData(prev => {
    const nextKanjis = {
      ...prev.kanjis,
    };

    delete nextKanjis[kanjiId];

    return {
      ...prev,

      kanjis: nextKanjis,

      kanji_group_items: Object.fromEntries(
        Object.entries(
          prev.kanji_group_items
        ).map(([groupId, kanjiIds]) => [
          groupId,
          kanjiIds.filter(
            id => id !== kanjiId
          ),
        ])
      ),
    };
  });
}

export function addGroupUI(
  setData: React.Dispatch<
    React.SetStateAction<KanjiData>
  >,
  group: KanjiGroup
) {
  setData(prev => ({
    ...prev,

    groups: {
      ...prev.groups,
      [group.id]: group,
    },

    kanji_group_items: {
      ...prev.kanji_group_items,
      [group.id]: [],
    },
  }));
}

export function removeGroupUI(
  setData: React.Dispatch<
    React.SetStateAction<KanjiData>
  >,
  groupId: string
) {
  setData(prev => {
    const nextGroups = {
      ...prev.groups,
    };

    delete nextGroups[groupId];

    const movedKanjiIds =
      prev.kanji_group_items[groupId] ?? [];

    const nextGroupItems = {
      ...prev.kanji_group_items,
    };

    delete nextGroupItems[groupId];

    const unclassifiedGroup = Object.values(
      prev.groups
    ).find(
      group =>
        group.name === "Unclassified"
    );

    if (unclassifiedGroup) {
      nextGroupItems[
        unclassifiedGroup.id
      ] = [
        ...(nextGroupItems[
          unclassifiedGroup.id
        ] ?? []),
        ...movedKanjiIds,
      ];
    }

    return {
      ...prev,
      groups: nextGroups,
      kanji_group_items: nextGroupItems,
    };
  });
}