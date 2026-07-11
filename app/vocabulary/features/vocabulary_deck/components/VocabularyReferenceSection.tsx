interface ReferenceItem {
  id: number;
  word: string;
  meaning: string;
}

interface Props {
  title: string;
  color: string;
  items: ReferenceItem[];
}

export default function VocabularyReferenceSection({
  title,
  color,
  items,
}: Props) {
  return (
    <div>
      <span
        className={`inline-flex rounded-full px-4 py-1 text-sm font-semibold text-white ${color}`}
      >
        {title}
      </span>

      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4"
          >
            <span className="text-2xl font-bold">
              {item.word}
            </span>

            <span className="text-gray-600">
              {item.meaning}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}