import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-8 py-16">
      {/* 페이지 헤더 */}
      <div className="animate-fade-in-up mb-14 text-center">
        <h1
          className="text-4xl font-normal text-gray-800 md:text-5xl"
          style={{ fontFamily: "var(--font-family-display)", fontStyle: "italic" }}
        >
          Collection
        </h1>
        <p className="mt-3 text-xs uppercase tracking-[0.3em] text-gray-400">
          {products.length} Items
        </p>
        <div className="mx-auto mt-6 h-px w-12 bg-gray-200" />
      </div>

      {/* 상품 그리드 (4열) */}
      <div className="stagger-children grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
