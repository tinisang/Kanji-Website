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
import { Kanji } from "@/app/kanji/types/kanji";

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
    const { data, setData } = useKanji();
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
        learned: false
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
  className="
    w-[calc(100%-1rem)]
    max-w-5xl
    max-h-[95vh]
    overflow-hidden
    p-0
    font-inherit
    sm:w-full
  "
>
  <form
    onSubmit={handleSubmit}
    className="flex max-h-[95vh] flex-col overflow-hidden rounded-lg border-l-4 border-l-lime-500"
  >
    {/* Header */}
    <DialogHeader className="grid grid-cols-1 gap-5 border-b bg-neutral-50 p-4 sm:grid-cols-[1fr_3fr] sm:gap-6 sm:p-6">
      <div>
        <Input
          name="character"
          placeholder="漢"
          value={character}
          onChange={(e) => setCharacter(e.target.value)}
          className="h-auto border-0 p-0 !text-6xl font-bold shadow-none focus-visible:ring-0 sm:!text-7xl"
        />

        <Input
          name="han_viet"
          placeholder="HÁN"
          value={hanViet}
          onChange={(e) => setHanViet(e.target.value)}
          className="h-auto border-0 p-0 uppercase !text-xl font-semibold text-neutral-400 shadow-none focus-visible:ring-0 sm:!text-2xl"
        />
      </div>

     
    </DialogHeader>

    {/* Body */}
    <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto">
   
    </div>

    {/* Footer */}
    <DialogFooter className="border-t bg-neutral-50 p-3 sm:p-4">
  <div className="flex w-full flex-col-reverse gap-2 sm:flex-row sm:justify-end p-2">
    <Button
      type="button"
      variant="outline"
      onClick={() => setOpen(false)}
      className="w-full sm:w-auto sm:min-w-[100px]"
    >
      Huỷ
    </Button>

    <Button
      type="submit"
      className="w-full bg-lime-500 text-black hover:bg-lime-600 sm:w-auto sm:min-w-[100px]"
    >
      Lưu
    </Button>
  </div>
</DialogFooter>
  </form>
</DialogContent>
        </Dialog>
    );
}