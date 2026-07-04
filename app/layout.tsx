import "./globals.css";
import { clashGrotesk } from "@/fonts";
import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${clashGrotesk.variable} ${geist.variable}`}>
      {children}
    </html>
  );
}