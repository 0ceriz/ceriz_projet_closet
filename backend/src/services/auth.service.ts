import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { ConflictError, NotFoundError } from '../errors/AppError';
import { appUserRepository } from '../repositories/appUser.repository';

import { AppUserDb, CreateAppUserDTO } from '../types/appUser.types';
import { LoginDTO } from '../types/auth.types';

const register = async (data: CreateAppUserDTO): Promise<AppUserDb> => {
  const existingUser = await appUserRepository.findByEmail(data.email);

  if (existingUser) {
    throw new ConflictError(`Email already used: ${data.email}`);
  }

  const password_hash = await bcrypt.hash(data.password, 10);

  const createdUser = await appUserRepository.create({
    pseudo: data.pseudo,
    email: data.email,
    passwordHash: password_hash,
    pictureUrl: data.pictureUrl ?? null,
  });

  return createdUser;
};

const login = async (data: LoginDTO): Promise<string> => {
  const user = await appUserRepository.findByEmail(data.email);

  if (!user) {
    throw new NotFoundError('User', data.email);
  }

  const isMatch = await bcrypt.compare(data.password, user.password_hash);

  if (!isMatch) {
    throw new ConflictError('Invalid credentials');
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' }
  );

  return token;
};

export const authService = {
  register,
  login,
};
