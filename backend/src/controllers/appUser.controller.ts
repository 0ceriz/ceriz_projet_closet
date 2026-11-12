import type { RequestHandler } from 'express';

import {
  AppUserIdParams,
  AppUserPublic,
  ChangePasswordDTO,
  CreateAppUserDTO,
  UpdateAppUserDTO,
} from '../types/appUser.types';

import { appUserService } from '../services/appUser.service';
import { UnauthorizedError } from '../errors/AppError';

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
  AppUserPublic,
  UpdateAppUserDTO,
  unknown
> = async (req, res) => {
  const { id } = req.params;

  console.log(`[PATCH] /api/v1/users/${id}`);

  if (!req.user) {
    throw new UnauthorizedError('User not authenticated');
  }

  const updatedUser = await appUserService.updateById(
    id,
    req.body,
    req.user.id
  );

  res.status(200).json(updatedUser);
};

const deleteById: RequestHandler<
  AppUserIdParams,
  void,
  unknown,
  unknown
> = async (req, res) => {
  const { id } = req.params;

  console.log(`[DELETE] /api/v1/users/${id}`);

  if (!req.user) {
    throw new UnauthorizedError('User not authenticated');
  }

  await appUserService.deleteById(id, req.user.id);

  res.status(204).end();
};

const updateMe: RequestHandler<
  unknown,
  AppUserPublic,
  UpdateAppUserDTO,
  unknown
> = async (req, res) => {
  if (!req.user) {
    throw new UnauthorizedError('User not authenticated');
  }

  console.log('[PATCH] /api/v1/users/me');

  const updatedUser = await appUserService.updateById(
    req.user.id,
    req.body,
    req.user.id
  );

  res.status(200).json(updatedUser);
};

const changePassword: RequestHandler<
  unknown,
  void,
  ChangePasswordDTO,
  unknown
> = async (req, res) => {
  if (!req.user) {
    throw new UnauthorizedError('User not authenticated');
  }

  console.log('[PATCH] /api/v1/users/me/password');

  const { currentPassword, newPassword } = req.body;

  await appUserService.changePassword(
    req.user.id,
    currentPassword,
    newPassword
  );

  res.status(204).end();
};

// Supprimer le compte de l'utilisateur connecté
const deleteMe: RequestHandler<unknown, void, unknown, unknown> = async (
  req,
  res
) => {
  if (!req.user) {
    throw new UnauthorizedError('User not authenticated');
  }

  console.log('[DELETE] /api/v1/users/me');

  await appUserService.deleteById(req.user.id, req.user.id);

  // Suppression du cookie d'authentification
  res.clearCookie('token', {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
  });

  res.status(204).end();
};

export const appUserController = {
  changePassword,
  getAll,
  getById,
  create,
  updateMe,
  updateById,
  deleteMe,
  deleteById,
};
