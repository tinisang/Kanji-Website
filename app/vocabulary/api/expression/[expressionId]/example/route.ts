import { NextRequest, NextResponse } from "next/server";
import * as expressionExampleService from "@/app/vocabulary/features/vocabulary_deck/services/expressionExampleService";

interface Props {
  params: Promise<{
    expressionId: string;
  }>;
}

export async function GET(
  request: NextRequest,
  { params }: Props
) {
  const { expressionId } = await params;

  return NextResponse.json(
    await expressionExampleService.getAllExpressionExampleByExpressionId(
      expressionId
    )
  );
}

export async function POST(
  request: NextRequest,
  { params }: Props
) {
  const { expressionId } = await params;

  const body = await request.json();

  return NextResponse.json(
    await expressionExampleService.createExpressionExample({
      ...body,
      expression_id: expressionId,
    })
  );
}