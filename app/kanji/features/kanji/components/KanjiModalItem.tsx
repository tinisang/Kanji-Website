
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { EditableText } from "./EditableText";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TiptapEditor from "./TipTapEditor";
import { Kanji } from "@/app/kanji/types/kanji";
import { updateKanjiUI, useKanji } from "@/contexts/Context";
import {
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import ReferenceBadge from "../../reference/components/ReferenceBadge";
import { handleSaveKanji } from "../api/kanji.client";
import KanjiVocabularySection from "../../vocabulary/components/KanjiVocabularySection";
interface KanjiDetailModalProps {
  kanji: Kanji;
  
  children: React.ReactNode;
}
export default function KanjiDetailModal({kanji,children}: KanjiDetailModalProps) {

  const { data, setData, dragEnabled } = useKanji();

const references = Object.values(data.reference_sets).sort(
  (a, b) => a.position - b.position
);


const referenceItems = data.kanji_reference_items[kanji.id] ?? [];
  const [editingContent, setEditingContent] = useState(false);
  const [content, setContent] = useState(
    kanji.content ?? ""
  );
 

  async function handleSave(kanji: Kanji) {
   
    const update = await handleSaveKanji(kanji);
    updateKanjiUI(
      setData,
      update
    )
  }
const [open, setOpen] = useState(false);
  return (
    <Dialog
    open={open}
  onOpenChange={(value) => {
    if (!dragEnabled) return;
    setOpen(value);
  }}
    >
      <DialogTrigger  asChild>{children}</DialogTrigger>
      <DialogContent
  showCloseButton={false}
  className="!max-w-5xl p-0 max-h-[90vh] overflow-hidden"
>
  <div className="flex h-[90vh] flex-col overflow-hidden rounded-lg border-l-4 border-l-lime-500">
    {/* Header */}
    <div className="shrink-0 bg-neutral-50 p-6">
      <div className="flex justify-between">
        <div className="text-left">
          <div className="text-7xl font-bold leading-none">
            {kanji.character}
          </div>

          <EditableText
            defaultValue={kanji.han_viet}
            placeholder="Nhập từ ..."
            className="mt-4 text-2xl font-semibold text-neutral-400"
            onSave={(value) =>
              handleSave({
                ...kanji,
                han_viet: value,
              })
            }
          />
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-20 text-sm font-medium text-neutral-500">
              Onyomi
            </span>

            <EditableText
              defaultValue={kanji.onyomi ?? ""}
              className="text-lg"
              placeholder="オンヨミ"
              onSave={(value) =>
                handleSave({
                  ...kanji,
                  onyomi: value,
                })
              }
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="w-20 text-sm font-medium text-neutral-500">
              Kunyomi
            </span>

            <EditableText
              defaultValue={kanji.kunyomi ?? ""}
              className="text-lg"
              placeholder="くんよみ"
              onSave={(value) =>
                handleSave({
                  ...kanji,
                  kunyomi: value,
                })
              }
            />
          </div>
        </div>

        <ReferenceBadge
          kanji={kanji}
          references={references}
          referenceItems={referenceItems}
        />
      </div>
    </div>

    {/* Body */}
    <div className="flex-1 overflow-y-auto">
      <div className="border-t p-6">
        <KanjiVocabularySection
          kanjiId={kanji.id}
        />
      </div>

      <div className="bg-lime-50 p-6">
        <h3 className="mb-3">
          Ghi chú
        </h3>

        {editingContent ? (
          <TiptapEditor
            value={content}
            onChange={setContent}
          />
        ) : (
          <div
            onClick={() =>
              setEditingContent(true)
            }
            className="
              prose prose-sm max-w-none
              min-h-[120px]
              cursor-text
              rounded
              p-2
              hover:bg-lime-100/50
            "
            dangerouslySetInnerHTML={{
              __html:
                content ||
                "<p class='text-neutral-400'>Click để thêm ghi chú...</p>",
            }}
          />
        )}
      </div>
    </div>

    {/* Footer */}
    {editingContent && (
      <div className="shrink-0 border-t bg-white p-4">
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() =>
              setEditingContent(false)
            }
          >
            Huỷ
          </Button>

          <Button
            onClick={async () => {
              await handleSave({
                ...kanji,
                content,
              });

              setEditingContent(false);
            }}
          >
            Lưu
          </Button>
        </div>
      </div>
    )}
  </div>
</DialogContent>
    </Dialog>

  );
}