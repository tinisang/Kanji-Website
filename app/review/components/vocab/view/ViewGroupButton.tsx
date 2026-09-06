"use client";

import { useState } from "react";
import ViewGroupDialog from "./ViewGroupDialog";

interface ViewGroupButtonProps {
  kanjiId: string;
}

export default function ViewGroupButton({
  kanjiId,
}: ViewGroupButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="
          inline-flex
          items-center
          rounded-full
          border
          border-border/60
          bg-background/70
          px-2.5
          py-1
          text-[11px]
          font-medium
          text-muted-foreground
          shadow-sm
          transition-all
          hover:border-emerald-200
          hover:bg-emerald-50
          hover:text-emerald-700
          active:scale-[0.97]
        "
      >
        View
      </button>

      <ViewGroupDialog
        kanjiId={kanjiId}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}