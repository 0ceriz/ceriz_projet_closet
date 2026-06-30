import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../errors/AppError';
import { revokedTokenRepository } from '../repositories/revokedToken.repository';

interface JwtPayload {
  userId: string;
  email: string;
}

export const authMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  const { token } = req.cookies ?? {};

  if (!token) {
    throw new UnauthorizedError('Missing token');
  }

  if (typeof token !== 'string') {
    throw new UnauthorizedError('Missing token');
  }

  // Vérifie que le token n'a pas été révoqué
  const revoked = await revokedTokenRepository.findByToken(token);

  if (revoked) {
    throw new UnauthorizedError('Token has been revoked');
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not defined');
  }

  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;

    req.user = {
      id: decoded.userId,
      email: decoded.email,
    };

    next();
  } catch {
    throw new UnauthorizedError('Invalid or expired token');
  }
};
