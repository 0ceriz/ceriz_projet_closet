import { RequestHandler } from 'express';
import {
  AppUserIdParams,
  AppUserPublic,
  CreateAppUserDTO,
  UpdateAppUserDTO,
} from '../types/appUser.types';
import { appUserService } from '../services/appUser.service';

const getAll: RequestHandler<
  unknown,
  AppUserPublic[],
  unknown,
  unknown
> = async (_req, res) => {
  console.log('[GET] /api/v1/users');
  const users = await appUserService.getAll();
  res.status(200).json(users);
};

const getById: RequestHandler<
  AppUserIdParams,
  AppUserPublic,
  unknown,
  unknown
> = async (req, res) => {
  const { id } = req.params;
  console.log(`[GET] /api/v1/users/${id}`);
  const user = await appUserService.getById(id);
  res.status(200).json(user);
};

const create: RequestHandler<
  unknown,
  AppUserPublic,
  CreateAppUserDTO,
  unknown
> = async (req, res) => {
  console.log('[POST] /api/v1/users');
  const createdUser = await appUserService.create(req.body);
  res.status(201).json(createdUser);
};

const updateById: RequestHandler<
  AppUserIdParams,
  string,
  UpdateAppUserDTO,
  unknown
> = (req, res) => {
  const { id } = req.params;
  console.log(`[PATCH] /api/v1/users/${id}`);
  const updatedUser: UpdateAppUserDTO = req.body;
  console.log('Updated user data:', updatedUser);
  res.send(`Update app user with ID: ${id}`);
};

const deleteById: RequestHandler<
  AppUserIdParams,
  AppUserPublic,
  unknown,
  unknown
> = async (req, res) => {
  const { id } = req.params;
  console.log(`[DELETE] /api/v1/users/${id}`);
  await appUserService.deleteById(id);
  res.status(204).end();
};

export const appUserController = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
