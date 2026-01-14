export interface ClothingItem {
  id: number;
  name: string;
  type: {
    category: "top" | "bottom" | "shoes" | "accessory";
    subcategory: string;
  };
  style: "sportswear" | "chic" | "classic" | "casual";
  color: string;
  isFavorite: boolean;
  comment?: string;
}

export interface Closet {
  isOpen: boolean;
  clothes: ClothingItem[];
}