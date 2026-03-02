export default function MyPage() {
  return (
    <div className="mx-auto max-w-[1280px] px-8 py-16">
      <h1 className="text-2xl font-semibold">마이페이지</h1>
      <hr className="my-6 border-gray-200" />

      {/* 로그인 안내 (표시용) */}
      <div className="flex flex-col items-center justify-center py-24">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ccc"
          strokeWidth="1"
        >
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        <p className="mt-4 text-gray-400">로그인이 필요한 서비스입니다.</p>
        <button className="mt-6 rounded bg-gray-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-black">
          로그인
        </button>
      </div>

      {/* 주문 내역 (표시용) */}
      <div className="mt-16">
        <h2 className="text-lg font-semibold">주문 내역</h2>
        <hr className="my-4 border-gray-200" />
        <p className="py-8 text-center text-sm text-gray-400">주문 내역이 없습니다.</p>
      </div>
    </div>
  );
}
