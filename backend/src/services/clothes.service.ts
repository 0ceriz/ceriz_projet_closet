import { clothesRepository } from '../repositories/clothes.repository';
import { ClothingItem, CreateClothingItemDTO } from '../types/closet.types';

const getAll = async (): Promise<ClothingItem[]> => {
  const items = await clothesRepository.findAll();
  return items;
};

const getById = async (id: string): Promise<ClothingItem | null> => {
  const item = await clothesRepository.findById(id);
  return item;
};

const create = async (data: CreateClothingItemDTO): Promise<ClothingItem> => {
  const item = await clothesRepository.create(data);
  return item;
};

export const clothesService = {
  getAll,
  getById,
  create,
};