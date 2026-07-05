import { Plus } from "lucide-react";

export default function AddVocabularyDeck() {
  return (
    <button
      type="button"
      className="
        group
        cursor-pointer
        flex min-h-[180px] w-full
        flex-col items-center justify-center
        rounded-xl
        border-2 border-dashed border-gray-300
        bg-white
        transition-all duration-200
        hover:border-[#1DFFB0]
        hover:bg-[#F4FFFB]
        hover:shadow-md
      "
    >
      <div
        className="
          flex h-14 w-14 items-center justify-center
          rounded-full
          bg-gray-100
          transition-colors
          group-hover:bg-[#1DFFB0]
        "
      >
        <Plus className="h-8 w-8 text-gray-500 group-hover:text-black" />
      </div>

      <h3 className="mt-5 text-lg font-semibold text-gray-800">
        Add New Vocabulary
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        Create a new vocabulary deck
      </p>
    </button>
  );
}