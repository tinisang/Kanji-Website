import Link from "next/link";
import { LogoutButton } from "./LogOut";

export default function Header() {
    return (
        <header className="relative">
            <img src="/images/boy-study.png" alt="" className="left-4 absolute h-32 bottom-0 z-2" />
            <div className=" bg-kanji-primary rounded-xl flex items-center justify-between px-4 py-4 relative mt-8 z-1  overflow-hidden">


                <div className="flex items-center gap-6 ">


                    <div className="flex flex-row items-middle gap-4 pl-30">
                        <Link href="/" className="text-5xl font-bold bg-highlight-background px-[.1em] py-[.1em]">自主漢字</Link>

                        <nav className="flex items-center gap-3 mt-1 text-sm font-bold">
                            <Link href="/grammar">自主文法</Link>

                            <span>|</span>

                            <Link href="/vocabulary">自主語彙</Link>
                        </nav>
                    </div>
                </div>
                <div><LogoutButton/></div>

                <img src="/images/Mask group-1.png" alt="" className="absolute z-[-1] h-48 bottom-0 -right-30" />
                <img src="/images/Mask group.png" alt="" className="absolute z-[-1] w-200 -bottom-20 -left-80" />
            </div>
        </header>
    );
}