"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  // 랜딩 페이지에서는 헤더 숨김
  if (pathname === "/") return null;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-8 py-5">
        {/* 로고 */}
        <Link href="/" className="text-xl" style={{ fontFamily: "var(--font-family-display)" }}>
          <em>Dreaming Kit</em>
        </Link>

        {/* 네비게이션 */}
        <div className="flex items-center gap-8">
          <Link
            href="/shop"
            className={`text-sm font-medium tracking-wider transition-colors hover:text-black ${
              pathname.startsWith("/shop") ? "text-black" : "text-gray-500"
            }`}
          >
            SHOP
          </Link>
          <Link
            href="/artist"
            className={`text-sm font-medium tracking-wider transition-colors hover:text-black ${
              pathname === "/artist" ? "text-black" : "text-gray-500"
            }`}
          >
            ARTIST
          </Link>

          {/* 구분선 */}
          <div className="h-4 w-px bg-gray-200" />

          {/* 장바구니 아이콘 (표시용) */}
          <Link href="/cart" className="text-gray-500 transition-colors hover:text-black">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
          </Link>

          {/* 마이페이지 아이콘 (표시용) */}
          <Link href="/mypage" className="text-gray-500 transition-colors hover:text-black">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Link>
        </div>
      </nav>
    </header>
  );
}
