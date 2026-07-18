"use client";

import { GrammarExpressionExample } from "@/app/grammar/lib/types/GrammarExpressionExample ";
import { EditableText } from "@/app/kanji/features/kanji/components/EditableText";
import AddGrammarExampleButton from "./AddGrammarExampleButton";
import { GrammarExpression } from "@/app/grammar/lib/types/GrammarExpression";



interface Props {
    expression: GrammarExpression,
  examples: Record<
    string,
    GrammarExpressionExample
  >;
}

export default function GrammarExpressionExamples({
    expression,
  examples
}: Props) {
  return (
    <div className="space-y-4">
      {Object.values(examples)
        .sort(
          (a, b) =>
            a.position - b.position
        )
        .map((example) => (
          <div
            key={example.id}
            className="space-y-1"
          >
            <EditableText
              defaultValue={
                example.example ?? ""
              }
              placeholder="Example"
              className="font-semibold"
            />

            <EditableText
              defaultValue={
                example.meaning ?? ""
              }
              placeholder="Meaning"
              className="text-gray-600"
            />

            <EditableText
              defaultValue={
                example.note ?? ""
              }
              placeholder="Note"
              className="text-sm text-gray-500"
            />
          </div>
        ))}

        <AddGrammarExampleButton expression={expression} />
    </div>
  );
}