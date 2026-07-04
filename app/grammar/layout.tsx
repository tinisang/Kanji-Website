import Header from "@/components/layout/Header";

export default function VocabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body className="bg-[#EDEFFF] bg-[url('/images/background-vocab.png')]    bg-repeat-y
    bg-top
    bg-[length:100vw_auto]">
      <div className="container mx-auto px-4 py-8">
        <Header theme="grammar" />
        {children}
      </div>
    </body>
  );
}