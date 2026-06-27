import { ReferenceSet } from "@/types/reference";
import { ReferenceItem } from "./ReferenceItem";
import { KanjiReferenceItem } from "@/types/reference-item";

interface ReferenceListProps {
  references: ReferenceSet[];
  kanjiReferenceItems: Record<
    string,
    KanjiReferenceItem[]
  >;
}

export function ReferenceList({
  references,
  kanjiReferenceItems,
}: ReferenceListProps) {
  return (
    <div className="space-y-2 px-5 pt-5">
      {references.map((reference) => {
        const count = Object.values(
          kanjiReferenceItems
        ).filter((items) =>
          items.some(
            (item) =>
              item.reference_set_id ===
              reference.id
          )
        ).length;

        return (
          <ReferenceItem
            key={reference.id}
            reference={reference}
            count={count}
          />
        );
      })}
    </div>
  );
}