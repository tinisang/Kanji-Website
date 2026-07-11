import * as expressionExampleRepository from "@/app/vocabulary/lib/repositories/expressionExampleRepository";
import { ExpressionExample } from "@/app/vocabulary/lib/types/expressionExample";


export async function getAllExpressionExample() {
  return await expressionExampleRepository.getAllExpressionExample();
}

export async function getAllExpressionExampleByExpressionId(
  expressionId: string
) {
  return await expressionExampleRepository.getAllExpressionExampleByExpressionId(
    expressionId
  );
}

export async function getExpressionExampleById(
  exampleId: string
) {
  return await expressionExampleRepository.getExpressionExampleById(
    exampleId
  );
}

export async function createExpressionExample(
  example: Omit<
    ExpressionExample,
     "id" | "created_at" | "updated_at" | "position"
  >
) {
  return await expressionExampleRepository.createExpressionExample(
    example
  );
}

export async function updateExpressionExampleById(
  example: ExpressionExample
) {
  return await expressionExampleRepository.updateExpressionExampleById(
    example
  );
}

export async function deleteExpressionExampleById(
  exampleId: string
) {
  return await expressionExampleRepository.deleteExpressionExampleById(
    exampleId
  );
}