import Header from "@/components/layout/Header";
import RevisionDecks from "./components/layout/RevisionDecks";
import VocabDecks from "./components/layout/VocabDecks";


export default function VocabPage() {
  return (
    <div>
      <div className="grid grid-cols-[1fr_2fr] gap-4 mt-8">
        <RevisionDecks></RevisionDecks>
        <VocabDecks></VocabDecks>

      </div>
       
    </div>
  );
}