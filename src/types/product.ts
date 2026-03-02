export interface Product {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  image: string;
  artist: string;
  manufacturer: string;
  releaseDate: string;
  country: string;
  description?: string;
  sortOrder?: number;
  isVisible?: boolean;
}

export function mapProduct(row: Record<string, unknown>): Product {
  return {
    id: row.id as string,
    name: row.name as string,
    nameEn: row.name_en as string,
    price: row.price as number,
    image: row.image as string,
    artist: row.artist as string,
    manufacturer: row.manufacturer as string,
    releaseDate: row.release_date as string,
    country: row.country as string,
    description: (row.description as string) || undefined,
    sortOrder: row.sort_order as number,
    isVisible: row.is_visible as boolean,
  };
}
