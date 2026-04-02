
import { clothesRepository } from '../repositories/clothes.repository';
import {
  ClothingId,
  ClothingItem,
  CreateClothingItemDTO,
  UpdateClothingItemDTO,
} from '../types/closet.types';

const getAll = async (): Promise<ClothingItem[]> => {
  const items = await clothesRepository.findAll();
  return items;
};

const getById = async (id: ClothingId): Promise<ClothingItem | null> => {
  const item = await clothesRepository.findById(id);
  return item;
};

const create = async (data: CreateClothingItemDTO): Promise<ClothingItem> => {
  const item = await clothesRepository.create(data);
  return item;
};

const updateById = async (
  id: ClothingId,
  data: UpdateClothingItemDTO
): Promise<ClothingItem | null> => {
  const item = await clothesRepository.updateById(id, data);
  return item;
};

const deleteById = async (id: ClothingId): Promise<boolean> => {
  const deleted = await clothesRepository.deleteById(id);
  return deleted;
};

export const clothesService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
