import { useGrammar } from "../contexts/GrammarContext";
import AddGrammarDeck from "../features/grammar_decks/components/AddGrammarDeck";
import GrammarDeckItem from "../features/grammar_decks/components/GrammarDeckItem";

export default function GrammarDecks() {
  const {
    grammarData,
    activeFolderId,
  } = useGrammar();

  if (activeFolderId === "all") {
    return (
      <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50">
        <div className="text-center">
          <h3 className="text-lg font-semibold">
            Chọn một thư mục
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Hãy chọn một thư mục ở bên trái để xem các bộ ngữ pháp.
          </p>
        </div>
      </div>
    );
  }

  const visibleItems = Object.values(
    grammarData.grammar_folder_items[
      activeFolderId
    ] ?? {}
  )
    .map(
      (item) => grammarData.items[item.grammar_id]
    )
    .filter(Boolean);

  return (
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
  );
}