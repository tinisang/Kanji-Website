import localFont from "next/font/local";

export const clashGrotesk = localFont({
  src: [
    {
      path: "./SVN-ClashGrotesk-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./SVN-ClashGrotesk-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./SVN-ClashGrotesk-Semibold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./SVN-ClashGrotesk-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-main",
});