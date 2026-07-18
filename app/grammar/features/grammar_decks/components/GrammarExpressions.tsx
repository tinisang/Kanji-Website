"use client";

import { GrammarExpression } from "@/app/grammar/lib/types/GrammarExpression";


import GrammarExpressionItem from "./GrammarExpressionItem";
import { GrammarExpressionExample } from "@/app/grammar/lib/types/GrammarExpressionExample ";
import AddGrammarExpressionButton from "./AddGrammarExpressionButton";
import { Grammar } from "@/app/grammar/lib/types/Grammar";

interface Props {
    grammar: Grammar,
  expressions: Record<
    string,
    {
      expression: GrammarExpression;
      examples: Record<
        string,
        GrammarExpressionExample
      >;
    }
  >;
}

export default function GrammarExpressions({
    grammar,
  expressions,
}: Props) {
  return (
    <div className="space-y-3">
      {Object.values(expressions)
        .sort(
          (a, b) =>
            a.expression.position -
            b.expression.position
        )
        .map(({ expression, examples }) => (
          <GrammarExpressionItem
            key={expression.id}
            grammar={grammar}
            expression={expression}
            examples={examples}
          />
        ))}

        <AddGrammarExpressionButton grammar={grammar} ></AddGrammarExpressionButton>
    </div>
  );
}