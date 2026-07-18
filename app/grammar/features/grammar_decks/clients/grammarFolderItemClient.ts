import {
  GrammarFolderItem,
  UpdateGrammarFolderItem,
} from "@/app/grammar/lib/types/GrammarFolderItem";

export async function getAllGrammarFolderItemAPI() {
  const res = await fetch(
    "/grammar/api/grammar-folder-item"
  );

  if (!res.ok) {
    throw new Error(
      "Failed to fetch grammar folder items."
    );
  }

  return res.json() as Promise<
    GrammarFolderItem[]
  >;
}

export async function createGrammarFolderItem(
  item: Pick<
    GrammarFolderItem,
    "grammar_id" | "folder_id"
  >
) {
  const res = await fetch(
    "/grammar/api/grammar-folder-item",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(item),
    }
  );

  if (!res.ok) {
    throw new Error(
      "Failed to create grammar folder item."
    );
  }

  return res.json() as Promise<GrammarFolderItem>;
}

export async function updateGrammarFolderItemsAPI(
  items: UpdateGrammarFolderItem[]
) {
  const res = await fetch(
    "/grammar/api/grammar-folder-item",
    {
      method: "PUT",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(items),
    }
  );

  if (!res.ok) {
    throw new Error(
      "Failed to update grammar folder items."
    );
  }
}