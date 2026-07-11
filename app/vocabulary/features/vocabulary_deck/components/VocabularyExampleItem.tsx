import { EditableText } from "@/app/kanji/features/kanji/components/EditableText";
import { deleteExampleUI, updateExampleUI, useVocabulary } from "@/app/vocabulary/context.ts/VocabularyContext";
import { ExpressionExample } from "@/app/vocabulary/lib/types/expressionExample";
import { deleteExpressionExample, updateExpressionExample } from "../clients/expressionExampleClient";
import { VocabularyExpression } from "@/app/vocabulary/lib/types/vocabularyExpression";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
interface Props {
  keyword: string;
  example: ExpressionExample;
  expression: VocabularyExpression
}

export default function VocabularyExampleItem({
  keyword,
  example,
  expression
}: Props) {

    const {setVocabularyData} = useVocabulary()


    async function onExampleSave(value:string){

        const updatedExample = {
            ...example,
            example: value
        }

        updateExampleUI(
            setVocabularyData,
            updatedExample
        )

        await updateExpressionExample(
            expression.id,
            updatedExample
        )


    }
    async function onMeaningSave(value: string){
const updatedExample = {
            ...example,
            meaning: value
        }

        updateExampleUI(
            setVocabularyData,
            updatedExample
        )

        await updateExpressionExample(
            expression.id,
            updatedExample
        )
    }

    async function handleDelete() {
        deleteExampleUI(setVocabularyData, example.id);
        await deleteExpressionExample(
            expression.id,
            example.id
        )
        
        
    }

  function highlight(text: string, keyword: string) {
    if (!text) {
      return (
        <span className="italic text-gray-400">
          Empty
        </span>
      );
    }

    if (!keyword) return text;

    return text.split(keyword).map((part, index, arr) => (
      <span key={index}>
        {part}
        {index < arr.length - 1 && (
          <span className="opacity-35">
            {keyword}
          </span>
        )}
      </span>
    ));
  }

  return (
    <div className="group relative rounded-lg p-2 transition-colors hover:bg-white">
  <Button
    size="icon"
    variant="ghost"
    className="absolute right-2 top-2 h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100"
    onClick={handleDelete}
  >
    <Trash2 className="h-4 w-4 text-red-500" />
  </Button>

  <div className="flex flex-col space-y-1 pr-10">
    <EditableText
      defaultValue={example.example}
      placeholder="Japanese example..."
      className="font-semibold"
      renderDisplay={(value) =>
        highlight(value, keyword)
      }
      onSave={onExampleSave}
    />

    <EditableText
      defaultValue={example.meaning}
      placeholder="Meaning..."
      className="text-gray-600"
      onSave={onMeaningSave}
    />
  </div>
</div>
  );
}