import { RequestHandler } from 'express';
import {
  ClothingIdParams,
  ClothingItem,
  CreateClothingItemDTO,
  UpdateClothingItemDTO,
} from '../types/closet.types';
import { clothesService } from '../services/clothes.service';

const getAll: RequestHandler<
  unknown,
  ClothingItem[],
  unknown,
  unknown
> = async (_req, res) => {
  console.log('[GET] /api/v1/clothes');
  const items = await clothesService.getAll();
  res.status(200).json(items);
};

const getById: RequestHandler<
  ClothingIdParams,
  ClothingItem,
  unknown,
  unknown
> = async (req, res) => {
  const { id } = req.params;
  console.log(`[GET] /api/v1/clothes/${id}`);
  const item = await clothesService.getById(id);
  res.status(200).json(item);
};

const create: RequestHandler<
  unknown,
  ClothingItem,
  CreateClothingItemDTO,
  unknown
> = async (req, res) => {
  console.log('[POST] /api/v1/clothes');
  const newItem: CreateClothingItemDTO = req.body;
  const createdItem: ClothingItem = await clothesService.create(newItem);
  res.status(201).json(createdItem);
};

const updateById: RequestHandler<
  ClothingIdParams,
  ClothingItem,
  UpdateClothingItemDTO,
  unknown
> = async (req, res) => {
  const { id } = req.params;
  console.log(`[PUT] /api/v1/clothes/${id}`);
  const updatedItem = await clothesService.updateById(id, req.body);
  res.status(200).json(updatedItem);
};

const deleteById: RequestHandler<
  ClothingIdParams,
  void,
  unknown,
  unknown
> = async (req, res) => {
  const { id } = req.params;
  console.log(`[DELETE] /api/v1/clothes/${id}`);
  await clothesService.deleteById(id);
  res.status(204).send();
};

export const clothesController = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
