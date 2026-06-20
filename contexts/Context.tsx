"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type KanjiData = {
  groups: Record<string, any>;
  kanjis: Record<string, any>;
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