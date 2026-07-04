"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { createReferenceSetAPI } from "../api/reference.client";
import { addReferenceSetUI, useKanji } from "@/contexts/Context";


interface AddReferenceModalProps {
  open: boolean;
  onClose: () => void;
  
}

const COLORS = [
  "#A1CE1C",
  "#60A5FA",
  "#F97316",
  "#A855F7",
  "#EC4899",
  "#EF4444",
];

export default function AddReferenceModal({
  open,
  onClose,

}: AddReferenceModalProps) {

  const {setData} = useKanji();
  const [name, setName] = useState("");
  const [description, setDescription] =useState("");
  const [color, setColor] =useState(COLORS[0]);
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  async function handleSubmit() {
    if (!name.trim()) return;

    try {
      setLoading(true);

      const newRef= await createReferenceSetAPI({
        name,
        description,
        color,
      });

      addReferenceSetUI(setData, newRef);

      setName("");
      setDescription("");
      setColor(COLORS[0]);

      onClose();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
        {/* Header */}

        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-lg font-semibold">
            New Reference
          </h2>

          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}

        <div className="space-y-5 p-6">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Name
            </label>

            <input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Mimikara N4"
              className="w-full rounded-xl border p-3 outline-none focus:border-[#A1CE1C]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Description
            </label>

            <input
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              placeholder="Japanese Vocabulary Series"
              className="w-full rounded-xl border p-3 outline-none focus:border-[#A1CE1C]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Color
            </label>

            <div className="flex gap-3">
              {COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() =>
                    setColor(c)
                  }
                  className={`h-8 w-8 rounded-full border-2 ${color === c
                      ? "border-black"
                      : "border-transparent"
                    }`}
                  style={{
                    backgroundColor: c,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-xl border px-4 py-2"
          >
            Cancel
          </button>

          <button
            disabled={
              loading || !name.trim()
            }
            onClick={handleSubmit}
            className="rounded-xl bg-[#A1CE1C] px-4 py-2 font-medium disabled:opacity-50"
          >
            {loading
              ? "Creating..."
              : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}