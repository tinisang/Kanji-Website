import Link from "next/link";
import {
  BookOpen,
  Languages,
  SpellCheck2,
  ArrowRight,
} from "lucide-react";

const cards = [
  {
    title: "自主漢字",
    subtitle: "Kanji",
    description:
      "Quản lý Kanji, nhóm theo chủ đề, ghi chú cách nhớ và theo dõi tiến độ học tập.",
    href: "/kanji",
    color: "from-[#8DC63F] to-[#5B9D2D]",
    bg: "bg-[#F8FFF0]",
    icon: BookOpen,
  },
  {
    title: "自主語彙",
    subtitle: "Vocabulary",
    description:
      "Xây dựng kho từ vựng cá nhân với ví dụ, cách đọc và liên kết trực tiếp với Kanji.",
    href: "/vocabulary",
    color: "from-[#E67A6A] to-[#D94F45]",
    bg: "bg-[#FFF8F6]",
    icon: Languages,
  },
  {
    title: "自主文法",
    subtitle: "Grammar",
    description:
      "Lưu trữ mẫu ngữ pháp, ví dụ thực tế và các ghi chú quan trọng trong quá trình học.",
    href: "/grammar",
    color: "from-[#63B5E8] to-[#2E8FD6]",
    bg: "bg-[#F5FBFF]",
    icon: SpellCheck2,
  },
];

export default function HomePage() {
  return (
    <body>
    <main className="relative min-h-screen overflow-hidden bg-[#FBFAF5]">
      {/* Background */}
      <div className="absolute inset-0 bg-[url('/images/background.png')] bg-repeat opacity-10" />

      <div className="relative container mx-auto max-w-7xl px-6 py-20">
        {/* Hero */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm tracking-[0.4em] text-[#B33B2E] uppercase">
            自主学習システム
          </p>

          <h1 className="text-6xl font-bold leading-tight text-[#1E1E1E]">
            Nhật ký học tiếng Nhật
          </h1>

          <p className="mt-6 text-lg leading-8 text-neutral-600">
            Một không gian lưu trữ kiến thức được xây dựng dành riêng cho việc
            học tiếng Nhật. Ghi chép Kanji, Từ vựng và Ngữ pháp theo cách của
            riêng bạn, thay vì phụ thuộc hoàn toàn vào các ứng dụng SRS.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <Link
                key={card.href}
                href={card.href}
                className="group"
              >
                <div
                  className={`relative h-full overflow-hidden rounded-[28px] border border-black/5 ${card.bg} p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl`}
                >
                  <div
                    className={`absolute inset-x-0 top-0 h-2 bg-gradient-to-r ${card.color}`}
                  />

                  <div
                    className={`mb-8 flex h-18 w-18 items-center justify-center rounded-3xl bg-gradient-to-br ${card.color} text-white shadow-lg`}
                  >
                    <Icon size={34} strokeWidth={2.2} />
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-4xl font-bold">{card.title}</h2>

                    <p className="font-medium tracking-wider uppercase text-neutral-500">
                      {card.subtitle}
                    </p>
                  </div>

                  <p className="mt-6 leading-8 text-neutral-600">
                    {card.description}
                  </p>

                  <div className="mt-10 flex items-center gap-2 font-semibold">
                    Khám phá
                    <ArrowRight
                      className="transition group-hover:translate-x-2"
                      size={18}
                    />
                  </div>

                  <div className="absolute -right-8 -bottom-8 text-[130px] font-black text-black/[0.03]">
                    日
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-24 border-t border-black/10 pt-10 text-center">
          <h3 className="text-2xl font-semibold">
            「継続は力なり」
          </h3>

          <p className="mt-3 text-neutral-500">
            "Kiên trì chính là sức mạnh."
          </p>

          <p className="mt-8 text-sm text-neutral-400">
            Personal Japanese Learning Workspace • Kanji • Vocabulary • Grammar
          </p>
        </div>
      </div>
    </main>
    </body>
  );
}