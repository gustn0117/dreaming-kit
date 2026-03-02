import Link from "next/link";
import type { Product } from "@/data/products";
import PlaceholderImage from "./PlaceholderImage";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/shop/${product.id}`} className="group block">
      {/* 상품 이미지 */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <PlaceholderImage
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* 상품 정보 */}
      <div className="mt-3 flex items-center justify-between">
        <h3 className="text-sm font-medium tracking-wide">{product.nameEn.toUpperCase()}</h3>
        <p className="text-sm text-gray-600">
          {product.price.toLocaleString()}
        </p>
      </div>
    </Link>
  );
}
