"use client";

import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";

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
  const [note, setNote] = useState(
    vocabulary.note ?? ""
  );

  const [draft, setDraft] = useState(
    vocabulary.note ?? ""
  );

  const [editing, setEditing] = useState(false);
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

      const value = updated.note ?? draft;

      setNote(value);
      setDraft(value);
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

  if (!editing) {
    return (
      <div className="">
      

        <div
          className="
            prose
            prose-neutral
            max-w-none
            rounded-xl
            border
            bg-muted/30
            px-4
            py-3
            text-sm
            leading-relaxed
            sm:text-base
          "
          dangerouslySetInnerHTML={{
            __html:
              note ||
              '<span class="text-muted-foreground">No note</span>',
          }}
        />

          <div className="mb-2 flex items-center justify-between">
       

          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={ratingLoading}
            onClick={() => {
              setDraft(note);
              setEditing(true);
            }}
            className="h-7 px-2"
          >
            <Pencil className="mr-1.5 h-3.5 w-3.5" />
            Edit
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-5">
      <div className="mb-2">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Note
        </h4>
      </div>

      <TiptapEditor
        value={draft}
        onChange={setDraft}
      />

      <div className="mt-3 flex justify-end gap-2">
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
          disabled={
            saving ||
            ratingLoading ||
            draft === note
          }
          onClick={save}
        >
          {saving ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  );
}