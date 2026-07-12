"use client";

import { useVocabulary } from "@/app/vocabulary/context.ts/VocabularyContext";
import { FolderOpen } from "lucide-react";

interface Props {
  active: boolean;
  onClick: () => void;
}

export default function VocabularyAllFolder({
  active,
  onClick,
}: Props) {

  const {setActiveFolderId} = useVocabulary()

   function handleClick(){
    onClick();
setActiveFolderId("all")
  }
  return (
    <button
      onClick={handleClick}
      className={`
        flex shrink-0 cursor-pointer items-center gap-2 rounded-xl
        border px-4 py-2 text-sm font-medium transition-all duration-200
        ${
          active
            ? "border-[#F7FF1D] bg-[#F7FF1D] text-black shadow-lg shadow-[#F7FF1D]/30"
            : "border-[#F7FF1D] bg-[#F7FF1D] text-black opacity-45 hover:opacity-100"
        }
      `}
    >
      <FolderOpen className="h-4 w-4" />
      All
    </button>
  );
}