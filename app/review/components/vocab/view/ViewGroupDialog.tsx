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

interface GroupWithKanjis {
  id: string;
  name: string;
  kanjis: Kanji[];
}

export default function ViewGroupDialog({
  kanjiId,
  open,
  onOpenChange,
}: ViewGroupDialogProps) {
  const [groups, setGroups] = useState<GroupWithKanjis[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

    async function loadGroups() {
      try {
        setLoading(true);

        const groupData = await getGroupByKanjiIdAPI(kanjiId);

        if (!groupData || groupData.length === 0) {
          setGroups([]);
          return;
        }

        const results = await Promise.all(
          groupData.map(async (group: { id: string; name: string }) => {
            const kanjis = await getKanjisByGroupIdAPI(group.id);

            return {
              id: group.id,
              name: group.name,
              kanjis,
            };
          })
        );

        setGroups(results);
      } catch (error) {
        console.error("Failed to load kanji groups:", error);
        setGroups([]);
      } finally {
        setLoading(false);
      }
    }

    loadGroups();
  }, [open, kanjiId]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-[70vw] sm:max-w-[70vw]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Kanji Groups
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        ) : groups.length === 0 ? (
          <div className="py-10 text-center text-sm text-muted-foreground">
            No groups found.
          </div>
        ) : (
          <div className="max-h-[70vh] overflow-y-auto pr-2">
            {groups.map((group, index) => (
              <div
                key={group.id}
                className={
                  index !== groups.length - 1
                    ? "border-b pb-6 mb-6"
                    : ""
                }
              >
                {group.kanjis.length > 0 && (
                  <KanjiGroupGrid kanjis={group.kanjis} />
                )}
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}