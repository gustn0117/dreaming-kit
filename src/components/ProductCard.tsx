import Link from "next/link";
import type { Product } from "@/data/products";
import PlaceholderImage from "./PlaceholderImage";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/shop/${product.id}`} className="group block">
      {/* 상품 이미지 */}
      <div className="relative aspect-4/5 overflow-hidden bg-gray-50">
        <PlaceholderImage
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
        />
        {/* 호버 오버레이 */}
        <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/5" />
        {/* Quick View 힌트 */}
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-center bg-white/90 py-2.5 text-[10px] font-medium uppercase tracking-[0.2em] text-gray-600 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
          View Detail
        </div>
      </div>

      {/* 상품 정보 */}
      <div className="mt-4 space-y-1">
        <p className="text-[10px] uppercase tracking-[0.15em] text-gray-400">
          {product.artist}
        </p>
        <h3 className="text-sm font-medium tracking-wide text-gray-900">
          {product.nameEn}
        </h3>
        <p className="text-sm tabular-nums text-gray-500">
          {product.price.toLocaleString()}
          <span className="ml-0.5 text-[10px]">KRW</span>
        </p>
      </div>
    </Link>
  );
}
