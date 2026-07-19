"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Vocabulary } from "@/app/vocabulary/lib/types/vocabulary";
import TiptapEditor from "../../kanji/components/TipTapEditor";
import { updateVocabulary } from "../api/vocabulary.client";
import { updateKanjiUI, updateVocabularyUI, useKanji } from "@/contexts/Context";

interface Props {
  vocabulary: Vocabulary;
}

export default function VocabularyItemContent({
  vocabulary,
}: Props) {
  const [editing, setEditing] = useState(false);

  const [content, setContent] = useState(
    vocabulary.note ?? ""
  );
  const {setData} = useKanji()

  async function handleSave() {
    await updateVocabulary({
        ...vocabulary,
        note: content
    });

    updateVocabularyUI(setData, {
        ...vocabulary,
        note: content
    } )

    setEditing(false);
  }

  function handleCancel() {
    setContent(vocabulary.note ?? "");
    setEditing(false);
  }
  
  function isEmptyContent(html: string) {
  if (!html) return true;

  const text = html.replace(/<[^>]*>/g, "").trim();

  return text.length === 0;
}
  return (
    <>
      <div className="border-t bg-white p-4">
        {editing ? (
          <TiptapEditor
            value={content}
            onChange={setContent}
          />
        ) : (
          <div
            onClick={() => setEditing(true)}
            className="
              prose prose-sm max-w-none
              min-h-[120px]
              cursor-text rounded p-2
              hover:bg-lime-100/50
            "
            dangerouslySetInnerHTML={{
  __html: isEmptyContent(content)
    ? "<p class='text-neutral-400'>Click để thêm ghi chú...</p>"
    : content,
}}
          />
        )}
      </div>

      {editing && (
        <div className="border-t bg-white p-4">
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={handleCancel}
            >
              Huỷ
            </Button>

            <Button onClick={handleSave}>
              Lưu
            </Button>
          </div>
        </div>
      )}
    </>
  );
}