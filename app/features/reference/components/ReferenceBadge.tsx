import { Badge } from "@/components/ui/badge";
import { Check, Plus, X } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { ReferenceSet } from "@/types/reference";
import { Kanji } from "@/types/kanji";

import {
  addKanjiReferenceUI,
  removeKanjiReferenceUI,
  updateKanjiReferenceItemUI,
  useKanji,
} from "@/contexts/Context";
import { addKanjiReferenceItemAPI, editKanjiReferenceItemAPI, removeKanjiReferenceAPI } from "../api/reference-item.client";
import { EditableText } from "../../kanji/components/EditableText";
import { KanjiReferenceItem } from "@/types/reference-item";
interface ReferenceBadgeProps {
  kanji: Kanji;
  references: ReferenceSet[];
  referenceItems: KanjiReferenceItem[];
}

export default function ReferenceBadge({
  kanji,
  references = [],
  referenceItems = [],
}: ReferenceBadgeProps) {

  console.log(referenceItems)

  const { setData } = useKanji();
const selectedReferenceIds = referenceItems.map(
  (item) => item.reference_set_id
);
const handleToggleReference = async (
  reference: ReferenceSet
) => {
  const item = referenceItems.find(
  (item) =>
    item.reference_set_id === reference.id
);

  try {
    if (item) {
      await removeKanjiReferenceAPI(
        kanji.id,
        reference.id
      );

      removeKanjiReferenceUI(
        setData,
        kanji.id,
        reference.id
      );

      return;
    }

    const created =
      await addKanjiReferenceItemAPI({
        kanji_id: kanji.id,
        reference_set_id: reference.id,
        note: "",
      });

    addKanjiReferenceUI(
      setData,
      created
    );
  } catch (error) {
    console.error(error);
  }
};
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Reference
      </p>

      <div className="flex flex-wrap gap-2">
        {referenceItems.map((item) => {
  const ref = references.find(
    (r) => r.id === item.reference_set_id
  );

  if (!ref) return null;

  return (
    <div
  key={item.id}
  className="inline-flex items-center gap-2 rounded-full border px-3 py-1"
  style={{
    backgroundColor: `${ref.color}20`,
    borderColor: ref.color,
  }}
>
  <span
    className="font-medium"
    style={{ color: ref.color }}
  >
    {ref.name}
  </span>

  <div className="h-4 w-px bg-neutral-300" />

  <EditableText
    defaultValue={item.note}
    placeholder="+ note"
    className="min-w-[60px] bg-transparent px-0 py-0 text-xs font-semibold text-neutral-700"
    onSave={async (value) => {
      const saved = await editKanjiReferenceItemAPI({
        ...item,
        note: value,
      });

      updateKanjiReferenceItemUI(setData, saved);
    }}
  />

  <button
    type="button"
    className="ml-1 flex h-4 w-4 items-center justify-center rounded-full text-neutral-400 transition hover:bg-red-100 hover:text-red-500"
    onClick={async () => {
      try {
        await removeKanjiReferenceAPI(
          kanji.id,
          ref.id
        );

        removeKanjiReferenceUI(
          setData,
          kanji.id,
          ref.id
        );
      } catch (error) {
        console.error(error);
      }
    }}
  >
    <X className="h-3 w-3" />
  </button>
</div>
  );
})}

        <Popover>
          <PopoverTrigger asChild>
            <Badge
              variant="outline"
              className="cursor-pointer rounded-full border-dashed px-3 py-1 hover:bg-accent"
            >
              <Plus className="mr-1 h-3 w-3" />
              Add
            </Badge>
          </PopoverTrigger>

          <PopoverContent className="w-60 p-0">
            <Command>
              <CommandInput placeholder="Search reference..." />

              <CommandList>
                <CommandEmpty>No reference found.</CommandEmpty>

               <CommandGroup heading="Reference Sets">
  {references.map((ref) => {
    const selected = selectedReferenceIds.includes(ref.id);

    return (
      <CommandItem
        key={ref.id}
        onSelect={() => handleToggleReference(ref)}
        className="flex cursor-pointer justify-between"
      >
        <span>{ref.name}</span>

        {selected && (
          <Check className="h-4 w-4 text-green-500" />
        )}
      </CommandItem>
    );
  })}
</CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}