import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError, ValidationError } from '../errors/AppError';
import { revokedTokenRepository } from '../repositories/revokedToken.repository';
import { verifyAccessToken } from '../utils/token';
import { jwtPayloadSchema } from '../schemas/auth.schema';

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

  try {
    const decoded = verifyAccessToken(token);

    const result = jwtPayloadSchema.safeParse(decoded);

    if (!result.success) {
      return next(
        new ValidationError(
          `Access token payload validation failed: ${result.error.message.toString()}`
        )
      );
    }

    req.user = {
      id: result.data.userId,
      email: result.data.email,
    };

    next();
  } catch {
    throw new UnauthorizedError('Invalid or expired token');
  }
};
