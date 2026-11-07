import { env } from '../config/env';
import jwt from 'jsonwebtoken';
import { JwtPayload_spe as JwtPayload_perso } from '../types/auth.types';

const ACCESS_TOKEN_EXPIRATION = '1h'; // 1 hour as the cookie is set to expire in 1 hour, so the access token should also expire in 1 hour

export function generateAccessToken(payload: JwtPayload_perso): string {
  return jwt.sign(payload, env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRATION,
  });
}

export function verifyAccessToken(token: string): jwt.JwtPayload {
  return jwt.verify(token, env.JWT_ACCESS_TOKEN_SECRET) as jwt.JwtPayload;
}
