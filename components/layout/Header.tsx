import Link from "next/link";
import { LogoutButton } from "./LogOut";
import ReviewFloatingButton from "../ui/ReviewFloatingButton";

interface HeaderProps {
  theme?: "kanji" | "vocab" | "grammar" | "review";
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

  review: {
    title: "REVIEW",
    href: "/review",
    mascot: "/images/boy-study.png",
    bg: "bg-gradient-to-r from-[#34D399] via-[#34D399] to-[#34D399]",
    highlight: "bg-[#F7FF1D] text-[#000000]",
    nav: [
      { href: "/kanji", label: "自主漢字" },
      { href: "/vocabulary", label: "自主語彙" },
      { href: "/grammar", label: "自主文法" },
    ],
  },
} as const;

export default function Header({
  theme = "kanji",
}: HeaderProps) {
  const current = themes[theme];

  return (
    <div>
    <header className="relative px-2 sm:px-0">
      {/* Mascot */}
      <img
        src={current.mascot}
        alt=""
        className="
          absolute bottom-0 left-2 z-10
          w-[90px]
          sm:left-4 sm:w-[150px]
        "
      />

      <div
        className={`
          ${current.bg}
          relative mt-4
          flex min-h-[90px] items-center
          overflow-hidden rounded-xl
          px-3 py-3
          shadow-lg
          sm:mt-8 sm:min-h-0 sm:px-4 sm:py-4
        `}
      >
        {/* Background decorations */}
        <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl sm:-right-10 sm:-top-20 sm:h-72 sm:w-72" />

        <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-white/5 blur-3xl sm:h-64 sm:w-64" />

        {/* Content */}
        <div
          className="
            relative z-10
            flex w-full
            flex-col items-start
            gap-2
            pl-[80px]
            pr-10
            sm:flex-row sm:items-center sm:gap-4
            sm:pl-[140px] sm:pr-0
          "
        >
          <Link
            href={current.href}
            className={`
              w-fit
              px-[.1em] py-[.1em]
              text-3xl font-bold leading-none
              sm:text-5xl
              ${current.highlight}
            `}
          >
            {current.title}
          </Link>

          <nav
            className="
              z-10
              flex flex-wrap items-center
              gap-x-2 gap-y-1
              text-[11px] font-bold
              sm:mt-1 sm:gap-3 sm:text-sm
            "
          >
            {current.nav.map((item, index) => (
              <div
                key={item.href}
                className="flex items-center gap-2 sm:gap-3"
              >
                {index > 0 && (
                  <span className="opacity-70">|</span>
                )}

                <Link
                  href={item.href}
                  className="whitespace-nowrap"
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </nav>
        </div>

       

        {/* Logout */}
        <div className="relative z-20 ml-auto shrink-0">
          <LogoutButton />
        </div>
      </div>
    </header>
    <ReviewFloatingButton />
    </div>
  );
}