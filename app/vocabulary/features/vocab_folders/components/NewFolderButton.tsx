"use client";

import { Plus } from "lucide-react";

interface Props {
  onClick: () => void;
}

export default function NewFolderButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="
        flex w-full items-center justify-center gap-2
        rounded-lg
        border border-dashed border-zinc-300
        px-3 py-2.5
        text-sm text-zinc-500
        transition-colors
        hover:border-zinc-400
        hover:bg-zinc-50
        hover:text-zinc-700
      "
    >
      <Plus className="h-4 w-4" />
      <span>New Folder</span>
    </button>
  );
}