import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white">
      {/* 배경 장식 요소 */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -left-32 -top-32 h-96 w-96 rounded-full opacity-[0.03]"
          style={{ background: "radial-gradient(circle, #f5a623, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-48 -right-48 h-[500px] w-[500px] rounded-full opacity-[0.03]"
          style={{ background: "radial-gradient(circle, #1a1a1a, transparent 70%)" }}
        />
        <div className="absolute left-1/2 top-1/2 h-px w-[80vw] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 flex flex-col items-center">
        <p
          className="animate-fade-in text-[10px] font-medium uppercase tracking-[0.4em] text-gray-300"
          style={{ animationDelay: "0.2s" }}
        >
          Artist Goods Store
        </p>

        {/* 메인 타이틀 */}
        <h1
          className="animate-fade-in-up mt-6 text-center text-7xl font-normal text-gray-800 md:text-8xl lg:text-[10rem] lg:leading-none"
          style={{
            fontFamily: "var(--font-family-display)",
            fontStyle: "italic",
            animationDelay: "0.4s",
          }}
        >
          Dreaming Kit
        </h1>

        {/* 장식 라인 */}
        <div
          className="animate-fade-in mt-8 h-px w-16 bg-gray-300"
          style={{ animationDelay: "0.6s" }}
        />

        {/* View All 버튼 */}
        <Link
          href="/shop"
          className="animate-fade-in-up group mt-10 flex items-center gap-3 border border-gray-900 px-10 py-3.5 text-xs font-medium uppercase tracking-[0.25em] text-gray-900 transition-all duration-300 hover:bg-gray-900 hover:text-white"
          style={{ animationDelay: "0.8s" }}
        >
          View Collection
          <svg
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* 하단 스크롤 힌트 */}
      <div className="animate-float absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-gray-300">
          <span className="text-[9px] uppercase tracking-[0.3em]">Scroll</span>
          <svg width="12" height="20" viewBox="0 0 12 20" fill="none" stroke="currentColor" strokeWidth="1">
            <rect x="1" y="1" width="10" height="18" rx="5" />
            <line x1="6" y1="5" x2="6" y2="9" className="animate-pulse" />
          </svg>
        </div>
      </div>
    </div>
  );
}
