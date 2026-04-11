import { randomUUID } from 'node:crypto';
import {
  ClothingId,
  ClothingItem,
  CreateClothingItemDTO,
  UpdateClothingItemDTO,
} from '../types/closet.types';

const clothes: ClothingItem[] = [
  {
    id: '11111111-1111-4111-8111-111111111111',
    name: 'Red T-Shirt',
    type: { category: 'top', subcategory: 't-shirt' },
    style: 'casual',
    color: 'red',
    isFavorite: true,
    comment: 'My favorite red t-shirt!',
  },
  {
    id: '22222222-2222-4222-8222-222222222222',
    name: 'Blue Jeans',
    type: { category: 'bottom', subcategory: 'jeans' },
    style: 'casual',
    color: 'blue',
    isFavorite: false,
  },
  {
    id: '33333333-3333-5333-9333-333333333333',
    name: 'White Sneakers',
    type: { category: 'shoes', subcategory: 'sneakers' },
    style: 'sportswear',
    color: 'white',
    isFavorite: true,
  },
];

const findAll = async (): Promise<ClothingItem[]> => {
  // Simulate fetching data from a database
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(clothes);
    }, 3000);
  });
};

const findById = async (id: ClothingId): Promise<ClothingItem | null> => {
  const item = clothes.find((clothing) => clothing.id === id);
  return item ?? null;
};

const create = async (data: CreateClothingItemDTO): Promise<ClothingItem> => {
  const newItem = {
    id: randomUUID(),
    ...data,
  };
  clothes.push(newItem);
  return newItem;
};

const updateById = async (
  id: ClothingId,
  data: UpdateClothingItemDTO
): Promise<ClothingItem | null> => {
  const index = clothes.findIndex((clothing) => clothing.id === id);
  if (index === -1) return null;
  const currentItem = clothes[index]!;
  const updatedItem: ClothingItem = { ...currentItem, ...data };
  clothes[index] = updatedItem;
  return updatedItem;
};

const deleteById = async (id: ClothingId): Promise<boolean> => {
  const index = clothes.findIndex((clothing) => clothing.id === id);
  if (index === -1) return false;
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
