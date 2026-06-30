import { RequestHandler } from 'express';
import { authService } from '../services/auth.service';
import { CreateAppUserDTO, AppUserPublic } from '../types/appUser.types';
import { LoginDTO } from '../types/auth.types';

const register: RequestHandler<
  unknown,
  AppUserPublic,
  CreateAppUserDTO,
  unknown
> = async (req, res) => {
  const user = await authService.register(req.body);

  res.status(201).json(user);
};

const login: RequestHandler<
  unknown,
  { message: string },
  LoginDTO,
  unknown
> = async (req, res) => {
  const token = await authService.login(req.body);

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60, // 1 heure
  });

  res.status(200).json({
    message: 'Login successful',
  });
};

const me: RequestHandler = (req, res) => {
  res.status(200).json(req.user);
};

const logout: RequestHandler = async (req, res) => {
  const { token } = req.cookies as { token?: string };

  if (token) {
    await authService.logout(token);
  }

  res.clearCookie('token');

  res.status(200).json({
    message: 'Logged out successfully',
  });
};

export const authController = {
  register,
  login,
  me,
  logout,
};
