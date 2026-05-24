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

const getById: RequestHandler<AppUserIdParams, string, unknown, unknown> = (
  req,
  res
) => {
  const { id } = req.params;
  console.log(`[GET] /api/v1/users/${id}`);
  res.send(`Get app user by ID: ${id}`);
};

const create: RequestHandler<unknown, string, CreateAppUserDTO, unknown> = (
  req,
  res
) => {
  console.log('[POST] /api/v1/users');
  const newUser: CreateAppUserDTO = req.body;
  console.log('New user data:', newUser);
  res.send('Create a new app user');
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

const deleteById: RequestHandler<AppUserIdParams, string, unknown, unknown> = (
  req,
  res
) => {
  const { id } = req.params;
  console.log(`[DELETE] /api/v1/users/${id}`);
  res.send(`Delete app user with ID: ${id}`);
};

export const appUserController = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
