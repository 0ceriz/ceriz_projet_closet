import { RequestHandler } from 'express';
import {
  ClosetIdParams,
  Closet,
  CreateClosetDTO,
  UpdateClosetDTO,
} from '../types/closet.types';
import { closetService } from '../services/closet.service';
import { UnauthorizedError } from '../errors/AppError';

const getAll: RequestHandler<unknown, Closet[], unknown, unknown> = async (
  _req,
  res
) => {
  console.log('[GET] /api/v1/closets');
  const closets = await closetService.getAll();
  res.status(200).json(closets);
};

const getById: RequestHandler<
  ClosetIdParams,
  Closet,
  unknown,
  unknown
> = async (req, res) => {
  const { id } = req.params;
  console.log(`[GET] /api/v1/closets/${id}`);
  const closet = await closetService.getById(id);
  res.status(200).json(closet);
};

const create: RequestHandler<
  unknown,
  Closet,
  CreateClosetDTO,
  unknown
> = async (req, res) => {
  console.log('[POST] /api/v1/closets');

  if (!req.user) {
    throw new UnauthorizedError('User not authenticated');
  }

  const createdCloset = await closetService.create(req.body, req.user.id);

  res.status(201).json(createdCloset);
};

const updateById: RequestHandler<
  ClosetIdParams,
  Closet,
  UpdateClosetDTO,
  unknown
> = async (req, res) => {
  const { id } = req.params;

  console.log(`[PATCH] /api/v1/closets/${id}`);

  if (!req.user) {
    throw new UnauthorizedError('User not authenticated');
  }

  const updatedCloset = await closetService.updateById(
    id,
    req.body,
    req.user.id
  );

  res.status(200).json(updatedCloset);
};

const deleteById: RequestHandler<
  ClosetIdParams,
  Closet,
  unknown,
  unknown
> = async (req, res) => {
  const { id } = req.params;
  console.log(`[DELETE] /api/v1/closets/${id}`);
  if (!req.user) {
    throw new UnauthorizedError('User not authenticated');
  }

  await closetService.deleteById(id, req.user.id);

  res.status(204).end();
};

const getMyClosets: RequestHandler = async (req, res) => {
  console.log('[GET] /closets/me');

  if (!req.user) {
    throw new UnauthorizedError('User not authenticated');
  }

  const closets = await closetService.getByUserId(req.user.id);

  res.status(200).json(closets);
};

export const closetController = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  getMyClosets,
};
