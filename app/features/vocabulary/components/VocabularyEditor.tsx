"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Vocabulary } from "@/types/vocabulary";

interface Props {
  open: boolean;
  vocabulary: Vocabulary | null;

  onClose: () => void;
  onSave: (
    vocabulary: Vocabulary
  ) => Promise<void>;
}

export default function VocabularyEditor({
  open,
  vocabulary,
  onClose,
  onSave,
}: Props) {
  const [form, setForm] =
    useState<Vocabulary | null>(null);

  useEffect(() => {
    setForm(vocabulary);
  }, [vocabulary]);

  if (!form) return null;

  async function handleSave() {
  if (!form) return;

  await onSave(form);
  onClose();
}

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Edit Vocabulary
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Word"
            value={form.word}
            onChange={(e) =>
              setForm({
                ...form,
                word: e.target.value,
              })
            }
          />

          <Input
            placeholder="Reading"
            value={form.reading ?? ""}
            onChange={(e) =>
              setForm({
                ...form,
                reading: e.target.value,
              })
            }
          />

          <Input
            placeholder="Meaning"
            value={form.meaning ?? ""}
            onChange={(e) =>
              setForm({
                ...form,
                meaning: e.target.value,
              })
            }
          />

          <Textarea
            placeholder="Note"
            value={form.note ?? ""}
            onChange={(e) =>
              setForm({
                ...form,
                note: e.target.value,
              })
            }
          />
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button onClick={handleSave}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}