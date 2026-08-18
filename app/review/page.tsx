import Image from "next/image";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import KanjiReviewSection from "./components/layout/KanjiReviewSection";
import VocabularyReviewSection from "./components/layout/VocabularyReviewSection";

export default function ReviewPage() {
  const triggerClass =
    "cursor-pointer rounded-xl px-4 py-2 !text-xl font-bold tracking-wide transition-all duration-200 " +
  "text-zinc-500 hover:-translate-y-0.5 hover:bg-white hover:text-zinc-900 hover:shadow-md " +
  "dark:hover:bg-zinc-800 dark:hover:text-white " +
  "data-[state=active]:translate-y-0 " +
  "data-[state=active]:bg-emerald-400 " +
  "data-[state=active]:text-zinc-950 " +
  "data-[state=active]:shadow-md " +
  "data-[state=active]:shadow-emerald-400/25";

  return (
    <div className="w-full min-w-0 space-y-4 p-3 sm:space-y-6 sm:p-6">
      {/* Banner */}
      <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl">
        <Image
          src="/images/review.png"
          alt="Review Banner"
          width={1920}
          height={100}
          className="h-auto w-full object-cover"
          priority
        />
      </div>

      {/* Review Sections */}
      <Tabs defaultValue="kanji" className="w-full min-w-0">
        <TabsList
          className="
            grid
           grid-rows-1
            w-full
            grid-cols-3
            gap-1
            rounded-2xl
            bg-zinc-100
            p-1
            dark:bg-zinc-900
            sm:gap-0
          "
        >
          <TabsTrigger
            value="kanji"
            className={triggerClass}
          >
            漢字
          </TabsTrigger>

          <TabsTrigger
            value="vocabulary"
            className={triggerClass}
          >
            語彙
          </TabsTrigger>

          <TabsTrigger
            value="grammar"
            className={triggerClass}
          >
            文法
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="kanji"
          className="mt-4 mb-4 min-w-0 sm:mt-6"
        >
          <KanjiReviewSection />
        </TabsContent>

        <TabsContent
          value="vocabulary"
          className="mt-4 min-w-0 sm:mt-6"
        >
          <VocabularyReviewSection />
        </TabsContent>

        <TabsContent
          value="grammar"
          className="mt-4 min-w-0 sm:mt-6"
        >
          {/* Content */}
        </TabsContent>
      </Tabs>
    </div>
  );
}