import { useKanji } from "@/contexts/Context";
import KanjiItem from "@/app/kanji/features/kanji/components/KanjiItem";
import { useDroppable } from "@dnd-kit/react";
import AddKanjiModal from "@/app/kanji/features/kanji/components/AddKanjiModal";

export default function UnClassifiedKanjis({
  data,
}: {
  data: Record<string, string[]>;
}) {
  const { data: globalData } = useKanji();

  const groupId = Object.values(globalData.groups)?.find(
    (group) => group.name === "Unclassified"
  )?.id;

  const setItemArray = () => {};

  const { ref } = useDroppable({
    id: groupId || "",
    type: "board",
    accept: "item",
  });

  if (!groupId) return null;

  const itemArray =
    data[groupId]
      ?.map((id) => globalData.kanjis[id])
      .filter(Boolean) ?? [];

  return (
    <section
      ref={ref}
      className="
        overflow-hidden
        rounded-xl
        border border-dashed border-neutral-200
        bg-neutral-50/70
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-dashed border-neutral-200 px-3 py-2">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-neutral-400" />

          <div>
            <h3 className="text-xs font-semibold text-neutral-600">
              Unclassified
            </h3>
            <p className="text-[10px] text-neutral-400">
              Kanji chưa được phân loại
            </p>
          </div>

          <span className="rounded-full bg-white px-2 py-0.5 text-[9px] font-medium text-neutral-500 shadow-sm">
            {itemArray.length}
          </span>
        </div>

        <span className="hidden text-[10px] text-neutral-400 sm:block">
          ← Kéo để xem thêm →
        </span>
      </div>

      {/* Content */}
      <div className="flex min-w-0 items-stretch">
       <div
  className="
    flex min-w-0 flex-1
    gap-1.5
    overflow-x-auto
    px-2 py-2
    [scrollbar-width:thin]
    [scrollbar-color:#d4d4d4_transparent]
    [&::-webkit-scrollbar]:h-1
    [&::-webkit-scrollbar-track]:bg-transparent
    [&::-webkit-scrollbar-thumb]:rounded-full
    [&::-webkit-scrollbar-thumb]:bg-neutral-200
    hover:[&::-webkit-scrollbar-thumb]:bg-neutral-300
  "
>
          {itemArray.length > 0 ? (
            itemArray.map((item: any, index: number) => (
              <div
                key={item.id}
                className="
                  w-[90px]
                  shrink-0
                  rounded-lg
                  border border-neutral-200
                  bg-white
                  transition-colors
                  hover:border-lime-200
                  hover:bg-lime-50/40
                "
              >
                <KanjiItem
                  isClassified={false}
                  kanji={item}
                  groupId={groupId}
                  index={index}
                />
              </div>
            ))
          ) : (
            <div className="flex min-h-[90px] flex-1 items-center justify-center text-center">
              <div>
                <p className="text-xs font-medium text-neutral-400">
                  Chưa có Kanji
                </p>
                <p className="mt-0.5 text-[10px] text-neutral-300">
                  Thêm Kanji mới vào danh sách này
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Add */}
        <div
          className="
            flex shrink-0
            items-center
            border-l border-dashed border-neutral-200
            px-2
          "
        >
          <AddKanjiModal
            setItemArray={setItemArray}
            groupId={groupId}
          />
        </div>
      </div>
    </section>
  );
}