import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { ConflictError, NotFoundError } from '../errors/AppError';
import { appUserRepository } from '../repositories/appUser.repository';

import { AppUserPublic, CreateAppUserDTO } from '../types/appUser.types';
import { LoginDTO } from '../types/auth.types';
import { mapAppUserDbToPublic } from '../mappers/appUser.mapper';
import { revokedTokenRepository } from '../repositories/revokedToken.repository';

const register = async (data: CreateAppUserDTO): Promise<AppUserPublic> => {
  const existingUserByEmail = await appUserRepository.findByEmail(data.email);

  if (existingUserByEmail) {
    throw new ConflictError(`Email already used: ${data.email}`);
  }

  const existingUserByPseudo = await appUserRepository.findByPseudo(
    data.pseudo
  );

  if (existingUserByPseudo) {
    throw new ConflictError(`Pseudo already used: ${data.pseudo}`);
  }

  const passwordHash = await bcrypt.hash(data.password, 10);
  try {
    const createdUser = await appUserRepository.create({
      pseudo: data.pseudo,
      email: data.email,
      passwordHash: passwordHash,
      pictureUrl: data.pictureUrl ?? null,
    });

    return mapAppUserDbToPublic(createdUser);
  } catch (error: unknown) {
    // PostgreSQL UNIQUE constraint violation (error code 23505).
    // This can happen if two concurrent requests try to register
    // the same email or pseudo at the same time.
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === '23505'
    ) {
      throw new ConflictError('Email or pseudo already used');
    }

    throw error;
  }
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

const logout = async (token: string): Promise<void> => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not defined');
  }

  const decoded = jwt.verify(token, secret) as jwt.JwtPayload;

  if (typeof decoded.exp !== 'number') {
    throw new Error('Token does not contain an expiration date');
  }

  const expiresAt = new Date(decoded.exp * 1000);

  await revokedTokenRepository.create({
    token,
    expiresAt,
  });
};

export const authService = {
  register,
  login,
  logout,
};
