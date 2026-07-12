"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useVocabulary } from "@/app/vocabulary/context.ts/VocabularyContext";

export default function FolderReorderSwitch() {
  const {
    reorderFolders,
    setReorderFolders,
  } = useVocabulary();

  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm">
      <Label
        htmlFor="folder-reorder"
        className="cursor-pointer text-sm font-medium text-gray-700"
      >
        Reorder
      </Label>

      <Switch
        id="folder-reorder"
        checked={reorderFolders}
        onCheckedChange={setReorderFolders}
      />
    </div>
  );
}