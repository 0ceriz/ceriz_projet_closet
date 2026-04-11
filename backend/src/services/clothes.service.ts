import { NotFoundError } from '../errors/AppError';
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

const getById = async (id: ClothingId): Promise<ClothingItem> => {
  const item = await clothesRepository.findById(id);
  if (!item) throw new NotFoundError('Clothing item not found', id);
  return item;
};

const create = async (data: CreateClothingItemDTO): Promise<ClothingItem> => {
  const item = await clothesRepository.create(data);
  return item;
};

const updateById = async (
  id: ClothingId,
  data: UpdateClothingItemDTO
): Promise<ClothingItem> => {
  const item = await clothesRepository.updateById(id, data);
  if (!item) throw new NotFoundError('Clothing item not found', id);
  return item;
};

const deleteById = async (id: ClothingId): Promise<void> => {
  const deleted = await clothesRepository.deleteById(id);
  if (!deleted) throw new NotFoundError('Clothing item not found', id);
  return void 0;
};

export const clothesService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
