"use client";

import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import { useEffect, useState } from "react";

import { GrammarData } from "../lib/types/GrammarData";
import {
  updateFolderItemsUI,
  updateFolderUI,
  useGrammar,
} from "../contexts/GrammarContext";




import { updateGrammarFolder } from "../features/grammar_decks/clients/grammarFolderClient";
import { updateGrammarFolderItemsAPI } from "../features/grammar_decks/clients/grammarFolderItemClient";
import GrammarDecks from "./GrammarDecks";
import GrammarFolders from "@/app/vocabulary/features/vocab_folders/components/GrammarFolder";

interface Props {
  initialData: GrammarData;
}

export default function GrammarClient({
  initialData,
}: Props) {
  const {
    grammarData,
    setGrammarData,
    activeFolderId,
  } = useGrammar();

  const [items, setItems] = useState<
    Record<string, string[]>
  >({});

  useEffect(() => {
    const folderItemsByFolder = Object.fromEntries(
      Object.entries(
        grammarData.grammar_folder_items
      ).map(([folderId, items]) => [
        folderId,
        Object.values(items)
          .sort((a, b) => a.position - b.position)
          .map((item) => item.grammar_id),
      ])
    );

    setItems(folderItemsByFolder);
  }, [grammarData, activeFolderId]);

  async function saveChanges(event: any) {
    if (
      event.operation.source?.type === "folder" &&
      event.operation.target?.type === "folder"
    ) {
      if (
        event.operation.source.id ===
        event.operation.target.id
      ) {
        return;
      }

      const source =
        grammarData.folders[
          event.operation.source.id
        ];

      const target =
        grammarData.folders[
          event.operation.target.id
        ];

      let current = target;

      while (current.parent_id) {
        if (
          current.parent_id === source.id
        ) {
          return;
        }

        current =
          grammarData.folders[
            current.parent_id
          ];
      }

      const updatedFolder = {
        ...source,
        parent_id:
          event.operation.target.id,
      };

      updateFolderUI(
        setGrammarData,
        updatedFolder
      );

      await updateGrammarFolder(
        updatedFolder
      );

      return;
    }

    if (
      event.operation.source?.type ===
        "folder" ||
      !event.operation.target
    ) {
      return;
    }

    updateFolderItemsUI(
      setGrammarData,
      items
    );

    if (activeFolderId !== "all") {
      const newFolderItemData =
        Object.entries(items).flatMap(
          ([folderId, grammarIds]) =>
            grammarIds.map(
              (grammarId, index) => ({
                grammar_id: grammarId,
                folder_id: folderId,
                position: index,
              })
            )
        );

      await updateGrammarFolderItemsAPI(
        newFolderItemData
      );
    }
  }

  return (
    <DragDropProvider
      onDragOver={(event) => {
        if (
          event.operation.source?.type ===
            "folder" ||
          !event.operation.target
        ) {
          return;
        }

        setItems((prev) =>
          move(prev, event)
        );
      }}
      onDragEnd={saveChanges}
    >
      <div className="flex gap-4 mt-8">
        <GrammarFolders />

        <div className="flex-1">
          <GrammarDecks />
        </div>
      </div>
    </DragDropProvider>
  );
}