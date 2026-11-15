export type ClothingCategory = "top" | "bottom" | "shoes" | "accessory";

export type ClothingStyle = "sportswear" | "chic" | "classic" | "casual";

export interface ClothingItem {
  id: string;
  name: string;
  type: {
    category: ClothingCategory;
    subcategory?: string;
  };
  style?: ClothingStyle;
  color?: string;
  isFavorite: boolean;
  comment?: string;
}

// Modèle d'un placard
export interface Closet {
  id: string;
  name: string;
  description?: string;
  userId: string;
  createdAt: string;
  updatedAt?: string | null;
}

// Modèle utilisé pour afficher un placard ouvert
export interface ClosetView extends Closet {
  isOpen: boolean;
  clothes: ClothingItem[];
}
