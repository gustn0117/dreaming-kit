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
    <div className="mx-auto max-w-[1280px] px-8 py-16">
      {/* 상품 상세 */}
      <div className="flex flex-col gap-12 md:flex-row">
        {/* 상품 이미지 */}
        <div className="w-full md:w-[420px] flex-shrink-0">
          <div className="aspect-[4/5] overflow-hidden bg-gray-50">
            <PlaceholderImage
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* 상품 정보 */}
        <div className="flex-1">
          <p className="text-sm text-gray-400">상품명</p>
          <h1 className="mt-1 text-2xl font-semibold">{product.nameEn}</h1>
          <p className="mt-3 text-lg">
            {product.price.toLocaleString()} <span className="text-gray-400">(가격)</span>
          </p>

          <hr className="my-6 border-gray-200" />

          {/* 상품 정보 테이블 */}
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-0">
                <td className="py-2 pr-8 text-gray-600 whitespace-nowrap">가수명</td>
                <td className="py-2">{product.artist}</td>
              </tr>
              <tr>
                <td className="py-2 pr-8 text-gray-600 whitespace-nowrap">제작사</td>
                <td className="py-2">{product.manufacturer}</td>
              </tr>
              <tr>
                <td className="py-2 pr-8 text-gray-600 whitespace-nowrap">발매일</td>
                <td className="py-2">{product.releaseDate}</td>
              </tr>
              <tr>
                <td className="py-2 pr-8 text-gray-600 whitespace-nowrap">제조국</td>
                <td className="py-2">{product.country}</td>
              </tr>
            </tbody>
          </table>

          {/* 총 금액 */}
          <div className="mt-8 flex items-center justify-between rounded bg-gray-50 px-6 py-4">
            <span className="font-semibold">총 금액</span>
            <span className="text-lg font-bold">{product.price.toLocaleString()}</span>
          </div>

          {/* 버튼 */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button className="rounded border border-gray-900 py-3.5 text-sm font-medium tracking-wide transition-colors hover:bg-gray-50">
              Add to Cart
            </button>
            <button className="rounded bg-gray-900 py-3.5 text-sm font-medium tracking-wide text-white transition-colors hover:bg-black">
              BUY NOW
            </button>
          </div>
        </div>
      </div>

      <hr className="my-12 border-gray-200" />

      {/* 상품 상세 이미지 영역 */}
      <div className="mb-12">
        <div className="aspect-video w-full overflow-hidden bg-gray-100">
          <PlaceholderImage
            src={product.image}
            alt={`${product.name} 상세`}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <hr className="my-12 border-gray-200" />

      {/* 리뷰 섹션 */}
      <section>
        <div className="space-y-8">
          {productReviews.length > 0 ? (
            productReviews.map((review, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center gap-4">
                  <StarRating rating={review.rating} />
                  <span className="font-semibold">{review.nickname}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>{review.date}</span>
                  <span>{review.userId}</span>
                </div>
                <p className="text-sm leading-relaxed text-gray-700">{review.content}</p>
              </div>
            ))
          ) : (
            <p className="py-12 text-center text-gray-400">아직 리뷰가 없습니다.</p>
          )}
        </div>
      </section>
    </div>
  );
}
