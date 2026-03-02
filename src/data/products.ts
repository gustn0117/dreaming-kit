export interface Product {
  id: string;
  name: string;        // 상품명 (한글)
  nameEn: string;      // 상품 영어명
  price: number;       // 가격
  image: string;       // 이미지 경로 (public/images/ 안에 넣어주세요)
  artist: string;      // 가수명
  manufacturer: string;// 제작사
  releaseDate: string; // 발매일
  country: string;     // 제조국
  description?: string;// 상품 설명 (선택)
}

// ✏️ 여기에 상품을 직접 등록하세요!
// 이미지는 public/images/ 폴더에 넣고, 경로를 입력하면 됩니다.
export const products: Product[] = [
  {
    id: "1",
    name: "샘플 앨범",
    nameEn: "Sample Album",
    price: 25000,
    image: "/images/sample1.jpg",
    artist: "아티스트명",
    manufacturer: "제작사명",
    releaseDate: "2025.03.01",
    country: "대한민국",
  },
  {
    id: "2",
    name: "샘플 포토카드 세트",
    nameEn: "Sample Photocard Set",
    price: 12000,
    image: "/images/sample2.jpg",
    artist: "아티스트명",
    manufacturer: "제작사명",
    releaseDate: "2025.04.15",
    country: "대한민국",
  },
  {
    id: "3",
    name: "샘플 포스터",
    nameEn: "Sample Poster",
    price: 8000,
    image: "/images/sample3.jpg",
    artist: "아티스트명",
    manufacturer: "제작사명",
    releaseDate: "2025.05.20",
    country: "대한민국",
  },
  {
    id: "4",
    name: "샘플 키링",
    nameEn: "Sample Keyring",
    price: 15000,
    image: "/images/sample4.jpg",
    artist: "아티스트명",
    manufacturer: "제작사명",
    releaseDate: "2025.06.10",
    country: "대한민국",
  },
  {
    id: "5",
    name: "샘플 스티커 팩",
    nameEn: "Sample Sticker Pack",
    price: 5000,
    image: "/images/sample5.jpg",
    artist: "아티스트명",
    manufacturer: "제작사명",
    releaseDate: "2025.07.01",
    country: "대한민국",
  },
  {
    id: "6",
    name: "샘플 엽서 세트",
    nameEn: "Sample Postcard Set",
    price: 9000,
    image: "/images/sample6.jpg",
    artist: "아티스트명",
    manufacturer: "제작사명",
    releaseDate: "2025.08.15",
    country: "대한민국",
  },
  {
    id: "7",
    name: "샘플 미니앨범",
    nameEn: "Sample Mini Album",
    price: 18000,
    image: "/images/sample7.jpg",
    artist: "아티스트명",
    manufacturer: "제작사명",
    releaseDate: "2025.09.01",
    country: "대한민국",
  },
  {
    id: "8",
    name: "샘플 굿즈 세트",
    nameEn: "Sample Goods Set",
    price: 35000,
    image: "/images/sample8.jpg",
    artist: "아티스트명",
    manufacturer: "제작사명",
    releaseDate: "2025.10.10",
    country: "대한민국",
  },
];
