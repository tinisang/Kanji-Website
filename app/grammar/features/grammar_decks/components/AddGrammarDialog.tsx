"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { createGrammar } from "../clients/grammarClient";
import {
  addGrammarUI,
  useGrammar,
} from "@/app/grammar/contexts/GrammarContext";
import { createGrammarFolderItem } from "../clients/grammarFolderItemClient";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddGrammarDialog({
  open,
  onOpenChange,
}: Props) {
  const { setGrammarData, activeFolderId } = useGrammar();

  const [title, setTitle] = useState("");

 async function handleCreate() {
  if (!title.trim()) return;

  const grammar = await createGrammar({
    title,
    short_description: "",
    content: "",
    learned: false,
    position: 0,
  });

  if (activeFolderId === "all") return;

  await createGrammarFolderItem({
    grammar_id: grammar.id,
    folder_id: activeFolderId,
  });

  addGrammarUI(
    setGrammarData,
    grammar,
    activeFolderId
  );

  setTitle("");
  onOpenChange(false);
}

  return (
    <Dialog
  open={open}
  onOpenChange={onOpenChange}
>
  <DialogContent className="sm:max-w-md rounded-2xl border-0 p-0 overflow-hidden">
    <DialogHeader className="border-b bg-gradient-to-r from-blue-500 to-indigo-500 px-6 py-5">
      <DialogTitle className="text-xl font-semibold text-white">
        Add New Grammar
      </DialogTitle>
    </DialogHeader>

    <div className="space-y-5 px-6 py-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Grammar Title
        </label>

        <Input
          placeholder="e.g. ～ようにする"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleCreate();
            }
          }}
          className="h-11 rounded-xl"
        />
      </div>
    </div>

    <DialogFooter className="border-t bg-gray-50 px-6 py-4">
      <Button
        variant="outline"
        className="rounded-xl"
        onClick={() => onOpenChange(false)}
      >
        Cancel
      </Button>

      <Button
        className="rounded-xl bg-blue-600 hover:bg-blue-700"
        onClick={handleCreate}
      >
        Create
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
  );
}