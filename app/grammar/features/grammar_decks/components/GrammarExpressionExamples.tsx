"use client";

import { GrammarExpressionExample } from "@/app/grammar/lib/types/GrammarExpressionExample ";
import { EditableText } from "@/app/kanji/features/kanji/components/EditableText";
import AddGrammarExampleButton from "./AddGrammarExampleButton";
import { GrammarExpression } from "@/app/grammar/lib/types/GrammarExpression";
import GrammarExpressionExampleItem from "./GrammarExpressionExampleItem";



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
  .sort((a, b) => a.position - b.position)
  .map((example) => (
    <GrammarExpressionExampleItem
      key={example.id}
      example={example}
    />
  ))}

        <AddGrammarExampleButton expression={expression} />
    </div>
  );
}