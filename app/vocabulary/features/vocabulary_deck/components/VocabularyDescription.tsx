"use client";

import { useState } from "react";
import { Pencil, Check, X } from "lucide-react";
import TiptapEditor from "@/app/kanji/features/kanji/components/TipTapEditor";
import { updateVocabularyUI, useVocabulary } from "@/app/vocabulary/context.ts/VocabularyContext";
import { Vocabulary } from "@/app/kanji/types/vocabulary";
import { updateVocabulary } from "../clients/vocabularyClient";



interface Props {
  vocabulary: Vocabulary;
  onSave?: (value: string) => void;
}

export default function VocabularyDescription({
  vocabulary,
  onSave,
}: Props) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(vocabulary.note ?? "");


  const {setVocabularyData} = useVocabulary();
  const handleEdit = () => {
    setValue(vocabulary.note ?? "");
    setEditing(true);
  };

  const handleSave = () => {
    onSave?.(value);
    const newVocab = {

      ...vocabulary,
      note: value
    }
    updateVocabularyUI(setVocabularyData, newVocab);
    updateVocabulary(newVocab)
    setEditing(false);
  };

  const handleCancel = () => {
    setValue(vocabulary.note ?? "");
    setEditing(false);
  };

  return (
    <div className="rounded-md border bg-white">
      <div className="flex items-center justify-between border-b px-3 py-2">
       

        {!editing ? (
          <button
            onClick={handleEdit}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-sm hover:bg-gray-100"
          >
            <Pencil className="h-4 w-4" />
            Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-1 rounded-md bg-emerald-500 px-2 py-1 text-sm text-white"
            >
              <Check className="h-4 w-4" />
              Save
            </button>

            <button
              onClick={handleCancel}
              className="flex items-center gap-1 rounded-md border px-2 py-1 text-sm"
            >
              <X className="h-4 w-4" />
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="p-3">
        {editing ? (
          <TiptapEditor
            value={value}
            onChange={setValue}
          />
        ) : (
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{
              __html: (vocabulary.note ?? ""),
            }}
          />
        )}
      </div>
    </div>
  );
}