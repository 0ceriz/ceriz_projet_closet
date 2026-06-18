import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log('🔥 AUTH MIDDLEWARE CALLED');

    const header = req.headers.authorization;
    console.log('📌 AUTH HEADER:', header);

    if (!header) {
      console.log('❌ Missing Authorization header');
      return res.status(401).json({ message: 'Missing Authorization header' });
    }

    const parts = header.split(' ');
    console.log('📌 HEADER PARTS:', parts);

    if (parts.length !== 2) {
      console.log('❌ Invalid Authorization format');
      return res.status(401).json({ message: 'Invalid Authorization format' });
    }

    const token = parts[1];
    console.log('📌 TOKEN:', token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    console.log('📌 DECODED TOKEN:', decoded);

    req.user = {
      // supporte les 2 formats possibles (safe)
      id: (decoded as any).userId || (decoded as any).id,
      email: (decoded as any).email,
    };

    console.log('✅ USER SET ON REQUEST:', req.user);

    return next();
  } catch (error) {
    console.log('💥 JWT ERROR:', error);

    return res.status(401).json({
      message: 'Invalid or expired token',
    });
  }
};
