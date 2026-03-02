"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const nav = [
    { href: "/admin/products", label: "상품 관리" },
    { href: "/admin/artists", label: "아티스트 관리" },
    { href: "/admin/reviews", label: "리뷰 관리" },
  ];

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 사이드바 */}
      <aside className="w-56 shrink-0 border-r border-gray-200 bg-white">
        <div className="p-6">
          <Link href="/" className="text-lg font-medium text-gray-800" style={{ fontFamily: "var(--font-family-display)", fontStyle: "italic" }}>
            Dreaming Kit
          </Link>
          <p className="mt-1 text-[10px] uppercase tracking-widest text-gray-400">Admin</p>
        </div>
        <nav className="mt-2 space-y-0.5 px-3">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-md px-3 py-2.5 text-sm transition-colors ${
                pathname === item.href
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto border-t border-gray-100 p-3">
          <button
            onClick={handleLogout}
            className="w-full rounded-md px-3 py-2 text-left text-sm text-gray-400 transition-colors hover:text-gray-600"
          >
            로그아웃
          </button>
        </div>
      </aside>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
