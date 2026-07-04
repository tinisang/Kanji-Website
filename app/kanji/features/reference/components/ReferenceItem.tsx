"use client";

import { useState } from "react";
import { ChevronRight, Trash2 } from "lucide-react";
import { Check, Plus, X } from "lucide-react";

import { ReferenceSet } from "@/app/kanji/types/reference";
import { useKanji, removeReferenceSetUI } from "@/contexts/Context";
import { deleteReferenceSetAPI } from "../api/reference.client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ReferenceItemProps {
  reference: ReferenceSet;
  count: number;
}

export function ReferenceItem({
  reference,
  count,
}: ReferenceItemProps) {
  const [open, setOpen] = useState(false);

  const { setData } = useKanji();

  const handleClick = () => {
    console.log(reference);
  };

  const handleDelete = async () => {
    try {
      await deleteReferenceSetAPI(reference.id);

      removeReferenceSetUI(setData, reference.id);

      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  }}
  className="group flex w-full cursor-pointer items-center justify-between rounded-2xl border border-neutral-200 bg-white px-5 py-4 text-left transition-all duration-200 hover:border-[#A1CE1C] hover:bg-[#F9FDEA] hover:shadow-sm"
>
  <div className="min-w-0">
    <div className="flex items-center gap-3">
      <div
        className="h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: reference.color }}
      />

      <h3 className="truncate text-[15px] font-semibold text-neutral-900">
        {reference.name}
      </h3>
    </div>

    <p className="mt-1 text-sm text-neutral-500">
      {count} Kanji
    </p>
  </div>

  <div className="flex items-center gap-1">
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        setOpen(true);
      }}
      className="rounded-lg p-2 text-neutral-400 opacity-0 transition hover:bg-red-50 hover:text-red-500 group-hover:opacity-100"
    >
      <Trash2 size={16} />
    </button>

    <ChevronRight
      size={18}
      className="text-neutral-400 transition-all duration-200 group-hover:translate-x-1 group-hover:text-[#8EB515]"
    />
  </div>
</div>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete Reference?
            </AlertDialogTitle>

            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}