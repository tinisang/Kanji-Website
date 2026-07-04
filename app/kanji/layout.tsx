import Header from "@/components/layout/Header";

export default function KanjiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body className="bg-[#F9FFE5] bg-[url('/images/background.png')]    bg-repeat-y
    bg-top
    bg-[length:100vw_auto]">
      <div className="container mx-auto px-4 py-8">
        <Header theme="kanji" />
        {children}
      </div>
    </body>
  );
}