'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';

type DragContextType = {
  hoverGroupId: string | null;
  setHoverGroupId: React.Dispatch<
    React.SetStateAction<string | null>
  >;
};

const DragContext =
  createContext<DragContextType | null>(null);

export function DragProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [hoverGroupId, setHoverGroupId] =
    useState<string | null>(null);

  return (
    <DragContext.Provider
      value={{
        hoverGroupId,
        setHoverGroupId,
      }}
    >
      {children}
    </DragContext.Provider>
  );
}

export function useDragContext() {
  const context =
    useContext(DragContext);

  if (!context) {
    throw new Error(
      'useDragContext must be used inside DragProvider'
    );
  }

  return context;
}