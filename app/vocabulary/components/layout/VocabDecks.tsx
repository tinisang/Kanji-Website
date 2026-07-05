import AddVocabularyDeck from "../../features/vocabulary deck/components/AddNewVocabDeckCard";
import VocabDeckItem from "../../features/vocabulary deck/components/VocabDeckItem";

export default function VocabDecks() {
  return (
    <section className="space-y-2">
        <VocabDeckItem></VocabDeckItem>
        <VocabDeckItem></VocabDeckItem>
        <VocabDeckItem></VocabDeckItem>
        <AddVocabularyDeck></AddVocabularyDeck>
    </section>
  );
}