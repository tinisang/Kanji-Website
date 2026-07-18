"use client";

import { useGrammar } from "../contexts/GrammarContext";


import AddGrammarDeck from "../features/grammar_decks/components/AddGrammarDeck";
import GrammarDeckItem from "../features/grammar_decks/components/GrammarDeckItem";

export default function GrammarDecks() {
  const {
    grammarData,
    activeFolderId,
  } = useGrammar();

  const visibleItems =
    activeFolderId === "all"
      ? []
      : Object.values(
          grammarData.grammar_folder_items[
            activeFolderId
          ] ?? {}
        )
          .map((item) =>
            grammarData.items[item.grammar_id]
          )
          .filter(Boolean);

  return (
    <div>
      <section className="space-y-2">
        {visibleItems.map((item, index) => (
          <GrammarDeckItem
            key={item.grammar.id}
            grammar={item.grammar}
            index={index}
            expressions={item.expressions}
          />
        ))}

        <AddGrammarDeck />
      </section>
    </div>
  );
}