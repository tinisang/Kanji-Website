"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Vocabulary } from "@/app/vocabulary/lib/types/vocabulary";

import {
  updateVocabulary,
} from "@/app/kanji/features/vocabulary/api/vocabulary.client";

import TiptapEditor from "@/app/kanji/features/kanji/components/TipTapEditor";

interface Props {
  vocabulary: Vocabulary;
  ratingLoading: boolean;
}

export default function ReviewNote({
  vocabulary,
  ratingLoading,
}: Props) {
  const [editing, setEditing] = useState(false);

  const [note, setNote] = useState(
    vocabulary.note ?? ""
  );

  const [draft, setDraft] = useState(
    vocabulary.note ?? ""
  );

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const value = vocabulary.note ?? "";

    setNote(value);
    setDraft(value);
    setEditing(false);
  }, [vocabulary]);

  async function save() {
    try {
      setSaving(true);

      const updated = await updateVocabulary({
        ...vocabulary,
        note: draft,
      });

      // update content đang hiển thị ngay lập tức
      setNote(updated.note ?? draft);

      setDraft(updated.note ?? draft);
      setEditing(false);
    } catch (error) {
      console.error(
        "Failed to update note:",
        error
      );
    } finally {
      setSaving(false);
    }
  }

  function cancel() {
    setDraft(note);
    setEditing(false);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="sm"
          className="mt-4 rounded-full px-4"
          disabled={ratingLoading}
        >
          View Note
        </Button>
      </DialogTrigger>

      <DialogContent
        className="
          w-[calc(100%-1.5rem)]
          !max-w-4xl
          rounded-xl
          p-4
          sm:p-6
        "
      >
        <DialogHeader>
          <DialogTitle>
            {vocabulary.word}
          </DialogTitle>
        </DialogHeader>

        <div className="max-h-[70vh] overflow-y-auto">
          {!editing ? (
            <>
              <div
                className="
                  prose
                  prose-neutral
                  max-w-none
                  text-sm
                  sm:text-base
                "
                dangerouslySetInnerHTML={{
                  __html: note,
                }}
              />

              <div className="mt-5 flex justify-end">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setDraft(note);
                    setEditing(true);
                  }}
                >
                  Edit
                </Button>
              </div>
            </>
          ) : (
            <>
              <TiptapEditor
                value={draft}
                onChange={setDraft}
              />

              <div className="mt-4 flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={saving}
                  onClick={cancel}
                >
                  Cancel
                </Button>

                <Button
                  type="button"
                  size="sm"
                  disabled={saving}
                  onClick={save}
                >
                  {saving
                    ? "Saving..."
                    : "Save"}
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}