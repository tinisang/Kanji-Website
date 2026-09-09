"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Loader2, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Kanji } from "@/app/kanji/types/kanji";
import { Vocabulary } from "@/app/vocabulary/lib/types/vocabulary";
import { useKanji } from "@/contexts/Context";
import {
  createKanjiVocabulary,
  deleteKanjiVocabulary,
  getKanjiVocabularyByVocabulary,
} from "@/app/kanji/features/kanji-vocabulary/api/kanji-vocabulary.client";
import { getAllKanjiAPI } from "@/app/kanji/features/kanji/api/kanji.client";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vocabulary: Vocabulary;
}

export default function AddVocabularyToKanjiDialog({
  open,
  onOpenChange,
  vocabulary,
}: Props) {
  const { data, setData } = useKanji();
  const [search, setSearch] = useState("");
  const [kanjis, setKanjis] = useState<Kanji[]>([]);
  const [attachedIds, setAttachedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingRelations, setLoadingRelations] = useState(false);
  const [changingId, setChangingId] = useState<string | null>(null);

  useEffect(() => {
    if (!open || kanjis.length > 0) return;

    async function loadKanjis() {
      try {
        setLoading(true);
        setKanjis(await getAllKanjiAPI());
      } catch (error) {
        console.error("Failed to load kanjis:", error);
      } finally {
        setLoading(false);
      }
    }

    loadKanjis();
  }, [open, kanjis.length]);

  useEffect(() => {
    if (!open) return;

    async function loadRelations() {
      try {
        setLoadingRelations(true);

        const relations = await getKanjiVocabularyByVocabulary(
          vocabulary.id
        );

        setAttachedIds(
          relations.map((relation) => relation.kanji_id)
        );
      } catch (error) {
        console.error("Failed to load kanji relations:", error);
        setAttachedIds([]);
      } finally {
        setLoadingRelations(false);
      }
    }

    loadRelations();
  }, [open, vocabulary.id]);

  const filteredKanjis = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return kanjis;

    return kanjis.filter((kanji) =>
      [kanji.character, kanji.han_viet].some((value) =>
        value?.toLowerCase().includes(query)
      )
    );
  }, [kanjis, search]);

  async function handleToggle(kanji: Kanji) {
    if (changingId) return;

    const attached = attachedIds.includes(kanji.id);

    try {
      setChangingId(kanji.id);

      if (attached) {
        await deleteKanjiVocabulary(kanji.id, vocabulary.id);

        setAttachedIds((prev) =>
          prev.filter((id) => id !== kanji.id)
        );

        setData((prev) => ({
          ...prev,
          kanji_vocabulary_items: {
            ...prev.kanji_vocabulary_items,
            [kanji.id]: (
              prev.kanji_vocabulary_items[kanji.id] ?? []
            ).filter((id) => id !== vocabulary.id),
          },
        }));
      } else {
        const relation = await createKanjiVocabulary({
          kanji_id: kanji.id,
          vocabulary_id: vocabulary.id,
          position: 0,
        });

        if (!relation) return;

        setAttachedIds((prev) => [...prev, kanji.id]);

        setData((prev) => ({
          ...prev,
          kanji_vocabulary_items: {
            ...prev.kanji_vocabulary_items,
            [kanji.id]: [
              ...(prev.kanji_vocabulary_items[kanji.id] ?? []),
              vocabulary.id,
            ],
          },
        }));
      }
    } catch (error) {
      console.error("Failed to update kanji:", error);
    } finally {
      setChangingId(null);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add to Kanji</DialogTitle>
        </DialogHeader>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search kanji..."
            className="pl-9"
          />
        </div>

        <div className="max-h-[360px] overflow-y-auto pr-1">
          {loading || loadingRelations ? (
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
                const attached = attachedIds.includes(kanji.id);
                const changing = changingId === kanji.id;

                return (
                  <button
                    key={kanji.id}
                    type="button"
                    disabled={changing}
                    onClick={() => handleToggle(kanji)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                      attached
                        ? "bg-emerald-50"
                        : "hover:bg-emerald-50"
                    } disabled:opacity-50`}
                  >
                    <span className="w-8 text-2xl font-bold">
                      {kanji.character}
                    </span>

                    <span className="flex-1 truncate text-xs font-medium">
                      {kanji.han_viet}
                    </span>

                    {changing ? (
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