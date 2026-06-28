"use client";

import { useKanji } from "@/contexts/Context";

export default function LearnedToggle() {
  const { learnedFilter, setLearnedFilter } = useKanji();

  const buttonClass = (active: boolean) =>
    `rounded-md px-3 py-1.5 text-sm font-medium transition ${
      active
        ? "bg-white text-neutral-900 shadow-sm"
        : "text-neutral-500 hover:text-neutral-700"
    }`;

  return (
    <div className="inline-flex rounded-lg bg-neutral-100 p-1">
      <button
        onClick={() => setLearnedFilter("all")}
        className={buttonClass(learnedFilter === "all")}
      >
        All
      </button>

      <button
        onClick={() => setLearnedFilter("learned")}
        className={buttonClass(learnedFilter === "learned")}
      >
        Learned
      </button>

      <button
        onClick={() => setLearnedFilter("unlearned")}
        className={buttonClass(learnedFilter === "unlearned")}
      >
        Unlearned
      </button>
    </div>
  );
}