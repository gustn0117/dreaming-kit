import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-8 py-12">
      {/* 상품 그리드 (4열) */}
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
