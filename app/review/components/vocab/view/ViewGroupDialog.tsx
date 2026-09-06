"use client";

import { useEffect, useState } from "react";
import { Loader2, Users } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Kanji } from "@/app/kanji/types/kanji";

import {
  getGroupByKanjiIdAPI,
  getKanjisByGroupIdAPI,
} from "@/app/kanji/features/group/api/group.client";
import KanjiGroupGrid from "./KanjiGroupGrid";



interface ViewGroupDialogProps {
  kanjiId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ViewGroupDialog({
  kanjiId,
  open,
  onOpenChange,
}: ViewGroupDialogProps) {
  const [kanjis, setKanjis] = useState<Kanji[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

    async function loadGroup() {
      try {
        setLoading(true);

        const group =
          await getGroupByKanjiIdAPI(kanjiId);

        if (!group) {
          setKanjis([]);
          return;
        }

        const data =
          await getKanjisByGroupIdAPI(group.id);

        setKanjis(data);
      } catch (error) {
        console.error(
          "Failed to load kanji group:",
          error
        );

        setKanjis([]);
      } finally {
        setLoading(false);
      }
    }

    loadGroup();
  }, [open, kanjiId]);

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="w-[95vw] max-w-[70vw] sm:max-w-[70vw]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Kanji Group
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        ) : kanjis.length === 0 ? (
          <div className="py-10 text-center text-sm text-muted-foreground">
            No kanji found in this group.
          </div>
        ) : (
          <KanjiGroupGrid kanjis={kanjis} />
        )}
      </DialogContent>
    </Dialog>
  );
}