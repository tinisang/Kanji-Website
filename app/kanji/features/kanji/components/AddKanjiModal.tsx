"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { addKanjiUI, useKanji } from "@/contexts/Context";
import { Kanji } from "@/app/kanji/types/kanji";
import {
  createKanjiAndAssignGroupAPI,
  createKanjiProxyAPI,
} from "../api/kanji.client";
import { assignKanjiToGroupAPI } from "../../group/api/group.client";


interface AddKanjiModalProps {
  groupId?: string;
  setItemArray: React.Dispatch<React.SetStateAction<Kanji[]>>;
}

type KanjiInput = Omit<Kanji, "id" | "created_at" | "updated_at">;
type Mode = "new" | "existing";

export default function AddKanjiModal({ groupId }: AddKanjiModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<Mode>("new");
  const [search, setSearch] = useState("");
  const [selectedKanjiId, setSelectedKanjiId] = useState<string | null>(null);

  const { data, setData } = useKanji();

  const [character, setCharacter] = useState("");
  const [hanViet, setHanViet] = useState("");

  useEffect(() => {
    if (!open) {
      setCharacter("");
      setHanViet("");
      setSearch("");
      setSelectedKanjiId(null);
      setMode("new");
    }
  }, [open]);

  const existingKanjis = useMemo(() => {
    const query = search.trim().toLowerCase();

    return Object.values(data.kanjis)
      .filter(kanji => {
        // Chỉ tìm Kanji gốc, không lấy proxy
        if (kanji.reference_kanji_id) return false;

        if (!query) return true;

        return (
          kanji.character.toLowerCase().includes(query) ||
          kanji.han_viet.toLowerCase().includes(query) ||
          kanji.onyomi?.toLowerCase().includes(query) ||
          kanji.kunyomi?.toLowerCase().includes(query)
        );
      })
      .slice(0, 50);
  }, [data.kanjis, search]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!groupId || loading) return;

    try {
      setLoading(true);

      if (mode === "new") {
        const kanji: KanjiInput = {
          character: character.trim(),
          han_viet: hanViet.trim(),
          onyomi: null,
          kunyomi: null,
          example: null,
          vocabularies: [],
          short_description: null,
          content: null,
          learned: false,
          reference_kanji_id: null,
        };

        const newKanji = await createKanjiAndAssignGroupAPI(kanji, groupId);
        addKanjiUI(setData, newKanji, groupId);
      } else {
        if (!selectedKanjiId) return;

        // Tạo proxy trỏ tới Kanji gốc
        const proxy = await createKanjiProxyAPI(selectedKanjiId);

        // Add proxy vào group
        await assignKanjiToGroupAPI(proxy.id, groupId);

        addKanjiUI(setData, proxy, groupId);
      }

      setOpen(false);
    } catch (error) {
      console.error("Failed to add kanji:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="cursor-pointer rounded-lg border border-neutral-200 bg-neutral-50 p-4 transition-all hover:border-neutral-300 hover:bg-neutral-100">
          <div className="flex h-full flex-col items-center justify-center">
            <div className="text-2xl font-light text-neutral-400">+</div>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="w-[calc(100%-1rem)] max-w-5xl max-h-[95vh] overflow-hidden p-0 font-inherit sm:w-full"
      >
        <form
          onSubmit={handleSubmit}
          className="flex max-h-[95vh] flex-col overflow-hidden rounded-lg border-l-4 border-l-lime-500"
        >
          <DialogHeader className="border-b bg-neutral-50 p-4 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-lg font-semibold">Add Kanji</div>
                <div className="text-sm text-neutral-500">
                  Create a new Kanji or add an existing one
                </div>
              </div>

              <div className="flex rounded-lg border bg-white p-1">
                <Button
                  type="button"
                  size="sm"
                  variant={mode === "new" ? "default" : "ghost"}
                  onClick={() => setMode("new")}
                >
                  New
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={mode === "existing" ? "default" : "ghost"}
                  onClick={() => setMode("existing")}
                >
                  Existing
                </Button>
              </div>
            </div>
          </DialogHeader>

          <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
            {mode === "new" ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-[1fr_3fr]">
                <div>
                  <Input
                    name="character"
                    placeholder="漢"
                    value={character}
                    onChange={e => setCharacter(e.target.value)}
                    autoFocus
                    className="h-auto border-0 p-0 !text-6xl font-bold shadow-none focus-visible:ring-0 sm:!text-7xl"
                  />
                  <Input
                    name="han_viet"
                    placeholder="HÁN"
                    value={hanViet}
                    onChange={e => setHanViet(e.target.value)}
                    className="h-auto border-0 p-0 uppercase !text-xl font-semibold text-neutral-400 shadow-none focus-visible:ring-0 sm:!text-2xl"
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                  <Input
                    placeholder="Search Kanji..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    autoFocus
                    className="pl-9"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                  {existingKanjis.map(kanji => {
                    const selected = selectedKanjiId === kanji.id;

                    return (
                      <button
                        key={kanji.id}
                        type="button"
                        onClick={() => setSelectedKanjiId(kanji.id)}
                        className={`rounded-lg border p-4 text-left transition-all ${
                          selected
                            ? "border-lime-500 bg-lime-50 ring-2 ring-lime-200"
                            : "border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="text-4xl font-bold">
                            {kanji.character}
                          </div>

                          <div className="min-w-0">
                            <div className="truncate font-semibold uppercase">
                              {kanji.han_viet}
                            </div>

                            {kanji.onyomi && (
                              <div className="text-xs text-neutral-500">
                                On: {kanji.onyomi}
                              </div>
                            )}

                            {kanji.kunyomi && (
                              <div className="text-xs text-neutral-500">
                                Kun: {kanji.kunyomi}
                              </div>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {existingKanjis.length === 0 && (
                  <div className="py-12 text-center text-sm text-neutral-400">
                    No Kanji found.
                  </div>
                )}
              </>
            )}
          </div>

          <DialogFooter className="border-t bg-neutral-50 p-3 sm:p-4">
            <div className="flex w-full flex-col-reverse gap-2 p-2 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={loading}
                className="w-full sm:w-auto sm:min-w-[100px]"
              >
                Huỷ
              </Button>

              <Button
                type="submit"
                disabled={
                  loading ||
                  (mode === "new" && (!character.trim() || !hanViet.trim())) ||
                  (mode === "existing" && !selectedKanjiId)
                }
                className="w-full bg-lime-500 text-black hover:bg-lime-600 sm:w-auto sm:min-w-[100px]"
              >
                {loading ? "Đang lưu..." : "Lưu"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}