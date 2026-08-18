"use client";

import Link from "next/link";
import { ClipboardCheck, Sparkles } from "lucide-react";

export default function ReviewFloatingButton() {
  return (
    <Link
      href="/review"
      aria-label="Review"
      className="
        group fixed bottom-5 right-5 z-50
        flex items-center gap-0
        rounded-full
        bg-zinc-950
        p-1.5
        text-white
        shadow-[0_8px_30px_rgba(0,0,0,0.18)]
        ring-1 ring-white/10
        transition-all duration-300
        hover:gap-2
        hover:bg-emerald-400
        hover:text-zinc-950
        hover:shadow-[0_10px_35px_rgba(52,211,153,0.35)]
        sm:bottom-6 sm:right-6
      "
    >
      <span
        className="
          flex h-11 w-11 shrink-0 items-center justify-center
          rounded-full
          bg-emerald-400
          text-zinc-950
          transition-transform duration-300
          group-hover:rotate-6
          sm:h-12 sm:w-12
        "
      >
        <ClipboardCheck className="h-5 w-5 sm:h-6 sm:w-6" />
      </span>

      <span
        className="
          max-w-0 overflow-hidden
          whitespace-nowrap
          text-sm font-bold
          opacity-0
          transition-all duration-300
          group-hover:max-w-[80px]
          group-hover:pr-3
          group-hover:opacity-100
        "
      >
        Review
      </span>

      <Sparkles
        className="
          pointer-events-none
          absolute -right-1 -top-1
          h-3.5 w-3.5
          text-emerald-400
          transition-colors
          group-hover:text-zinc-950
        "
      />
    </Link>
  );
}