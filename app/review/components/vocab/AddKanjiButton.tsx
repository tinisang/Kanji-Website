"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Check,
  Loader2,
  Plus,
  Search,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Kanji } from "@/app/kanji/types/kanji";

import {
  createKanjiVocabulary,
} from "@/app/kanji/features/kanji-vocabulary/api/kanji-vocabulary.client";

import {
  getAllKanjiAPI,
} from "@/app/kanji/features/kanji/api/kanji.client";

interface Props {
  vocabularyId: string;
  attachedKanjiIds: string[];
  onAdded: (kanji: Kanji) => void;
}

export default function AddKanjiButton({
  vocabularyId,
  attachedKanjiIds,
  onAdded,
}: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [kanjis, setKanjis] = useState<Kanji[]>([]);
  const [loading, setLoading] = useState(false);
  const [addingId, setAddingId] =
    useState<string | null>(null);

  useEffect(() => {
    if (!open || kanjis.length > 0) return;

    async function loadKanjis() {
      try {
        setLoading(true);

        const data = await getAllKanjiAPI();

        setKanjis(data);
      } catch (error) {
        console.error(
          "Failed to load kanjis:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadKanjis();
  }, [open, kanjis.length]);

  const filteredKanjis = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    if (!query) return kanjis;

    return kanjis.filter((kanji) =>
      [
        kanji.character,
        kanji.han_viet,
      ].some((value) =>
        value?.toLowerCase().includes(query)
      )
    );
  }, [kanjis, search]);

  async function handleAdd(kanji: Kanji) {
    try {
      setAddingId(kanji.id);

      await createKanjiVocabulary({
        kanji_id: kanji.id,
        vocabulary_id: vocabularyId,
        position: 0,
      });

      onAdded(kanji);
    } catch (error) {
      console.error(
        "Failed to add kanji:",
        error
      );
    } finally {
      setAddingId(null);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="
            h-[85px]
            w-full
            rounded-2xl
            border-dashed
            border-emerald-200
            bg-emerald-50/30
            font-normal
            text-muted-foreground
            hover:bg-emerald-50/60
            sm:h-[95px]
          "
        >
          <div className="flex flex-col items-center">
            <Plus className="h-6 w-6 text-emerald-600" />

            <span className="mt-1 text-sm">
              Add to Kanji
            </span>
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            Add to Kanji
          </DialogTitle>
        </DialogHeader>

        <div className="relative">
          <Search
            className="
              absolute
              left-3
              top-1/2
              h-4
              w-4
              -translate-y-1/2
              text-muted-foreground
            "
          />

          <input
            autoFocus
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search kanji..."
            className="
              h-10
              w-full
              rounded-lg
              border
              bg-muted/30
              pl-9
              pr-3
              text-sm
              outline-none
              transition
              focus:border-emerald-300
              focus:ring-2
              focus:ring-emerald-100
            "
          />
        </div>

        <div className="max-h-[360px] overflow-y-auto pr-1">
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          ) : filteredKanjis.length === 0 ? (
            <div className="py-10 text-center text-sm text-muted-foreground">
              No kanji found.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-1">
              {filteredKanjis.map((kanji) => {
                const attached =
                  attachedKanjiIds.includes(
                    kanji.id
                  );

                return (
                  <button
                    key={kanji.id}
                    type="button"
                    disabled={
                      attached ||
                      addingId === kanji.id
                    }
                    onClick={() =>
                      handleAdd(kanji)
                    }
                    className="
                      flex
                      items-center
                      gap-3
                      rounded-lg
                      px-3
                      py-2.5
                      text-left
                      transition-colors
                      hover:bg-emerald-50
                      disabled:cursor-default
                      disabled:opacity-50
                    "
                  >
                    <span className="w-8 text-2xl font-bold">
                      {kanji.character}
                    </span>

                    <span className="flex-1 truncate text-xs font-medium">
                      {kanji.han_viet}
                    </span>

                    {addingId === kanji.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : attached ? (
                      <Check className="h-4 w-4 text-emerald-600" />
                    ) : null}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}