import { products } from "@/data/products";
import { reviews } from "@/data/reviews";
import { notFound } from "next/navigation";
import PlaceholderImage from "@/components/PlaceholderImage";
import StarRating from "@/components/StarRating";

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  const productReviews = reviews.filter((r) => r.productId === id);

  return (
    <div className="animate-fade-in-up mx-auto max-w-7xl px-8 py-16">
      {/* 상품 상세 */}
      <div className="flex flex-col gap-16 md:flex-row">
        {/* 상품 이미지 */}
        <div className="w-full shrink-0 md:w-[480px]">
          <div className="aspect-4/5 overflow-hidden bg-gray-50">
            <PlaceholderImage
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* 상품 정보 */}
        <div className="flex-1 pt-2">
          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">{product.artist}</p>
          <h1
            className="mt-2 text-3xl font-normal text-gray-900"
            style={{ fontFamily: "var(--font-family-display)" }}
          >
            {product.nameEn}
          </h1>
          <p className="mt-1 text-sm text-gray-400">{product.name}</p>
          <p className="mt-6 text-2xl font-light tabular-nums text-gray-900">
            {product.price.toLocaleString()}
            <span className="ml-1 text-xs text-gray-400">KRW</span>
          </p>

          <div className="my-8 h-px w-full bg-gray-100" />

          {/* 상품 정보 테이블 */}
          <table className="w-full text-sm">
            <tbody>
              {[
                ["Artist", product.artist],
                ["Manufacturer", product.manufacturer],
                ["Release", product.releaseDate],
                ["Origin", product.country],
              ].map(([label, value]) => (
                <tr key={label} className="border-b border-gray-50">
                  <td className="py-3 pr-8 text-xs uppercase tracking-wider text-gray-400">{label}</td>
                  <td className="py-3 text-gray-700">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 총 금액 */}
          <div className="mt-10 flex items-center justify-between border border-gray-100 px-6 py-5">
            <span className="text-xs uppercase tracking-wider text-gray-500">Total</span>
            <span className="text-xl font-light tabular-nums text-gray-900">
              {product.price.toLocaleString()}
              <span className="ml-1 text-xs text-gray-400">KRW</span>
            </span>
          </div>

          {/* 버튼 */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button className="border border-gray-900 py-4 text-xs font-medium uppercase tracking-[0.15em] text-gray-900 transition-all duration-200 hover:bg-gray-50">
              Add to Cart
            </button>
            <button className="bg-gray-900 py-4 text-xs font-medium uppercase tracking-[0.15em] text-white transition-all duration-200 hover:bg-black">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* 구분선 */}
      <div className="my-20 flex items-center gap-6">
        <div className="h-px flex-1 bg-gray-100" />
        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-300">Detail</span>
        <div className="h-px flex-1 bg-gray-100" />
      </div>

      {/* 상품 상세 이미지 영역 */}
      <div className="mb-12">
        <div className="aspect-video w-full overflow-hidden bg-gray-50">
          <PlaceholderImage
            src={product.image}
            alt={`${product.name} 상세`}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* 리뷰 구분선 */}
      <div className="my-20 flex items-center gap-6">
        <div className="h-px flex-1 bg-gray-100" />
        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-300">
          Reviews ({productReviews.length})
        </span>
        <div className="h-px flex-1 bg-gray-100" />
      </div>

      {/* 리뷰 섹션 */}
      <section>
        <div className="space-y-0">
          {productReviews.length > 0 ? (
            productReviews.map((review, index) => (
              <div key={index} className="border-b border-gray-50 py-8 first:pt-0 last:border-0">
                <div className="flex items-center gap-4">
                  <StarRating rating={review.rating} />
                  <span className="text-sm font-medium text-gray-800">{review.nickname}</span>
                  <span className="text-xs text-gray-300">|</span>
                  <span className="text-xs text-gray-400">{review.date}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{review.content}</p>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center py-20 text-center">
              <div className="mb-4 h-px w-8 bg-gray-200" />
              <p className="text-sm text-gray-400">아직 리뷰가 없습니다.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
