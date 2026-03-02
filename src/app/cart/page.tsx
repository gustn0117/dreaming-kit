import Link from "next/link";

export default function CartPage() {
  return (
    <div className="animate-fade-in-up mx-auto max-w-7xl px-8 py-16">
      <div className="text-center">
        <h1
          className="text-3xl font-normal text-gray-800"
          style={{ fontFamily: "var(--font-family-display)", fontStyle: "italic" }}
        >
          Cart
        </h1>
        <div className="mx-auto mt-4 h-px w-12 bg-gray-200" />
      </div>

      {/* 빈 장바구니 */}
      <div className="flex flex-col items-center justify-center py-28">
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#d4d4d4"
          strokeWidth="1"
        >
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 01-8 0" />
        </svg>
        <p className="mt-5 text-sm text-gray-400">장바구니가 비어있습니다.</p>
        <Link
          href="/shop"
          className="mt-8 border border-gray-900 px-8 py-3 text-xs font-medium uppercase tracking-[0.15em] text-gray-900 transition-all duration-200 hover:bg-gray-900 hover:text-white"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
