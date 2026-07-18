"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import AddGrammarDialog from "./AddGrammarDialog";


export default function AddGrammarDeck() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
  type="button"
  onClick={() => setOpen(true)}
  className="
    group
    flex h-36 w-full cursor-pointer
    flex-col items-center justify-center
    rounded-2xl
    border border-dashed border-gray-300
    bg-white
    transition-all duration-200
    hover:border-blue-400
    hover:bg-blue-50/30
    hover:shadow-md
  "
>
  <div
    className="
      mb-3 flex h-11 w-11 items-center justify-center
      rounded-full bg-gray-100
      transition-all
      group-hover:bg-blue-500
    "
  >
    <Plus className="h-5 w-5 text-gray-500 group-hover:text-white" />
  </div>

  <h3 className="text-lg font-semibold text-gray-800">
    Add Grammar
  </h3>

  <p className="mt-1 text-sm text-gray-500">
    Create a new deck
  </p>
</button>

      <AddGrammarDialog
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}