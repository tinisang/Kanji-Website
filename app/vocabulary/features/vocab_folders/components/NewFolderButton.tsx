"use client";

import { Plus } from "lucide-react";

interface Props {
  onClick: () => void;
}

export default function NewFolderButton({
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className="
        flex shrink-0 cursor-pointer items-center gap-2 rounded-xl
        border border-[#DDE300]
        bg-[#F7FF1D]
        px-4 py-2
        text-sm font-semibold text-black
        shadow-md shadow-[#F7FF1D]/40
        transition-all duration-200
        hover:-translate-y-0.5
        hover:shadow-lg hover:shadow-[#F7FF1D]/50
        active:translate-y-0
      "
    >
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black/10">
        <Plus className="h-3.5 w-3.5" />
      </div>

      <span>New Folder</span>
    </button>
  );
}