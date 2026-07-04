import Link from "next/link";
import { LogoutButton } from "./LogOut";

interface HeaderProps {
  theme?: "kanji" | "vocab" | "grammar";
}

const themes = {
  kanji: {
    title: "自主漢字",
    href: "/kanji",
    mascot: "/images/boy-study.png",
    bg: "bg-kanji-primary",
    highlight: "bg-highlight-background",
    nav: [
      { href: "/grammar", label: "自主文法" },
      { href: "/vocabulary", label: "自主語彙" },
    ],
  },

  vocab: {
    title: "自主語彙",
    href: "/vocabulary",
    mascot: "/images/girl.png",
    bg: "bg-gradient-to-r from-[#1DFFB0] via-[#1DFFB0] to-[#1DFFB0]",
    highlight: "bg-[#F7FF1D] text-[#000000]",
    nav: [
      { href: "/kanji", label: "自主漢字" },
      { href: "/grammar", label: "自主文法" },
    ],
    
   
  },

  grammar: {
    title: "自主文法",
    href: "/grammar",
    mascot: "/images/shingakki_boy_bad.png",
    bg: "bg-gradient-to-r from-[#5569FF] via-[#5569FF] to-[#5569FF]",
    highlight: "bg-[#49FF38] text-[#000000]",
    nav: [
      { href: "/kanji", label: "自主漢字" },
      { href: "/vocabulary", label: "自主語彙" },
    ],
  },
} as const;

export default function Header({ theme = "kanji" }: HeaderProps) {
  const current = themes[theme];

  return (
    <header className="relative">
      <img
  src={current.mascot}
  alt=""
  className="absolute left-4 bottom-0  z-10 w-[150px]"
/>

      <div
        className={`${current.bg} relative mt-8 flex items-center justify-between overflow-hidden rounded-xl px-4 py-4 shadow-lg`}
      >
        <div className="absolute -top-20 -right-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

        <div className="relative flex items-center gap-4 pl-[140px]">
          <Link
            href={current.href}
            className={`px-[.1em] py-[.1em] text-5xl font-bold ${current.highlight}`}
          >
            {current.title}
          </Link>

          <nav className="mt-1 flex items-center gap-3 text-sm font-bold">
            {current.nav.map((item, index) => (
              <div key={item.href} className="flex items-center gap-3">
                {index > 0 && <span>|</span>}
                <Link href={item.href}>{item.label}</Link>
              </div>
            ))}
          </nav>
        </div>

        <div className="relative">
          <LogoutButton />
        </div>

        <img
          src="/images/Mask group-1.png"
          alt=""
          className="absolute -right-30 bottom-0 -z-10 h-48"
        />
        <img
          src="/images/Mask group.png"
          alt=""
          className="absolute -bottom-20 -left-80 -z-10 w-200"
        />
      </div>
    </header>
  );
}