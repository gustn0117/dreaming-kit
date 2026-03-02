import { artists } from "@/data/artists";
import PlaceholderImage from "@/components/PlaceholderImage";

export default function ArtistPage() {
  return (
    <div className="mx-auto max-w-[1280px] px-8 py-16">
      {/* 페이지 타이틀 */}
      <div className="mb-16 text-center">
        <h1
          className="text-5xl font-normal text-gray-300"
          style={{ fontFamily: "var(--font-family-display)", fontStyle: "italic" }}
        >
          Artists
        </h1>
        <p className="mt-3 text-sm text-gray-400">Dreaming Kit과 함께하는 작가들</p>
      </div>

      {/* 작가 그리드 (졸업앨범 스타일) */}
      <div className="grid grid-cols-2 gap-x-8 gap-y-16 md:grid-cols-3">
        {artists.map((artist) => (
          <div key={artist.id} className="text-center">
            {/* 프로필 이미지 */}
            <div className="mx-auto aspect-[3/4] w-full max-w-[280px] overflow-hidden bg-gray-50">
              <PlaceholderImage
                src={artist.image}
                alt={artist.name}
                className="h-full w-full object-cover"
              />
            </div>

            {/* 작가 정보 */}
            <div className="mt-4">
              <h3 className="text-base font-semibold">{artist.name}</h3>
              <p className="mt-0.5 text-xs tracking-wider text-gray-400">
                {artist.nameEn.toUpperCase()}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                {artist.description}
              </p>
              {artist.instagram && (
                <p className="mt-2 text-xs text-gray-400">{artist.instagram}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
