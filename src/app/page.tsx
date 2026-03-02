import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white">
      {/* 메인 타이틀 */}
      <h1
        className="text-center text-7xl font-normal text-gray-200 md:text-8xl lg:text-9xl"
        style={{
          fontFamily: "var(--font-family-display)",
          fontStyle: "italic",
          textShadow: "0 0 40px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.05)",
        }}
      >
        Dreaming Kit
      </h1>

      {/* View All 버튼 */}
      <Link
        href="/shop"
        className="mt-10 rounded-sm bg-gray-900 px-8 py-3 text-sm font-medium tracking-wider text-white transition-all hover:bg-black"
      >
        View All
      </Link>
    </div>
  );
}
