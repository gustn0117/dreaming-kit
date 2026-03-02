export interface Artist {
  id: string;
  name: string;
  nameEn: string;
  image: string;
  description: string;
  instagram?: string;
  website?: string;
  sortOrder?: number;
  isVisible?: boolean;
}

export function mapArtist(row: Record<string, unknown>): Artist {
  return {
    id: row.id as string,
    name: row.name as string,
    nameEn: row.name_en as string,
    image: row.image as string,
    description: row.description as string,
    instagram: (row.instagram as string) || undefined,
    website: (row.website as string) || undefined,
    sortOrder: row.sort_order as number,
    isVisible: row.is_visible as boolean,
  };
}
