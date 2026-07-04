"use client";

import { Vocabulary } from "@/types/vocabulary";
import { ChevronDown, ChevronUp } from "lucide-react";
import { EditableText } from "../../kanji/components/EditableText";
import { useKanji } from "@/contexts/Context";
import { updateVocabulary } from "../api/vocabulary.client";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  vocabulary: Vocabulary;
  index: number;
  total: number;

  onMoveUp: () => void;
  onMoveDown: () => void;
  onDelete: () => void;
}

export default function VocabularyItem({
  vocabulary,
  index,
  total,
 
  onMoveUp,
  onMoveDown,
  onDelete,
}: Props) {

  const {data, setData} = useKanji();

  async function onChange<K extends keyof Vocabulary>(
 
  key: K,
  value: Vocabulary[K]
) {
   
  setData((prev) => ({
    ...prev,
    vocabularies: {
      ...prev.vocabularies,
      [vocabulary.id]: {
        ...prev.vocabularies[vocabulary.id],
        [key]: value,
      },
    },
  }));

  const updatedVocabulary = {
    ...vocabulary,
    [key]: value,
  };

  await updateVocabulary(updatedVocabulary);

  
}

function handleRevisionChange(checked: boolean) {
  onChange("need_revision", checked);
}
  return (
    <div  className={`flex items-start gap-4 rounded-xl border py-3 px-2 transition-all ${
    vocabulary.need_revision
      ? "border-amber-300 bg-amber-50 shadow-sm"
      : "border-transparent hover:bg-muted/40"
  }`}>
      <EditableText
  defaultValue={vocabulary.word}
  placeholder="漢字"
  onSave={(value) => onChange("word", value)}
  className="
    !w-[250px]
    
 break-words
  whitespace-normal

  text-4xl
  font-bold
  leading-none

  "
/>

<EditableText
  defaultValue={vocabulary.reading ?? ""}
  placeholder="かんじ"
  onSave={(value) => onChange("reading", value)}
  className="
    min-w-[140px]
    max-w-[180px]
    text-2xl
    leading-none
  "
/>

<EditableText
  defaultValue={vocabulary.meaning ?? ""}
  placeholder="Hán tự"
  onSave={(value) => onChange("meaning", value)}
  className="
    min-w-[200px]
    flex-1
    max-w-full
    text-xl
    leading-none
  "
/>
 <label className="flex items-center gap-2 text-sm text-muted-foreground">
    <Checkbox
      checked={vocabulary.need_revision}
      onCheckedChange={handleRevisionChange}
    />
    Need Revision
  </label>
      <div className="ml-auto flex gap-1">
        <button
          type="button"
          onClick={onMoveUp}
          disabled={index === 0}
          className="rounded p-1 hover:bg-neutral-100 disabled:opacity-30"
        >
          <ChevronUp className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={()=>{
            onMoveDown();
          }}
          disabled={index === total - 1}
          className="rounded p-1 hover:bg-neutral-100 disabled:opacity-30"
        >
          <ChevronDown className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={onDelete}
          className="rounded p-1 text-red-500 hover:bg-red-50"
        >
          ✕
        </button>
      </div>
    </div>
  );
}