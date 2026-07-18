import { Grammar } from "@/app/grammar/lib/types/Grammar";
import {
  createGrammar,
  deleteGrammarById,
  getAllGrammar,
  getGrammarById,
  updateGrammarById,
} from "@/app/grammar/lib/repositories/grammarRepository";



export async function getAllGrammarService() {
  return await getAllGrammar();
}

export async function getGrammarByIdService(
  grammarId: string
) {
  return await getGrammarById(grammarId);
}

export async function createGrammarService(
  grammar: Omit<
    Grammar,
    "id" | "created_at" | "updated_at"
  >
) {
  return await createGrammar(grammar);
}

export async function updateGrammarService(
  grammar: Grammar
) {
  return await updateGrammarById(grammar);
}

export async function deleteGrammarService(
  grammarId: string
) {
  return await deleteGrammarById(grammarId);
}