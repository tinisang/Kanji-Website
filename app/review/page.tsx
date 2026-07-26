
import Image from "next/image";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import KanjiReviewSection from "./components/layout/KanjiReviewSection";

export default function ReviewPage() {

const triggerClass =
  "cursor-pointer rounded-xl px-4 py-1 !text-xl font-bold tracking-wide transition-all duration-200 " +
  "text-zinc-500 hover:-translate-y-0.5 hover:bg-white hover:text-zinc-900 hover:shadow-md " +
  "dark:hover:bg-zinc-800 dark:hover:text-white " +
  "data-[state=active]:translate-y-0 " +
  "data-[state=active]:bg-emerald-400 " +
  "data-[state=active]:text-zinc-950 " +
  "data-[state=active]:shadow-md " +
  "data-[state=active]:shadow-emerald-400/25";
  return (
    <div className=" space-y-6 p-6">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-3xl">
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
      <Tabs defaultValue="kanji" className="w-full">
  <TabsList className="grid !h-auto w-full grid-cols-3 rounded-2xl bg-zinc-100 p-1 dark:bg-zinc-900">
    <TabsTrigger value="kanji" className={triggerClass}>
      漢字
    </TabsTrigger>

    <TabsTrigger value="vocabulary" className={triggerClass}>
      語彙
    </TabsTrigger>

    <TabsTrigger value="grammar" className={triggerClass}>
      文法
    </TabsTrigger>
  </TabsList>

  <TabsContent value="kanji" className="mt-6">
    <KanjiReviewSection/>
  </TabsContent>

  <TabsContent value="vocabulary" className="mt-6">
    {/* Content */}
  </TabsContent>

  <TabsContent value="grammar" className="mt-6">
    {/* Content */}
  </TabsContent>
</Tabs>
    </div>
  );
}