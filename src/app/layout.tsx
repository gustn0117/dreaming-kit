import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Dreaming Kit",
  description: "Dreaming Kit - 아티스트 굿즈 쇼핑몰",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white">
        <Header />
        <main>{children}</main>
        {/* 푸터 */}
        <footer className="border-t border-gray-100 bg-white">
          <div className="mx-auto max-w-[1440px] px-8 py-12">
            <div className="flex flex-col items-center gap-4 text-center">
              <p
                className="text-lg text-gray-300"
                style={{ fontFamily: "var(--font-family-display)", fontStyle: "italic" }}
              >
                Dreaming Kit
              </p>
              <p className="text-[10px] uppercase tracking-[0.3em] text-gray-300">
                Artist Goods Store
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
