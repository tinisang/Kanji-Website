import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import TiptapEditor from "./TipTapEditor";
import { Kanji } from "@/lib/kanji";
import { createKanji } from "@/types/kanji";
import { addKanjiUI, useKanji } from "@/contexts/Context";

interface AddKanjiModalProps {
    groupId: string;
     setItemArray: React.Dispatch<
    React.SetStateAction<Kanji[]>
  >;
}

export default function AddKanjiModal({
    groupId,
    setItemArray
}: AddKanjiModalProps) {
const [open, setOpen] =
  useState(false);
    const {data,setData} = useKanji();
    const [content, setContent] = useState("");
    const [vocabularies, setVocabularies] = useState([
        {
            word: "",
            reading: "",
            meaning: "",
        },
    ]);

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

    const updateVocabulary = (
        index: number,
        field: "word" | "reading" | "meaning",
        value: string
    ) => {
        setVocabularies((prev) =>
            prev.map((item, i) =>
                i === index
                    ? {
                        ...item,
                        [field]: value,
                    }
                    : item
            )
        );
    };

    const kanji: Partial<Kanji> = {};
    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const formData = new FormData(
            e.currentTarget
        );

        kanji.character =
            formData.get("character")?.toString() ?? "";

        kanji.han_viet =
            formData.get("han_viet")?.toString() ?? "";

        kanji.onyomi =
            formData.get("onyomi")?.toString() ?? "";

        kanji.kunyomi =
            formData.get("kunyomi")?.toString() ?? "";

        kanji.content = content;
        kanji.vocabularies = vocabularies;

        handleAdd(kanji, groupId)
    };

    
    async function handleAdd(kanji: Partial<Kanji>, groupId: string) {
       createKanji(
  kanji,
  groupId
).then(newKanji => {
  addKanjiUI(   
  setData,
  newKanji,
  groupId
);

});

    }

    return (
        <Dialog
        open={open}
  onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                <div
  className="
    cursor-pointer
    rounded-lg
    border border-neutral-200
    bg-neutral-50
    p-4

    transition-all
    hover:border-neutral-300
    hover:bg-neutral-100
  "
>
  <div className="flex h-full flex-col items-center justify-center">
    <div className="text-2xl font-light text-neutral-400">
      +
    </div>
  </div>
</div>
            </DialogTrigger>

            <DialogContent
                showCloseButton={false}
                className="!max-w-5xl p-0 font-inherit"
            >
                <form onSubmit={handleSubmit} className="overflow-hidden rounded-lg border-l-4 border-l-lime-500">
                    {/* Header */}
                    <DialogHeader className="border-b bg-neutral-50 p-6 grid grid-cols-[1fr_3fr]">
                        <div>
                            <Input
                                name="character"
                                placeholder="漢"
                                className="h-auto border-0 p-0 !text-7xl font-bold shadow-none focus-visible:ring-0"
                            />

                            <Input
                                name="han_viet"
                                placeholder="HÁN"
                                className="h-auto border-0 p-0 !text-2xl font-semibold text-neutral-400 shadow-none focus-visible:ring-0"
                            />

                        </div>

                        <div className="mt-4 grid grid-cols-1 gap-4">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-neutral-500">
                                    Onyomi
                                </label>

                                <Input
                                    name="onyomi"
                                    placeholder="カン"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-neutral-500">
                                    Kunyomi
                                </label>

                                <Input
                                    name="kunyomi"
                                    placeholder="あや"
                                />
                            </div>
                        </div>
                    </DialogHeader>

                    <div className="-mx-4 no-scrollbar max-h-[60vh] overflow-y-auto px-4 overflow-y-auto">

                        {/* Vocabulary */}
                        <div className="space-y-4 border-t p-6">
                            {vocabularies.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-4"
                                >
                                    <Input
                                        placeholder="漢字"
                                        value={item.word}
                                        onChange={(e) =>
                                            updateVocabulary(index, "word", e.target.value)
                                        }
                                        className="max-w-[180px] border-0 !text-3xl font-bold shadow-none focus-visible:ring-0"
                                    />

                                    <Input
                                        placeholder="(かんじ)"
                                        value={item.reading}
                                        onChange={(e) =>
                                            updateVocabulary(index, "reading", e.target.value)
                                        }
                                        className="max-w-[180px] border-0 !text-lg shadow-none focus-visible:ring-0"
                                    />

                                    <Input
                                        placeholder="Hán tự"
                                        value={item.meaning}
                                        onChange={(e) =>
                                            updateVocabulary(index, "meaning", e.target.value)
                                        }
                                        className="max-w-[250px] border-0 shadow-none focus-visible:ring-0"
                                    />
                                </div>
                            ))}

                            <Button
                                type="button"
                                variant="outline"
                                onClick={addVocabulary}
                            >
                                + Thêm từ vựng
                            </Button>
                        </div>

                        {/* Description */}
                        <div className="bg-lime-50 p-6">
                            <h3 className="mb-3">
                                Ghi chú
                            </h3>
                            <TiptapEditor
                                value={content}
                                onChange={setContent}
                            />
                        </div>

                    </div>

                    {/* Footer */}
                    <DialogFooter className="border-t p-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                        >
                            Huỷ
                        </Button>

                        <Button
                        type="submit"
                        onClick={() => setOpen(false)}
                        >
                            Lưu
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}