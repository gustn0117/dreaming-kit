"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  // 랜딩 페이지에서는 헤더 숨김
  if (pathname === "/") return null;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-8 py-5">
        {/* 로고 */}
        <Link
          href="/"
          className="text-xl transition-opacity duration-200 hover:opacity-60"
          style={{ fontFamily: "var(--font-family-display)" }}
        >
          <em>Dreaming Kit</em>
        </Link>

        {/* 네비게이션 */}
        <div className="flex items-center gap-8">
          <Link
            href="/shop"
            className={`relative text-xs font-medium tracking-[0.2em] uppercase transition-colors duration-200 hover:text-black ${
              pathname.startsWith("/shop") ? "text-black" : "text-gray-400"
            }`}
          >
            Shop
            {pathname.startsWith("/shop") && (
              <span className="absolute -bottom-1.5 left-0 h-px w-full bg-gray-900" />
            )}
          </Link>
          <Link
            href="/artist"
            className={`relative text-xs font-medium tracking-[0.2em] uppercase transition-colors duration-200 hover:text-black ${
              pathname === "/artist" ? "text-black" : "text-gray-400"
            }`}
          >
            Artist
            {pathname === "/artist" && (
              <span className="absolute -bottom-1.5 left-0 h-px w-full bg-gray-900" />
            )}
          </Link>

          {/* 구분선 */}
          <div className="h-3.5 w-px bg-gray-200" />

          {/* 장바구니 아이콘 */}
          <Link
            href="/cart"
            className={`transition-colors duration-200 hover:text-black ${
              pathname === "/cart" ? "text-black" : "text-gray-400"
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
          </Link>

          {/* 마이페이지 아이콘 */}
          <Link
            href="/mypage"
            className={`transition-colors duration-200 hover:text-black ${
              pathname === "/mypage" ? "text-black" : "text-gray-400"
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Link>
        </div>
      </nav>
    </header>
  );
}
