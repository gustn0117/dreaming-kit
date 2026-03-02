import Link from "next/link";

export default function CartPage() {
  return (
    <div className="mx-auto max-w-[1280px] px-8 py-16">
      <h1 className="text-2xl font-semibold">장바구니</h1>
      <hr className="my-6 border-gray-200" />

      {/* 빈 장바구니 */}
      <div className="flex flex-col items-center justify-center py-24">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ccc"
          strokeWidth="1"
        >
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 01-8 0" />
        </svg>
        <p className="mt-4 text-gray-400">장바구니가 비어있습니다.</p>
        <Link
          href="/shop"
          className="mt-6 rounded bg-gray-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-black"
        >
          쇼핑 계속하기
        </Link>
      </div>
    </div>
  );
}
