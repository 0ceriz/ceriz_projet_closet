import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError, ValidationError } from '../errors/AppError';
import { revokedTokenRepository } from '../repositories/revokedToken.repository';
import { verifyAccessToken } from '../utils/token';
import { jwtPayloadSchema } from '../schemas/auth.schema';
import { appUserRepository } from '../repositories/appUser.repository';
import { mapAppUserDbToPublic } from '../mappers/appUser.mapper';

export const authMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  const { token } = req.cookies;

  if (!token || typeof token !== 'string') {
    throw new UnauthorizedError('Missing token');
  }

  // Vérifie que le token n'a pas été révoqué
  const revoked = await revokedTokenRepository.findByToken(token);

  if (revoked) {
    throw new UnauthorizedError('Token has been revoked');
  }

  const decoded = verifyAccessToken(token);

  const result = jwtPayloadSchema.safeParse(decoded);

  if (!result.success) {
    return next(
      new ValidationError(
        `Access token payload validation failed: ${result.error.message}`
      )
    );
  }

  const user = await appUserRepository.findById(result.data.userId);

  if (!user) {
    throw new UnauthorizedError('User not found');
  }

  req.user = mapAppUserDbToPublic(user);

  next();
};
