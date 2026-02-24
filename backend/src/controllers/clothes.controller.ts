
import { RequestHandler } from 'express';
import { ClothingItem } from '../types/closet.types';
import { clothesService } from '../services/clothes.service';

const getAll: RequestHandler<
  unknown,
  ClothingItem[],
  unknown,
  unknown
> = async (_req, res, next) => {
  console.log('[GET] /api/v1/clothes');
  try {
    const items = await clothesService.getAll();
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
};

const getById: RequestHandler = (req, res) => {
  const { id } = req.params;
  console.log(`[GET] /api/v1/clothes/${id}`);
  res.send(`Get clothing item by ID: ${id}`);
};

const create: RequestHandler = (_req, res) => {
  console.log('[POST] /api/v1/clothes');
  res.send('Create a new clothing item');
};

const updateById: RequestHandler = (req, res) => {
  const { id } = req.params;
  console.log(`[PUT] /api/v1/clothes/${id}`);
  res.send(`Update clothing item with ID: ${id}`);
};

const deleteById: RequestHandler = (req, res) => {
  const { id } = req.params;
  console.log(`[DELETE] /api/v1/clothes/${id}`);
  res.send(`Delete clothing item with ID: ${id}`);
};

export const clothesController = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
