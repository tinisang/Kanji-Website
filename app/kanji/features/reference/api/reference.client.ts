// reference.client.ts

import { ReferenceSet } from "@/app/kanji/types/reference";

export async function createReferenceSetAPI(
  referenceSet: Pick<
    ReferenceSet,
    "name" | "description" | "color"
  >
) {
  const response = await fetch(
    "/kanji/api/reference/create",    
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(referenceSet),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to create reference set"
    );
  }

  return response.json();
}

export async function getAllReferenceSetsAPI() {
  const response = await fetch(
    "/kanji/api/reference"
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch reference sets"
    );
  }

  return response.json();
}

export async function updateReferenceSetAPI(
  referenceSet: ReferenceSet
) {
  const response = await fetch(
    "/kanji/api/reference/update",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(referenceSet),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to update reference set"
    );
  }

  return response.json();
}

export async function deleteReferenceSetAPI(
  referenceSetId: string
) {
  const response = await fetch(
    "/kanji/api/reference/delete",
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        referenceSetId,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to delete reference set"
    );
  }

  return response.json();
}