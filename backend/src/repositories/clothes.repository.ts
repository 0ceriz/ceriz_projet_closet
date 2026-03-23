
import { randomUUID } from 'node:crypto';
import { ClothingItem, CreateClothingItemDTO } from '../types/closet.types';

let clothes: ClothingItem[] = [
  {
    id: '1',
    name: 'Red T-Shirt',
    type: { category: 'top', subcategory: 't-shirt' },
    style: 'casual',
    color: 'red',
    isFavorite: true,
    comment: 'My favorite red t-shirt!',
  },
  {
    id: '2',
    name: 'Blue Jeans',
    type: { category: 'bottom', subcategory: 'jeans' },
    style: 'casual',
    color: 'blue',
    isFavorite: false,
  },
  {
    id: '3',
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

const findById = async (id: string): Promise<ClothingItem | null> => {
  const item = clothes.find((clothing) => clothing.id === id);
  return item || null;
};

const create = async (data: CreateClothingItemDTO): Promise<ClothingItem> => {
  const newItem = {
    id: randomUUID(),
    ...data,
  };
  clothes.push(newItem);
  return newItem;
};

export const clothesRepository = {
  findAll,
  findById,
  create,
};
