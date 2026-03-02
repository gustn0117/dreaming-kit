export interface Review {
  id: string;
  productId: string;
  nickname: string;
  userId: string;
  date: string;
  rating: number;
  content: string;
}

export function mapReview(row: Record<string, unknown>): Review {
  return {
    id: row.id as string,
    productId: row.product_id as string,
    nickname: row.nickname as string,
    userId: row.user_id as string,
    date: row.date as string,
    rating: row.rating as number,
    content: row.content as string,
  };
}
