import { artists } from "@/data/artists";
import PlaceholderImage from "@/components/PlaceholderImage";

export default function ArtistPage() {
  return (
    <div className="mx-auto max-w-7xl px-8 py-16">
      {/* 페이지 타이틀 */}
      <div className="animate-fade-in-up mb-16 text-center">
        <h1
          className="text-4xl font-normal text-gray-800 md:text-5xl"
          style={{ fontFamily: "var(--font-family-display)", fontStyle: "italic" }}
        >
          Artists
        </h1>
        <p className="mt-3 text-xs uppercase tracking-[0.3em] text-gray-400">
          Dreaming Kit과 함께하는 작가들
        </p>
        <div className="mx-auto mt-6 h-px w-12 bg-gray-200" />
      </div>

      {/* 작가 그리드 */}
      <div className="stagger-children grid grid-cols-2 gap-x-8 gap-y-16 md:grid-cols-3">
        {artists.map((artist) => (
          <div key={artist.id} className="group text-center">
            {/* 프로필 이미지 */}
            <div className="mx-auto aspect-3/4 w-full max-w-[280px] overflow-hidden bg-gray-50">
              <PlaceholderImage
                src={artist.image}
                alt={artist.name}
                className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
              />
            </div>

            {/* 작가 정보 */}
            <div className="mt-5">
              <h3 className="text-sm font-semibold text-gray-900">{artist.name}</h3>
              <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-gray-400">
                {artist.nameEn.toUpperCase()}
              </p>
              <div className="mx-auto mt-3 h-px w-6 bg-gray-200" />
              <p className="mt-3 text-xs leading-relaxed text-gray-500">
                {artist.description}
              </p>
              {artist.instagram && (
                <p className="mt-2 text-[11px] text-gray-400 transition-colors duration-200 group-hover:text-gray-600">
                  {artist.instagram}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
