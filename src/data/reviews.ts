export interface Review {
  productId: string;   // 상품 ID
  nickname: string;    // 닉네임
  userId: string;      // 아이디
  date: string;        // 날짜
  rating: number;      // 별점 (1~5)
  content: string;     // 리뷰 내용
}

// ✏️ 여기에 리뷰를 직접 등록하세요!
// productId는 products.ts의 id와 일치해야 합니다.
export const reviews: Review[] = [
  {
    productId: "1",
    nickname: "음악사랑",
    userId: "music_lover",
    date: "2025.03.15",
    rating: 5,
    content: "포장이 너무 꼼꼼하고 앨범 퀄리티도 최고입니다!",
  },
  {
    productId: "1",
    nickname: "컬렉터김",
    userId: "collector_kim",
    date: "2025.03.20",
    rating: 4,
    content: "배송도 빠르고 상품 상태도 좋았어요. 다음에도 구매할게요!",
  },
  {
    productId: "1",
    nickname: "팬아트작가",
    userId: "fan_artist",
    date: "2025.04.01",
    rating: 5,
    content: "사진이 정말 예쁘고 구성품도 알차요. 강력 추천합니다!",
  },
  {
    productId: "2",
    nickname: "포카덕후",
    userId: "photocard_fan",
    date: "2025.05.10",
    rating: 5,
    content: "포카 퀄리티 대박이에요! 인쇄 상태도 너무 좋고요.",
  },
  {
    productId: "3",
    nickname: "인테리어매니아",
    userId: "interior_mania",
    date: "2025.06.01",
    rating: 4,
    content: "방에 걸어놓으니까 분위기가 확 달라져요!",
  },
];
