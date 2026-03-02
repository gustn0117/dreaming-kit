export default function MyPage() {
  return (
    <div className="animate-fade-in-up mx-auto max-w-7xl px-8 py-16">
      <div className="text-center">
        <h1
          className="text-3xl font-normal text-gray-800"
          style={{ fontFamily: "var(--font-family-display)", fontStyle: "italic" }}
        >
          My Page
        </h1>
        <div className="mx-auto mt-4 h-px w-12 bg-gray-200" />
      </div>

      {/* 로그인 안내 */}
      <div className="flex flex-col items-center justify-center py-28">
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#d4d4d4"
          strokeWidth="1"
        >
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        <p className="mt-5 text-sm text-gray-400">로그인이 필요한 서비스입니다.</p>
        <button className="mt-8 border border-gray-900 px-8 py-3 text-xs font-medium uppercase tracking-[0.15em] text-gray-900 transition-all duration-200 hover:bg-gray-900 hover:text-white">
          Sign In
        </button>
      </div>

      {/* 주문 내역 */}
      <div className="mt-12">
        <div className="flex items-center gap-6">
          <div className="h-px flex-1 bg-gray-100" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-gray-300">Order History</span>
          <div className="h-px flex-1 bg-gray-100" />
        </div>
        <p className="py-12 text-center text-sm text-gray-400">주문 내역이 없습니다.</p>
      </div>
    </div>
  );
}
