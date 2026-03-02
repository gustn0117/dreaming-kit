import type { Metadata } from "next";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
