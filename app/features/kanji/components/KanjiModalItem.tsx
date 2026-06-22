
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
import { handleSaveKanji } from "./handleSaveKanji";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import TiptapEditor from "./TipTapEditor";
import { Kanji } from "@/types/kanji";

interface KanjiDetailModalProps {
  kanji: Kanji;
  setKanji: React.Dispatch<
    React.SetStateAction<Kanji>
  >;
   children: React.ReactNode;
}
export default function KanjiDetailModal({
  kanji,
  setKanji,
  children
}: KanjiDetailModalProps) {

  const [editingContent, setEditingContent] = useState(false);
  const [content, setContent] = useState(
    kanji.content ?? ""
  );
  const [vocabularies, setVocabularies] = useState(
    kanji.vocabularies ?? []
  );

  const addVocabulary = () => {
    setVocabularies((prev) => [
      ...prev,
      {
        word: "",
        reading: "",
        meaning: "",
      },
    ]);
  };
  const removeVocabulary = (index: number) => {
    const updated = vocabularies.filter(
      (_, i) => i !== index
    );

    setVocabularies(updated);

    const updatedKanji = {
      ...kanji,
      vocabularies: updated,
    };

    setKanji(updatedKanji);

    handleSave(updatedKanji);
  };
  const updateVocabulary = (
    index: number,
    field: "word" | "reading" | "meaning",
    value: string
  ) => {
    const updated = vocabularies.map((item, i) =>
      i === index
        ? {
          ...item,
          [field]: value,
        }
        : item
    );

    setVocabularies(updated);

    const updatedKanji = {
      ...kanji,
      vocabularies: updated,
    };

    setKanji(updatedKanji);

    handleSave(updatedKanji);
  };

  async function handleSave(kanji: Kanji) {
    // console.log(value);
    setKanji(kanji);
    await handleSaveKanji(kanji);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent showCloseButton={false} className="!max-w-5xl p-0 font-inherit">

        <div className="overflow-hidden rounded-lg border-l-4 border-l-lime-500">
          {/* Header */}
          <div className="flex justify-between bg-neutral-50 p-6">
            {/* Kanji */}
            <div className="  text-left">
              <div className="text-7xl font-bold leading-none">{kanji.character}</div>
              <EditableText
                defaultValue={kanji.han_viet}
                placeholder="Nhập từ ..."
                className="mt-4 text-2xl font-semibold text-neutral-400"
                onSave={(value) => {
                  const updated = {
                    ...kanji,
                    han_viet: value,
                  };
                  handleSave(updated);
                }
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
                    onSave={(value) => {
                      handleSave({
                        ...kanji,
                        onyomi: value,
                      });
                    }}
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
                    onSave={(value) => {
                      handleSave({
                        ...kanji,
                        kunyomi: value,
                      });
                    }}
                  />
                </div>
              </div>


          </div>

          {/* Vocabulary */}
          <div className="space-y-4 border-t p-6">
            {vocabularies.map((vocabulary, index) => {

              return (
                <div
                  key={index}
                  className="flex items-center gap-4"
                >
                  <Input
                    value={vocabulary.word}
                    placeholder="漢字"
                    onChange={(e) =>
                      updateVocabulary(
                        index,
                        "word",
                        e.target.value
                      )
                    }
                    className="
    h-auto
    w-[180px]
    border-0
    bg-transparent
    p-0

    !text-4xl
    font-bold
    leading-none

    shadow-none
    focus-visible:ring-0

    placeholder:text-neutral-300
    placeholder:italic
  "
                  />

                  <Input
                    value={vocabulary.reading}
                    placeholder="かんじ"
                    onChange={(e) =>
                      updateVocabulary(
                        index,
                        "reading",
                        e.target.value
                      )
                    }
                    className="
    h-auto
    w-[140px]
    border-0
    bg-transparent
    p-0

    !text-2xl
    leading-none

    shadow-none
    focus-visible:ring-0

    placeholder:text-neutral-300
    placeholder:italic
  "
                  />

                  <Input
                    value={vocabulary.meaning}
                    placeholder="Hán tự"
                    onChange={(e) =>
                      updateVocabulary(
                        index,
                        "meaning",
                        e.target.value
                      )
                    }
                    className="
    h-auto
    flex-1
    border-0
    bg-transparent
    p-0

    !text-xl
    leading-none

    shadow-none
    focus-visible:ring-0

    placeholder:text-neutral-300
    placeholder:italic
  "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      removeVocabulary(index)
                    }
                    className="
      ml-auto
      rounded
      px-2
      py-1
      text-red-500
      hover:bg-red-50
    "
                  >
                    ✕
                  </button>
                </div>
              )
            })}

            <button
              type="button"
              onClick={addVocabulary}
              className="rounded border px-3 py-1 text-sm hover:bg-neutral-100"
            >
              + Thêm từ vựng
            </button>
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

            {editingContent && (
              <div className="mt-4 flex justify-end gap-2">
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
                    const updated = {
                      ...kanji,
                      content,
                    };

                    setKanji(updated);

                    await handleSave(updated);

                    setEditingContent(false);
                  }}
                >
                  Lưu
                </Button>
              </div>
            )}
          </div>
        </div>

      </DialogContent>
    </Dialog>

  );
}