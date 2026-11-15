import { randomUUID } from "node:crypto";
import {
  ClothingId,
  ClothingItem,
  CreateClothingItemDTO,
  UpdateClothingItemDTO,
} from "../types/clothing.types";

const clothes: ClothingItem[] = [
  {
    id: "11111111-1111-4111-8111-111111111111",
    name: "Red T-Shirt",
    type: { category: "top", subcategory: "t-shirt" },
    style: "casual",
    color: "red",
    isFavorite: true,
    comment: "My favorite red t-shirt!",
  },
  {
    id: "22222222-2222-4222-8222-222222222222",
    name: "Blue Jeans",
    type: { category: "bottom", subcategory: "jeans" },
    style: "casual",
    color: "blue",
    isFavorite: false,
  },
  {
    id: "33333333-3333-5333-9333-333333333333",
    name: "White Sneakers",
    type: { category: "shoes", subcategory: "sneakers" },
    style: "sportswear",
    color: "white",
    isFavorite: true,
  },
];

const findAll = async (): Promise<ClothingItem[]> => {
  return [...clothes];
};

const findById = async (id: ClothingId): Promise<ClothingItem | null> => {
  return clothes.find((item) => item.id === id) ?? null;
};

const create = async (data: CreateClothingItemDTO): Promise<ClothingItem> => {
  const newItem: ClothingItem = {
    ...data,
    id: randomUUID(),
  };

  clothes.push(newItem);

  return newItem;
};

const updateById = async (
  id: ClothingId,
  data: UpdateClothingItemDTO,
): Promise<ClothingItem | null> => {
  const index = clothes.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  const currentItem = clothes[index]!;

  const updatedItem: ClothingItem = {
    id: currentItem.id,
    name: data.name ?? currentItem.name,
    type: data.type ? { ...currentItem.type, ...data.type } : currentItem.type,
    style: data.style ?? currentItem.style,
    color: data.color ?? currentItem.color,
    isFavorite: data.isFavorite ?? currentItem.isFavorite,
    comment: data.comment ?? currentItem.comment,
  };

  clothes[index] = updatedItem;

  return updatedItem;
};

const deleteById = async (id: ClothingId): Promise<boolean> => {
  const index = clothes.findIndex((item) => item.id === id);

  if (index === -1) {
    return false;
  }

  clothes.splice(index, 1);

  return true;
};

export const clothesRepository = {
  findAll,
  findById,
  create,
  updateById,
  deleteById,
};
