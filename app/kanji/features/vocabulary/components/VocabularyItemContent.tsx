"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Vocabulary } from "@/app/vocabulary/lib/types/vocabulary";
import TiptapEditor from "../../kanji/components/TipTapEditor";
import { updateVocabulary } from "../api/vocabulary.client";
import {
  updateVocabularyUI,
  useKanji,
} from "@/contexts/Context";
import ReviewExpressions from "@/app/review/components/vocab/ReviewExpressions";

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

  const { setData } = useKanji();

  async function handleSave() {
    const newVocabulary = {
      ...vocabulary,
      note: content,
    };

    await updateVocabulary(newVocabulary);
    updateVocabularyUI(setData, newVocabulary);

    setEditing(false);
  }

  function handleCancel() {
    setContent(vocabulary.note ?? "");
    setEditing(false);
  }

  function handleEdit() {
    setContent(vocabulary.note ?? "");
    setEditing(true);
  }

  function isEmptyContent(html: string) {
    if (!html) return true;

    const text = html.replace(/<[^>]*>/g, "").trim();

    return text.length === 0;
  }

  return (
    <>
      <div className="border-t bg-white grid grid-cols-2">
        


        <div>
          <div className="p-4">
            {editing ? (
              <TiptapEditor
                value={content}
                onChange={setContent}
              />
            ) : (
              <div
                className="prose prose-sm rounded p-2"
                dangerouslySetInnerHTML={{
                  __html: isEmptyContent(content)
                    ? "<p class='text-neutral-400'>Chưa có ghi chú.</p>"
                    : content,
                }}
              />
            )}
          </div>
          <div className=" bg-white p-4">
            <div className="flex justify-end gap-2">
              {editing ? (
                <>
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                  >
                    Huỷ
                  </Button>

                  <Button onClick={handleSave}>
                    Lưu
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  onClick={handleEdit}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              )}
            </div>
          </div>

        </div>
<div>
          <ReviewExpressions
            vocabulary={vocabulary}
          />

        </div>

      </div>

    </>
  );
}