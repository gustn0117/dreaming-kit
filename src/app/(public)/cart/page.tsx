import Link from "next/link";

export default function CartPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center">
      <p className="text-sm text-gray-400">준비 중입니다.</p>
      <Link href="/shop" className="mt-4 text-xs text-gray-400 underline underline-offset-4 transition-colors hover:text-gray-600">
        Shop으로 돌아가기
      </Link>
    </div>
  );
}
