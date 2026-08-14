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
  <div className="rounded-md bg-gray-100 p-3">
    <div className="flex items-center justify-between">
      {!editing ? (
        <button
          onClick={handleEdit}
          className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-gray-500 hover:bg-gray-200 hover:text-gray-700"
        >
          <Pencil className="h-3.5 w-3.5" />
          Edit
        </button>
      ) : (
        <div className="flex gap-1.5">
          <button
            onClick={handleSave}
            className="flex items-center gap-1 rounded-md bg-emerald-500 px-2 py-1 text-xs text-white"
          >
            <Check className="h-3.5 w-3.5" />
            Save
          </button>

          <button
            onClick={handleCancel}
            className="flex items-center gap-1 rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-500 hover:bg-gray-50"
          >
            <X className="h-3.5 w-3.5" />
            Cancel
          </button>
        </div>
      )}
    </div>

    <div className="max-h-[300px] overflow-y-auto px-2 py-2">
      {editing ? (
        <TiptapEditor
          value={value}
          onChange={setValue}
        />
      ) : (
        <div
          className="prose prose-sm max-w-none !text-[12px] text-gray-600"
          dangerouslySetInnerHTML={{
            __html: vocabulary.note ?? "",
          }}
        />
      )}
    </div>
  </div>
);
}