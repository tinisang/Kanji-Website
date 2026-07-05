
import { EditableText } from "@/app/kanji/features/kanji/components/EditableText";


interface Example {
  jp: string;
  vn: string;
}

interface Props {
  mainWord: string;

  keyword: string;
  meaning: string;

  examples: Example[];

  onKeywordSave?: (value: string) => void;
  onMeaningSave?: (value: string) => void;
  onExampleSave?: (
    index: number,
    field: "jp" | "vn",
    value: string
  ) => void;
}

export default function VocabularyUsageItem({
  mainWord,
  keyword,
  meaning,
  examples,
  onKeywordSave,
  onMeaningSave,
  onExampleSave,
}: Props) {
  return (
    <div className="flex gap-4 rounded-lg bg-emerald-50 p-4">
      <div className="flex w-40 shrink-0 flex-col rounded-md bg-white p-3 shadow-sm">
        <EditableText
          defaultValue={keyword}
          className="text-2xl font-bold"
          onSave={onKeywordSave}
        />

        <div className="mt-2 rounded bg-emerald-400 px-2 py-1 text-center text-xs font-semibold text-white">
          <EditableText
            defaultValue={meaning}
            className="w-full text-center text-white"
            onSave={onMeaningSave}
          />
        </div>
      </div>

      <div className="flex-1 space-y-4">
        {examples.map((example, index) => (
          <div
            key={index}
            className=" flex flex-col space-y-1"
          >
            <EditableText
              defaultValue={example.jp}
              className="font-semibold"
              onSave={(value) =>
                onExampleSave?.(index, "jp", value)
              }
            />

            <EditableText
              defaultValue={example.vn}
              className="text-gray-600"
              onSave={(value) =>
                onExampleSave?.(index, "vn", value)
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}