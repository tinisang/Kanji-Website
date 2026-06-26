"use client";

import { useEffect, useState } from "react";
import {
  BookOpen,
  ChevronDown,
  Plus,
  Search,
  ChevronRight,
} from "lucide-react";
import AddReferenceModal from "./CreateReferenceModal";
import { ReferenceSet } from "@/types/reference";
import { getAllReferenceSetsAPI } from "../api/reference.client";





export default function ReferenceSection() {

  const [open, setOpen] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  
  const [references, setReferences] = useState<ReferenceSet[]>([]);
  async function fetchReferenceSets() {
  try {
    const data = await getAllReferenceSetsAPI();
    setReferences(data);
  } catch (error) {
    console.error(error);
  }
}

useEffect(() => {
  fetchReferenceSets();
}, []);

  return (
    <section className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm mb-8">
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-6 py-5 transition hover:bg-neutral-50"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F4F9E6]">
            <BookOpen size={22} className="text-[#8EB515]" />
          </div>

          <div className="text-left">
            <h2 className="font-semibold text-lg">References</h2>

            <p className="text-sm text-neutral-500">
              {references.length} learning resources
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="rounded-full bg-neutral-100 px-3 py-1 text-sm">
            {references.length}
          </span>

          <ChevronDown
            size={20}
            className={`transition duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* Expand */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-[100vh]" : "max-h-0"
        }`}
      >
        <div className="border-t border-neutral-200">
          {/* Toolbar */}

          <div className="flex items-center justify-between gap-4 p-5">
            <div className="relative w-full max-w-sm">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
              />

              <input
                placeholder="Search reference..."
                className="w-full rounded-xl border border-neutral-200 py-2.5 pl-10 pr-4 outline-none transition focus:border-[#A1CE1C]"
              />
            </div>

            <button
  onClick={() => setOpenAddModal(true)}
  className="flex items-center gap-2 rounded-xl bg-[#A1CE1C] px-4 py-2.5 text-sm font-medium hover:brightness-95"
>
  <Plus size={16} />
  New
</button>
          </div>

          {/* List */}

          <div className="space-y-2 px-5 pb-5">
            {references.map((ref) => (
              <button
                key={ref.id}
                className="group flex w-full items-center justify-between rounded-xl border border-neutral-200 px-4 py-3 transition hover:border-[#A1CE1C] hover:bg-[#F9FDEA]"
              >
                <div className="flex items-center gap-4">
                  

                  <div className="text-left">
                    <p className="font-medium">{ref.name}</p>

                    <p className="text-sm text-neutral-500">
                      {/* {ref.count} Kanji */}
                    </p>
                  </div>
                </div>

                <ChevronRight
                  size={18}
                  className="text-neutral-400 transition group-hover:translate-x-1"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
      <AddReferenceModal
  open={openAddModal}
  onClose={() => setOpenAddModal(false)}
  onCreated={fetchReferenceSets}
/>
    </section>
  );
}