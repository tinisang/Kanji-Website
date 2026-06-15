
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import { clashGrotesk } from "@/fonts";


export const metadata: Metadata = {
  title: "Kanji Thủ Công", // Đổi tên web của bạn ở đây
  description: "Kho lưu trữ Kanji cá nhân",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={clashGrotesk.variable}>
     
     <body className="bg-[#F9FFE5] bg-[url('/images/background.png')] bg-contain bg-repeat bg-top bg-size-[100vw]">

        
        
        {/* Container bao bọc tất cả nội dung con (children) */}
        <div className="container mx-auto px-4 py-8">
      

          {children}
      
        </div>
        
      </body>
    </html>
  );
}
