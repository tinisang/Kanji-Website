import { NextRequest, NextResponse } from "next/server";
import * as expressionExampleService from "@/app/vocabulary/features/vocabulary_deck/services/expressionExampleService";

interface Props {
  params: Promise<{
    exampleId: string;
  }>;
}

export async function GET(
  request: NextRequest,
  { params }: Props
) {
  const { exampleId } = await params;

  return NextResponse.json(
    await expressionExampleService.getExpressionExampleById(
      exampleId
    )
  );
}

export async function PATCH(
  request: NextRequest
) {
  const body = await request.json();

  return NextResponse.json(
    await expressionExampleService.updateExpressionExampleById(
      body
    )
  );
}

export async function DELETE(
  request: NextRequest,
  { params }: Props
) {
  const { exampleId } = await params;

  await expressionExampleService.deleteExpressionExampleById(
    exampleId
  );

  return NextResponse.json({ success: true });
}