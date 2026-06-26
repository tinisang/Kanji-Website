
import { 
    createReferenceSet as createReferenceSetRepo,
    deleteReferenceSetById,
    getAllReferenceSetsByUserId,
    getReferenceSetById, 
    updateReferenceSetById
} from "@/lib/repositories/reference.repository";
import { ReferenceSet } from "@/types/reference";

export async function getAllReferenceSets(userId: string) {
  return getAllReferenceSetsByUserId(userId);
}

export async function getReferenceSet(
  userId: string,
  referenceSetId: string
) {
  return getReferenceSetById(userId, referenceSetId);
}

export async function createReferenceSet(
  userId: string,
  referenceSet: Omit<
    ReferenceSet,
    "id" | "user_id" | "position" | "created_at" | "updated_at"
  >
) {
  if (!referenceSet.name.trim()) {
    throw new Error("Reference name is required.");
  }

  return createReferenceSetRepo(userId, referenceSet);
}

export async function updateReferenceSet(
  userId: string,
  referenceSet: ReferenceSet
) {
  if (!referenceSet.name.trim()) {
    throw new Error("Reference name is required.");
  }

  return updateReferenceSetById(userId, referenceSet);
}

export async function deleteReferenceSet(
  userId: string,
  referenceSetId: string
) {
  return deleteReferenceSetById(userId, referenceSetId);
}