"use client";


import { KanjiGroup } from "@/types/group";
import { Kanji } from "@/types/kanji";
import { ReferenceSet } from "@/types/reference";
import { KanjiReferenceItem } from "@/types/reference-item";
import { Vocabulary } from "@/types/vocabulary";
import { KanjiVocabulary } from "@/types/kanji-vocabulary";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type KanjiData = {
  groups: Record<string, KanjiGroup>;
  kanjis: Record<string, Kanji>;

  vocabularies: Record<string, Vocabulary>;

  reference_sets: Record<string, ReferenceSet>;

  kanji_group_items: Record<string, string[]>;
  kanji_reference_items: Record<string, KanjiReferenceItem[]>;

  kanji_vocabulary_items: Record<
    string,
    string[]
  >;
};
type LearnedFilter = "all" | "learned" | "unlearned";

type KanjiContextType = {
  data: KanjiData;
  setData: React.Dispatch<React.SetStateAction<KanjiData>>;

  dragEnabled: boolean;
  setDragEnabled: React.Dispatch<React.SetStateAction<boolean>>;

  learnedFilter: LearnedFilter;
  setLearnedFilter: React.Dispatch<
    React.SetStateAction<LearnedFilter>
  >;
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
  const [dragEnabled, setDragEnabled] = useState(true);

  const [learnedFilter, setLearnedFilter] =
    useState<LearnedFilter>("all");

  return (
    <KanjiContext.Provider
      value={{
        data,
        setData,

        dragEnabled,
        setDragEnabled,

        learnedFilter,
        setLearnedFilter,
      }}
    >
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
    const nextReferenceItems = {
      ...prev.kanji_reference_items,
    };

    delete nextReferenceItems[kanjiId];

    const nextVocabularyItems = {
  ...prev.kanji_vocabulary_items,
};

delete nextVocabularyItems[kanjiId];

    return {
      ...prev,
      kanji_vocabulary_items:nextVocabularyItems,
      kanjis: nextKanjis,
      kanji_group_items: Object.fromEntries(
        Object.entries(prev.kanji_group_items).map(
          ([groupId, kanjiIds]) => [
            groupId,
            kanjiIds.filter(id => id !== kanjiId),
          ]
        )
      ),
      kanji_reference_items: nextReferenceItems,
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

export function addReferenceSetUI(
  setData: React.Dispatch<React.SetStateAction<KanjiData>>,
  referenceSet: ReferenceSet
) {
  setData(prev => ({
    ...prev,

    reference_sets: {
      ...prev.reference_sets,
      [referenceSet.id]: referenceSet,
    },
  }));
}

export function updateReferenceSetUI(
  setData: React.Dispatch<React.SetStateAction<KanjiData>>,
  referenceSet: ReferenceSet
) {
  setData(prev => ({
    ...prev,

    reference_sets: {
      ...prev.reference_sets,
      [referenceSet.id]: referenceSet,
    },
  }));
}

export function removeReferenceSetUI(
  setData: React.Dispatch<
    React.SetStateAction<KanjiData>
  >,
  referenceSetId: string
) {
  setData(prev => {
    const nextReferenceSets = {
      ...prev.reference_sets,
    };

    delete nextReferenceSets[referenceSetId];

    return {
      ...prev,

      reference_sets: nextReferenceSets,

      kanji_reference_items:
        Object.fromEntries(
          Object.entries(
            prev.kanji_reference_items
          ).map(([kanjiId, items]) => [
            kanjiId,
            items.filter(
              item =>
                item.reference_set_id !==
                referenceSetId
            ),
          ])
        ),
    };
  });
}

export function addKanjiReferenceUI(
  setData: React.Dispatch<
    React.SetStateAction<KanjiData>
  >,
  item: KanjiReferenceItem
) {
  setData(prev => ({
    ...prev,

    kanji_reference_items: {
      ...prev.kanji_reference_items,

      [item.kanji_id]: [
        ...(prev.kanji_reference_items[
          item.kanji_id
        ] ?? []),
        item,
      ],
    },
  }));
}

export function removeKanjiReferenceUI(
  setData: React.Dispatch<
    React.SetStateAction<KanjiData>
  >,
  kanjiId: string,
  referenceSetId: string
) {
  setData(prev => ({
    ...prev,

    kanji_reference_items: {
      ...prev.kanji_reference_items,

      [kanjiId]: (
        prev.kanji_reference_items[
          kanjiId
        ] ?? []
      ).filter(
        item =>
          item.reference_set_id !==
          referenceSetId
      ),
    },
  }));
}

export function setKanjiReferencesUI(
  setData: React.Dispatch<
    React.SetStateAction<KanjiData>
  >,
  kanjiId: string,
  items: KanjiReferenceItem[]
) {
  setData(prev => ({
    ...prev,

    kanji_reference_items: {
      ...prev.kanji_reference_items,

      [kanjiId]: items,
    },
  }));
}

export function updateKanjiReferenceItemUI(
  setData: React.Dispatch<
    React.SetStateAction<KanjiData>
  >,
  item: KanjiReferenceItem
) {
  setData(prev => ({
    ...prev,

    kanji_reference_items: {
      ...prev.kanji_reference_items,

      [item.kanji_id]: (
        prev.kanji_reference_items[
          item.kanji_id
        ] ?? []
      ).map(i =>
        i.id === item.id ? item : i
      ),
    },
  }));
}

export function updateKanjiUI(
  setData: React.Dispatch<
    React.SetStateAction<KanjiData>
  >,
  kanji: Kanji
) {
  setData(prev => ({
    ...prev,

    kanjis: {
      ...prev.kanjis,
      [kanji.id]: kanji,
    },
  }));
}

export function addVocabularyUI(
  setData: React.Dispatch<
    React.SetStateAction<KanjiData>
  >,
  vocabulary: Vocabulary,
  kanjiId: string
) {
  setData(prev => ({
    ...prev,

    vocabularies: {
      ...prev.vocabularies,
      [vocabulary.id]: vocabulary,
    },

    kanji_vocabulary_items: {
      ...prev.kanji_vocabulary_items,

      [kanjiId]: [
        ...(prev.kanji_vocabulary_items[
          kanjiId
        ] ?? []),
        vocabulary.id,
      ],
    },
  }));
}

export function updateVocabularyUI(
  setData: React.Dispatch<
    React.SetStateAction<KanjiData>
  >,
  vocabulary: Vocabulary
) {
  setData(prev => ({
    ...prev,

    vocabularies: {
      ...prev.vocabularies,
      [vocabulary.id]: vocabulary,
    },
  }));
}

export function removeVocabularyUI(
  setData: React.Dispatch<
    React.SetStateAction<KanjiData>
  >,
  vocabularyId: string
) {
  setData(prev => {
    const next = {
      ...prev.vocabularies,
    };

    delete next[vocabularyId];

    return {
      ...prev,

      vocabularies: next,

      kanji_vocabulary_items:
        Object.fromEntries(
          Object.entries(
            prev.kanji_vocabulary_items
          ).map(([kanjiId, ids]) => [
            kanjiId,
            ids.filter(
              id => id !== vocabularyId
            ),
          ])
        ),
    };
  });
}

export function setKanjiVocabulariesUI(
  setData: React.Dispatch<
    React.SetStateAction<KanjiData>
  >,
  kanjiId: string,
  vocabularies: Vocabulary[]
) {
  setData(prev => ({
    ...prev,

    vocabularies: {
      ...prev.vocabularies,
      ...Object.fromEntries(
        vocabularies.map(v => [v.id, v])
      ),
    },

    kanji_vocabulary_items: {
      ...prev.kanji_vocabulary_items,

      [kanjiId]: vocabularies.map(
        v => v.id
      ),
    },
  }));
}