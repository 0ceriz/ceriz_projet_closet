
import { RequestHandler } from 'express';
import {
  ClothingId,
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
> = async (_req, res, next) => {
  try {
    console.log('[GET] /api/v1/clothes');
    const items = await clothesService.getAll();
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
};

const getById: RequestHandler<
  ClothingIdParams,
  ClothingItem | { message: string },
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(`[GET] /api/v1/clothes/${id}`);
    const item = await clothesService.getById(id);
    // TODO: Handle case where item is not found (service layer)
    if (item === null)
      res.status(404).json({ message: 'Clothing item not found' });
    else res.status(200).json(item);
  } catch (error) {
    next(error);
  }
};

const create: RequestHandler<
  unknown,
  ClothingItem,
  CreateClothingItemDTO,
  unknown
> = async (req, res, next) => {
  try {
    console.log('[POST] /api/v1/clothes');
    const newItem: CreateClothingItemDTO = req.body;
    const createdItem: ClothingItem = await clothesService.create(newItem);
    res.status(201).json(createdItem);
  } catch (error) {
    next(error);
  }
};

const updateById: RequestHandler<
  ClothingIdParams,
  ClothingItem | { message: string },
  UpdateClothingItemDTO,
  unknown
> = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(`[PUT] /api/v1/clothes/${id}`);
    const updatedItem = await clothesService.updateById(id, req.body);
    if (updatedItem === null)
      res.status(404).json({ message: 'Clothing item not found' });
    else res.status(200).json(updatedItem);
  } catch (error) {
    next(error);
  }
};

const deleteById: RequestHandler<
  ClothingIdParams,
  void | { message: string },
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(`[DELETE] /api/v1/clothes/${id}`);
    const deleted = await clothesService.deleteById(id);
    if (!deleted) res.status(404).json({ message: 'Clothing item not found' });
    else res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const clothesController = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
