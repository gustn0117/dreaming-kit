export interface Artist {
  id: string;
  name: string;        // 작가 이름
  nameEn: string;      // 작가 영어 이름
  image: string;       // 프로필 이미지 경로
  description: string; // 소개글
  instagram?: string;  // 인스타그램 (선택)
  website?: string;    // 웹사이트 (선택)
}

// ✏️ 여기에 작가/아티스트를 직접 등록하세요!
// 이미지는 public/images/artists/ 폴더에 넣고, 경로를 입력하면 됩니다.
export const artists: Artist[] = [
  {
    id: "1",
    name: "김작가",
    nameEn: "Kim Artist",
    image: "/images/artists/artist1.jpg",
    description: "일러스트레이터 / 감성적인 색감으로 작업합니다.",
    instagram: "@kim_artist",
  },
  {
    id: "2",
    name: "이디자인",
    nameEn: "Lee Design",
    image: "/images/artists/artist2.jpg",
    description: "그래픽 디자이너 / 타이포그래피와 레이아웃을 좋아합니다.",
    instagram: "@lee_design",
  },
  {
    id: "3",
    name: "박포토",
    nameEn: "Park Photo",
    image: "/images/artists/artist3.jpg",
    description: "포토그래퍼 / 자연과 인물 사진을 주로 촬영합니다.",
    instagram: "@park_photo",
  },
  {
    id: "4",
    name: "최아트",
    nameEn: "Choi Art",
    image: "/images/artists/artist4.jpg",
    description: "일러스트레이터 / 귀엽고 따뜻한 그림을 그립니다.",
    instagram: "@choi_art",
  },
  {
    id: "5",
    name: "정그림",
    nameEn: "Jung Grim",
    image: "/images/artists/artist5.jpg",
    description: "화가 / 수채화와 아크릴화를 주로 작업합니다.",
    instagram: "@jung_grim",
  },
  {
    id: "6",
    name: "한크리",
    nameEn: "Han Creative",
    image: "/images/artists/artist6.jpg",
    description: "크리에이터 / 다양한 매체로 실험적인 작업을 합니다.",
    instagram: "@han_creative",
  },
];
