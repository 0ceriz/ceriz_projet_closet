import { RequestHandler } from 'express';
import { authService } from '../services/auth.service';
import { CreateAppUserDTO } from '../types/appUser.types';
import { LoginDTO } from '../types/auth.types';

const register: RequestHandler<
  unknown,
  unknown,
  CreateAppUserDTO,
  unknown
> = async (req, res) => {
  const user = await authService.register(req.body);

  res.status(201).json(user);
};

const login: RequestHandler<
  unknown,
  { token: string },
  LoginDTO,
  unknown
> = async (req, res) => {
  const token = await authService.login(req.body);

  res.status(200).json({ token });
};

const me: RequestHandler = async (req, res) => {
  res.status(200).json(req.user);
};

export const authController = {
  register,
  login,
  me,
};
