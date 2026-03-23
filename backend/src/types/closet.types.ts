export const CLOTHING_CATEGORIES = [
  'top',
  'bottom',
  'shoes',
  'accessory',
] as const;

export const CLOTHING_STYLES = [
  'sportswear',
  'chic',
  'classic',
  'casual',
] as const;

export interface ClothingType {
  category: (typeof CLOTHING_CATEGORIES)[number];
  subcategory: string;
}

export interface ClothingItem {
  id: string;
  name: string;
  type: ClothingType;
  style: (typeof CLOTHING_STYLES)[number];
  color: string;
  isFavorite: boolean;
  comment?: string;
}

export type CreateClothingItemDTO = Omit<ClothingItem, 'id'>;

export interface Closet {
  isOpen: boolean;
  clothes: ClothingItem[];
}