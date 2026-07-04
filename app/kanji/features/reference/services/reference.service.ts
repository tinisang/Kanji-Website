import { auth } from "@/auth";
import { getCurrentUserId } from "@/lib/auth/auth-user";
import {
  createReferenceSet as createReferenceSetRepo,
  deleteReferenceSetById,
  getAllReferenceSetsByUserId,
  getReferenceSetById,
  updateReferenceSetById,
} from "@/app/kanji/lib/repositories/reference.repository";
import { ReferenceSet } from "@/app/kanji/types/reference";


export async function getAllReferenceSets() {
  const userId = await getCurrentUserId();
  return getAllReferenceSetsByUserId(userId);
}

export async function getReferenceSet(referenceSetId: string) {
  const userId = await getCurrentUserId();
  return getReferenceSetById(userId, referenceSetId);
}

export async function createReferenceSet(
  referenceSet: Omit<
    ReferenceSet,
    "id" | "user_id" | "position" | "created_at" | "updated_at"
  >
) {
  if (!referenceSet.name.trim()) {
    throw new Error("Reference name is required.");
  }

  const userId = await getCurrentUserId();
  return createReferenceSetRepo(userId, referenceSet);
}

export async function updateReferenceSet(referenceSet: ReferenceSet) {
  if (!referenceSet.name.trim()) {
    throw new Error("Reference name is required.");
  }

  const userId = await getCurrentUserId();
  return updateReferenceSetById(userId, referenceSet);
}

export async function deleteReferenceSet(referenceSetId: string) {
  const userId = await getCurrentUserId();
  return deleteReferenceSetById(userId, referenceSetId);
}