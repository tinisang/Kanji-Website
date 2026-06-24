import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useEffect, useState } from "react";
import TiptapEditor from "./TipTapEditor";

import { addKanjiUI, useKanji } from "@/contexts/Context";
import { Kanji } from "@/types/kanji";

import { createKanjiAndAssignGroupAPI } from "../api/kanji.client";

interface AddKanjiModalProps {
    groupId?: string;
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
    const defaultVocabulary = {
  word: "",
  reading: "",
  meaning: "",
};

const [character, setCharacter] = useState("");
const [hanViet, setHanViet] = useState("");
const [onyomi, setOnyomi] = useState("");
const [kunyomi, setKunyomi] = useState("");


const [vocabularies, setVocabularies] = useState([
  defaultVocabulary,
]);

useEffect(() => {
  if (!open) {
    setCharacter("");
    setHanViet("");
    setOnyomi("");
    setKunyomi("");
    setContent("");
    setVocabularies([
      {
        word: "",
        reading: "",
        meaning: "",
      },
    ]);
  }
}, [open]);


    const moveVocabularyUp = (
  index: number
) => {
  if (index === 0) return;

  const updated = [...vocabularies];

  [updated[index - 1], updated[index]] = [
    updated[index],
    updated[index - 1],
  ];

  setVocabularies(updated);
};

const moveVocabularyDown = (
  index: number
) => {
  if (
    index ===
    vocabularies.length - 1
  )
    return;

  const updated = [...vocabularies];

  [updated[index], updated[index + 1]] = [
    updated[index + 1],
    updated[index],
  ];

  setVocabularies(updated);
};

const removeVocabulary = (
  index: number
) => {
  setVocabularies(prev =>
    prev.filter((_, i) => i !== index)
  );
};

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

    const kanji: Omit<Kanji, "id" | "created_at" | "updated_at"> = {
        example: null,
        character: "",
        han_viet: "",
        onyomi: null,
        kunyomi: null,
        vocabularies: [],
        short_description: null,
        content: null,
    };
    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

     
       kanji.character = character;
kanji.han_viet = hanViet;
kanji.onyomi = onyomi;
kanji.kunyomi = kunyomi;

        kanji.content = content;
        kanji.vocabularies = vocabularies;

        if (!groupId) {
            return;
        }

        await handleAdd(kanji, groupId);
       setOpen(false)
    };

    
    async function handleAdd(
        kanji: Omit<Kanji, "id" | "created_at" | "updated_at">,
        groupId: string
    ) {
       createKanjiAndAssignGroupAPI(
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
                                 value={character}
  onChange={(e) =>
    setCharacter(e.target.value)
  }
                                className="h-auto border-0 p-0 !text-7xl font-bold shadow-none focus-visible:ring-0"
                            />

                            <Input
                                name="han_viet"
                                placeholder="HÁN"
                                value={hanViet}
  onChange={(e) =>
    setHanViet(e.target.value)
  }
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
                                    value={onyomi}
  onChange={(e) =>
    setOnyomi(e.target.value)
  }
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-neutral-500">
                                    Kunyomi
                                </label>

                                <Input
                                    name="kunyomi"
                                    placeholder="あや"
                                    value={kunyomi}
  onChange={(e) =>
    setKunyomi(e.target.value)
  }
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
                                    <div className="ml-auto flex gap-1">
  <Button
    type="button"
    size="icon"
    variant="ghost"
    disabled={index === 0}
    onClick={() =>
      moveVocabularyUp(index)
    }
  >
    <ChevronUp className="h-4 w-4" />
  </Button>

  <Button
    type="button"
    size="icon"
    variant="ghost"
    disabled={
      index ===
      vocabularies.length - 1
    }
    onClick={() =>
      moveVocabularyDown(index)
    }
  >
    <ChevronDown className="h-4 w-4" />
  </Button>

  <Button
    type="button"
    size="icon"
    variant="ghost"
    className="
      text-red-500
      hover:text-red-600
    "
    onClick={() =>
      removeVocabulary(index)
    }
  >
    ✕
  </Button>
</div>
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
                    
                        >
                            Lưu
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}