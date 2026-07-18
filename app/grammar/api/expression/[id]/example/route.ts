import { getGrammarExpressionExamplesByExpressionIdService } from "@/app/grammar/features/grammar_decks/services/grammarExpressionExampleService";
import { NextRequest, NextResponse } from "next/server";


export async function GET(
  _: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const { id } =
    await params;

  const data =
    await getGrammarExpressionExamplesByExpressionIdService(
      id
    );

  return NextResponse.json(data);
}