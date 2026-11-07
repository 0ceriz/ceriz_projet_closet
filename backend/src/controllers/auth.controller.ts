import { RequestHandler } from 'express';
import { authService } from '../services/auth.service';
import { CreateAppUserDTO, AppUserPublic } from '../types/appUser.types';
import { LoginDTO } from '../types/auth.types';

const cookieOptions = {
  httpOnly: true,
  secure: false, // développement local
  sameSite: 'lax' as const,
};

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
    ...cookieOptions,
    maxAge: 1000 * 60 * 60,
  });

  res.status(200).json({
    message: 'Login successful',
  });
};

const me: RequestHandler<unknown, AppUserPublic> = (req, res) => {
  res.status(200).json(req.user);
};

const logout: RequestHandler<unknown, { message: string }> = async (
  req,
  res
) => {
  const { token } = req.cookies as { token?: string };

  try {
    if (token) {
      await authService.logout(token);
    }

    res.status(200).json({
      message: 'Logged out successfully',
    });
  } catch (error) {
    console.error('[LOGOUT] Erreur:', error);

    res.status(500).json({
      message: 'Logout failed',
    });
  } finally {
    // Toujours essayer de supprimer le cookie
    res.clearCookie('token', cookieOptions);
  }
};

export const authController = {
  register,
  login,
  me,
  logout,
};
