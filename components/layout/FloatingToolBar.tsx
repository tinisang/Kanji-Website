"use client";


import { Check, Copy, Trash2 } from "lucide-react";
import DragToggle from "../ui/DragToggle";
import LearnedToggle from "../ui/LearnedToggle";

export default function FloatingToolbar() {
  return (
    <div
      className="
        fixed bottom-6 left-1/2 -translate-x-1/2
        flex items-center gap-2
        rounded-2xl border border-neutral-200
        bg-white px-2 py-2
        z-100
        shadow-lg
      "
    >
      <DragToggle />

      <div className="h-6 w-px bg-neutral-200" />
      <LearnedToggle></LearnedToggle>

      
    </div>
  );
}