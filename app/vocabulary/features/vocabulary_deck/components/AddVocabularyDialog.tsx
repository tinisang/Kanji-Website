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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { createVocabulary } from "../clients/vocabularyClient";
import { createVocabularyFolderItem } from "../../vocab_folders/clients/vocabularyFolderItemClient";
import { addVocabularyUI, useVocabulary } from "@/app/vocabulary/context.ts/VocabularyContext";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddVocabularyDialog({
  open,
  onOpenChange,
}: Props) {
  const [word, setWord] = useState("");
  const [reading, setReading] =
    useState("");
  const [meaning, setMeaning] =
    useState("");
  const [
    description,
    setDescription,
  ] = useState("");

  const {activeFolderId, vocabularyData, setVocabularyData} = useVocabulary()

  async function onCreate() {
    

    const newVocab = await createVocabulary({
      word: word,
      reading: reading,
      meaning: meaning,
      note: description,
      need_revision: false
    });

    if (activeFolderId=="all") return;
    await createVocabularyFolderItem(
       {
         vocabulary_id: newVocab.id,
        folder_id: activeFolderId
       }
    )

    addVocabularyUI(setVocabularyData,newVocab,activeFolderId  )

    setWord("");
    setReading("");
    setMeaning("");
    setDescription("");

    onOpenChange(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="!max-w-4xl overflow-hidden rounded-2xl border-0 p-0">
        <DialogHeader className="bg-[#1DFFB0] px-8 py-6">
          <DialogTitle className="text-2xl font-bold text-black">
            Add Vocabulary
          </DialogTitle>

          <p className="mt-1 text-sm text-black/70">
            Create a new vocabulary.
          </p>
        </DialogHeader>

        <div className="space-y-6 bg-white p-8">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                Word
              </Label>

              <Input
                value={word}
                onChange={(e) =>
                  setWord(e.target.value)
                }
                placeholder="人生"
                className="h-14 text-2xl font-bold"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                Reading
              </Label>

              <Input
                value={reading}
                onChange={(e) =>
                  setReading(e.target.value)
                }
                placeholder="じんせい"
                className="h-14 text-xl font-semibold"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                Meaning
              </Label>

              <Input
                value={meaning}
                onChange={(e) =>
                  setMeaning(e.target.value)
                }
                placeholder="Life"
                className="h-14 text-xl font-semibold"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Description
            </Label>

            <Textarea
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              rows={5}
              placeholder="Vocabulary description..."
              className="text-lg leading-7"
            />
          </div>
        </div>

        <DialogFooter className="border-t bg-gray-50 px-8 py-5">
          <Button
            variant="outline"
            onClick={() =>
              onOpenChange(false)
            }
          >
            Cancel
          </Button>

          <Button
            className="bg-[#1DFFB0] text-black hover:bg-[#19e6a1]"
            onClick={onCreate}
          >
            Create Vocabulary
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}