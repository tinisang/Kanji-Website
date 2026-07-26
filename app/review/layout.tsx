import Header from "@/components/layout/Header";

export default function VocabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body className="bg-[#D9F1EA] ">
      <div className="container mx-auto px-4 py-8">
        {/* <Header theme="vocab" /> */}
        {children}
      </div>
    </body>
  );
}